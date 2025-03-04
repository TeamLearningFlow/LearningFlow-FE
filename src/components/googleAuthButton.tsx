import React, { useContext } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import googlelogo from '/public/googleLogo.svg';
import { useRouter } from 'next/router';
import axios from 'axios';
import { LoginContext } from './context/LoginContext';

const Button = styled.button`
  display: flex;
  height: 50px;
  padding: 18px 8px;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: rgba(255, 255, 255, 1);
  border: 1px solid rgba(189, 197, 204, 1);
  border-radius: 6.962px;
  font-family: Roboto;
  font-size: 17px;
  font-style: normal;
  font-weight: 600;
  color: rgba(50, 53, 56, 1);
  cursor: pointer;

  &:hover {
    background-color: rgba(245, 245, 245, 1);
  }

  @media (max-width: 768px) {
    padding: 19px 12px;
    font-size: 15px;
  }

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

const GoogleLogo = styled(Image)`
  margin-right: 10px;
  width: 20px;
  height: 20px;

  @media (max-width: 768px) {
    width: 18px;
    height: 18px;
  }

  @media (max-width: 480px) {
    width: 16px;
    height: 16px;
  }
`;

// const GoogleAuthButton = ({ text }: { text: string }) => {
//   const router = useRouter();

//   const handleGoogleLogin = () => {
//     const popup = window.open(
//       'https://onboarding.p-e.kr/login/google',
//       '_blank',
//       'width=600,height=800',
//     );

//     if (!popup) {
//       console.error('팝업을 열 수 없습니다.');
//       return;
//     }

//     window.addEventListener('message', (event) => {
//       console.log(event.origin);
//       if (event.origin !== 'https://onboarding.p-e.kr') {
//         console.log('origin 아님');
//         return;
//       }
//       console.log('event.data: ', event.data);
//       const { accessToken } = event.data;

//       if (accessToken) {
//         localStorage.setItem('token', accessToken);
//         console.log('google token:', accessToken);

//         router.push('/');

//         // 홈(/)으로 인증된 GET 요청 (401 에러 처리)
//         // axios
//         //   .get('https://onboarding.p-e.kr/', {
//         //     headers: {
//         //       Authorization: 'Bearer ' + accessToken,
//         //     },
//         //     withCredentials: true,
//         //   })
//         //   .then((response) => {
//         //     console.log('Home page response:', response.data);
//         //     router.push('/');
//         //   })
//         //   .catch(async (error) => {
//         //     if (error.response && error.response.status === 401) {
//         //       // Access Token 만료시 백엔드에서 새 Access Token을 보냈는지 확인
//         //       const newAccessToken = error.response.headers.authorization;

//         //       if (newAccessToken) {
//         //         // 새 Access Token 저장
//         //         localStorage.setItem('token', newAccessToken);

//         //         // 새 Access Token으로 원래 요청 다시 시도
//         //         try {
//         //           const retryResponse = await axios.get(
//         //             'https://onboarding.p-e.kr/',
//         //             {
//         //               headers: {
//         //                 Authorization: newAccessToken,
//         //               },
//         //               withCredentials: true,
//         //             },
//         //           );
//         //           console.log(
//         //             'Home page response (retry):',
//         //             retryResponse.data,
//         //           );
//         //           router.push('/');
//         //         } catch (retryError) {
//         //           console.error('Error after retry:', retryError);
//         //           handleAuthFailure(); // 재시도 실패 시 처리
//         //         }
//         //       } else {
//         //         // Refresh Token도 만료된 경우
//         //         handleAuthFailure();
//         //       }
//         //     } else {
//         //       console.error('Error fetching home page:', error);
//         //     }
//         //   });
//       } else {
//         console.error('Authentication failed: No access token received.');
//       }
//     });
//   };

//   // 인증 실패/만료 시 처리 함수
//   const handleAuthFailure = () => {
//     localStorage.removeItem('token');
//     router.push('/login');
//   };

//   return (
//     <Button onClick={handleGoogleLogin}>
//       <GoogleLogo src={googlelogo} alt="google logo" />
//       {text}
//     </Button>
//   );
// };

// export default GoogleAuthButton;

const GoogleAuthButton = ({ text }: { text: string }) => {
  const router = useRouter();
  const context = useContext(LoginContext); // ✅ LoginContext 추가

  const handleGoogleLogin = () => {
    const popup = window.open(
      'https://onboarding.p-e.kr/login/google',
      '_blank',
      'width=600,height=800',
    );

    if (!popup) {
      console.error('팝업을 열 수 없습니다.');
      return;
    }

    // ✅ 이벤트 리스너 함수 분리 및 cleanup 추가
    const handleMessage = async (event: MessageEvent) => {
      if (event.origin !== 'https://onboarding.p-e.kr') {
        console.log('origin 아님');
        return;
      }

      console.log('event.data: ', event.data);
      const { accessToken, refreshToken } = event.data;

      if (accessToken) {
        localStorage.setItem('token', accessToken);
        if (refreshToken) {
          // ✅ refreshToken이 있으면 저장
          localStorage.setItem('refreshToken', refreshToken);
        }
        console.log('google token:', accessToken);

        try {
          // ✅ 토큰을 헤더에 추가하여 홈 데이터 요청
          const response = await axios.get('https://onboarding.p-e.kr/', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
          });

          // ✅ 로그인 상태 업데이트
          if (context) {
            context.actions.setIsLoggedIn(true);
          }

          router.push('/');
        } catch (error) {
          console.error('홈 데이터 요청 실패:', error);
        }
      } else {
        console.error('Authentication failed: No access token received.');
      }

      // ✅ 이벤트 리스너 제거
      window.removeEventListener('message', handleMessage);
    };

    window.addEventListener('message', handleMessage);
  };

  return (
    <Button onClick={handleGoogleLogin}>
      <GoogleLogo src={googlelogo} alt="google logo" />
      {text}
    </Button>
  );
};

export default GoogleAuthButton;

import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import googlelogo from '../assets/googleLogo.svg';
import { useRouter } from 'next/router';
import axios from 'axios';

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

const GoogleAuthButton = ({ text }: { text: string }) => {
  const router = useRouter();

  const handleGoogleLogin = () => {
    const popup = window.open(
      'http://onboarding.p-e.kr:8080/login/google',
      '_blank',
      'width=600,height=800',
    );

    if (!popup) {
      console.error('팝업을 열 수 없습니다.');
      return;
    }

    window.addEventListener('message', (event) => {
      if (event.origin !== 'http://onboarding.p-e.kr:8080') {
        return;
      }

      const { accessToken } = event.data;

      if (accessToken) {
        localStorage.setItem('accessToken', 'Bearer ' + accessToken);

        // 홈(/)으로 인증된 GET 요청 (401 에러 처리)
        axios
          .get('http://onboarding.p-e.kr:8080', {
            headers: {
              Authorization: 'Bearer ' + accessToken,
            },
            withCredentials: true,
          })
          .then((response) => {
            console.log('Home page response:', response.data);
            router.push('/homePage');
          })
          .catch(async (error) => {
            if (error.response && error.response.status === 401) {
              // Access Token 만료시 백엔드에서 새 Access Token을 보냈는지 확인
              const newAccessToken = error.response.headers.authorization;

              if (newAccessToken) {
                // 새 Access Token 저장
                localStorage.setItem('accessToken', newAccessToken);

                // 새 Access Token으로 원래 요청 다시 시도
                try {
                  const retryResponse = await axios.get(
                    'http://onboarding.p-e.kr:8080',
                    {
                      headers: {
                        Authorization: newAccessToken,
                      },
                      withCredentials: true,
                    },
                  );
                  console.log(
                    'Home page response (retry):',
                    retryResponse.data,
                  );
                  router.push('/homePage');
                } catch (retryError) {
                  console.error('Error after retry:', retryError);
                  handleAuthFailure(); // 재시도 실패 시 처리
                }
              } else {
                // Refresh Token도 만료된 경우
                handleAuthFailure();
              }
            } else {
              console.error('Error fetching home page:', error);
            }
          });
      } else {
        console.error('Authentication failed: No access token received.');
      }
    });
  };

  // 인증 실패/만료 시 처리 함수
  const handleAuthFailure = () => {
    localStorage.removeItem('accessToken');
    router.push('/login');
  };

  return (
    <Button onClick={handleGoogleLogin}>
      <GoogleLogo src={googlelogo} alt="google logo" />
      {text}
    </Button>
  );
};

export default GoogleAuthButton;

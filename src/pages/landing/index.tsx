import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Page1 from './page1';
import Page2 from './page2';
import Page3 from './page3';
import styled from 'styled-components';
import TopLogo from '../../components/landing/landingHeader';
import Guest from '/public/Guest.svg';
import { LoginContext } from '../../components/context/LoginContext';

const PageIndicator = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 80px;
`;

const Indicator = styled.div<{ active: boolean }>`
  width: 130px;
  height: 4px;
  border-radius: 100px;
  background-color: ${(props) => (props.active ? '#5e52ff' : '#dde0e4')};
`;

const LandingPage: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [imgProfileUrl, setImgProfileUrl] = useState<string>(Guest.src); // 프로필 url 값
  const [nickname, setNickname] = useState(''); // 닉네임 값
  const [job, setJob] = useState(''); // 직업 값
  const [interestFields, setInterestFields] = useState<string[]>([]); // 카테고리 값
  // const [preferType, setPreferType] = useState(''); // 선호도 값
  const [token, setToken] = useState<string | null>(null);

  // 회원가입 타입 state 추가
  const [isGoogleSignup, setIsGoogleSignup] = useState(false);

  const router = useRouter();
  const context = useContext(LoginContext);

  if (!context) {
    throw new Error('LoginContext를 찾을 수 없습니다.');
  }

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const storedEmailVerificationCode = localStorage.getItem(
      'emailVerificationCode',
    );
    const storedOauth2RegistrationCode = localStorage.getItem(
      'oauth2RegistrationCode',
    );

    if (storedEmailVerificationCode) {
      setToken(storedEmailVerificationCode);
      setIsGoogleSignup(false);
      // localStorage.setItem('emailVerificationCode', emailVerificationCode);
    } else if (storedOauth2RegistrationCode) {
      setToken(storedOauth2RegistrationCode);
      setIsGoogleSignup(true);
      // localStorage.setItem('oauth2RegistrationCode', oauth2RegistrationCode);
    } else {
      console.log('회원가입 타입 결정 실패');
      console.error('토큰이 존재하지 않습니다.');
    }
  }, []);

  // 일반 회원가입 함수
  const handleNormalSignup = async (finalPreferType: string) => {
    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');
    const storedEmailVerificationCode = localStorage.getItem(
      'emailVerificationCode',
    ); // localStorage에서 이메일 임시 코드 가져오기

    const requestData = {
      name: nickname,
      job,
      interestFields,
      preferType: finalPreferType,
      imgProfileUrl: imgProfileUrl || Guest.src,
    };

    console.log('requestData:', requestData);

    if (!storedEmailVerificationCode) {
      alert('이메일 임시 코드가 존재하지 않습니다.');
      return;
    }

    try {
      // 1. 회원가입 요청 api
      const registerResponse = await axios.post(
        `https://onboarding.p-e.kr/register/complete?emailVerificationCode=${storedEmailVerificationCode}`,
        requestData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      console.log('회원가입 성공:', registerResponse.data);
      // alert('회원가입이 완료되었습니다.');

      // localStorage.removeItem('profileImgUrl'); // 기존에 저장된 이미지 삭제

      const userName = registerResponse.data.result.name;
      localStorage.setItem('userName', userName);
      localStorage.setItem('profileImgUrl', imgProfileUrl || Guest.src);

      // 자동 로그인 연결
      const loginResponse = await axios.post(
        'https://onboarding.p-e.kr/login',
        {
          email: storedEmail,
          password: storedPassword,
          remember: true,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      console.log('자동 로그인 성공:', loginResponse.data);

      // 로그인 응답에서 토큰 추출
      const loginToken = loginResponse.headers['authorization']?.split(' ')[1];

      if (loginToken) {
        localStorage.setItem('token', loginToken);
        localStorage.setItem('isFormSignup', 'true');
        context.actions.setIsLoggedIn(true);
        router.push('/');
      } else {
        throw new Error('로그인 토큰이 없습니다.');
      }
    } catch (error) {
      console.error('일반 회원가입 실패:', error);
      alert('회원가입에 실패했습니다. 다시 시도해주세요.');
    }
  };

  // 구글 회원가입 함수
  const handleGoogleSignup = async (finalPreferType: string) => {
    const storedOauth2RegistrationCode = localStorage.getItem(
      'oauth2RegistrationCode',
    ); // localStorage에서 구글 회원가입 임시 코드 가져오기

    const requestData = {
      name: nickname,
      job,
      interestFields,
      preferType: finalPreferType,
      imgProfileUrl: imgProfileUrl || Guest.src,
    };

    console.log('requestData:', requestData);

    if (!storedOauth2RegistrationCode) {
      alert('구글 회원가입 임시 코드가 존재하지 않습니다.');
      return;
    }

    try {
      const response = await axios.post(
        `https://onboarding.p-e.kr/oauth2/additional-info?oauth2RegistrationCode=${storedOauth2RegistrationCode}`,
        requestData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      console.log('구글 회원가입 성공:', response.data);

      const userName = response.data.result.name;
      localStorage.setItem('userName', userName);
      localStorage.setItem('profileImgUrl', imgProfileUrl || Guest.src);

      const accessToken = response.headers['authorization']?.split(' ')[1];
      const refreshToken = response.headers['refresh-token'];

      // 자동 로그인 코드 추가해야 할 수도 있음

      if (accessToken) {
        localStorage.setItem('token', accessToken);
        if (refreshToken) {
          localStorage.setItem('refreshToken', refreshToken);
        }
        localStorage.setItem('isFormSignup', 'true');
        context.actions.setIsLoggedIn(true);
        router.push('/');
      } else {
        throw new Error('인증 토큰이 없습니다.');
      }
    } catch (error) {
      console.error('구글 회원가입 실패:', error);
      alert('회원가입에 실패했습니다. 다시 시도해주세요.');
    }
  };

  // 회원가입 타입에 따른 처리 함수
  const handleComplete = async (finalPreferType: string) => {
    if (!token) {
      alert('토큰이 존재하지 않습니다.');
      return;
    }

    if (isGoogleSignup) {
      await handleGoogleSignup(finalPreferType);
    } else {
      await handleNormalSignup(finalPreferType);
    }
  };

  if (!isClient) {
    return null;
  }

  return (
    <>
      <TopLogo />
      {currentPage === 1 && (
        <Page1
          onNext={({ nickname, job, imgProfileUrl }) => {
            setNickname(nickname);
            setJob(job);
            setImgProfileUrl(imgProfileUrl || Guest.src);
            setCurrentPage(2);
          }}
        />
      )}
      {currentPage === 2 && (
        <Page2
          nickname={nickname}
          onPrev={() => setCurrentPage(1)}
          onNext={(selectedInterests) => {
            setInterestFields(selectedInterests);
            setCurrentPage(3);
          }}
        />
      )}
      {currentPage === 3 && (
        <Page3
          nickname={nickname}
          onPrev={() => setCurrentPage(2)}
          onNext={(selectedPreferType) => {
            handleComplete(selectedPreferType);
          }}
        />
      )}
      <PageIndicator>
        <Indicator active={currentPage >= 1} />
        <Indicator active={currentPage >= 2} />
        <Indicator active={currentPage === 3} />
      </PageIndicator>
    </>
  );
};

export default LandingPage;

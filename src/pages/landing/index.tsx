import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Page1 from './page1';
import Page2 from './page2';
import Page3 from './page3';
import styled from 'styled-components';
import TopLogo from '../../components/landing/landingHeader';
// import Guest from '../../assets/Guest.svg';
import { LoginContext } from '../context/LoginContext';

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
  const [currentPage, setCurrentPage] = useState(1);
  const [imgUrl, setImgUrl] = useState(''); // 프로필 url 값
  const [nickname, setNickname] = useState(''); // 닉네임 값
  const [job, setJob] = useState(''); // 직업 값
  const [interestFields, setInterestFields] = useState<string[]>([]); // 카테고리 값
  const [preferType, setPreferType] = useState(''); // 선호도 값
  const [token, setToken] = useState<string | null>(null);

  const router = useRouter();
  const context = useContext(LoginContext);

  if (!context) {
    throw new Error('LoginContext를 찾을 수 없습니다.');
  }

  // 회원가입 인증 토큰 호출
  useEffect(() => {
    const savedToken = localStorage.getItem('emailVerificationCode');
    if (savedToken) {
      setToken(savedToken);
    } else {
      console.error('토큰이 존재하지 않습니다.');
    }
  }, []);

  const handleComplete = async (finalPreferType: string) => {
    const storedEmail = localStorage.getItem('email'); // 회원가입 시 이메일 저장
    const storedPassword = localStorage.getItem('password'); // 회원가입 시 비밀번호 저장

    const requestData = {
      name: nickname,
      job,
      interestFields,
      preferType: finalPreferType,
      imgProfileUrl: imgUrl,
    };

    console.log('requestData:', requestData);

    if (!token) {
      alert('토큰이 존재하지 않습니다.');
      return;
    }

    try {
      // 1. 회원가입 요청 api
      const registerResponse = await axios.post(
        `http://onboarding.p-e.kr:8080/register/complete?emailVerificationCode=${token}`,
        requestData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      console.log('회원가입 성공:', registerResponse.data);
      alert('회원가입이 완료되었습니다.');

      localStorage.removeItem('profileImgUrl'); // 기존에 저장된 이미지 삭제

      const userName = registerResponse.data.result.name;
      localStorage.setItem('userName', userName); // 닉네임 저장
      console.log('저장된 닉네임:', registerResponse.data.result.name);

      // localStorage.setItem('profileImgUrl', imgUrl);
      console.log('저장된 이미지 URL:', imgUrl);

      // 자동 로그인 연결
      const loginResponse = await axios.post(
        'http://onboarding.p-e.kr:8080/login',
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
      } else {
        console.error('로그인 응답에 Authorization 헤더가 없습니다.');
        alert('로그인 실패');
        return;
      }

      // 로그인 상태 업데이트 및 회원가입 후 모달 표시 여부 저장
      localStorage.setItem('isFromSignup', 'true');
      context.actions.setIsLoggedIn(true);

      router.push('/home'); // 회원가입 완료 후 홈페이지로 이동
    } catch (error) {
      console.error('회원가입 실패:', error);
      alert('회원가입에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <>
      <TopLogo />
      {currentPage === 1 && (
        <Page1
          onNext={({ nickname, job, imgUrl }) => {
            setNickname(nickname);
            setJob(job);
            setImgUrl(imgUrl);
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
            setPreferType(selectedPreferType); // preferType 업데이트
            handleComplete(selectedPreferType); // 최신 값 전달
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

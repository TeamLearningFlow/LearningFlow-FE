import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Page1 from './page1';
import Page2 from './page2';
import Page3 from './page3';
import styled from 'styled-components';
import TopLogo from '../../components/landing/landingHeader';

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
  const [nickname, setNickname] = useState(''); // 닉네임 값
  const [job, setJob] = useState(''); // 직업 값
  const [interestFields, setInterestFields] = useState<string[]>([]); // 카테고리 값
  const [preferType, setPreferType] = useState(''); // 선호도 값
  const [token, setToken] = useState('');

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
    } else {
      console.error('토큰이 존재하지 않습니다.');
    }
  }, []);

  const router = useRouter();

  const handleComplete = async (finalPreferType: string) => {
    const requestData = {
      name: nickname,
      job,
      interestFields,
      preferType: finalPreferType,
    };

    console.log('requestData:', requestData);

    if (!token) {
      alert('토큰이 존재하지 않습니다.');
      return;
    }

    try {
      const response = await axios.post(
        `http://onboarding.p-e.kr:8080/register/complete?token=${token}`,
        requestData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      console.log('회원가입 성공:', response.data);
      alert('회원가입이 완료되었습니다.');

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
          onNext={({ nickname, job }) => {
            setNickname(nickname);
            setJob(job);
            setCurrentPage(2);
          }}
        />
      )}
      {currentPage === 2 && (
        <Page2
          onPrev={() => setCurrentPage(1)}
          onNext={(selectedInterests) => {
            setInterestFields(selectedInterests);
            setCurrentPage(3);
          }}
        />
      )}
      {currentPage === 3 && (
        <Page3
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

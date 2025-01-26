import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Page1 from './page1';
import Page2 from './page2';
import Page3 from './page3';
import styled from 'styled-components';
import TopLogo from '../../components/landingHeader';

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
  const router = useRouter();
  const { token } = router.query; // token 추출

  useEffect(() => {
    if (!token) {
      console.error('토큰이 없습니다.');
    }
  }, [token, router]);

  const handleComplete = async () => {
    const requestData = {
      name: nickname,
      job,
      interestFields,
      // gender: 'MALE',
      preferType,
    };

    try {
      await axios.post(
        `http://54.180.118.227:8080/register/complete?token=${token}`,
        requestData,
      );
      console.log('회원가입 성공');
      router.push('/home');
    } catch (err) {
      console.error('회원가입 실패:', err);
      // alert('회원가입 실패');
      router.push('/signup');
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
            setPreferType(selectedPreferType);
            handleComplete();
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

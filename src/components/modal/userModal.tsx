import React, { useContext, useEffect, useState } from 'react';
import { LoginContext } from '../context/LoginContext';
import styled from 'styled-components';
import Image from 'next/image';
import { useRouter } from 'next/router';
import axios from 'axios';

import Guest from '/public/Guest.svg';
import bookIMG from '/public/Book.svg';
import likeIMG from '/public/Like.svg';
import settingsIMG from '/public/Settings.svg';
import logoutIMG from '/public/Logout.svg';

const UserModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 240px;

  border: 1px solid rgba(221, 224, 228, 1);
  border-radius: 16px;
  background-color: #fff;
  box-shadow: 1.5px 2px 8px 0px rgba(0, 0, 0, 0.1);

  white-space: nowrap;

  @media (max-width: 850px) {
    width: 200px;
  }

  @media (max-width: 560px) {
    width: 140px;
  }
`;

const InfoTop = styled.div`
  display: flex;
  padding: 15px;

  @media (max-width: 850px) {
    padding: 10px;
  }

  @media (max-width: 560px) {
    padding: 6px;
    padding-left: 8px;
  }
`;

const InfoTopLeft = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GuestIMG = styled(Image)`
  display: flex;
  margin-right: 10px;

  border-radius: 25px;

  @media (max-width: 850px) {
    width: 30px;
    height: 30px;
  }

  @media (max-width: 560px) {
    width: 25px;
    height: 25px;
  }
`;

const InfoTopRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const InfoTopRightTop = styled.div`
  display: flex;
`;

const UserName = styled.div`
  font-size: 16px;
  font-weight: 600;
  line-height: 150%;
  letter-spacing: -0.4px;

  @media (max-width: 850px) {
    font-size: 14px;
    margin-top: 2px;
  }

  @media (max-width: 560px) {
    font-size: 11px;
    margin-top: 0.5px;
  }
`;

const UserJob = styled.div`
  justify-content: flex-end;
  margin-top: 8px;
  margin-left: 5px;

  color: #959ca4;
  font-size: 10px;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.28px;

  @media (max-width: 850px) {
    font-size: 8px;
    margin-left: 4px;
  }

  @media (max-width: 560px) {
    font-size: 7px;
    margin-left: 3px;
    margin-top: 6px;
  }
`;

const UserEmail = styled.div`
  font-size: 10px;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.28px;

  color: #959ca4;

  @media (max-width: 850px) {
    font-size: 8px;
  }

  @media (max-width: 560px) {
    font-size: 6px;
  }
`;

const Hr = styled.div`
  background-color: rgba(221, 224, 228, 1);
  height: 0.5px;
  width: 100%;
`;

const InfoMid = styled.div`
  display: flex;
  flex-direction: column;

  padding: 15px;
  padding-bottom: 18px;
  margin-left: 5px;

  @media (max-width: 850px) {
    padding: 10px;
    padding-bottom: 5px;
  }

  @media (max-width: 560px) {
    padding: 6px 5px 2px 8px;
  }
`;

const MidTitle = styled.div`
  font-size: 17px;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.4px;
  color: #959ca4;

  margin-top: 3px;
  margin-bottom: 15px;

  display: inline-block;

  @media (max-width: 850px) {
    font-size: 13px;
  }

  @media (max-width: 560px) {
    font-size: 10px;
    margin-bottom: 9px;
  }
`;

const MidLearning = styled.div`
  display: flex;
  margin-bottom: 15px;

  @media (max-width: 850px) {
    margin-bottom: 5px;
  }

  @media (max-width: 560px) {
    margin-bottom: 0px;
  }
`;

const MidLearningIMG = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BookIMG = styled(Image)`
  display: flex;
  margin-right: 10px;
  margin-top: 2px;

  @media (max-width: 850px) {
    margin-bottom: 12px;
    width: 15px;
    height: 15px;
  }
  @media (max-width: 650px) {
    // margin-bottom: 12px;
    width: 12px;
    height: 12px;
  }
`;

const MidLearningLetter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 16px;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.4px;

  cursor: pointer;

  @media (max-width: 850px) {
    font-size: 12px;
    margin-bottom: 11px;
  }

  @media (max-width: 560px) {
    font-size: 10px;
  }
`;

const MidLike = styled.div`
  display: flex;
  margin-bottom: 15px;

  @media (max-width: 850px) {
    margin-bottom: 5px;
  }

  @media (max-width: 560px) {
    margin-bottom: 1px;
  }
`;

const MidLikeIMG = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LikeIMG = styled(Image)`
  display: flex;
  margin-right: 10px;
  // margin-top: 2px;

  @media (max-width: 850px) {
    margin-bottom: 12px;
    width: 15px;
    height: 15px;
  }
  @media (max-width: 650px) {
    // margin-bottom: 12px;
    width: 12px;
    height: 12px;
  }
`;

const MidLikeLetter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 16px;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.4px;

  cursor: pointer;

  @media (max-width: 850px) {
    font-size: 12px;
    margin-bottom: 10px;
  }

  @media (max-width: 560px) {
    font-size: 10px;
  }
`;

const MidSettings = styled.div`
  display: flex;
  margin-bottom: 2px;

  @media (max-width: 850px) {
    margin-bottom: 0px;
  }
`;

const MidSettingsIMG = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SettingsIMG = styled(Image)`
  display: flex;
  margin-right: 10px;
  // margin-top: 2px;

  @media (max-width: 850px) {
    margin-bottom: 12px;
    width: 15px;
    height: 15px;
  }

  @media (max-width: 650px) {
    // margin-bottom: 12px;
    width: 12px;
    height: 12px;
  }
`;

const MidSettingsLetter = styled.div`
  font-size: 16px;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.4px;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  @media (max-width: 850px) {
    font-size: 12px;
    margin-bottom: 11px;
  }

  @media (max-width: 560px) {
    font-size: 10px;
  }
`;

const InfoBottom = styled.div`
  display: flex;
  margin: 3px 0px 3px 5px;
  padding: 15px;

  @media (max-width: 850px) {
    margin-top: 0px;
    padding: 10px;
  }

  @media (max-width: 650px) {
    margin-top: 0px;
    padding: 8px;
  }
`;

const ButtomLogout = styled.div`
  display: flex;
`;

const BottomLogoutIMG = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LogoutIMG = styled(Image)`
  display: flex;
  margin-right: 10px;
  margin-top: 2px;

  @media (max-width: 850px) {
    width: 15px;
    height: 15px;
  }

  @media (max-width: 650px) {
    // margin-bottom: 12px;
    width: 12px;
    height: 12px;
  }
`;

const BottomLogoutLetter = styled.div`
  font-size: 16px;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.4px;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  @media (max-width: 850px) {
    font-size: 12px;
  }

  @media (max-width: 560px) {
    font-size: 10px;
  }
`;

interface userData {
  name: string;
  email: string;
  job: string;
  interestFields: string[];
  preferType: string;
  profileImgUrl: string;
}

const jobMap: { [key: string]: string } = {
  STUDENT: '대학생(휴학생)',
  ADULT: '성인',
  EMPLOYEE: '직장인',
  JOB_SEEKER: '이직/취업 준비생',
  OTHER: '기타',
};

const userModal: React.FC = () => {
  const router = useRouter();
  const context = useContext(LoginContext);
  const [userData, setUserData] = useState<userData | null>(null);

  if (!context) throw new Error('LoginContext를 찾을 수 없습니다.');

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token'); // 로컬 스토리지에서 토큰 가져오기

      if (!token) {
        alert('로그인 정보가 없습니다.');
        router.push('/login');
        return;
      }

      const response = await axios.post(
        'http://onboarding.p-e.kr:8080/logout', // 로그아웃 api
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // 로컬 스토리지에서 가져온 토큰 사용
          },
        },
      );

      if (response.status === 200) {
        console.log('Response:', response.data);
        localStorage.removeItem('token'); // 로컬 스토리지 토큰 초기화
        context.actions.setIsLoggedIn(false);
        router.push('/'); // 홈 페이지로 이동
      }
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          console.error('로그인 토큰이 없습니다');
          return;
        }

        const response = await axios.get('http://onboarding.p-e.kr:8080/user', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        setUserData(response.data.result);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          if (err.response?.status === 401) {
            console.error(
              '토큰이 만료되었거나 잘못되었습니다. 다시 로그인해주세요.',
            );
            localStorage.removeItem('token');
          } else {
            console.error(
              '사용자 정보 가져오기 실패:',
              err.response?.data || err.message,
            );
          }
        } else if (err instanceof Error) {
          console.error(err.message);
        } else {
          console.error(err);
        }
      }
    };

    fetchUserData();
  }, []);

  return (
    <UserModalWrapper>
      {userData ? (
        <>
          <InfoTop>
            <InfoTopLeft>
              <GuestIMG
                src={userData.profileImgUrl || Guest}
                alt="userIMG"
                width={40}
                height={40}
              />
            </InfoTopLeft>
            <InfoTopRight>
              <InfoTopRightTop>
                <UserName>{userData.name}</UserName>
                <UserJob>{jobMap[userData.job]}</UserJob>
              </InfoTopRightTop>
              <UserEmail>{userData.email}</UserEmail>
            </InfoTopRight>
          </InfoTop>
          <Hr />
          <InfoMid>
            <MidTitle>마이페이지</MidTitle>
            <MidLearning>
              <MidLearningIMG>
                <BookIMG src={bookIMG} alt="학습방" width={20} height={20} />
              </MidLearningIMG>
              <MidLearningLetter onClick={() => router.push('/mypage')}>
                나의 학습방
              </MidLearningLetter>
            </MidLearning>
            <MidLike>
              <MidLikeIMG>
                <LikeIMG src={likeIMG} alt="좋아요" width={20} height={20} />
              </MidLikeIMG>
              <MidLikeLetter onClick={() => router.push('/mypage?tab=liked')}>
                관심 컬렉션
              </MidLikeLetter>
            </MidLike>
            <MidSettings>
              <MidSettingsIMG>
                <SettingsIMG
                  src={settingsIMG}
                  alt="계정설정"
                  width={20}
                  height={20}
                />
              </MidSettingsIMG>
              <MidSettingsLetter onClick={() => router.push('/mypage/profile')}>
                계정 설정
              </MidSettingsLetter>
            </MidSettings>
          </InfoMid>
          <Hr />
          <InfoBottom>
            <ButtomLogout onClick={handleLogout}>
              <BottomLogoutIMG>
                <LogoutIMG
                  src={logoutIMG}
                  alt="로그아웃"
                  width={20}
                  height={20}
                />
              </BottomLogoutIMG>
              <BottomLogoutLetter>
                {/* <a href="/로그아웃"> */}
                로그아웃
                {/* </a> */}
              </BottomLogoutLetter>
            </ButtomLogout>
          </InfoBottom>
        </>
      ) : (
        <>
          <p>로딩중</p>
        </>
      )}
    </UserModalWrapper>
  );
};

export default userModal;

import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import guestIMG from '../../assets/Guest.svg';
import bookIMG from '../../assets/Book.svg';
import likeIMG from '../../assets/Like.svg';
import settingsIMG from '../../assets/Settings.svg';
import logoutIMG from '../../assets/Logout.svg';

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
`;

const InfoTop = styled.div`
  display: flex;
  padding: 15px;
`;

const InfoTopLeft = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GuestIMG = styled(Image)`
  display: flex;
  margin-right: 10px;
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
`;

const UserEmail = styled.div`
  font-size: 10px;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.28px;

  color: #959ca4;
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
`;

const MidTitle = styled.div`
  font-size: 17px;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.4px;
  color: #959ca4;

  margin-top: 3px;
  margin-bottom: 15px;

  cursor: pointer;
  display: inline-block;
`;

const MidLearning = styled.div`
  display: flex;
  margin-bottom: 15px;
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
`;

const MidLike = styled.div`
  display: flex;
  margin-bottom: 15px;
`;

const MidLikeIMG = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LikeIMG = styled(Image)`
  display: flex;
  margin-right: 10px;
  margin-top: 2px;
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
`;

const MidSettings = styled.div`
  display: flex;
  margin-bottom: 2px;
`;

const MidSettingsIMG = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SettingsIMG = styled(Image)`
  display: flex;
  margin-right: 10px;
  margin-top: 2px;
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
`;

const InfoBottom = styled.div`
  display: flex;
  margin: 3px 0px 3px 5px;
  padding: 15px;
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
`;

const userModal: React.FC = () => {
  return (
    <UserModalWrapper>
      <InfoTop>
        <InfoTopLeft>
          <GuestIMG src={guestIMG} alt="userIMG" width={40} height={40} />
        </InfoTopLeft>
        <InfoTopRight>
          <InfoTopRightTop>
            <UserName>푸글</UserName>
            <UserJob>대학생</UserJob>
          </InfoTopRightTop>
          <UserEmail>onboarding@gmail.com</UserEmail>
        </InfoTopRight>
      </InfoTop>
      <Hr />
      <InfoMid>
        <MidTitle>
          {/* <a href="/mypage"> */}
          마이페이지
          {/* </a> */}
        </MidTitle>
        <MidLearning>
          <MidLearningIMG>
            <BookIMG src={bookIMG} alt="학습방" width={20} height={20} />
          </MidLearningIMG>
          <MidLearningLetter>나의 학습방</MidLearningLetter>
        </MidLearning>
        <MidLike>
          <MidLikeIMG>
            <LikeIMG src={likeIMG} alt="좋아요" width={20} height={20} />
          </MidLikeIMG>
          <MidLikeLetter>
            {/* <a href="/좋아요"> */}
            좋아요
            {/* </a> */}
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
          <MidSettingsLetter>
            {/* <a href="/계정설정"> */}
            계정 설정
            {/* </a> */}
          </MidSettingsLetter>
        </MidSettings>
      </InfoMid>
      <Hr />
      <InfoBottom>
        <ButtomLogout>
          <BottomLogoutIMG>
            <LogoutIMG src={logoutIMG} alt="로그아웃" width={20} height={20} />
          </BottomLogoutIMG>
          <BottomLogoutLetter>
            {/* <a href="/로그아웃"> */}
            로그아웃
            {/* </a> */}
          </BottomLogoutLetter>
        </ButtomLogout>
      </InfoBottom>
    </UserModalWrapper>
  );
};

export default userModal;

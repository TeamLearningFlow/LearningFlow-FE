import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import Image from 'next/image';
import ProfileEditIcon from '/public/profileEditIcon.svg';
import user from '/public/Guest.svg';

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  height: 350px;
  position: relative;
  margin: 48px 120px 0 120px;

  @media (max-width: 1400px) {
    max-width: 1000px;
    margin: 20px 0px 54px 5px;
  }

  @media (max-width: 1024px) {
    width: 1000px;
    margin: 20px 10px 0 10px;
  }

  @media (max-width: 768px) {
    width: calc(100vw - 20px); /* 모바일 화면 */
  }

  @media (max-width: 480px) {
    width: calc(100vw - 10px); /* 폰 화면 */
    height: 300px;
    margin: 10px 5px 0 5px;
  }
`;

const Banner = styled.div<{ imgUrl: string }>`
  width: 1200px;
  height: 200px;
  border-radius: 32px 32px 0px 0px;
  background: ${({ imgUrl }) =>
    imgUrl.startsWith('linear-gradient') ? imgUrl : `url(${imgUrl})`};
  background-size: cover;
  // background-position: center;
  background-repeat: no-repeat;

  /* 반응형 설정 */
  @media (max-width: 1024px) {
    width: 1000px;
  }

  @media (max-width: 768px) {
    width: calc(100vw - 20px); /* 모바일 화면 */
  }

  @media (max-width: 480px) {
    width: calc(100vw - 10px); /* 폰 화면 */
    height: 170px;
  }
`;

const ProfileImage = styled.div`
  width: 160px;
  height: 160px;
  border-radius: 160px;
  border: 2px solid #fff;
  background: #f2f4f8;
  position: absolute;
  top: 123px;
  left: 36px;
  z-index: 100;

  /* 반응형 설정 */
  @media (max-width: 480px) {
    width: 130px; /* 폰 화면 */
    height: 130px;
    top: 103px;
  }
`;

const UserImage = styled(Image)`
  width: 156px;
  height: 156px;
  border-radius: 160px;

  /* 반응형 설정 */
  @media (max-width: 480px) {
    width: 126px; /* 폰 화면 */
    height: 126px;
  }
`;

const ProfileWrapper = styled.div`
  width: 1200px;
  height: 150px;
  border-bottom: 0.5px solid rgba(118, 118, 128, 0.12);
  background: #fafafc;
  position: relative;

  /* Drop Shadow/100 */
  box-shadow: var(--sds-size-depth-0) var(--sds-size-depth-025)
    var(--sds-size-depth-100) var(--sds-size-depth-0) var(--sds-color-black-100);

  /* 반응형 설정 */
  @media (max-width: 1024px) {
    width: 1000px;
  }

  @media (max-width: 768px) {
    width: calc(100vw - 20px); /* 모바일 화면 */
  }

  @media (max-width: 480px) {
    width: calc(100vw - 10px); /* 폰 화면 */
    height: 130px;
  }
`;

const Profile = styled.div`
  display: flex;
  width: 183px;
  flex-direction: column;
  align-items: flex-start;
  position: absolute;
  top: 18px;
  left: 220px;

  /* 반응형 설정 */
  @media (max-width: 480px) {
    left: 180px; /* 폰 화면 */
  }
`;

const PersonalInfo = styled.div`
  display: flex;
  gap: 10px;
  white-space: nowrap;
  width: 100%;
  // overflow: hidden;
`;

const Nickname = styled.span`
  color: #000;

  /* Body/2xl/Semibold */
  font-family: Pretendard;
  font-size: 32px;
  font-style: normal;
  font-weight: 600;
  line-height: 48px; /* 150% */
  letter-spacing: -0.64px;
  white-space: nowrap;

  /* 반응형 설정 */
  @media (max-width: 480px) {
    font-size: 29px; /* 폰 화면 */
  }
`;

const GrayLabel = styled.span`
  color: #959ca4;
  font-feature-settings:
    'liga' off,
    'clig' off;

  /* Body/m/Regular */
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 27px; /* 150% */
  letter-spacing: -0.36px;
  white-space: nowrap;

  /* 반응형 설정 */
  @media (max-width: 480px) {
    font-size: 14px; /* 폰 화면 */
  }
`;

const Job = styled(GrayLabel)`
  display: flex;
  align-items: end;
  white-space: nowrap;
`;

const Email = styled(GrayLabel)``;

const EditButton = styled.div`
  display: flex;
  width: 42px;
  height: 42px;
  padding: 6px 9px;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  background: rgba(118, 118, 128, 0.3);
  position: absolute;
  top: 41px;
  right: 0;
  cursor: pointer;
`;

interface UserInfo {
  name: string;
  email: string;
  job: string;
  profileImgUrl: string | null;
  bannerImgUrl: string;
}

const ProfileBanner: React.FC<{ userInfo: UserInfo }> = ({ userInfo }) => {
  return (
    <Container>
      <Banner imgUrl={userInfo.bannerImgUrl} />
      <ProfileImage>
        <UserImage
          src={userInfo.profileImgUrl || user}
          alt="user"
          width={160}
          height={160}
          style={{ objectFit: 'cover' }}
        />
      </ProfileImage>
      <ProfileWrapper>
        <Profile>
          <PersonalInfo>
            <Nickname>{userInfo.name}</Nickname>
            <Job>{userInfo.job}</Job>
          </PersonalInfo>
          <Email>{userInfo.email}</Email>
        </Profile>
        <Link href="/mypage/profile" passHref>
          <EditButton>
            <Image src={ProfileEditIcon} alt="edit button" />
          </EditButton>
        </Link>
      </ProfileWrapper>
    </Container>
  );
};

export default ProfileBanner;

import React, { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import userProfile from '../../assets/userphoto.svg';
import CheckIcon from '../../assets/checkIconGray.svg';
import ProfileCategoryList from '../../components/mypage/profileCategoryList';
import PreferSlider from '../../components/mypage/preferSlider';

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 50px;
  width: 100%;
  max-width: 1200px;
  box-sizing: border-box;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const ButtonContainer = styled.div`
  display: flex;
`;

const SetButton = styled.button<{ primary?: boolean }>`
  border-radius: 6px;
  border: 0.5px solid #bdc5cc;
  background: ${(props) => (props.primary ? '#5e52ff' : '#fff')};
  color: ${(props) => (props.primary ? '#fff' : '#000')};
  padding: 4px 12px;
  font-size: 14px;
  cursor: pointer;
  height: 30px;
  margin-left: ${(props) => (props.primary ? '8px' : '0')};

  &:hover {
    background: ${(props) =>
      props.primary ? '#3C31C8' : 'rgba(118, 118, 128, 0.12)'};
  }
`;

const CancelButton = styled.button`
  border-radius: 6px;
  border: 0.5px solid #bdc5cc;
  background: #fff;
  padding: 4px 12px;
  font-size: 14px;
  cursor: pointer;
  color: #000;
  width: auto;
  height: 30px;

  &:hover {
    background: rgba(118, 118, 128, 0.12);
  }
`;

const SectionTitle = styled.h2`
  font-size: 22px;
  font-weight: 600;
  line-height: 36px; /* 150% */
  letter-spacing: -0.48px;
  color: #000;
  padding: 5px 0 15px 0;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 90px 1fr;
  row-gap: 16px;
  column-gap: 20px;
  align-items: start;
`;

const InfoLabel = styled.span`
  font-size: 17px;
  font-weight: 400;
  line-height: 30px; /* 150% */
  letter-spacing: -0.4px;
  color: #000;
`;

const InfoValue = styled.span`
  font-size: 17px;
  font-weight: 600;
  line-height: 30px; /* 150% */
  letter-spacing: -0.4px;
  color: #000;
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  padding: 10px;
  border: 0.9px solid #323538;
  border-radius: 6px;
  font-size: 14px;

  &::placeholder {
    color: #afb8c1;
  }

  &:focus {
    border-color: #5e52ff;
    box-shadow:
      1px 1px 1px 0px rgba(94, 82, 255, 0.3),
      -1px -1px 1px 0px rgba(94, 82, 255, 0.3);
    outline: none;
  }
`;

const BannerContainer = styled.div`
  position: relative;
  gap: 20px;
  width: 100%;
`;

const Banner = styled.div<{ background?: string }>`
  width: 580px;
  max-width: 580px;
  height: 90px;
  border-radius: 16px 16px 0 0;
  background: ${({ background }) =>
    background
      ? `url(${background})`
      : 'linear-gradient(90deg, #5e52ff 0%, #383199 100%)'};
  background-size: cover;
`;

const ProfileContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const ProfileImage = styled.div`
  display: flex;
  align-items: center;
  width: 95px;
  height: 95px;
  overflow: hidden;
`;

const ChangeContainerBanner = styled.div`
  position: absolute;
  top: 50%;
  right: -30px;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ChangeContainerImage = styled.div`
  position: absolute;
  top: 50%;
  margin-left: 110px;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ChangeButton = styled.label`
  border-radius: 6px;
  border: 0.5px solid #bdc5cc;
  background: #fff;
  align-items: center;
  padding: 6px 12px;
  font-size: 14px;
  cursor: pointer;
  color: #000;
  width: auto;
  height: 30px;

  &:hover {
    background: rgba(118, 118, 128, 0.12);
  }
`;

const CheckList = styled.div`
  margin-top: 5px;
  font-size: 12px;
  color: #959ca4;
  display: flex;
  flex-direction: column;
  gap: 4px;

  img {
    width: 14px;
    height: 14px;
    margin-right: 5px;
  }

  span {
    display: flex;
    align-items: center;
  }
`;

const MyProfile = () => {
  const [isEditing, setIsEditing] = useState(false); // 편집 모드
  const [originalProfileData, setOriginalProfileData] = useState({
    nickname: '푸글',
    job: '대학생',
    profileImage: userProfile,
    bannerImage: '',
    preferredMedia: 50,
    selectedCategories: [] as string[],
  });
  const [profileData, setProfileData] = useState(originalProfileData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* const handleImageUpload = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileData((prev) => ({
        ...prev,
        [type]: imageUrl,
      }));
    }
  }; */

  const handleCategoryChange = (newCategories: string[]) => {
    setProfileData((prev) => ({
      ...prev,
      selectedCategories: newCategories, // 관심분야 업데이트
    }));
  };

  const handleMediaPreferenceChange = (value: number) => {
    setProfileData((prev) => ({
      ...prev,
      preferredMedia: value,
    }));
  };

  const handleEdit = () => {
    setOriginalProfileData(profileData); // 초기 데이터 저장
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false); // 편집 모드 비활성화
    setOriginalProfileData(profileData); // 데이터 업데이트
    console.log(profileData); // 변경 데이터 확인
  };

  const handleCancel = () => {
    setProfileData(originalProfileData); // 초기 데이터로 복원
    setIsEditing(false);
  };

  return (
    <Section>
      <SectionHeader>
        <SectionTitle>내 프로필</SectionTitle>
        {!isEditing ? (
          <SetButton onClick={handleEdit}>설정</SetButton>
        ) : (
          <ButtonContainer>
            <CancelButton onClick={handleCancel}>취소</CancelButton>
            <SetButton primary onClick={handleSave}>
              저장
            </SetButton>
          </ButtonContainer>
        )}
      </SectionHeader>
      <InfoGrid>
        <InfoLabel>배너</InfoLabel>
        <BannerContainer>
          <Banner background={profileData.bannerImage} />
          {isEditing && (
            <ChangeContainerBanner>
              <ChangeButton>변경</ChangeButton>
              <CheckList>
                <span>
                  <Image src={CheckIcon} alt="check" /> png, jpg, jpeg의 확장자
                </span>
                <span>
                  <Image src={CheckIcon} alt="check" /> 8MB 이하의 이미지
                </span>
                <span>
                  <Image src={CheckIcon} alt="check" /> 6:1 비율의 이미지
                </span>
              </CheckList>
            </ChangeContainerBanner>
          )}
        </BannerContainer>
        <InfoLabel>이미지</InfoLabel>
        <ProfileContainer>
          <ProfileImage>
            <Image
              src={profileData.profileImage}
              alt="user profile"
              width={80}
              height={80}
            />
          </ProfileImage>
          {isEditing && (
            <ChangeContainerImage>
              <ChangeButton>변경</ChangeButton>
              <CheckList>
                <span>
                  <Image src={CheckIcon} alt="check" /> png, jpg, jpeg의 확장자
                </span>
                <span>
                  <Image src={CheckIcon} alt="check" /> 8MB 이하의 이미지
                </span>
              </CheckList>
            </ChangeContainerImage>
          )}
        </ProfileContainer>

        <InfoLabel>닉네임</InfoLabel>
        {isEditing ? (
          <Input
            type="text"
            name="nickname"
            value={profileData.nickname}
            // placeholder={profileData.nickname}
            onChange={handleInputChange}
          />
        ) : (
          <InfoValue>{profileData.nickname}</InfoValue>
        )}

        <InfoLabel>직업</InfoLabel>
        {isEditing ? (
          <Input
            type="text"
            name="job"
            value={profileData.job}
            // placeholder={profileData.job}
            onChange={handleInputChange}
          />
        ) : (
          <InfoValue>{profileData.job}</InfoValue>
        )}

        <InfoLabel>관심분야</InfoLabel>
        {isEditing ? (
          <ProfileCategoryList
            selectedCategories={profileData.selectedCategories}
            onChange={handleCategoryChange}
          />
        ) : (
          <InfoValue>
            {profileData.selectedCategories.length > 0
              ? profileData.selectedCategories.join(', ')
              : '설정 안됨'}
          </InfoValue>
        )}

        <InfoLabel>매체 선호도</InfoLabel>
        {isEditing ? (
          <PreferSlider
            value={profileData.preferredMedia}
            onChange={handleMediaPreferenceChange}
          />
        ) : (
          <InfoValue>
            {profileData.preferredMedia < 40
              ? '텍스트가 좋아요'
              : profileData.preferredMedia > 60
                ? '영상이 좋아요'
                : '상관 없어요'}
          </InfoValue>
        )}
      </InfoGrid>
    </Section>
  );
};

export default MyProfile;

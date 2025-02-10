import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
// import userProfile from '../../assets/userphoto.svg';
import Guest from '../../assets/Guest.svg';
import CheckIcon from '../../assets/checkIconGray.svg';
import DownIcon from '../../assets/downIcon.svg';
import UpIcon from '../../assets/upIcon.svg';
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
  row-gap: 28px;
  column-gap: 20px;
  align-items: start;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const InfoLabel = styled.span`
  font-size: 17px;
  font-weight: 400;
  line-height: 30px; /* 150% */
  letter-spacing: -0.4px;
  color: #000;

  @media (max-width: 1024px) {
    margin-bottom: -7px;
  }
  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

const InfoValue = styled.span`
  font-size: 17px;
  font-weight: 600;
  line-height: 30px; /* 150% */
  letter-spacing: -0.4px;
  color: #000;
`;

const Input = styled.input`
  width: 82.5%;
  height: 45px;
  padding: 10px 18px;
  border: 1px solid #323538;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 400;
  line-height: 150%; /* 24px */
  letter-spacing: -0.32px;
  color: #1f1f1f;

  &:focus {
    border-color: #5e52ff;
    box-shadow:
      1px 1px 1px 0px rgba(94, 82, 255, 0.3),
      -1px -1px 1px 0px rgba(94, 82, 255, 0.3);
    outline: none;
  }
`;

const BannerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  width: 100%;
  position: relative;
`;

const Banner = styled.div<{ background?: string; isEditing: boolean }>`
  width: ${({ isEditing }) => (isEditing ? '714px' : '600px')};
  max-width: ${({ isEditing }) => (isEditing ? '714px' : '600px')};
  height: ${({ isEditing }) => (isEditing ? '119px' : '100px')};
  border-radius: 12.8px 12.8px 0 0;
  background: ${({ background }) =>
    background
      ? `url(${background})`
      : 'linear-gradient(90deg, #5e52ff 0%, #383199 100%)'};
  background-size: cover;

  @media (max-width: 1024px) {
    width: 570px;
  }

  @media (max-width: 750px) {
    width: 400px;
  }

  @media (max-width: 560px) {
    width: 330px;
  }

  @media (max-width: 480px) {
    width: 180px;
  }
`;

const ProfileContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const ProfileImage = styled.div`
  display: flex;
  align-items: center;
  width: 100px;
  height: 100px;
  overflow: hidden;
`;

const ChangeContainerBanner = styled.div`
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 30px;
`;

const ChangeContainerImage = styled.div`
  position: absolute;
  top: 50%;
  margin-left: 120px;
  gap: 30px;
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
  height: 29px;

  &:hover {
    background: rgba(118, 118, 128, 0.12);
  }
`;

const CheckList = styled.div`
  // margin-top: 12px;
  font-size: 12px;
  color: #959ca4;
  display: flex;
  flex-direction: column;
  gap: 8px;

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

const Dropdown = styled.div<{ focused: boolean }>`
  width: 82.5%;
  height: 45px;
  padding: 10px 18px;
  border: 1px solid ${(props) => (props.focused ? '#5e52ff' : '#323538')};
  box-shadow: ${(props) =>
    props.focused
      ? '1.806px 1.806px 1.806px 0px rgba(94, 82, 255, 0.30), -1.806px -1.806px 1.806px 0px rgba(94, 82, 255, 0.30)'
      : 'none'};
  border-radius: 6px;
  font-size: 14px;
  font-weight: 400;
  line-height: 150%; /* 24px */
  letter-spacing: -0.32px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

const DropdownMenu = styled.ul`
  position: absolute;
  top: 50px;
  left: 0;
  width: 100%;
  height: auto;
  border: 1px solid ##eceef0;
  border-radius: 8px;
  background-color: white;
  list-style: none;
  z-index: 2;
  overflow-y: auto;
  box-shadow:
    3px 3px 3px 0px rgba(200, 200, 200, 0.5),
    -1px -1px 1px 0px rgba(200, 200, 200, 0.5);
`;

const DropdownOption = styled.li<{ selected: boolean }>`
  padding: 12px 17px;
  cursor: pointer;
  border-radius: 8px;
  color: ${(props) => (props.selected ? '#5E52FF' : '#181818')};
  &:hover {
    background-color: #f5f5f5;
  }
`;

const jobOptions = ['대학생', '직장인', '이직/취업 준비생', '성인', '기타'];

const MyProfile = () => {
  const [isEditing, setIsEditing] = useState(false); // 편집 모드
  const [originalProfileData, setOriginalProfileData] = useState({
    nickname: '푸글',
    job: '대학생',
    profileImage: Guest,
    bannerImage: '',
    preferredMedia: 50,
    selectedCategories: [] as string[],
  });
  const [profileData, setProfileData] = useState(originalProfileData);

  const [isJobDropdownOpen, setIsJobDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsJobDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  // 직업 선택 시 상태 업데이트
  const handleJobSelect = (job: string) => {
    setProfileData((prev) => ({
      ...prev,
      job,
    }));
    setIsJobDropdownOpen(false);
  };

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
        {isEditing ? (
          <>
            <InfoLabel>이미지</InfoLabel>
            <ProfileContainer>
              <ProfileImage>
                <Image
                  src={profileData.profileImage}
                  alt="guest profile"
                  width={100}
                  height={100}
                />
              </ProfileImage>
              <ChangeContainerImage>
                <ChangeButton>변경</ChangeButton>
                <CheckList>
                  <span>
                    <Image src={CheckIcon} alt="check" /> png, jpg, jpeg의
                    확장자
                  </span>
                  <span>
                    <Image src={CheckIcon} alt="check" /> 8MB 이하의 이미지
                  </span>
                </CheckList>
              </ChangeContainerImage>
            </ProfileContainer>

            <InfoLabel>배너</InfoLabel>
            <BannerContainer>
              <Banner
                background={profileData.bannerImage}
                isEditing={isEditing}
              />
              <ChangeContainerBanner>
                <ChangeButton>변경</ChangeButton>
                <CheckList>
                  <span>
                    <Image src={CheckIcon} alt="check" /> png, jpg, jpeg의
                    확장자
                  </span>
                  <span>
                    <Image src={CheckIcon} alt="check" /> 8MB 이하의 이미지
                  </span>
                  <span>
                    <Image src={CheckIcon} alt="check" /> 6:1 비율의 이미지
                  </span>
                </CheckList>
              </ChangeContainerBanner>
            </BannerContainer>
          </>
        ) : (
          <>
            <InfoLabel>배너</InfoLabel>
            <BannerContainer>
              <Banner
                background={profileData.bannerImage}
                isEditing={isEditing}
              />
            </BannerContainer>

            <InfoLabel>이미지</InfoLabel>
            <ProfileContainer>
              <ProfileImage>
                <Image
                  src={profileData.profileImage}
                  alt="guest profile"
                  width={80}
                  height={80}
                />
              </ProfileImage>
            </ProfileContainer>
          </>
        )}

        <InfoLabel>닉네임</InfoLabel>
        {isEditing ? (
          <Input
            type="text"
            name="nickname"
            value={profileData.nickname}
            onChange={handleInputChange}
          />
        ) : (
          <InfoValue>{profileData.nickname}</InfoValue>
        )}

        <InfoLabel>직업</InfoLabel>
        {isEditing ? (
          <Dropdown
            ref={dropdownRef}
            onClick={() => setIsJobDropdownOpen(!isJobDropdownOpen)}
            focused={isJobDropdownOpen}
          >
            <span>{profileData.job}</span>
            <Image
              src={isJobDropdownOpen ? UpIcon : DownIcon}
              alt="Dropdown Icon"
              width={20}
              height={20}
            />
            {isJobDropdownOpen && (
              <DropdownMenu>
                {jobOptions.map((option) => (
                  <DropdownOption
                    key={option}
                    selected={profileData.job === option}
                    onClick={(e) => {
                      e.stopPropagation(); // 부모 클릭 이벤트 방지
                      handleJobSelect(option);
                    }}
                  >
                    {option}
                  </DropdownOption>
                ))}
              </DropdownMenu>
            )}
          </Dropdown>
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

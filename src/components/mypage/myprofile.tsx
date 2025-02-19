import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Image from 'next/image';
// import userProfile from '/public/userphoto.svg';
import Guest from '/public/Guest.svg';
import CheckIcon from '/public/checkIconGray.svg';
import CheckIconB from '/public/checkIconB.svg';
import DownIcon from '/public/downIcon.svg';
import UpIcon from '/public/upIcon.svg';
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

const SetButton = styled.button<{ primary?: boolean; disabled?: boolean }>`
  border-radius: 6px;
  border: 0.5px solid #bdc5cc;
  background: ${(props) =>
    props.disabled ? '#DDE0E4' : props.primary ? '#5e52ff' : '#fff'};
  color: ${(props) =>
    props.disabled ? '#fff' : props.primary ? '#fff' : '#000'};
  padding: 4px 12px;
  font-size: 14px;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  height: 30px;
  margin-left: ${(props) => (props.primary ? '8px' : '0')};
  pointer-events: ${(props) => (props.disabled ? 'none' : 'auto')};

  &:hover {
    background: ${(props) =>
      props.disabled
        ? '#DDE0E4'
        : props.primary
          ? '#3C31C8'
          : 'rgba(118, 118, 128, 0.12)'};
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

const Input = styled.input<{ hasError?: boolean }>`
  width: 82.5%;
  height: 45px;
  padding: 10px 18px;
  border: 1px solid ${(props) => (props.hasError ? '#ec2d30' : '#323538')};
  border-radius: 6px;
  font-size: 14px;
  font-weight: 400;
  line-height: 150%; /* 24px */
  letter-spacing: -0.32px;
  color: #1f1f1f;

  &:focus {
    border-color: ${(props) => (props.hasError ? '#ec2d30' : '#5e52ff')};
    box-shadow: ${(props) =>
      props.hasError
        ? 'none'
        : '1px 1px 1px 0px rgba(94, 82, 255, 0.3), -1px -1px 1px 0px rgba(94, 82, 255, 0.3)'};
    outline: none;
  }

  &::placeholder {
    color: #afb8c1;
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
  border-radius: 50%;
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
  // color: #959ca4;
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

/* const NicknameError = styled.div`
  color: #ec2d30;
  font-size: 14px;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.32px;
  margin-top: 4px;
`; */

interface MyProfileProps {
  name: string;
  job: string;
  profileImgUrl: string;
  interestFields: string[];
  preferType: string;
  bannerImgUrl: string;
}

const jobOptions = [
  '대학생(휴학생)',
  '직장인',
  '이직/취업 준비생',
  '성인',
  '기타',
];

const jobMap: { [key: string]: string } = {
  STUDENT: '대학생(휴학생)',
  ADULT: '성인',
  EMPLOYEE: '직장인',
  JOB_SEEKER: '이직/취업 준비생',
  OTHER: '기타',
};

const categoryMap: { [key: string]: string } = {
  APP_DEVELOPMENT: '앱개발',
  WEB_DEVELOPMENT: '웹개발',
  PROGRAMMING_LANGUAGE: '컴퓨터언어',
  DEEP_LEARNING: '딥러닝',
  STATISTICS: '통계',
  DATA_ANALYSIS: '데이터분석',
  UI_UX: 'UX/UI',
  PLANNING: '기획',
  BUSINESS_PRODUCTIVITY: '업무생산성',
  FOREIGN_LANGUAGE: '외국어',
  CAREER: '취업',
};

const PreferTypeToSliderValue = (preferType: string): number => {
  if (preferType === 'TEXT') return 0;
  if (preferType === 'VIDEO') return 100;
  return 50; // NO_PREFERENCE
};

/* const PreferTypeFromSlider = (value: number): string => {
  if (value <= 40) return 'TEXT';
  if (value >= 60) return 'VIDEO';
  return 'NO_PREFERENCE';
}; */

const MyProfile = ({
  name,
  job,
  profileImgUrl,
  interestFields,
  preferType,
  bannerImgUrl,
}: MyProfileProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isModified, setIsModified] = useState(false);
  const [nicknameError, setNicknameError] = useState('');

  // 부모로부터 받은 데이터를 디폴트 값으로 설정
  const [originalProfileData, setOriginalProfileData] = useState({
    nickname: name,
    job: jobMap[job],
    profileImage: profileImgUrl || Guest,
    bannerImage: bannerImgUrl || '',
    preferredMedia: PreferTypeToSliderValue(preferType),
    selectedCategories: interestFields.map((field) => categoryMap[field]),
  });

  const [profileData, setProfileData] = useState(originalProfileData);

  useEffect(() => {
    const isChanged =
      profileData.nickname !== originalProfileData.nickname ||
      profileData.job !== originalProfileData.job ||
      profileData.selectedCategories.join(',') !==
        originalProfileData.selectedCategories.join(',') ||
      profileData.preferredMedia !== originalProfileData.preferredMedia ||
      profileData.profileImage !== originalProfileData.profileImage ||
      profileData.bannerImage !== originalProfileData.bannerImage;

    setIsModified(isChanged);
  }, [profileData, originalProfileData]);

  const [isJobDropdownOpen, setIsJobDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'nickname') {
      if (value.length === 0) {
        setNicknameError('닉네임을 입력해주세요');
      } else if (value.length > 15) {
        setNicknameError('닉네임은 15자 이내로 입력해주세요');
      } else {
        setNicknameError('');
      }
    }

    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 프로필, 배너 이미지 조건 확인
  const [isProfileValid, setIsProfileValid] = useState(false);
  const [isBannerValid, setIsBannerValid] = useState(false);

  // 프로필 체크 조건
  const validateProfileImage = (file: File) => {
    const isValidFormat = ['image/jpeg', 'image/png'].includes(file.type);
    const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB 이하

    return isValidFormat && isValidSize;
  };

  // 배너 체크 조건
  const validateBannerImage = (file: File) => {
    const isValidFormat = ['image/jpeg', 'image/png'].includes(file.type);
    const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB 이하

    return isValidFormat && isValidSize;
  };

  // 프로필 이미지 변경 api 연결
  const handleProfileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!validateProfileImage(file)) {
      alert('파일이 조건을 만족하지 않습니다');
      return;
    }

    setIsProfileValid(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('로그인이 필요합니다.');
        return;
      }

      const response = await axios.post(
        'https://onboarding.p-e.kr/image/upload',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      console.log('이미지 업로드 성공:', response.data);

      const imgUrl = response.data.result;

      if (imgUrl) {
        setProfileData((prev) => ({ ...prev, profileImage: imgUrl }));
      }
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
    }
  };

  // 배너 이미지 변경 api 연결
  const handleBannerUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!validateBannerImage(file)) {
      alert('파일이 조건을 만족하지 않습니다');
      return;
    }

    setIsBannerValid(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('로그인이 필요합니다.');
        return;
      }

      const response = await axios.post(
        'https://onboarding.p-e.kr/image/upload',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      console.log('배너 업로드 성공:', response.data);

      const imgUrl = response.data.result;

      if (imgUrl) {
        setProfileData((prev) => ({ ...prev, bannerImage: imgUrl }));
      }
    } catch (error) {
      console.error('배너 업로드 실패:', error);
    }
  };

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

  // 직업 선택
  const handleJobSelect = (job: string) => {
    setProfileData((prev) => ({
      ...prev,
      job,
    }));
    setIsJobDropdownOpen(false);
  };

  // 카테고리 변경
  const handleCategoryChange = (newCategories: string[]) => {
    setProfileData((prev) => ({
      ...prev,
      selectedCategories: newCategories, // 관심분야 업데이트
    }));
  };

  // 매체 선호도 변경
  const handleMediaPreferenceChange = (value: number) => {
    setProfileData((prev) => ({
      ...prev,
      preferredMedia: value,
    }));
  };

  // 수정 모드
  const handleEdit = () => {
    setOriginalProfileData(profileData); // 초기 데이터 저장
    // setProfileData((prev) => ({ ...prev, nickname: '', job: '' })); // 닉네임 초기화
    setIsEditing(true);
  };

  // 저장 버튼 눌렀을 때 수정 사항 반영하는 api 연결
  const handleSave = async () => {
    if (!nicknameError && profileData.nickname.length > 0) {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          console.error('로그인이 필요합니다.');
          return;
        }

        const jobKey = Object.keys(jobMap).find(
          (key) => jobMap[key] === profileData.job,
        );
        const interestFields = profileData.selectedCategories
          .map((category) =>
            Object.keys(categoryMap).find(
              (key) => categoryMap[key] === category,
            ),
          )
          .filter(Boolean);

        const preferType =
          profileData.preferredMedia < 40
            ? 'TEXT'
            : profileData.preferredMedia > 60
              ? 'VIDEO'
              : 'NO_PREFERENCE';

        const payload = {
          name: profileData.nickname,
          job: jobKey,
          profileImgUrl: profileData.profileImage,
          bannerImgUrl: profileData.bannerImage,
          interestFields: interestFields, // 변환된 관심분야 리스트
          preferType: preferType,
        };

        console.log('전송 데이터:', payload);

        const response = await axios.put(
          'https://onboarding.p-e.kr/user',
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          },
        );
        console.log('업데이트 성공:', response.data);

        if (response.data.isSuccess) {
          setProfileData((prev) => ({
            ...prev,
            profileImage:
              response.data.result.profileImgUrl || prev.profileImage, // 서버 응답이 없으면 기존 값 유지
            bannerImage: response.data.result.bannerImgUrl || prev.bannerImage, // 배너 이미지도 마찬가지
          }));

          setOriginalProfileData((prev) => ({
            ...prev,
            profileImage:
              response.data.result.profileImgUrl || prev.profileImage,
            bannerImage: response.data.result.bannerImgUrl || prev.bannerImage,
          }));

          setIsEditing(false);
        } else {
          console.error('업데이트 실패: ', response.data.message);
        }
      } catch (error) {
        console.error('업데이트 실패:', error);
      }
    }
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
            <SetButton
              primary
              onClick={handleSave}
              disabled={!isModified || nicknameError !== ''}
            >
              저장
            </SetButton>
          </ButtonContainer>
        )}
      </SectionHeader>

      <InfoGrid>
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
          {isEditing && (
            <ChangeContainerImage>
              <ChangeButton>
                변경
                <input
                  type="file"
                  accept="image/jpeg, image/png"
                  style={{ display: 'none' }}
                  onChange={handleProfileUpload}
                />
              </ChangeButton>
              <CheckList>
                <span style={{ color: isProfileValid ? '#165BFA' : '#959ca4' }}>
                  <Image
                    src={isProfileValid ? CheckIconB : CheckIcon}
                    alt="check"
                  />{' '}
                  png, jpg, jpeg의 확장자
                </span>
                <span style={{ color: isProfileValid ? '#165BFA' : '#959ca4' }}>
                  <Image
                    src={isProfileValid ? CheckIconB : CheckIcon}
                    alt="check"
                  />{' '}
                  5MB 이하의 이미지
                </span>
              </CheckList>
            </ChangeContainerImage>
          )}
        </ProfileContainer>

        <InfoLabel>배너</InfoLabel>
        <BannerContainer>
          <Banner background={profileData.bannerImage} isEditing={isEditing} />
          {isEditing && (
            <ChangeContainerBanner>
              <ChangeButton>
                변경
                <input
                  type="file"
                  accept="image/jpeg, image/png"
                  style={{ display: 'none' }}
                  onChange={handleBannerUpload}
                />
              </ChangeButton>
              <CheckList>
                <span style={{ color: isBannerValid ? '#165BFA' : '#959ca4' }}>
                  <Image
                    src={isBannerValid ? CheckIconB : CheckIcon}
                    alt="check"
                  />{' '}
                  png, jpg, jpeg의 확장자
                </span>
                <span style={{ color: isBannerValid ? '#165BFA' : '#959ca4' }}>
                  <Image
                    src={isBannerValid ? CheckIconB : CheckIcon}
                    alt="check"
                  />{' '}
                  5MB 이하의 이미지
                </span>
                <span style={{ color: isBannerValid ? '#165BFA' : '#959ca4' }}>
                  <Image
                    src={isBannerValid ? CheckIconB : CheckIcon}
                    alt="check"
                  />{' '}
                  6:1 비율의 이미지
                </span>
              </CheckList>
            </ChangeContainerBanner>
          )}
        </BannerContainer>

        <InfoLabel>닉네임</InfoLabel>
        {isEditing ? (
          <Input
            type="text"
            name="nickname"
            value={profileData.nickname}
            onChange={handleInputChange}
            placeholder={originalProfileData.nickname}
            hasError={nicknameError !== ''}
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
            <span
              style={{ color: profileData.job === '' ? '#AFB8C1' : '#1f1f1f' }}
            >
              {profileData.job || originalProfileData.job}
            </span>
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

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
// import TopLogo from '../../components/landingHeader';
import Guest from '../../assets/Guest.svg';
import EditIcon from '../../assets/editIcon.svg';
import EditIconHover from '../../assets/editIconhover.svg';
import LeftIcon from '../../assets/leftIcon.svg';
import LeftIconDisabled from '../../assets/leftIconDisabled.svg';
import DownIcon from '../../assets/downIcon.svg';
import UpIcon from '../../assets/upIcon.svg';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 0;
`;

const ProfileContainer = styled.div`
  position: relative;
  margin-top: -5px;
  margin-bottom: 50px;
`;

const PencilButton = styled.div`
  position: absolute;
  right: 18px;
  bottom: -4px;
  cursor: pointer;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 25px;
  font-weight: 600;
  line-height: 48px; /* 150% */
  letter-spacing: -0.64px;
  margin-bottom: 25px;
`;

const Label = styled.label`
  width: 320px;
  text-align: left;
  font-size: 12px;
  font-weight: 400;
  line-height: 24px; /* 150% */
  letter-spacing: -0.32px;
  margin-bottom: 3px;
  color: #181818;
`;

const JobLabel = styled(Label)<{ focused: boolean }>`
  width: 320px;
  text-align: left;
  font-size: 12px;
  font-weight: 400;
  line-height: 24px; /* 150% */
  letter-spacing: -0.32px;
  margin-bottom: 3px;
  text-shadow: ${(props) =>
    props.focused
      ? '1.806px 1.806px 1.806px 0px rgba(94, 82, 255, 0.30)'
      : 'none'};
  color: #181818;
`;

const InputBox = styled.input<{ valid: boolean | null; focused: boolean }>`
  width: 320px;
  height: 45px;
  padding: 10px 18px;
  border: 1px solid
    ${(props) =>
      props.valid === false
        ? '#EC2D30'
        : props.focused
          ? '#5E52FF'
          : '#181818'};
  box-shadow: ${(props) =>
    props.focused && props.valid !== false
      ? '1.806px 1.806px 1.806px 0px rgba(94, 82, 255, 0.30), -1.806px -1.806px 1.806px 0px rgba(94, 82, 255, 0.30)'
      : 'none'};
  border-radius: 6px;
  font-size: 14px;
  margin-bottom: 18px;
  outline: none;
  color: ${(props) => (props.valid === false ? '#EC2D30' : '#181818')};

  &::placeholder {
    color: #afb8c1; /* 원하는 색상 */
  }
`;

const Dropdown = styled.div<{ focused: boolean }>`
  width: 320px;
  height: 45px;
  padding: 10px 18px;
  border: 1px solid ${(props) => (props.focused ? '#5e52ff' : '#181818')};
  box-shadow: ${(props) =>
    props.focused
      ? '1.806px 1.806px 1.806px 0px rgba(94, 82, 255, 0.30), -1.806px -1.806px 1.806px 0px rgba(94, 82, 255, 0.30)'
      : 'none'};
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  margin-bottom: 0px;
`;

const DropdownOptions = styled.ul`
  position: absolute;
  top: 50px;
  left: 0;
  width: 100%;
  height: 225px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: white;
  list-style: none;
  padding: 0;
  margin: 0;
  z-index: 100;
  box-shadow:
    1px 1px 1px 0px rgba(94, 82, 255, 0.3),
    -1px -1px 1px 0px rgba(94, 82, 255, 0.3);
`;

const DropdownOption = styled.li<{ selected: boolean }>`
  padding: 14px 17px;
  cursor: pointer;
  border-radius: 8px;
  color: ${(props) => (props.selected ? '#5E52FF' : '#181818')};
  &:hover {
    background-color: #f2f2f2;
  }
`;

const NavButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 320px;
  margin-top: 20px;
`;

const LeftButton = styled.div`
  cursor: pointer;
  &:hover img {
    content: url(${LeftIcon});
  }
`;

const NextButton = styled.button<{ active: boolean }>`
  width: 68px;
  height: 33px;
  font-size: 13px;
  color: #ffffff;
  background-color: ${(props) => (props.active ? '#5e52ff' : '#dde0e4')};
  border: none;
  border-radius: 100px;
  cursor: ${(props) => (props.active ? 'pointer' : 'not-allowed')};
`;

const LandingPage: React.FC<{
  onNext: (data: { nickname: string; job: string }) => void;
}> = ({ onNext }) => {
  const [isHovered, setIsHovered] = useState(false); // 편집 아이콘 hover
  const [nickname, setNickname] = useState('');
  const [isNicknameFocused, setIsNicknameFocused] = useState(false);
  const [isNicknameValid, setIsNicknameValid] = useState<boolean | null>(null);
  const [job, setJob] = useState('');
  const [isJobDropdownOpen, setIsJobDropdownOpen] = useState(false);

  // 부모에게 전달 할 string 정의
  const jobMapping: { [key: string]: string } = {
    '대학생(휴학생)': 'STUDENT',
    직장인: 'EMPLOYEE',
    '이직/취업 준비생': 'JOB_SEEKER',
    성인: 'ADULT',
    기타: 'OTHER',
  };

  const jobOptions = Object.keys(jobMapping);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsJobDropdownOpen(false); // 외부 클릭 시 드롭다운 닫기
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const validateNickname = () => {
    if (nickname.length === 0) {
      // 닉네임이 비어 있을 경우 기본 상태로 복구
      setIsNicknameValid(null);
    } else if (nickname.length > 0 && nickname.length <= 15) {
      // 닉네임이 유효한 경우
      setIsNicknameValid(true);
    } else {
      // 닉네임이 유효하지 않은 경우
      setIsNicknameValid(false);
    }
  };

  const handleNicknameBlur = () => {
    validateNickname(); // 클릭 시 검증 실행
    setIsNicknameFocused(false); // 활성화 상태 종료
  };

  const handleNicknameKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      validateNickname(); // 엔터 입력 시 검증 실행
      setIsNicknameFocused(false); // 활성화 상태 종료
    }
  };

  const handleJobSelect = (option: string) => {
    setJob(jobMapping[option]);
  };

  const isNextButtonActive = isNicknameValid === true && job !== '';

  return (
    <>
      <Content>
        <Title>닉네임과 직업을 설정해주세요</Title>
        <ProfileContainer>
          <Image src={Guest} alt="Profile" width={120} height={120} />
          <PencilButton
            onMouseEnter={() => setIsHovered(true)} // 마우스가 올려졌을 때
            onMouseLeave={() => setIsHovered(false)} // 마우스가 떠났을 때
          >
            <Image
              src={isHovered ? EditIconHover : EditIcon} // 호버 상태에 따라 아이콘 변경
              alt="Edit Icon"
              width={27}
              height={27}
            />
          </PencilButton>
        </ProfileContainer>
        <Label>닉네임</Label>
        <InputBox
          type="text"
          value={nickname}
          placeholder="닉네임을 입력해주세요"
          onChange={(e) => {
            setNickname(e.target.value);
            setIsNicknameFocused(true); // 입력 중에는 항상 활성화 상태 유지
            if (e.target.value === '') {
              setIsNicknameValid(null); // 입력 필드가 비어 있을 경우 기본 상태로 복구
            }
          }}
          onFocus={() => setIsNicknameFocused(true)} // 입력 필드 클릭 시 활성화
          onBlur={handleNicknameBlur} // 입력이 끝났을 때 검증
          onKeyPress={handleNicknameKeyPress} // 엔터 입력 처리
          valid={isNicknameValid}
          focused={isNicknameFocused}
        />
        <JobLabel focused={isJobDropdownOpen}>직업</JobLabel>
        <Dropdown
          ref={dropdownRef}
          onClick={() => setIsJobDropdownOpen(!isJobDropdownOpen)}
          focused={isJobDropdownOpen}
        >
          <span>
            {jobOptions.find((key) => jobMapping[key] === job) ||
              '직업을 선택해주세요'}
          </span>
          <Image
            src={isJobDropdownOpen ? UpIcon : DownIcon} // 드롭다운 상태에 따라 아이콘 변경
            alt="Dropdown Icon"
            width={20}
            height={20}
          />
          {isJobDropdownOpen && (
            <DropdownOptions>
              {jobOptions.map((option) => (
                <DropdownOption
                  key={option}
                  selected={job === option}
                  onClick={(e) => {
                    e.stopPropagation(); // 드롭다운이 바로 닫히지 않음
                    handleJobSelect(option);
                  }}
                >
                  {option}
                </DropdownOption>
              ))}
            </DropdownOptions>
          )}
        </Dropdown>
        <NavButtons>
          <LeftButton>
            <Image
              src={LeftIconDisabled}
              alt="LeftIconDisabled"
              width={23}
              height={23}
            />
          </LeftButton>
          <NextButton
            active={isNextButtonActive}
            onClick={() => {
              if (isNextButtonActive) {
                onNext({ nickname, job }); // 부모 컴포넌트로 직업 값 전달
              }
            }}
          >
            다음
          </NextButton>
        </NavButtons>
      </Content>
    </>
  );
};

export default LandingPage;

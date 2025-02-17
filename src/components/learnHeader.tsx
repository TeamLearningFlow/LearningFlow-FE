import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import Image from 'next/image';
import LogoDark from '../assets/logo_dark.png';
import Guest from '../assets/Guest.svg';
import UserModal from './modal/userModal';

const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 70px;
  padding: 0 3%;
  background-color: #ffffff;
  border-bottom: 1px solid #dde0e4;

  @media (max-width: 850px) {
    height: 60px;
    padding: 0 5%;
  }
`;

const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
  flex-shrink: 0;
  margin-right: auto;

  cursor: pointer;
`;

const LogoImage = styled(Image)`
  @media (max-width: 850px) {
    width: 150px;
    height: 23px;
  }
`;

const ProfileIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;

  cursor: pointer;
`;

const ProfileImage = styled(Image)`
  @media (max-width: 850px) {
    width: 35px;
    height: 35px;
  }
`;

const ProfileUser = styled.div`
  position: absolute;
  display: flex;
  // width: 100%;
  // width: 30%;
  // justify-content: flex-end;
  margin-right: 10%;
  top: 60px;
  right: 0px;
  margin-top: 7px;

  z-index: 200;

  @media (max-width: 650px) {
    margin-right: 1%;
  }
`;

const Header: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const profileIconRef = useRef<HTMLImageElement | null>(null);

  // 사용자 아이콘 클릭 시 모달 토글
  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  // 모달 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        profileIconRef.current &&
        !profileIconRef.current.contains(event.target as Node) // 프로필 아이콘 클릭 여부 체크
      ) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen]);

  return (
    <HeaderWrapper>
      <LogoWrapper>
        <Link href="/" passHref>
          <LogoImage src={LogoDark} alt="header logo" width={175} height={25} />
        </Link>
      </LogoWrapper>
      <ProfileIcon>
        <ProfileImage
          src={Guest}
          alt="profile"
          width={42}
          height={42}
          onClick={toggleModal}
          ref={profileIconRef}
        />
      </ProfileIcon>
      {isModalOpen && (
        <ProfileUser ref={modalRef}>
          <UserModal />
        </ProfileUser>
      )}
    </HeaderWrapper>
  );
};

export default Header;

import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Icon from '/public/noLiked.svg';
import { useRouter } from 'next/router';

const EmptyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  text-align: center;
  padding: 80px 0;
`;

const EmptyTitle = styled.div`
  color: #323538;
  text-align: center;

  /* Body/xl/SemiBold */
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 36px */
  letter-spacing: -0.48px;
`;

const EmptySubtitle = styled.div`
  color: #959ca4;
  text-align: center;

  /* Body/m-l/regular */
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 30px */
  letter-spacing: -0.4px;
`;

const Button = styled.button`
  display: flex;
  width: 390px;
  height: 58px;
  padding: 18px 126px;
  margin-top: 32px;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 12px;
  background: #5e52ff;
  /* 100 */
  box-shadow: 0.74px 0.74px 1.47px 0px rgba(0, 0, 0, 0.25);

  color: #fff;
  white-space: nowrap;
  text-align: center;
  cursor: pointer;

  /* Body/l/Semibold */
  font-family: Pretendard;
  font-size: 22px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 33px */
  letter-spacing: -0.44px;
`;

const EmptyLiked: React.FC = () => {
  const router = useRouter();

  return (
    <EmptyWrapper>
      <Image src={Icon} alt="icon" width={140} height={140} />
      <EmptyTitle>관심 컬렉션이 비어 있어요</EmptyTitle>
      <EmptySubtitle>
        탐색을 통해 원하는 컬렉션을 저장하고 관리해보세요
      </EmptySubtitle>
      <Button onClick={() => router.push(`/search`)}>탐색하러 가기</Button>
    </EmptyWrapper>
  );
};

export default EmptyLiked;

import React, { useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import LeftIcon from '../../assets/leftIcon.svg';
import Polygon from '../../assets/polygon.svg';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 0;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 25px;
  font-weight: 600;
  line-height: 48px; /* 150% */
  letter-spacing: -0.64px;
`;

const SubTitle = styled.p`
  text-align: center;
  font-size: 13px;
  font-weight: 500;
  line-height: 27px; /* 150% */
  letter-spacing: -0.36px;
  color: #64696e;
  margin-top: -10px;
`;

const SliderContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  gap: 10px;
  width: 400px;
`;

const SliderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
  position: relative;
`;

const TooltipContainer = styled.div<{ position: number }>`
  position: absolute;
  top: -35px;
  left: ${(props) => Math.min(Math.max(props.position, 15), 88)}%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Slider = styled.input<{ value: number }>`
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 5px;
  background: linear-gradient(
    to right,
    #5e52ff ${(props) => props.value}%,
    #5e52ff1a ${(props) => props.value}%
  );
  border-radius: 4px;
  outline: none;
  cursor: pointer;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 17px;
    height: 17px;
    background: #ffffff;
    border: 1.5px solid #5e52ff1a; /* 동그라미 테두리 색상 */
    border-radius: 50%; /* 동그라미 모양 유지 */
    background-size: cover;
    cursor: pointer;
  }
`;

const Tooltip = styled.div<{ position: number }>`
  background: #5e52ff;
  color: #ffffff;
  font-size: 10px;
  font-weight: 400;
  line-height: 19px;
  letter-spacing: -0.2px;
  text-align: center;
  padding: 4px 8px;
  border-radius: 4px;
  white-space: nowrap;
`;

const Label = styled.span`
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: -0.24px;
  color: #1f1f1f;
  text-align: center;
  flex-shrink: 0;
`;

const NavButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 400px;
  margin-top: 100px;
  margin-bottom: 142px;
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

const Page3: React.FC<{
  onPrev: () => void;
  onNext: (preferType: string) => void;
}> = ({ onPrev, onNext }) => {
  const [sliderValue, setSliderValue] = useState(50);

  const getTooltipText = (value: number) => {
    if (value < 40) return '텍스트가 좋아요';
    if (value > 60) return '영상이 좋아요';
    return '상관 없어요';
  };

  // 부모에게 전달 할 선호도 값
  const getPreferType = (value: number): string => {
    if (value < 40) return 'TEXT';
    if (value > 60) return 'VIDEO';
    return 'NO_PREFERENCE';
  };

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSliderValue(Number(event.target.value));
  };

  const handleComplete = () => {
    const preferType = getPreferType(sliderValue);
    onNext(preferType); // 부모에게 선호도 값 전달
  };

  return (
    <Content>
      <Title>00님이 선호하시는 매체 종류를 알려주세요</Title>
      <SubTitle>
        매체 선호도(글/영상)에 따라 어울리는 컬렉션을 추천해드릴게요
      </SubTitle>
      <SliderWrapper>
        <TooltipContainer position={(sliderValue / 100) * 100}>
          <Tooltip>{getTooltipText(sliderValue)}</Tooltip>
          <Image
            src={Polygon}
            alt="polygon"
            width={12}
            height={12}
            style={{ marginTop: '-3px' }}
          />
        </TooltipContainer>
        <SliderContainer>
          <Label>텍스트</Label>
          <Slider
            type="range"
            min="0"
            max="100"
            value={sliderValue}
            onChange={handleSliderChange}
          />
          <Label>영상</Label>
        </SliderContainer>
      </SliderWrapper>
      <NavButtons>
        <LeftButton onClick={onPrev}>
          <Image src={LeftIcon} alt="이전" width={23} height={23} />
        </LeftButton>
        <NextButton active onClick={handleComplete}>
          완료
        </NextButton>
      </NavButtons>
    </Content>
  );
};

export default Page3;
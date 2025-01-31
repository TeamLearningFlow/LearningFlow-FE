import React, { useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import Polygon from '../../assets/polygon.svg';

const SliderContainer = styled.div`
  display: flex;
  align-items: center;
  align-self: flex-start;
  position: relative;
  gap: 10px;
  width: 45%;
`;

const SliderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 55px;
  position: relative;
`;

const TooltipContainer = styled.div<{ position: number }>`
  position: absolute;
  top: -35px;
  left: ${({ position }) =>
    `calc(${Math.min(Math.max(position * (position < 40 ? 0.42 : 0.4) + (position < 40 ? 2 : 0), 6), 92)}%)`};
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

interface PreferSliderProps {
  value: number;
  onChange: (value: number) => void;
}

const PreferSlider: React.FC<PreferSliderProps> = ({ value, onChange }) => {
  const [sliderValue, setSliderValue] = useState(value);

  const getTooltipText = (value: number) => {
    if (value < 40) return '텍스트가 좋아요';
    if (value > 60) return '영상이 좋아요';
    return '상관 없어요';
  };

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value, 10);
    setSliderValue(newValue);
    onChange(newValue); // 부모 컴포넌트에 전달
  };

  return (
    <SliderWrapper>
      <TooltipContainer position={(sliderValue / 100) * 100}>
        <Tooltip>{getTooltipText(sliderValue)}</Tooltip>
        <Image
          src={Polygon}
          alt="polygon"
          width={12}
          height={12}
          style={{ marginTop: '-4px' }}
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
  );
};

export default PreferSlider;

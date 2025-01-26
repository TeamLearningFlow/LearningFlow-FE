import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import CloseIcon from '../assets/close.svg';
import Polygon from '../assets/polygon.svg';

// filters.tsx에 전달
type DropdownProps = {
  onTagChange: (hasTags: boolean) => void;
};

const DropdownContainer = styled.div<{ hasTags: boolean }>`
  position: relative;
  display: inline-block;
  z-index: 10;
`;

const DropdownButton = styled.button<{ isOpen: boolean; hasTags: boolean }>`
  background: #ffffff;
  border: ${(props) =>
    props.hasTags || props.isOpen ? '1px solid #5E52FF' : '1px solid #dde0e4'};
  border-radius: 6px;
  height: 33px;
  width: 87px;
  font-size: 13px;
  font-weight: 500;
  line-height: 21px;
  letter-spacing: -0.28px;
  z-index: 100;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #1f1f1f;

  &:focus {
    outline: none;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  margin-top: 4px;
  background: #ffffff;
  border: 1px solid #dde0e4;
  border-radius: 8px;
  padding: 16px;
  width: 350px;
  height: 180px;
  text-align: center;
`;

const SliderContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  gap: 8px;
`;

const SliderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 70px;
  position: relative;
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
  line-height: 18px;
  letter-spacing: -0.2px;
  padding: 4px 8px;
  border-radius: 4px;
  white-space: nowrap;
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

const Text = styled.div`
  justify-content: flex-start;
  margin-top: 4px;
  font-size: 10.5px;
  font-weight: 400;
  line-height: 15px;
  letter-spacing: -0.2px;
  color: #959ca4;
  text-align: left;
`;

const Tag = styled.div`
  background: #f5f5ff;
  color: #5e52ff;
  height: 33px;
  width: auto;
  border-radius: 100px;
  padding: 0 14px;
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  font-weight: 500;
  line-height: 21px;
  letter-spacing: -0.28px;
  flex-shrink: 0;

  & > button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 14px;
    align-items: center;
    justify-content: center;
  }
`;

const SelectedTag = styled.div`
  margin-top: 9px;
  display: flex;
  gap: 9px;
  flex-wrap: wrap;
`;

const PreferenceButton: React.FC<DropdownProps> = ({ onTagChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [sliderValue, setSliderValue] = useState(50);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const getTooltipText = (value: number) => {
    if (value < 40) return '아티클이 좋아요';
    if (value > 60) return '영상이 좋아요';
    return '상관 없어요';
  };

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    setSliderValue(value);

    if (value < 40) setSelectedTag('아티클이 좋아요');
    else if (value > 60) setSelectedTag('영상이 좋아요');
    else setSelectedTag('상관 없어요');
  };

  const removeTag = () => {
    setSelectedTag(null);
    setSliderValue(50);
  };

  useEffect(() => {
    onTagChange(!!selectedTag);
  }, [selectedTag, onTagChange]);

  return (
    <DropdownContainer hasTags={!!selectedTag}>
      <DropdownButton
        isOpen={isOpen}
        hasTags={!!selectedTag}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        매체 선호도
      </DropdownButton>
      {isOpen && (
        <DropdownMenu>
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
              <Label>아티클</Label>
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
          <Text>선호하시는 매체 유형에 맞춰 컬렉션을 추천해드릴게요</Text>
        </DropdownMenu>
      )}
      {selectedTag && (
        <SelectedTag>
          <Tag>
            {selectedTag}
            <button onClick={removeTag}>
              <Image src={CloseIcon} alt="close" width={14} height={14} />
            </button>
          </Tag>
        </SelectedTag>
      )}
    </DropdownContainer>
  );
};

export default PreferenceButton;
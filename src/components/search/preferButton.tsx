import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Polygon from '../../assets/polygon.svg';
import { useRouter } from 'next/router';
import { mediaOptions } from './filterOptions';

// filters.tsx에 전달
type DropdownProps = {
  onTagChange: (tags: string[]) => void;
  selectedTags: string[];
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
  color: ${(props) => (props.hasTags || props.isOpen ? '#1f1f1f' : '#64696e')};

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

  @media (max-width: 850px) {
    left: 0;
    transform: translateX(-17%);
  }

  @media (max-width: 480px) {
    left: 0;
    transform: translateX(-56%);
  }
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

const Tooltip = styled.div`
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
  left: ${(props) => {
    const minPosition = 15; // 왼쪽 끝 보정값
    const maxPosition = 95; // 오른쪽 끝 보정값
    const adjustedPosition = props.position * 0.8 + 9; // 보정 로직 추가
    return Math.min(Math.max(adjustedPosition, minPosition), maxPosition);
  }}%;
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

const PreferButton: React.FC<DropdownProps> = ({
  onTagChange,
  selectedTags,
}) => {
  const router = useRouter();
  const { query } = router;

  const [isOpen, setIsOpen] = React.useState(false);
  const [sliderValue, setSliderValue] = React.useState(50);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const getTooltipText = (value: number) => {
    if (value <= 20) return mediaOptions[0].label;
    if (value <= 40) return mediaOptions[1].label;
    if (value <= 60) return mediaOptions[2].label;
    if (value <= 80) return mediaOptions[3].label;
    return mediaOptions[4].label;
  };

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    setSliderValue(value);

    let selectedTag = null;
    if (value <= 20) selectedTag = mediaOptions[0].label;
    else if (value <= 40) selectedTag = mediaOptions[1].label;
    else if (value <= 60) selectedTag = mediaOptions[2].label;
    else if (value <= 80) selectedTag = mediaOptions[3].label;
    else selectedTag = mediaOptions[4].label;

    onTagChange(selectedTag ? [selectedTag] : []); // 부모 상태 업데이트

    const foundOption = mediaOptions.find(
      (option) => option.label === selectedTag,
    );
    const selectedOptionId = foundOption ? foundOption.id : undefined;

    pushQuery(selectedOptionId);
  };

  const pushQuery = (queryValue: number | undefined) => {
    router.push({
      pathname: '/search',
      query: {
        ...query,
        preferMediaType: queryValue ? queryValue : undefined,
      },
    });
  };

  // 외부 클릭 시 드롭다운 클로즈
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <DropdownContainer hasTags={selectedTags.length > 0} ref={dropdownRef}>
      <DropdownButton
        isOpen={isOpen}
        hasTags={selectedTags.length > 0}
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
          <Text>선호하시는 매체 유형에 맞춰 컬렉션을 추천해드릴게요</Text>
        </DropdownMenu>
      )}
    </DropdownContainer>
  );
};

export default PreferButton;

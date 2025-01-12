import React from 'react';
import styled from 'styled-components';

const DividerWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 12px 0;
`;

const Line = styled.div`
  height: 1px;
  background-color: rgba(187, 192, 197, 1);
  width: 226.5px;
`;

const Text = styled.span`
  margin: 0 24px;
  color: rgba(187, 192, 197, 1);
  text-align: center;
  font-feature-settings:
    'liga' off,
    'clig' off;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 111.111% */
  letter-spacing: -0.36px;
  white-space: nowrap;
`;

const Divider: React.FC = () => {
  return (
    <DividerWrapper>
      <Line />
      <Text>또는</Text>
      <Line />
    </DividerWrapper>
  );
};

export default Divider;

import React from 'react';
import styled from 'styled-components';

const GoogleLogo: React.FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 30 30"
      fill="none"
      style={{ width: '24px', height: '24px', marginRight: '10px' }}
    >
      <mask
        id="mask0_1083_18144"
        style={{ maskType: 'luminance' }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="25"
        height="25"
      >
        <path d="M24.5 0.444946H0.5V24.4449H24.5V0.444946Z" fill="white" />
      </mask>
      <g mask="url(#mask0_1083_18144)">
        <path
          d="M24.0161 12.7229C24.0161 11.872 23.9398 11.0538 23.7979 10.2683H12.4961V14.9101H18.9543C18.6761 16.4101 17.8307 17.6811 16.5598 18.532V21.5429H20.4379C22.707 19.4538 24.0161 16.3774 24.0161 12.7229Z"
          fill="#4285F4"
        />
        <path
          d="M12.5069 24.4435C15.7469 24.4435 18.4632 23.3689 20.4486 21.5363L16.5704 18.5253C15.496 19.2453 14.1214 19.6708 12.5069 19.6708C9.38136 19.6708 6.73596 17.5598 5.79228 14.7235H1.7832V17.8326C3.7578 21.7544 7.81596 24.4435 12.5069 24.4435Z"
          fill="#34A853"
        />
        <path
          d="M5.7854 14.7213C5.5454 14.0013 5.40908 13.2322 5.40908 12.4413C5.40908 11.6504 5.5454 10.8813 5.7854 10.1613V7.05225H1.77632C0.963679 8.67225 0.5 10.505 0.5 12.4413C0.5 14.3776 0.963679 16.2104 1.77632 17.8304L5.7854 14.7213Z"
          fill="#FBBC04"
        />
        <path
          d="M12.5069 5.21771C14.2686 5.21771 15.8504 5.82311 17.0941 7.01219L20.536 3.57035C18.4578 1.63403 15.7414 0.444946 12.5069 0.444946C7.81596 0.444946 3.7578 3.13403 1.7832 7.05587L5.79228 10.1649C6.73596 7.32863 9.38136 5.21771 12.5069 5.21771Z"
          fill="#E94235"
        />
      </g>
    </svg>
  );
};

const Button = styled.button`
  display: flex;
  height: 50px;
  padding: 18px 8px;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: rgba(236, 238, 240, 1);
  border: none;
  border-radius: 6.962px;
  font-family: Roboto;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  color: rgba(50, 53, 56, 1);
  cursor: pointer;
`;

const GoogleAuthButton = ({ text }: { text: string }) => {
  return (
    <Button>
      <GoogleLogo />
      {text}
    </Button>
  );
};

export default GoogleAuthButton;

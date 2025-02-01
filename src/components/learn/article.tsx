import React from 'react';
import styled from 'styled-components';

const ArticleWrapper = styled.div`
  width: 63vw;
  height: 552px;
  border-radius: 11.483px;
  background: #b5b5b5;
  box-shadow: 1.077px 1.435px 6.459px 0px rgba(0, 0, 0, 0.1);
  // margin-bottom: 20px;

  @media (max-width: 850px) {
    height: 450px;
  }

  @media (max-width: 560px) {
    height: 300px;
  }
`;

const Article: React.FC = () => {
  return (
    <>
      <ArticleWrapper></ArticleWrapper>
    </>
  );
};

export default Article;

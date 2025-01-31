import styled from 'styled-components';

const BoardingPassList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 24px;
  width: 100%;
  padding: 32px 120px 61px 120px;

  /* 반응형 설정 */
  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    padding: 32px 15px 61px 15px;
    place-items: center;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr); /* 모바일 화면 */
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(1, 1fr); /* 폰 화면 */
    gap: 30px;
    place-items: center;
  }
`;

export default BoardingPassList;

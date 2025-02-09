import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import collectionInfoIMG from '../../assets/Skeleton_CollectionInfoRight.svg';
import collectionInfoImgBottom from '../../assets/Skeleton_CollectionInfoBottom.svg';

const Skeleton_CollectionInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-top: 20px;

  text-overflow: ellipsis;
  overflow: hidden;
`;

const SkeletonCollectionTicket = styled.div`
  display: flex;
  position: relative;

  align-items: center;
  //   width: 80vw;
  width: 90vw;
  //   margin: 2% 9% 1% 9.5%;
  margin: 2% 6% 1% 6.5%;
  justify-content: center;

  white-space: nowrap;

  @media (max-width: 850px) {
    width: 82vw;
    height: 150px;
  }

  @media (max-width: 560px) {
    width: 84vw;
    // height: 80px;
  }
`;

const SkeletonLeftIMGBox = styled.div`
  display: flex;
  padding-left: 1%;
  //   width: 30%;
  width: 33%;

  @media (max-width: 850px) {
    height: 150px;
  }
  //   @media (max-width: 560px) {
  //     height: 80px;
  //   }
`;

const SkeletonLeftIMG = styled.div`
  display: flex;
  width: 100%;
  height: 252px;
  border-radius: 20px;
  background-color: rgba(0, 0, 0, 0.08);
  border: 0.5px solid rgba(221, 224, 228, 1);

  @media (max-width: 850px) {
    height: 150px;
  }
  //   @media (max-width: 560px) {
  //     height: 100px;
  //   }
`;

const SkeletonRightIMGBox = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  height: 252px;
`;

const SkeletonRightIMG = styled(Image)`
  display: flex;

  // width: 54vw;
  width: 100%;
  object-fit: contain;
  height: 252px;

  @media (max-width: 850px) {
    height: 150px;
  }

  //   @media (max-width: 560px) {
  //     height: 100px;
  //   }
`;

const SkeletonRightBottomIMG = styled(Image)`
  display: flex;
  width: 67%;
  object-fit: cover;
  z-index: 100;
  position: absolute;
  border-radius: 0 0 20px 20px;

  margin-top: 192px;
`;

const Skeleton_CollectionUpperDescription = styled.div`
  display: flex;
  position: absolute;
  margin-top: -200px;
  margin-left: 32.5vw;

  @media (max-width: 850px) {
    margin-top: -135px;
    margin-left: 29vw;
  }

  @media (max-width: 560px) {
    margin-top: -140px;
    margin-left: 31vw;
  }
`;

const SkeletonKeywordBox = styled.div`
  position: absolute;
  width: 500px;

  margin-left: 18px;

  @media (max-width: 850px) {
    margin-left: 14px;
    width: 400px;
  }

  @media (max-width: 560px) {
    margin-left: 7px;
    width: 200px;
  }
`;

const SkeletonInterest = styled.div`
  width: 100px;
  //   width: 64px;
  //   height: 24px;
  display: inline;
  //   padding: 7.339px 18.349px;
  padding: 6px 16px;
  margin-right: 10px;

  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.08);
  font-size: 7px;
  font-weight: 600;
  line-height: 23.996px;
  color: transparent;

  @media (max-width: 850px) {
    width: 120px;
    font-size: 6px;
    padding: 2px 7px;
    margin-right: 5px;
  }

  @media (max-width: 560px) {
    width: 80px;
    font-size: 4px;
    padding: 4px 6px;
    margin-right: 3px;
  }
`;

const SkeletonKeyword = styled.div`
  width: 150px;
  //   width: 64px;
  //   height: 24px;
  display: inline;
  //   padding: 7.339px 18.349px;
  padding: 6px 16px;
  margin-right: 10px;

  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.08);

  font-size: 7px;
  font-weight: 600;
  line-height: 23.996px;
  color: transparent;

  @media (max-width: 850px) {
    width: 120px;
    font-size: 6px;
    padding: 2px 7px;
    margin-right: 5px;
  }

  @media (max-width: 560px) {
    width: 80px;
    font-size: 4px;
    padding: 4px 6px;
    margin-right: 3px;
  }
`;

const SkeletonTitle = styled.div`
  position: absolute;
  font-size: 5px;
  font-weight: 700;
  line-height: 30px;
  letter-spacing: -0.48px;
  color: transparent;

  margin-top: 45px;
  margin-left: 18px;
  width: 150px;
  background-color: rgba(0, 0, 0, 0.08);
  border-radius: 4px;

  @media (max-width: 850px) {
    font-size: 10px;
    line-height: 17px;
    margin-top: 30px;
    margin-left: 14px;
    width: 100px;
  }

  @media (max-width: 560px) {
    font-size: 10px;
    line-height: 16px;
    margin-top: 34px;
    margin-left: 7px;
    width: 70px;
  }
`;

const SkeletonMiddle = styled.div`
  position: absolute;
  color: #7c8389;
  font-size: 5px;
  font-weight: 600;
  line-height: 30px;
  color: transparent;

  margin-left: 18px;
  margin-top: 85px;
  width: 327.273px;
  background-color: rgba(0, 0, 0, 0.08);
  border-radius: 4px;

  @media (max-width: 850px) {
    font-size: 10px;
    line-height: 15px;
    margin-top: 53px;
    margin-left: 14px;
    width: 250px;
  }

  @media (max-width: 560px) {
    font-size: 7px;
    line-height: 17px;
    margin-top: 56.5px;
    margin-left: 7px;
    width: 150px;
  }

  @media (max-width: 400px) {
    font-size: 7px;
    line-height: 17px;
    margin-top: 56.5px;
    margin-left: 7px;
    width: 110px;
  }
`;

const SkeletonAuthor = styled.div`
  position: absolute;
  color: #7c8389;
  font-size: 5px;
  font-weight: 600;
  line-height: 30px;
  color: transparent;

  margin-left: 18px;
  margin-top: 125px;
  width: 125px;
  background-color: rgba(0, 0, 0, 0.08);
  border-radius: 4px;

  @media (max-width: 850px) {
    font-size: 10px;
    line-height: 17px;
    margin-top: 76px;
    margin-left: 14px;
    width: 70px;
  }

  @media (max-width: 560px) {
    font-size: 10px;
    line-height: 17px;
    margin-top: 80px;
    margin-left: 7px;
    width: 50px;
  }
`;

const Skeleton_CollectionInfo: React.FC = () => {
  return (
    <Skeleton_CollectionInfoWrapper>
      <SkeletonCollectionTicket>
        <SkeletonLeftIMGBox>
          <SkeletonLeftIMG></SkeletonLeftIMG>
        </SkeletonLeftIMGBox>
        <SkeletonRightIMGBox>
          <SkeletonRightIMG src={collectionInfoIMG} alt="이미지" height={252} />
          <SkeletonRightBottomIMG
            src={collectionInfoImgBottom}
            alt="이미지"
            height={60}
          />
        </SkeletonRightIMGBox>
      </SkeletonCollectionTicket>
      <Skeleton_CollectionUpperDescription>
        <SkeletonKeywordBox>
          <SkeletonInterest>관심분야</SkeletonInterest>
          <SkeletonKeyword>키워드드</SkeletonKeyword>
          <SkeletonKeyword>키워드드</SkeletonKeyword>
        </SkeletonKeywordBox>
        <SkeletonTitle>제목제목</SkeletonTitle>
        <SkeletonMiddle>빈칸빈칸빈칸빈칸빈칸빈칸빈칸빈칸칸</SkeletonMiddle>
        <SkeletonAuthor>제작자제작</SkeletonAuthor>
      </Skeleton_CollectionUpperDescription>
    </Skeleton_CollectionInfoWrapper>
  );
};

export default Skeleton_CollectionInfo;

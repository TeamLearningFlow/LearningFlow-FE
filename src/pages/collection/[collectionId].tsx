import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import styled from "styled-components";
import Header from "../../components/searchHeader";
import CategoryList from "../../components/search/categoryList";
import BoardingPass from "../../components/search/boardingPass";
import Filters from "../../components/search/filters";
import Pagination from "@/components/search/pagination";
import BoardingPassList from "@/components/search/boardingPassList";
import TitleBar from "../../components/learn/learnTitleBar";
import CollectionInfo from "../../components/collection/collectionInfo";
import CollectionList from "../../components/collection/collectionList";
import SkeletonCollectionList from "@/components/skeleton/skeleton_classList_M";

const PageWrapper = styled.div`
  background-color: #fafafc;
  min-height: 100vh;
  position: relative;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

interface CollectionData {
  id: number;
  interestField: string;
  title: string;
  creator: string;
  keywords: string[];
  difficulties: number[];
  amount: number;
  runtime: number;
  textCount: number;
  videoCount: number;
  resource: {
    episodeName: string;
    url: string;
    resourceSource: string;
    episodeNumber: number;
  }[];
  bookmarkCount: number;
  bookmarked: boolean;
}

export default function CollectionPage() {
  const router = useRouter();
  const { collectionId } = router.query;
  const [collection, setCollection] = useState<CollectionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchActive, setSearchActive] = useState(false);

  // 헤더 상태 업데이트 전달
  const handleSearchStateChange = (active: boolean) => {
    setSearchActive(active);
  };

  const dummyData: CollectionData = {
    id: 1,
    interestField: "WEB_DEVELOPMENT",
    title: "처음 배우는 스프링 부트",
    creator: "김개발",
    keywords: ["스프링부트", "웹개발"],
    difficulties: [1, 2],
    amount: 3,
    runtime: 1,
    textCount: 1,
    videoCount: 2,
    resource: [
      {
        episodeName: "스프링 부트란?",
        url: "https://youtube.com/1",
        resourceSource: "youtube",
        episodeNumber: 1,
      },
      {
        episodeName: "프로젝트 설정하기",
        url: "https://youtube.com/2",
        resourceSource: "youtube",
        episodeNumber: 2,
      },
      {
        episodeName: "첫 애플리케이션 만들기",
        url: "https://naver.com/3",
        resourceSource: "naverBlog",
        episodeNumber: 3,
      },
    ],
    bookmarkCount: 1,
    bookmarked: false,
  };

  useEffect(() => {
    if (!collectionId) {
      setError("Collection ID가 없습니다.");
      setLoading(false);
      return;
    }
  
    const fetchCollection = async () => {
      try {
        const response = await axios.get(`/collections/${collectionId}`);
      
        if (response.data.isSuccess) {
          setCollection(response.data.result);
          console.log("데이터 로드 성공:", response.data.result);
        } else {
          setCollection(dummyData);
          console.log("데이터 로드 실패: 더미 데이터를 사용합니다.");
        }
      } catch (err: any) {
        console.log("Error fetching collection:", err);
      
        if (err.response && err.response.status === 404) {
          console.log("404 에러: 해당 컬렉션을 찾을 수 없습니다.");
          setCollection(dummyData); // 404일 경우 더미 데이터 사용 가능
        } else {
          console.log("서버 오류로 데이터를 불러올 수 없습니다.");
          setCollection(null); // 다른 오류일 경우 데이터 초기화
        }
      } finally {
        setLoading(false);
      }
      
    };
  
    fetchCollection();
  }, [collectionId]);


  return (
    <PageWrapper>
      <Header onSearchStateChange={handleSearchStateChange} />
      {loading ? (
        <>
          <TitleBar />
          <ContentWrapper>
            <SkeletonCollectionList />
          </ContentWrapper>
        </>
      ) : searchActive ? (
        <div>
          <CategoryList />
          <Filters />
          <BoardingPassList>
            {Array.from({ length: 8 }).map((_, index) => (
              <BoardingPass key={index} showHoverCollection={true} />
            ))}
          </BoardingPassList>
          <Pagination />
        </div>
      ) : (
        <>
          <TitleBar />
          {collection && <CollectionInfo data={collection} />}
          <ContentWrapper>
          {collection && <CollectionList classes={collection.resource} />}
          </ContentWrapper>
        </>
      )}
    </PageWrapper>
  );
}

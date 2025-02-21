// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import axios from 'axios';
// import styled from 'styled-components';
// import Header from '../../components/header';
// import TitleBar from '../../components/collection/collectionTitleBar';
// import CollectionInfo from '../../components/collection/collectionInfo';
// import CollectionList from '../../components/collection/collectionList';
// import SkeletonCollectionList from '../../components/skeleton/skeleton_classList_M';
// import SkeletonCollectionInfo from '../../components/skeleton/skeleton_collectionInfo';
// import Footer from '@/components/homeFooter';

// const PageWrapper = styled.div`
//   background-color: #fafafc;
//   min-height: 100vh;
//   // position: relative;
// `;

// const ContentWrapper = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   flex-direction: column;
// `;

// export interface CollectionData {
//   collectionId: number;
//   imageUrl: string;
//   interestField: string;
//   title: string;
//   creator: string;
//   keywords: string[];
//   difficulties: number[];
//   amount: number;
//   runtime: number;
//   textCount: number;
//   videoCount: number;
//   resource: {
//     episodeId: number;
//     episodeName: string;
//     url: string;
//     resourceSource: 'youtube' | 'naverBlog' | 'tistory' | 'velog';
//     episodeNumber: number;
//     today: boolean;
//     progress: number; // 테스트용
//   }[];
//   likesCount: number;
//   progressRatePercentage: number;
//   progressRatio: string;
//   learningStatus: 'BEFORE' | 'IN_PROGRESS' | 'COMPLETED';
//   startDate: string;
//   completedDate: string;
//   liked: boolean;
// }

// export default function CollectionPage() {
//   const [isClient, setIsClient] = useState(false);
//   const router = useRouter();
//   const { collectionId } = router.query;
//   const [collection, setCollection] = useState<CollectionData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   useEffect(() => {
//     if (!collectionId) {
//       setError('Collection ID가 없습니다.');
//       setLoading(false);
//       return;
//     }

//     const fetchCollection = async () => {
//       setLoading(true);

//       try {
//         const response = await axios.get(
//           `https://onboarding.p-e.kr/collections/${collectionId}`,
//         );

//         if (response.data.isSuccess) {
//           setCollection(response.data.result);
//           console.log('데이터 로드 성공:', response.data.result);
//         } else {
//           console.log('데이터 로드 실패: 더미 데이터를 사용합니다.');
//         }
//       } catch (err: unknown) {
//         if (axios.isAxiosError(err)) {
//           console.log('Error fetching collection:', err.message);

//           if (err.response?.status === 404) {
//             console.log('404 에러: 해당 컬렉션을 찾을 수 없습니다.');
//             // setCollection(dummyData);
//           } else {
//             console.log('서버 오류로 데이터를 불러올 수 없습니다.');
//             setCollection(null);
//           }
//         } else if (err instanceof Error) {
//           console.log(err.message);
//         } else {
//           console.log(err);
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCollection();
//   }, [collectionId]);

//   const handleProgressUpdate = (
//     updatedEpisodes: {
//       episodeNumber: number;
//       progress: number;
//       completed: boolean;
//     }[],
//   ) => {
//     if (!collection) return;
//     // resource에서 episodeId가 mergedResource의 episodeNumber와 일치하면 업데이트
//     const updatedResource = collection.resource.map((ep) => {
//       const matching = updatedEpisodes.find(
//         (upd) => upd.episodeNumber === ep.episodeId, // episodeNumber와 episodeId 매칭
//       );
//       if (matching) {
//         return {
//           ...ep,
//           progress: matching.progress,
//           completed: matching.completed,
//         };
//       }
//       return ep;
//     });
//     setCollection({ ...collection, resource: updatedResource });
//   };

//   // ESLint 오류 방지용
//   useEffect(() => {
//     console.log('현재 에러 상태:', error);
//   }, [error]);

//   if (!isClient) {
//     return null;
//   }

//   return (
//     <PageWrapper>
//       <Header />
//       {collection && <TitleBar data={collection} />}
//       {loading ? (
//         <>
//           <ContentWrapper>
//             <SkeletonCollectionInfo />
//             <SkeletonCollectionList />
//           </ContentWrapper>
//           <Footer />
//         </>
//       ) : (
//         <>
//           {collection && (
//             <CollectionInfo
//               data={collection}
//               collectionId={collection.collectionId}
//             />
//           )}
//           <ContentWrapper>
//             {collection && (
//               <CollectionList
//                 collection={collection}
//                 onProgressUpdate={handleProgressUpdate}
//               />
//             )}
//           </ContentWrapper>
//         </>
//       )}
//       <Footer />
//     </PageWrapper>
//   );
// }

import React, { useEffect, useState, useRef, useContext } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import styled from 'styled-components';
import NotLoginHeader from '../../components/notLoginHeader';
import Header from '../../components/header';
import TitleBar from '../../components/collection/collectionTitleBar';
import CollectionInfo from '../../components/collection/collectionInfo';
import CollectionList from '../../components/collection/collectionList';
import SkeletonCollectionList from '../../components/skeleton/skeleton_classList_M';
import SkeletonCollectionInfo from '../../components/skeleton/skeleton_collectionInfo';
import Footer from '@/components/homeFooter';

import { LoginContext } from '../../components/context/LoginContext';

const PageWrapper = styled.div`
  background-color: #fafafc;
  min-height: 100vh;
  // position: relative;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export interface CollectionData {
  collectionId: number;
  imageUrl: string;
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
    episodeId: number;
    episodeName: string;
    url: string;
    resourceSource: 'youtube' | 'naverBlog' | 'tistory' | 'velog';
    episodeNumber: number;
    today: boolean;
    progress: number; // 테스트용
  }[];
  likesCount: number;
  progressRatePercentage: number;
  progressRatio: string;
  learningStatus: 'BEFORE' | 'IN_PROGRESS' | 'COMPLETED';
  startDate: string;
  completedDate: string;
  liked: boolean;
}

export default function CollectionPage() {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const { collectionId } = router.query;
  const [collection, setCollection] = useState<CollectionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const scrollPositionRef = useRef<number>(0); // 스크롤 위치 저장할 Ref

  const context = useContext(LoginContext);
  if (!context) {
    throw new Error('LoginContext를 찾을 수 없습니다.');
  }
  const { isLoggedIn } = context.state;

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!collectionId) {
      setError('Collection ID가 없습니다.');
      setLoading(false);
      return;
    }

    const fetchCollection = async () => {
      setLoading(true);

      try {
        const token = localStorage.getItem('token'); // 토큰 추가가
        const response = await axios.get(
          `https://onboarding.p-e.kr/collections/${collectionId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.data.isSuccess) {
          setCollection(response.data.result);
          console.log('데이터 로드 성공:', response.data.result);
        } else {
          console.log('데이터 로드 실패: 더미 데이터를 사용합니다.');
        }
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          console.log('Error fetching collection:', err.message);

          if (err.response?.status === 404) {
            console.log('404 에러: 해당 컬렉션을 찾을 수 없습니다.');
            // setCollection(dummyData);
          } else {
            console.log('서버 오류로 데이터를 불러올 수 없습니다.');
            setCollection(null);
          }
        } else if (err instanceof Error) {
          console.log(err.message);
        } else {
          console.log(err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCollection();
  }, [collectionId]);

  const handleProgressUpdate = (
    updatedEpisodes: {
      episodeNumber: number;
      progress: number;
      completed: boolean;
    }[],
  ) => {
    if (!collection) return;
  
    // 각 resource 항목에 대해 updatedEpisodes 데이터와 로컬 스토리지의 값을 모두 고려하여 업데이트
    const updatedResource = collection.resource.map((ep) => {
      // updatedEpisodes 배열에서 해당 에피소드에 대한 최신 업데이트 데이터를 찾습니다.
      const matchingUpdate = updatedEpisodes.find(
        (upd) => upd.episodeNumber === ep.episodeId, // episodeNumber와 episodeId를 매칭
      );
  
      // 로컬 스토리지에 저장된 진행 상태가 있다면 우선순위로 반영합니다.
      const storedProgress = localStorage.getItem(`progress-${ep.episodeId}`);
      const localProgress = storedProgress ? Number(storedProgress) : ep.progress;
  
      // updatedEpisodes에 해당 에피소드의 업데이트 정보가 있다면 그 값을 사용하고,
      // 없으면 로컬 스토리지의 값을 사용하여 업데이트합니다.
      if (matchingUpdate) {
        return {
          ...ep,
          progress: matchingUpdate.progress,
          completed: matchingUpdate.completed,
        };
      } else {
        return {
          ...ep,
          progress: localProgress,
          // completed 상태는 로컬 진행률에 따른 기본 조건 (예: 80% 이상이면 true)
          completed: localProgress >= 80,
        };
      }
    });
  
    setCollection({ ...collection, resource: updatedResource });
  
    // 진도율 업데이트 시 현재 스크롤 위치 저장
    scrollPositionRef.current = window.scrollY;
  };
  
  // ESLint 오류 방지용
  useEffect(() => {
    console.log('현재 에러 상태:', error);
  }, [error]);

  if (!isClient) {
    return null;
  }

  return (
    <PageWrapper>
      {isLoggedIn ? <Header /> : <NotLoginHeader />}

      {collection && <TitleBar data={collection} />}
      {loading ? (
        <>
          <ContentWrapper>
            <SkeletonCollectionInfo />
            <SkeletonCollectionList />
          </ContentWrapper>
          <Footer />
        </>
      ) : (
        <>
          {collection && (
            <CollectionInfo
              data={collection}
              collectionId={collection.collectionId}
            />
          )}
          <ContentWrapper>
            {collection && (
              <CollectionList
                collection={collection}
                onProgressUpdate={handleProgressUpdate}
                // scrollPosition={scrollPositionRef.current} // 스크롤 위치를 자식에게 전달
              />
            )}
          </ContentWrapper>
        </>
      )}
      <Footer />
    </PageWrapper>
  );
}

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const NoteWrapper = styled.div`
  width: 30vw;

  border-radius: 16px;
  box-shadow: 1.5px 2px 8px 0px rgba(0, 0, 0, 0.1);

  @media (max-width: 850px) {
    width: 100%;
    margin-bottom: 20px;
    margin-top: 15px;
  }
  @media (max-width: 560px) {
    margin-top: 5px;
  }
`;

const NoteTitle = styled.div`
  display: flex;
  padding: 20px;
  padding-left: 24px;
  align-items: center;

  background-color: #fff;
  color: #64696e;
  font-size: 23px;
  font-weight: 600;
  line-height: 36px;
  letter-spacing: -0.48px;

  @media (max-width: 850px) {
    font-size: 20px;
    padding-left: 20px;
    padding: 18px;
  }

  @media (max-width: 560px) {
    font-size: 13px;
    padding: 5px 5px 5px 16px;
  }
`;

const NoteBody = styled.div`
  padding: 24px;
  background-color: #fafafc;

  color: #bdc5cc;
  font-size: 18px;
  font-weight: 400;
  // line-height: 27px;
  letter-spacing: -0.36px;

  @media (max-width: 560px) {
    padding: 15px;
  }
`;

const InputWrapper = styled.textarea`
  width: 100%;
  height: 62vh;
  border: none;
  background-color: #fafafc;

  font-family: Pretendard;
  font-size: 18px;
  font-weight: 400;
  line-height: 27px;
  letter-spacing: -0.36px;

  /* textarea 기본 스타일 제거 */
  resize: none; /* 크기 조절 핸들 제거 */
  outline: none; /* focus 시 테두리 제거 */

  &::placeholder {
    color: #bdc5cc;
    font-size: 18px;
    font-weight: 400;
    line-height: 30px;
    letter-spacing: -0.36px;
  }

  @media (max-width: 850px) {
    font-size: 15px;
    line-height: 22px;
    &::placeholder {
      font-size: 17px;
      font-weight: 400;
      line-height: 23px;
    }
    height: 49px;
  }

  @media (max-width: 560px) {
    font-size: 10px;
    line-height: 18px;
    &::placeholder {
      font-size: 10px;
      font-weight: 400;
      line-height: 18px;
    }
    height: 40px;
  }
`;

const SaveButton = styled.div<{ isValid: boolean }>`
  text-align: center;
  // white-space: nowrap;

  border-radius: 6px;
  background-color: ${(props) =>
    props.isValid ? '#5E52FF' : 'rgba(118, 118, 128, 0.12)'};

  color: #fff;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  line-height: 30px;
  letter-spacing: -0.4px;
  padding: 10px;
  margin-top: 24px;

  cursor: ${(props) => (props.isValid ? 'pointer' : 'default')};

  @media (max-width: 850px) {
    font-size: 17px;
  }

  @media (max-width: 560px) {
    font-size: 10px;
    margin-top: 10px;
    padding: 0px;
  }
`;

const Note: React.FC<{ episodeId?: string }> = ({ episodeId }) => {
  const [noteContent, setNoteContent] = useState<string>('');
  const [isNoteEmpty, setIsNoteEmpty] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  // const { episodeId } = useParams(); // episodeId 파라미터 가져오기

  // 로컬 스토리지에서 저장된 노트를 불러오는 함수
  useEffect(() => {
    if (episodeId) {
      const savedNote = localStorage.getItem(`noteContent_${episodeId}`);
      if (savedNote) {
        setNoteContent(savedNote);
        setIsNoteEmpty(savedNote === '');
      }
    }
  }, [episodeId]);

  // 노트 내용 변경 핸들러
  const handleNoteContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;

    // 최대 2000자 제한
    if (value.length > 2000) {
      alert('최대 2000자까지 입력 가능합니다.');
      return;
    }

    setNoteContent(value);
    setIsNoteEmpty(value.trim() === '');
  };

  // 저장 버튼 클릭 핸들러
  const handleSaveNote = async () => {
    if (!episodeId) {
      console.log('에피소드 ID가 존재하지 않습니다.');
      return;
    }

    if (!isNoteEmpty) {
      localStorage.setItem('noteContent_${epsiodeId}', noteContent);
      alert('노트가 저장되었습니다!');
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          alert('로그인이 필요합니다.');
          console.log('토큰이 없습니다.');
          return;
        }

        const response = await axios.post(
          `http://onboarding.p-e.kr:8080/resources/${episodeId}/memo`,
          {
            contents: noteContent,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }, // JSON 데이터 전송
        );

        // 로컬 스토리지에도 저장
        localStorage.setItem(`noteContent_${episodeId}`, noteContent);
        console.log('메모 저장 완료');
        console.log('episodeId: ', episodeId);
        console.log('Response:', response);

        if (response.status === 200) {
          console.log(noteContent);
        }
      } catch (err: any) {
        console.log('Error:', err.response?.data || err.message);
        if (err.response?.status === 401) {
          // 토큰 만료 시 로그아웃 처리
          alert('세션이 만료되었습니다. 다시 로그인해주세요.');
          localStorage.removeItem('token');
          window.location.href = '/login'; // 로그인 페이지로 이동
        } else if (err.response?.data?.message) {
          console.log('Error Message:', err.response.data.message);
        } else {
          console.log('메모 작성 중 오류 발생');
        }
      }
    }
  };

  // useEffect(() => {
  //   setNoteContent(noteContent);
  //   setIsNoteEmpty(isNoteEmpty);
  // }, [noteContent, isNoteEmpty]);

  return (
    <>
      <NoteWrapper>
        <NoteTitle>노트</NoteTitle>
        <NoteBody>
          <InputWrapper
            placeholder={`작성하신 글의 첫 줄은 노트의 제목이 됩니다.\n최대 2,000자 까지 입력하실 수 있어요.`}
            value={noteContent}
            onChange={handleNoteContent}
          />
          <SaveButton isValid={!isNoteEmpty} onClick={handleSaveNote}>
            저장하기
          </SaveButton>
        </NoteBody>
      </NoteWrapper>
    </>
  );
};

export default Note;

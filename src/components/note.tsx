import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const NoteWrapper = styled.div`
  width: 30vw;

  border-radius: 16px;
  box-shadow: 1.5px 2px 9px 0px rgba(0, 0, 0, 0.1);
`;

const NoteTitle = styled.div`
  display: flex;
  padding: 20px;
  padding-left: 24px;
  align-items: center;

  background-color: #fff;
  color: #64696e;
  font-size: 24px;
  font-weight: 600;
  line-height: 36px;
  letter-spacing: -0.48px;
`;

const NoteBody = styled.div`
  padding: 24px;
  background-color: #fafafc;

  color: #bdc5cc;
  font-size: 18px;
  font-weight: 400;
  line-height: 27px;
  letter-spacing: -0.36px;
`;

const InputWrapper = styled.textarea`
  width: 100%;
  height: 61vh;
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
    font-family: Pretendard;
    font-size: 18px;
    font-weight: 400;
    line-height: 30px;
    letter-spacing: -0.36px;
  }
`;

const SaveButton = styled.div<{ isValid: boolean }>`
  text-align: center;

  border-radius: 6px;
  background-color: ${(props) =>
    props.isValid ? '#5E52FF' : 'rgba(118, 118, 128, 0.12)'};

  color: #fff;
  text-aign: center;
  font-size: 20px;
  font-weight: 600;
  line-height: 30px;
  letter-spacing: -0.4px;
  padding: 10px 100px;
  margin-top: 24px;

  cursor: ${(props) => (props.isValid ? 'pointer' : 'default')};
`;

const Note: React.FC = () => {
  const [noteContent, setNoteContent] = useState<string>('');
  const [isNoteEmpty, setIsNoteEmpty] = useState<boolean>(true);

  // 로컬 스토리지에서 저장된 노트를 불러오는 함수
  useEffect(() => {
    const savedNote = localStorage.getItem('noteContent');
    if (savedNote) {
      setNoteContent(savedNote);
      setIsNoteEmpty(savedNote === '');
    }
  }, []);

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
  const handleSaveNote = () => {
    if (!isNoteEmpty) {
      localStorage.setItem('noteContent', noteContent);
      alert('노트가 저장되었습니다!');
    }
  };

  useEffect(() => {
    setNoteContent(noteContent);
    setIsNoteEmpty(isNoteEmpty);
  }, [noteContent, isNoteEmpty]);

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

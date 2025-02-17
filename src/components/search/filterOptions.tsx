// 타입 정의
type difficulty = {
  id: number;
  label: string;
  description: string;
};

type amount = {
  label: string;
  description: string;
  queryValue: string;
};

type mediaType = {
  id: number;
  label: string;
};

export const difficultyOptions: difficulty[] = [
  { id: 1, label: '입문', description: '누구나 들을 수 있는' },
  { id: 2, label: '초급', description: '선수 지식이 필요한' },
  { id: 3, label: '중급', description: '전문성을 높이는' },
  // { label: '실무', description: '실무에 사용 가능한' },
];

export const amountOptions: amount[] = [
  { label: '짧아요', description: '1 - 5 회차', queryValue: 'SHORT' },
  { label: '적당해요', description: '5 - 10 회차', queryValue: 'MEDIUM' },
  { label: '많아요', description: '11 회차 이상', queryValue: 'LONG' },
];

export const mediaOptions: mediaType[] = [
  { id: 1, label: '텍스트만' },
  { id: 2, label: '텍스트가 좋아요' },
  { id: 3, label: '상관 없어요' },
  { id: 4, label: '영상이 좋아요' },
  { id: 5, label: '영상만' },
];

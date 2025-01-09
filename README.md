# LearningFlow-FE: A front-end repository of team LearningFlow

### 👩🏻‍💻 프론트엔드 협업 규칙

**✔︎ 코드 스타일 Ts로 통일**
***

#### 1. Git Branch
- Git Flow 방식 사용
- 브랜치 네이밍 규칙: `feat/페이지이름`
  - ex) `feat/login` -> `develop` 브랜치로 merge
- `feature`: 기능 개발 브랜치
- `develop`: 각 기능들의 개발을 완료하고 병합하는 브랜치
- `main`: default 브랜치, 최종적으로 배포하는 브랜치
- `hotfix`: 배포 후 오류 발생 시 사용하는 브랜치
- `feature > develop > main` 순으로 merge
***

**2. Commit 컨벤션**
- "**태그: 커밋 메시지**" 형식
- 태그는 영어 소문자, 커밋 메시지는 한글로 작성
- ex)
  - **feat**: 새로운 기능 추가
  - **fix**: 오류(버그) 수정
  - **style**: 코드 포맷팅, 주석 수정, 세미콜론 수정 등의 스타일 수정
  - **docs**: README 문서 수정
  - **merge**: 브랜치 합병
  - **chore**: 빌드 관련 수정
  - **refactor**: 코드 리팩토링
***

**3. Issue Template**

```
## 작업 대상 🖥️
   - 작업이 필요한 부분 작성

## 작업 내용 📝
   - 작업 내용 정리, 구현 상태 작성
   - 작업 내용 스크린샷 첨부

## 이슈 번호 #️⃣
   - ex) #7 -> 이와 같이 이슈 번호 작성
```
***

**4. PR 규칙**

```
## PR 타입 (하나 이상의 PR 타입을 선택해주세요)
   - [] 기능 추가
   - [] 기능 삭제
   - [] 버그 수정
   - [] 의존성, 환경 변수, 빌드 관련 코드 업데이트

## 반영 브랜치
   - ex) feat/login -> develop

## 변경 사항
   - ex) 로그인 시, 구글 소셜 로그인 기능 추가
```

- 제목 형식: **[TYPE] 이슈 제목**
  - 타입 부분은 전부 대문자로 작성할 것 ex) [FIX] 로그인 페이지 유효성 오류 수정
- label 설정 (버그, docs, 질문, 리팩토링, 기능)
- projects 칸반보드 -> Todo, In Progress, Done, No Status
***

**5. 코드 리뷰 규칙**
- 디자인, 기능, 복잡성, 테스트, 작명, 주석, 스타일, 문서화가 제대로 이루어 졌는지 리뷰
- `CL`: changelist의 약어, 버전 관리(Version Control)에 제출되었거나 코드 리뷰가 진행 중인 독립된 변경 단위
- `LGTM`: 위의 코드 리뷰를 승인할 때, 리뷰어가 사용
- `Nit`: 리뷰 내용이 중요하지 않다면 “Nit”와 같은 접두어를 붙여 코드 작성자가 선택할 수 있도록 함
- 팀원 모두가 review 진행한 후 작성자가 merge 진행 -> 마음대로 merge 진행 ❌
- 코드 리뷰는 수시로 진행하고 일주일에 한 번 merge 진행 -> 스크럼 시간에 진행

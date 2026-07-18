# CLAUDE.md

이 파일은 이 저장소에서 작업하는 Claude Code(claude.ai/code)에게 제공되는 가이드입니다.

@AGENTS.md

## 프로젝트 개요

- 이름: Signal (package.json의 name 필드는 아직 `lets-go-518-client`로 남아있음)
- 프레임워크: Next.js (App Router) + TypeScript, React 19 — `next` 16.2.4 / `react` 19.2.4 (package.json 기준)
- 스타일: Tailwind CSS v4 (`@theme` 기반, 설정 파일 없음)
- DB / 배포: 아직 정해진 것 없음 (Vercel 관련 설정 파일 없음, README도 create-next-app 기본값 그대로)
- 목적: AI 기반 딥페이크 분석

## 자주 사용하는 명령어

- `npm run dev` — 개발 서버 실행 (Next.js)
- `npm run build` — 프로덕션 빌드
- `npm run lint` — ESLint (flat config, `eslint-config-next` core-web-vitals + typescript)

테스트 프레임워크는 아직 도입되지 않았습니다 (`npm test` 없음). CI 워크플로우(`.github/workflows`)도 아직 없습니다. 둘 중 하나라도 추가되면 이 섹션을 업데이트하세요.

## 아키텍처

Feature-Sliced Design(FSD)을 지향하는 구조로 세팅 중이며, `tsconfig.json`에 `@/app/*`, `@/views/*`, `@/widgets/*`, `@/features/*`, `@/entities/*`, `@/shared/*` 경로 별칭이 미리 잡혀있습니다. 다만 **현재 실제로 존재하는 건 `app/`과 `shared/`뿐**이고 나머지 레이어는 아직 폴더도 없습니다 — 앞으로 기능을 추가하면서 채워나가면 됩니다. 새 레이어를 만들 때는 import 방향을 한쪽으로만 유지하세요: `app → views → widgets → features → entities → shared` (하위 레이어가 상위 레이어를 import하지 않음).

- `app/` — Next.js 라우팅. `layout.tsx`가 `Providers`(react-query + sonner `Toaster`)로 전체를 감쌉니다. `globals.css`에 디자인 토큰을 `@theme`으로 정의합니다: `color-main-*` / `color-secondary-*` / `color-gray-*` 팔레트, `font-pretendard` + `text-h1~text-caption` 타이포 스케일, `shadow-sm~shadow-2xl`. 원시 hex 값 대신 이 토큰 기반 유틸리티 클래스를 우선 사용하세요.
- `shared/api/axios.ts` — 공유 axios 인스턴스(`api`). 요청 인터셉터가 `localStorage`의 `accessToken`을 자동으로 `Authorization` 헤더에 붙이고, 응답 인터셉터가 에러를 `Error(message)` 형태로 정규화합니다.
- `shared/config/queryClient.ts` — `makeQueryClient()`가 TanStack Query 기본값을 설정합니다 (`staleTime: 60초`, `gcTime: 5분`, query `retry: 1`, mutation `retry: 0`, `refetchOnWindowFocus: false`). `src/app/providers.tsx`에서 `queryCache.config.onError`로 쿼리 실패 시 sonner 토스트를 띄웁니다 (mutation 에러는 아직 전역 처리 안 됨 — 필요하면 직접 처리).
- `shared/asset/svg/` — 아이콘 컴포넌트. 파일명은 PascalCase, `fill`/`stroke`는 `currentColor`로 통일해서 사용하는 쪽에서 CSS `color`로 색을 제어합니다 (`Logo.tsx`는 예외 — 래스터 이미지 기반이라 고정).
- `shared/ui/` — 재사용 가능한 UI 킷 (`Button` 등). 도메인 지식이 없는 순수 프레젠테이션 컴포넌트만 둡니다.

## 코드 규칙

- 컴포넌트: 함수형 + hooks
- CSS: Tailwind CSS 유틸리티 클래스 사용 (인라인 스타일 지양)
- Prettier: 더블 쿼트(`singleQuote: false`), 세미콜론, trailing comma, 100컬럼, `prettier-plugin-tailwindcss`로 클래스 자동 정렬 (`.prettierrc` 기준)
- 경로 별칭 `@/*` → `src/*` (`tsconfig.json`)
- 클라이언트 훅/이벤트 핸들러가 필요한 컴포넌트는 파일 최상단에 `"use client"` 명시 (예: `app/page.tsx`, `app/providers.tsx`)

## 커밋 규칙

- 형식: `feat:` / `fix:` / `refactor:` / `docs:`
- 커밋 메세지는 한글로 작성 가능
- PR 단위: 기능 하나당 PR 하나
- 커밋 단위: 서로 무관한 변경을 한 커밋에 묶지 말 것. 연관 있는 변경끼리만 묶어서 커밋 (예: `package.json`과 `package-lock.json`은 함께, 의존성 추가/설정 변경/문서 변경처럼 성격이 다른 작업은 각각 별도 커밋으로 분리)
- 코드리뷰(Gemini 등) 피드백을 반영해 수정할 때, 커밋 메시지에 "제미나이 코드리뷰 반영" 같은 리뷰 도구/과정 언급을 넣지 말 것. 실제 변경 내용에 맞는 타입(`fix:` / `refactor:` / `test:` 등)과 설명으로 작성

## 하지 말아야 할 것

- `console.log` 남기지 말 것
- `any` 타입 사용 금지
- `.env` 파일 수정 및 커밋 금지
- `main` 브랜치에 직접 push 금지
- 기존 API 엔드포인트 삭제 금지
- `package.json`의 의존성 버전 변경 금지
- 사용자 확인 없이 DB 마이그레이션 실행 금지

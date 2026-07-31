# NAVER OGQ PROJECT

<h2>Signal</h2>

> **당신이 보낸 구조 신호, Signal이 안전한 일상으로 답합니다.**
>
> 디지털 성범죄, 딥페이크, 얼굴 도용 등 온라인 위험이 빠르게 늘어나는 흐름 속에서, 피해를 겪는 사람이 혼자 방법을 찾아 헤매지 않도록 예방부터 대응까지 한 곳에서 지원하는 AI 기반 온라인 안전 서비스의 프론트엔드 레포지토리입니다.

<h3>주요 기능</h3> <hr>

* **AI 이미지 위험도 분석 및 보호**: 업로드 전 사진 속 위험 요소를 AI가 먼저 확인하고, 필요하면 워터마크·노이즈 삽입 등 보호 처리를 제공합니다.
* **얼굴 도용·딥페이크 탐지**: 사진·영상에서 얼굴 도용 여부와 딥페이크 합성 흔적을 빠르게 탐지합니다.
* **유포 모니터링**: 기준 이미지를 등록해두면 웹에서 유사 이미지가 재확산될 때마다 지속적으로 추적해 알려줍니다.
* **익명 상담 챗봇**: 신원을 밝히지 않고도 AI 상담사와 현재 상황을 상담하고 맞춤형 대응 방법을 안내받을 수 있습니다.
* **신고 지원 및 실제 기관 연계**: 피해 상황을 바탕으로 기관 제출용 신고 문서 초안을 자동 생성하고, 상황에 맞는 전문 지원 기관까지 바로 연결합니다.

<h3>기술 스택</h3> <hr>

| 분류 | 기술 스택 |
| :--- | :--- |
| **Framework** | Next.js 16 (App Router), React 19, TypeScript |
| **스타일링** | Tailwind CSS v4 |
| **데이터 페칭** | TanStack Query, Axios |
| **Design** | Figma |
| **IDE / Tool** | VS Code, Claude Code CLI, GitHub |

<h3>폴더 구조</h3> <hr>

Feature-Sliced Design(FSD)을 지향하는 구조로, 레이어 간 참조 방향을 `app → views → widgets → features → entities → shared` 한 방향으로만 유지합니다.

```
src/
├── app/        # Next.js 라우팅 (페이지, 레이아웃)
├── views/      # 페이지 단위 화면 (홈, 분석, 신고, 채팅, 마이페이지 등)
├── widgets/    # 여러 화면에서 재사용되는 레이아웃 블록 (헤더, 푸터 등)
├── entities/   # 도메인 API 클라이언트 및 데이터 매핑 (report, analysis, agency, monitoring, chat, user)
└── shared/     # 공용 axios 인스턴스, 쿼리 클라이언트, UI 킷, 아이콘, 유틸
```

<h3>실행방법</h3> <hr>

```bash
# 1. 저장소 복제 (Clone the repository)
git clone https://github.com/Signal-Ai-Deepfake/Signal-web.git
cd Signal-web

# 2. 패키지 의존성 설치 (Install dependencies)
npm install

# 3. 환경 변수 설정 (.env.local 생성)
# NEXT_PUBLIC_API_BASE_URL=<백엔드 API 서버 주소>

# 4. 개발 서버 실행 (Run development server)
npm run dev
```

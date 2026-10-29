import { defineMessages } from "@/shared/i18n/defineMessages";

interface CategoryText {
  label: string;
  description: [string, string];
}

interface ActionText {
  title: string;
  description: [string, string];
}

export const homeMessages = defineMessages(
  {
    greeting: (name: string) => `안녕하세요, ${name}님`,
    defaultName: "사용자",
    tagline: ["걱정은 줄이고, 안전은 더하고.", "AI가 사진 속 위험 요소를 먼저 확인해 드립니다."],
    cta: "내 디지털 일상 점검하기",
    sampleMessage: "현재 이미지는 안전합니다.",
    quick: {
      title: "빠른 기능",
      prevent: {
        label: "예방",
        description: ["업로드 전 위험을 확인하고", "이미지를 안전하게 보호하세요."],
      } as CategoryText,
      analyze: {
        title: "사진 위험도 분석 및 보호",
        description: ["사진을 업로드 하면 AI가 위험 요소를", "분석하고 보호 처리를 제공합니다."],
      } as ActionText,
      detect: {
        label: "탐지",
        description: ["공개된 사진의 도용과", "합성 여부를 확인하세요."],
      } as CategoryText,
      detectAction: {
        title: "얼굴 도용·딥페이크 탐지",
        description: ["얼굴 도용 여부와 딥페이크 합성 여부를", "한 번에 확인할 수 있습니다."],
      } as ActionText,
      respond: {
        label: "대응",
        description: ["피해가 발생했을 때,", "필요한 도움을 빠르게 받으세요."],
      } as CategoryText,
      chat: {
        title: "익명 상담 챗봇",
        description: ["AI 상담 챗봇과", "익명으로 대화할 수 있습니다."],
      } as ActionText,
      report: {
        title: "신고 지원",
        description: ["신고에 필요한 문서를 작성하고", "전문 기관과 연결해 드립니다."],
      } as ActionText,
    },
    recent: {
      title: "최근 분석 결과",
      viewAll: "전체 보기",
      emptyTitle: "아직 분석 결과가 없습니다.",
      emptyDescription: "사진을 분석하면 최근 결과와 위험도 변화를 이곳에서 확인할 수 있습니다.",
      firstAnalysis: "첫 사진 분석하기",
      topRisk: (label: string, score: number) => `가장 높은 위험: ${label} ${score}%`,
      riskScore: (score: number) => `위험도 ${score}%`,
      assessmentNumber: (id: number) => `분석 번호 #${id}`,
      viewResult: "결과 보기",
    },
  },
  {
    en: {
      greeting: (name) => `Hello, ${name}`,
      defaultName: "there",
      tagline: ["Less worry, more safety.", "AI checks the risks in your photos first."],
      cta: "Check my digital life",
      sampleMessage: "This image is currently safe.",
      quick: {
        title: "Quick actions",
        prevent: {
          label: "Prevent",
          description: ["Check risks before uploading", "and keep your images safe."],
        },
        analyze: {
          title: "Photo risk analysis & protection",
          description: ["Upload a photo and AI analyzes", "its risks and protects it."],
        },
        detect: {
          label: "Detect",
          description: ["Check whether public photos", "have been stolen or synthesized."],
        },
        detectAction: {
          title: "Face theft & deepfake detection",
          description: ["Check for face theft and", "deepfake synthesis at once."],
        },
        respond: {
          label: "Respond",
          description: ["When harm happens,", "get the help you need quickly."],
        },
        chat: {
          title: "Anonymous chatbot",
          description: ["Talk anonymously with", "our AI counseling chatbot."],
        },
        report: {
          title: "Report support",
          description: ["Write the documents you need", "and get connected to agencies."],
        },
      },
      recent: {
        title: "Recent results",
        viewAll: "View all",
        emptyTitle: "No analysis results yet.",
        emptyDescription:
          "After you analyze a photo, your recent results and risk changes will appear here.",
        firstAnalysis: "Analyze your first photo",
        topRisk: (label, score) => `Highest risk: ${label} ${score}%`,
        riskScore: (score) => `Risk ${score}%`,
        assessmentNumber: (id) => `Analysis #${id}`,
        viewResult: "View result",
      },
    },
    ja: {
      greeting: (name) => `こんにちは、${name}さん`,
      defaultName: "ユーザー",
      tagline: ["不安は減らして、安心をプラス。", "AIが写真に潜むリスクを先にチェックします。"],
      cta: "デジタルな日常をチェックする",
      sampleMessage: "この画像は現在安全です。",
      quick: {
        title: "クイック機能",
        prevent: {
          label: "予防",
          description: ["アップロード前にリスクを確認し、", "画像を安全に保護しましょう。"],
        },
        analyze: {
          title: "写真の危険度分析と保護",
          description: ["写真をアップロードすると、AIがリスクを", "分析し保護処理を行います。"],
        },
        detect: {
          label: "検出",
          description: ["公開した写真が盗用・合成されて", "いないか確認しましょう。"],
        },
        detectAction: {
          title: "顔の盗用・ディープフェイク検出",
          description: ["顔の盗用とディープフェイク合成を", "まとめて確認できます。"],
        },
        respond: {
          label: "対応",
          description: ["被害にあったときは、", "必要なサポートをすぐに受けましょう。"],
        },
        chat: {
          title: "匿名相談チャットボット",
          description: ["AI相談チャットボットと", "匿名で話せます。"],
        },
        report: {
          title: "通報サポート",
          description: ["通報に必要な書類を作成し、", "専門機関におつなぎします。"],
        },
      },
      recent: {
        title: "最近の分析結果",
        viewAll: "すべて見る",
        emptyTitle: "まだ分析結果がありません。",
        emptyDescription: "写真を分析すると、最近の結果や危険度の変化をここで確認できます。",
        firstAnalysis: "最初の写真を分析する",
        topRisk: (label, score) => `最も高いリスク：${label} ${score}%`,
        riskScore: (score) => `危険度 ${score}%`,
        assessmentNumber: (id) => `分析番号 #${id}`,
        viewResult: "結果を見る",
      },
    },
    zh: {
      greeting: (name) => `你好，${name}`,
      defaultName: "用户",
      tagline: ["少一点担心，多一分安全。", "AI会先帮你检查照片中的风险因素。"],
      cta: "检查我的数字生活",
      sampleMessage: "当前图片是安全的。",
      quick: {
        title: "快捷功能",
        prevent: { label: "预防", description: ["上传前先检查风险，", "安全地保护你的图片。"] },
        analyze: {
          title: "照片风险分析与保护",
          description: ["上传照片后，AI会分析风险因素", "并提供保护处理。"],
        },
        detect: { label: "检测", description: ["检查公开的照片是否", "被盗用或合成。"] },
        detectAction: {
          title: "面部盗用·深度伪造检测",
          description: ["一次性检查面部盗用", "和深度伪造合成。"],
        },
        respond: { label: "应对", description: ["遭受伤害时，", "快速获得所需的帮助。"] },
        chat: {
          title: "匿名咨询聊天机器人",
          description: ["可以与AI咨询聊天机器人", "匿名对话。"],
        },
        report: {
          title: "举报支持",
          description: ["撰写举报所需的文件，", "并为你对接专业机构。"],
        },
      },
      recent: {
        title: "最近分析结果",
        viewAll: "查看全部",
        emptyTitle: "还没有分析结果。",
        emptyDescription: "分析照片后，可以在这里查看最近的结果和风险变化。",
        firstAnalysis: "分析第一张照片",
        topRisk: (label, score) => `最高风险：${label} ${score}%`,
        riskScore: (score) => `风险 ${score}%`,
        assessmentNumber: (id) => `分析编号 #${id}`,
        viewResult: "查看结果",
      },
    },
  },
);

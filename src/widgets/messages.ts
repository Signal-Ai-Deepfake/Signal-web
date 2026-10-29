import { defineMessages } from "@/shared/i18n/defineMessages";

export interface HeadlineSegment {
  text: string;
  brand?: boolean;
}

interface NavItemText {
  title: string;
  description: string;
}

export const widgetMessages = defineMessages(
  {
    nav: {
      analysis: "AI 분석",
      support: "신고 지원",
      detect: {
        title: "얼굴 도용·딥페이크 탐지",
        description: "얼굴 도용 및 딥페이크 여부를 확인해요.",
      } as NavItemText,
      analyze: { title: "AI 이미지 분석", description: "사진의 위험도를 분석해요." } as NavItemText,
      monitoring: {
        title: "유포 모니터링",
        description: "웹에서 유사 이미지를 지속적으로 확인해요.",
      } as NavItemText,
      chat: {
        title: "익명 상담 챗봇",
        description: "AI 상담 챗봇이 24시간 상담해요.",
      } as NavItemText,
      report: {
        title: "신고 지원",
        description: "신고 문서 작성과 기관 연계를 도와드려요.",
      } as NavItemText,
    },
    header: {
      login: "로그인",
      signup: "회원가입",
      signupToSave: "회원가입하고 기록 저장하기",
      openMenu: "메뉴 열기",
      closeMenu: "메뉴 닫기",
      notifications: "알림",
      myMenu: "내 메뉴",
      defaultUserName: "사용자",
      myProfile: "내 프로필",
      myChats: "내 대화 내역",
      myReports: "신고 문서 내역",
      logout: "로그아웃",
      language: "언어",
      homeLink: "Signal 홈",
    },
    bottomNav: {
      home: "홈",
      analysis: "분석",
      support: "상담·신고",
      mypage: "마이페이지",
      close: "닫기",
    },
    footer: {
      tagline: "디지털 괴롭힘, 딥페이크, 얼굴 도용 등 온라인 위험을 AI 기술로 예방하고 대응합니다.",
      services: "서비스",
      privacy: "개인정보처리방침",
      terms: "이용약관",
    },
    hero: {
      badge: "AI 기반 딥페이크 피해 예방·탐지·대응",
      headline: [
        [{ text: "당신이 보낸 구조 신호," }],
        [{ text: "Signal", brand: true }, { text: "이 안전한 일상으로 답합니다." }],
      ] as HeadlineSegment[][],
      mobileHeadline: [
        [{ text: "당신이 보낸 구조 신호," }],
        [{ text: "Signal", brand: true }, { text: "이 안전한 일상으로" }],
        [{ text: "답합니다." }],
      ] as HeadlineSegment[][],
      intro: [
        "디지털 괴롭힘부터 딥페이크까지, 홀로 감당하기 힘든 순간에 Signal을 켜세요.",
        "AI 기술을 통해 가장 빠르고 정확하게 증거를 분석하고 맞춤형 대응 가이드를 제공합니다.",
      ],
      mobileIntro: ["디지털 괴롭힘부터 딥페이크까지,", "혼자 고민하지 말고 Signal을 켜세요."],
      cta: "AI 분석 시작하기",
      sampleMessage: "현재 이미지는 안전합니다.",
      scrollMore: "스크롤해서 더 알아보기",
      encrypted: "모든 데이터는 암호화되어 안전하게 보호됩니다.",
    },
    whySignal: {
      title: [{ text: "Signal", brand: true }, { text: "이 필요한 이유" }] as HeadlineSegment[],
      description: "온라인에서 마주하는 다양한 위험, 예방부터 대응까지 Signal이 함께합니다.",
      items: [
        {
          title: "AI 이미지 분석",
          description: "사진 속 위험 요소를 AI가 분석하고 안전 여부를 확인합니다.",
        },
        {
          title: "얼굴 도용·딥페이크 탐지",
          description: "얼굴 도용과 AI 합성 여부를 빠르고 정확하게 분석합니다.",
        },
        {
          title: "익명 상담 챗봇",
          description: "익명으로 상담하며 상황에 맞는 대응 방법을 안내받을 수 있습니다.",
        },
        {
          title: "신고 지원",
          description: "신고에 필요한 절차와 문서 작성을 쉽고 빠르게 도와드립니다.",
        },
      ] as NavItemText[],
      mobileTitle: "왜 Signal인가요?",
      mobileItems: [
        {
          title: "빠르고 정확한 AI 분석",
          description: "유해 콘텐츠를 즉시 판별하고 증거화합니다.",
        },
        { title: "철저한 익명성 보장", description: "개인정보를 노출하지 않고 도움을 받으세요." },
        { title: "전문가 직접 연결", description: "법률, 심리 전문가와 신속하게 연계해 드립니다." },
      ] as NavItemText[],
    },
    howItWorks: {
      title: "AI 분석은 이렇게 진행돼요",
      description: "사진 한 장으로 위험을 분석하고, 안전한 대응 방법을 안내해 드립니다.",
      steps: [
        { title: "이미지 업로드", description: "분석할 사진을 업로드합니다." },
        { title: "AI 위험도 분석", description: "AI 위험 요소와 노출 가능성을 분석합니다." },
        { title: "분석결과 확인", description: "위험도와 원인, 주요 요소를 확인할 수 있습니다." },
        {
          title: "보호 가이드 제공",
          description: "상황에 맞는 보호 방법과 대응 가이드를 제공합니다.",
        },
      ] as NavItemText[],
    },
    features: {
      title: "주요 기능",
      hint: "카드를 누르면 바로 이동해요",
      items: [
        { title: "AI 증거 분석", description: "사진 분석 및 결과 리포트" },
        { title: "익명 상담", description: "24시간 안전 챗봇 상담" },
        { title: "피해 신고", description: "대응 절차 및 가이드" },
        { title: "딥페이크 탐지", description: "얼굴 도용·합성 여부 확인" },
      ] as NavItemText[],
    },
    cta: {
      line1: "혼자 고민하지 마세요.",
      line2: [
        { text: "Signal", brand: true },
        { text: "이 함께 안전한 해결 방법을 찾아드립니다." },
      ] as HeadlineSegment[],
      description: "AI 분석부터 익명 상담, 신고 지원까지 한 곳에서 이용해 보세요.",
      button: "익명 상담 시작하기",
      note: "모든 상담 내용은 익명으로 안전하게 보호됩니다.",
    },
    legal: {
      toc: "목차",
      translationNotice: "",
    },
    scrollToTop: "맨 위로",
  },
  {
    en: {
      nav: {
        analysis: "AI Analysis",
        support: "Report Support",
        detect: {
          title: "Face Theft & Deepfake Detection",
          description: "Check for face theft and deepfakes.",
        },
        analyze: { title: "AI Image Analysis", description: "Analyze the risk level of a photo." },
        monitoring: {
          title: "Spread Monitoring",
          description: "Keep checking the web for similar images.",
        },
        chat: { title: "Anonymous Chatbot", description: "Our AI counselor is available 24/7." },
        report: {
          title: "Report Support",
          description: "Help with report documents and agency referrals.",
        },
      },
      header: {
        login: "Log in",
        signup: "Sign up",
        signupToSave: "Sign up to save your records",
        openMenu: "Open menu",
        closeMenu: "Close menu",
        notifications: "Notifications",
        myMenu: "My menu",
        defaultUserName: "User",
        myProfile: "My profile",
        myChats: "My chats",
        myReports: "My reports",
        logout: "Log out",
        language: "Language",
        homeLink: "Signal home",
      },
      bottomNav: {
        home: "Home",
        analysis: "Analyze",
        support: "Help",
        mypage: "My page",
        close: "Close",
      },
      footer: {
        tagline:
          "We use AI to prevent and respond to online risks such as digital harassment, deepfakes, and face theft.",
        services: "Services",
        privacy: "Privacy Policy",
        terms: "Terms of Service",
      },
      hero: {
        badge: "AI deepfake prevention, detection & response",
        headline: [
          [{ text: "When you send an SOS," }],
          [{ text: "Signal", brand: true }, { text: " answers with safety." }],
        ],
        mobileHeadline: [
          [{ text: "When you send an SOS," }],
          [{ text: "Signal", brand: true }, { text: " answers" }],
          [{ text: "with safety." }],
        ],
        intro: [
          "From digital harassment to deepfakes, turn on Signal when it's too much to handle alone.",
          "Our AI analyzes evidence quickly and accurately and gives you a response guide tailored to you.",
        ],
        mobileIntro: [
          "From digital harassment to deepfakes,",
          "don't struggle alone. Turn on Signal.",
        ],
        cta: "Start AI analysis",
        sampleMessage: "This image is currently safe.",
        scrollMore: "Scroll to learn more",
        encrypted: "All data is encrypted and kept safe.",
      },
      whySignal: {
        title: [{ text: "Why you need " }, { text: "Signal", brand: true }],
        description:
          "From prevention to response, Signal is with you against the many risks you face online.",
        items: [
          {
            title: "AI Image Analysis",
            description: "AI analyzes risk factors in your photo and checks whether it's safe.",
          },
          {
            title: "Face Theft & Deepfake Detection",
            description: "Quickly and accurately detects face theft and AI-generated content.",
          },
          {
            title: "Anonymous Chatbot",
            description: "Talk anonymously and get guidance that fits your situation.",
          },
          {
            title: "Report Support",
            description: "Makes the reporting process and paperwork quick and easy.",
          },
        ],
        mobileTitle: "Why Signal?",
        mobileItems: [
          {
            title: "Fast, accurate AI analysis",
            description: "Instantly identifies harmful content and turns it into evidence.",
          },
          {
            title: "Complete anonymity",
            description: "Get help without revealing your personal information.",
          },
          {
            title: "Direct expert connection",
            description: "We quickly connect you with legal and counseling experts.",
          },
        ],
      },
      howItWorks: {
        title: "How AI analysis works",
        description: "Analyze risks with a single photo and get guidance on how to respond safely.",
        steps: [
          { title: "Upload an image", description: "Upload the photo you want to analyze." },
          {
            title: "AI risk analysis",
            description: "AI analyzes risk factors and exposure potential.",
          },
          {
            title: "Check the results",
            description: "See the risk level, causes, and key factors.",
          },
          {
            title: "Get a protection guide",
            description: "Receive protection and response tips for your situation.",
          },
        ],
      },
      features: {
        title: "Key features",
        hint: "Tap a card to get started",
        items: [
          { title: "AI Evidence Analysis", description: "Photo analysis and result report" },
          { title: "Anonymous Chat", description: "Safe 24/7 chatbot counseling" },
          { title: "Report Harm", description: "Response steps and guide" },
          { title: "Deepfake Detection", description: "Check for face theft and synthesis" },
        ],
      },
      cta: {
        line1: "Don't go through it alone.",
        line2: [
          { text: "Signal", brand: true },
          { text: " will help you find a safe way forward." },
        ],
        description:
          "From AI analysis to anonymous counseling and report support, all in one place.",
        button: "Start anonymous chat",
        note: "All conversations are anonymous and kept safe.",
      },
      legal: {
        toc: "Contents",
        translationNotice:
          "This translation is provided for reference. If it differs from the Korean version, the Korean version prevails.",
      },
      scrollToTop: "Back to top",
    },
    ja: {
      nav: {
        analysis: "AI分析",
        support: "通報サポート",
        detect: {
          title: "顔の盗用・ディープフェイク検出",
          description: "顔の盗用やディープフェイクかどうかを確認します。",
        },
        analyze: { title: "AI画像分析", description: "写真の危険度を分析します。" },
        monitoring: {
          title: "拡散モニタリング",
          description: "Web上の類似画像を継続的に確認します。",
        },
        chat: {
          title: "匿名相談チャットボット",
          description: "AIカウンセラーが24時間相談に応じます。",
        },
        report: {
          title: "通報サポート",
          description: "通報書類の作成と機関への連携をお手伝いします。",
        },
      },
      header: {
        login: "ログイン",
        signup: "新規登録",
        signupToSave: "登録して記録を保存する",
        openMenu: "メニューを開く",
        closeMenu: "メニューを閉じる",
        notifications: "お知らせ",
        myMenu: "マイメニュー",
        defaultUserName: "ユーザー",
        myProfile: "プロフィール",
        myChats: "相談履歴",
        myReports: "通報書類の履歴",
        logout: "ログアウト",
        language: "言語",
        homeLink: "Signal ホーム",
      },
      bottomNav: {
        home: "ホーム",
        analysis: "分析",
        support: "相談・通報",
        mypage: "マイページ",
        close: "閉じる",
      },
      footer: {
        tagline:
          "デジタルいじめ、ディープフェイク、顔の盗用などのオンラインリスクをAI技術で予防・対応します。",
        services: "サービス",
        privacy: "プライバシーポリシー",
        terms: "利用規約",
      },
      hero: {
        badge: "AIでディープフェイク被害を予防・検出・対応",
        headline: [
          [{ text: "あなたが送ったSOSに、" }],
          [{ text: "Signal", brand: true }, { text: "が安心できる日常で応えます。" }],
        ],
        mobileHeadline: [
          [{ text: "あなたが送ったSOSに、" }],
          [{ text: "Signal", brand: true }, { text: "が安心できる日常で" }],
          [{ text: "応えます。" }],
        ],
        intro: [
          "デジタルいじめからディープフェイクまで、一人で抱えきれないときはSignalを。",
          "AI技術で証拠を素早く正確に分析し、状況に合った対応ガイドをお届けします。",
        ],
        mobileIntro: [
          "デジタルいじめからディープフェイクまで、",
          "一人で悩まずにSignalを使ってください。",
        ],
        cta: "AI分析を始める",
        sampleMessage: "この画像は現在安全です。",
        scrollMore: "スクロールして詳しく見る",
        encrypted: "すべてのデータは暗号化され、安全に保護されます。",
      },
      whySignal: {
        title: [{ text: "Signal", brand: true }, { text: "が必要な理由" }],
        description:
          "オンラインで直面するさまざまなリスクに、予防から対応までSignalが寄り添います。",
        items: [
          {
            title: "AI画像分析",
            description: "写真に含まれる危険要素をAIが分析し、安全かどうかを確認します。",
          },
          {
            title: "顔の盗用・ディープフェイク検出",
            description: "顔の盗用やAI合成の有無を素早く正確に分析します。",
          },
          {
            title: "匿名相談チャットボット",
            description: "匿名で相談しながら、状況に合った対応方法を案内します。",
          },
          {
            title: "通報サポート",
            description: "通報に必要な手続きや書類作成を簡単・スピーディーにサポートします。",
          },
        ],
        mobileTitle: "なぜSignalなのか？",
        mobileItems: [
          {
            title: "速くて正確なAI分析",
            description: "有害コンテンツを即座に判別し、証拠化します。",
          },
          { title: "徹底した匿名性", description: "個人情報を明かさずにサポートを受けられます。" },
          {
            title: "専門家へ直接つなぐ",
            description: "法律・心理の専門家に迅速におつなぎします。",
          },
        ],
      },
      howItWorks: {
        title: "AI分析の流れ",
        description: "写真1枚で危険性を分析し、安全な対応方法をご案内します。",
        steps: [
          { title: "画像アップロード", description: "分析したい写真をアップロードします。" },
          { title: "AI危険度分析", description: "AIが危険要素と露出の可能性を分析します。" },
          { title: "分析結果の確認", description: "危険度、原因、主な要素を確認できます。" },
          {
            title: "保護ガイドの提供",
            description: "状況に合った保護方法と対応ガイドを提供します。",
          },
        ],
      },
      features: {
        title: "主な機能",
        hint: "カードをタップするとすぐに移動します",
        items: [
          { title: "AI証拠分析", description: "写真分析と結果レポート" },
          { title: "匿名相談", description: "24時間安心のチャットボット相談" },
          { title: "被害の通報", description: "対応手順とガイド" },
          { title: "ディープフェイク検出", description: "顔の盗用・合成の確認" },
        ],
      },
      cta: {
        line1: "一人で悩まないでください。",
        line2: [{ text: "Signal", brand: true }, { text: "が一緒に安全な解決方法を見つけます。" }],
        description: "AI分析から匿名相談、通報サポートまでひとつの場所でご利用いただけます。",
        button: "匿名相談を始める",
        note: "すべての相談内容は匿名で安全に保護されます。",
      },
      legal: {
        toc: "目次",
        translationNotice:
          "この翻訳は参考用です。韓国語版と内容が異なる場合は、韓国語版が優先されます。",
      },
      scrollToTop: "トップへ戻る",
    },
    zh: {
      nav: {
        analysis: "AI分析",
        support: "举报支持",
        detect: { title: "面部盗用·深度伪造检测", description: "检查是否存在面部盗用或深度伪造。" },
        analyze: { title: "AI图片分析", description: "分析照片的风险等级。" },
        monitoring: { title: "传播监测", description: "持续检查网络上的相似图片。" },
        chat: { title: "匿名咨询聊天机器人", description: "AI咨询师24小时为您提供咨询。" },
        report: { title: "举报支持", description: "协助撰写举报文件并对接相关机构。" },
      },
      header: {
        login: "登录",
        signup: "注册",
        signupToSave: "注册以保存记录",
        openMenu: "打开菜单",
        closeMenu: "关闭菜单",
        notifications: "通知",
        myMenu: "我的菜单",
        defaultUserName: "用户",
        myProfile: "我的资料",
        myChats: "我的对话记录",
        myReports: "举报文件记录",
        logout: "退出登录",
        language: "语言",
        homeLink: "Signal 首页",
      },
      bottomNav: {
        home: "首页",
        analysis: "分析",
        support: "咨询·举报",
        mypage: "我的",
        close: "关闭",
      },
      footer: {
        tagline: "借助AI技术预防和应对网络霸凌、深度伪造、面部盗用等网络风险。",
        services: "服务",
        privacy: "隐私政策",
        terms: "服务条款",
      },
      hero: {
        badge: "基于AI的深度伪造伤害预防·检测·应对",
        headline: [
          [{ text: "你发出的求助信号，" }],
          [{ text: "Signal", brand: true }, { text: " 以安全的日常回应你。" }],
        ],
        mobileHeadline: [
          [{ text: "你发出的求助信号，" }],
          [{ text: "Signal", brand: true }, { text: " 以安全的日常" }],
          [{ text: "回应你。" }],
        ],
        intro: [
          "从网络霸凌到深度伪造，独自难以承受时，请打开 Signal。",
          "借助AI技术快速、准确地分析证据，并提供量身定制的应对指南。",
        ],
        mobileIntro: ["从网络霸凌到深度伪造，", "不要独自烦恼，打开 Signal 吧。"],
        cta: "开始AI分析",
        sampleMessage: "当前图片是安全的。",
        scrollMore: "向下滚动了解更多",
        encrypted: "所有数据均经过加密并受到安全保护。",
      },
      whySignal: {
        title: [{ text: "为什么需要 " }, { text: "Signal", brand: true }],
        description: "面对网络上的各种风险，从预防到应对，Signal 始终与你同在。",
        items: [
          { title: "AI图片分析", description: "AI分析照片中的风险因素，判断是否安全。" },
          {
            title: "面部盗用·深度伪造检测",
            description: "快速、准确地分析是否存在面部盗用或AI合成。",
          },
          { title: "匿名咨询聊天机器人", description: "匿名咨询，获得适合你情况的应对方法。" },
          { title: "举报支持", description: "快速、轻松地协助完成举报流程和文件撰写。" },
        ],
        mobileTitle: "为什么选择 Signal？",
        mobileItems: [
          { title: "快速准确的AI分析", description: "即时识别有害内容并将其固定为证据。" },
          { title: "彻底保障匿名", description: "无需透露个人信息即可获得帮助。" },
          { title: "直接对接专家", description: "迅速为你对接法律和心理专家。" },
        ],
      },
      howItWorks: {
        title: "AI分析流程",
        description: "只需一张照片即可分析风险，并为你提供安全的应对方法。",
        steps: [
          { title: "上传图片", description: "上传需要分析的照片。" },
          { title: "AI风险分析", description: "AI分析风险因素和曝光可能性。" },
          { title: "查看分析结果", description: "查看风险等级、原因和主要因素。" },
          { title: "提供保护指南", description: "提供适合情况的保护方法和应对指南。" },
        ],
      },
      features: {
        title: "主要功能",
        hint: "点击卡片即可前往",
        items: [
          { title: "AI证据分析", description: "照片分析与结果报告" },
          { title: "匿名咨询", description: "24小时安全聊天机器人咨询" },
          { title: "伤害举报", description: "应对流程与指南" },
          { title: "深度伪造检测", description: "检查面部盗用与合成" },
        ],
      },
      cta: {
        line1: "不要独自烦恼。",
        line2: [{ text: "Signal", brand: true }, { text: " 会与你一起找到安全的解决办法。" }],
        description: "从AI分析到匿名咨询、举报支持，一站式使用。",
        button: "开始匿名咨询",
        note: "所有咨询内容均匿名并受到安全保护。",
      },
      legal: {
        toc: "目录",
        translationNotice: "本译文仅供参考。如与韩语版本内容不一致，以韩语版本为准。",
      },
      scrollToTop: "回到顶部",
    },
  },
);

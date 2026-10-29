import { defineMessages } from "@/shared/i18n/defineMessages";

export interface GuideStep {
  title: string;
  description: string;
}

export interface GuideCase {
  title: string;
  description: string;
  actions: string[];
}

export const guideMessages = defineMessages(
  {
    title: "신고 가이드",
    description: "피해를 발견했을 때 무엇부터 해야 하는지, 상황별로 차근차근 안내해 드립니다.",
    reportSupport: "신고 지원",
    stepsTitle: "신고 절차",
    casesTitle: "신고 사례",
    caseCount: (count: number) => `${count}가지 사례`,
    helpTitle: "도움이 필요하신가요?",
    helpDescription: "피해 상황에 맞는 전문 지원 기관을 바로 찾아 연결해 드려요.",
    helpButton: "전문 기관 연결",
    ctaTitle: "신고 문서가 필요하신가요?",
    ctaDescription: "기억나는 내용만 입력하면 기관에 제출하기 좋은 형태로 정리해 드려요.",
    ctaButton: "신고 지원 시작하기",
    shareLabel: "신고 가이드 공유하기",
    shareTitle: "Signal 신고 가이드",
    shareFailed: "공유하지 못했습니다.",
    linkCopied: "신고 가이드 링크를 복사했어요.",
    copyFailed: "링크를 복사하지 못했습니다.",
    steps: [
      {
        title: "증거 수집",
        description: "원본 파일, URL 주소, 게시 일시, 캡처 화면 등 객관적인 증거를 수집하세요.",
      },
      {
        title: "플랫폼 신고",
        description: "SNS나 포털 사이트의 자체 신고 기능을 사용하여 해당 게시물 차단을 요청합니다.",
      },
      {
        title: "수사기관 접수",
        description: "경찰청 사이버수사대 또는 가까운 경찰서를 방문하여 고소장을 접수합니다.",
      },
    ] as GuideStep[],
    cases: [
      {
        title: "얼굴 도용·딥페이크",
        description:
          "내 사진이나 얼굴이 동의 없이 다른 계정, 광고, 합성 이미지·영상에 사용된 경우입니다.",
        actions: [
          "도용된 게시물과 계정 주소를 캡처와 함께 저장해 두세요.",
          "원본 사진을 보관해 두면 도용 사실을 입증하는 데 도움이 됩니다.",
          "플랫폼의 사칭·초상권 침해 신고 기능으로 삭제를 요청하세요.",
        ],
      },
      {
        title: "지인 대상 합성물 제작·유포",
        description:
          "아는 사람이 내 얼굴을 합성한 이미지나 영상을 만들어 단체 대화방이나 SNS에 공유한 경우입니다.",
        actions: [
          "대화방 이름, 참여자, 공유 일시가 보이도록 화면을 캡처하세요.",
          "가해자에게 직접 따지기보다 증거를 먼저 확보하는 것이 안전합니다.",
          "유포 여부가 확실하지 않더라도 수사기관이나 전문 기관에 상담을 받아보세요.",
        ],
      },
      {
        title: "불법 촬영물·유포",
        description:
          "동의 없이 촬영된 사진·영상이나, 동의하에 촬영했더라도 동의 없이 유포된 경우입니다.",
        actions: [
          "유포된 사이트 주소와 게시 일시를 최대한 기록해 두세요.",
          "직접 내려받거나 재공유하지 말고 화면 캡처로만 증거를 남기세요.",
          "전문 지원 기관에 삭제 지원을 함께 요청할 수 있습니다.",
        ],
      },
      {
        title: "미성년자 대상 딥페이크 합성물",
        description:
          "미성년자의 얼굴을 이용한 합성물이 만들어지거나 공유된 경우로, 피해가 커지기 전에 빠른 대응이 특히 중요합니다.",
        actions: [
          "보호자나 학교 등 믿을 수 있는 어른에게 바로 알려주세요.",
          "혼자 대응하지 말고 수사기관과 전문 기관의 도움을 받으세요.",
          "증거로 남기더라도 합성물을 다른 사람에게 재전송하지 마세요.",
        ],
      },
      {
        title: "SNS/메신저 통한 협박",
        description: "합성물이나 사진을 퍼뜨리겠다며 돈, 추가 사진, 만남 등을 요구하는 경우입니다.",
        actions: [
          "요구에 응하지 마세요. 응할수록 요구가 커지는 경우가 많습니다.",
          "협박 메시지와 상대 계정 정보를 삭제하지 말고 그대로 보관하세요.",
          "긴급한 위협이 느껴지면 즉시 112에 신고하세요.",
        ],
      },
      {
        title: "재유포·2차 피해",
        description:
          "최초 유포된 촬영물이 삭제된 이후에도 다른 플랫폼을 통해 다시 공유되거나, 원본을 변형한 합성물이 지속적으로 배포되는 경우입니다. 이 경우 신속한 차단 지원이 최우선입니다.",
        actions: [
          "새로 발견한 주소를 날짜별로 정리해 두면 차단 요청이 빨라집니다.",
          "Signal의 유포 모니터링으로 유사 이미지를 계속 확인할 수 있어요.",
          "전문 기관의 지속적인 삭제 지원을 요청해 보세요.",
        ],
      },
    ] as GuideCase[],
  },
  {
    en: {
      title: "Report Guide",
      description:
        "Step-by-step guidance on what to do first when you discover harm, for each situation.",
      reportSupport: "Report Support",
      stepsTitle: "How to report",
      casesTitle: "Common cases",
      caseCount: (count) => `${count} cases`,
      helpTitle: "Need help?",
      helpDescription:
        "We'll find and connect you with a professional support agency for your situation.",
      helpButton: "Connect with an agency",
      ctaTitle: "Need a report document?",
      ctaDescription:
        "Just enter what you remember and we'll organize it into a form ready to submit.",
      ctaButton: "Start report support",
      shareLabel: "Share the report guide",
      shareTitle: "Signal Report Guide",
      shareFailed: "Couldn't share.",
      linkCopied: "Report guide link copied.",
      copyFailed: "Couldn't copy the link.",
      steps: [
        {
          title: "Collect evidence",
          description:
            "Gather objective evidence such as original files, URLs, posting times, and screenshots.",
        },
        {
          title: "Report to the platform",
          description:
            "Use the social media or portal's own report feature to request that the post be blocked.",
        },
        {
          title: "File with the police",
          description:
            "File a complaint with the National Police Agency's cyber investigation unit or your local police station.",
        },
      ],
      cases: [
        {
          title: "Face theft & deepfakes",
          description:
            "Your photo or face was used without consent in another account, an ad, or a synthesized image or video.",
          actions: [
            "Save the stolen post and account address along with screenshots.",
            "Keeping the original photo helps prove the theft.",
            "Request removal using the platform's impersonation or portrait-rights report feature.",
          ],
        },
        {
          title: "Synthetic content made or shared by someone you know",
          description:
            "Someone you know created an image or video with your face synthesized and shared it in a group chat or on social media.",
          actions: [
            "Take screenshots that show the chat name, participants, and when it was shared.",
            "It's safer to secure evidence first rather than confronting the person.",
            "Even if you're unsure whether it spread, consult the police or a professional agency.",
          ],
        },
        {
          title: "Illegal filming & distribution",
          description:
            "Photos or videos taken without consent, or taken with consent but shared without it.",
          actions: [
            "Record the site addresses and posting times as much as you can.",
            "Don't download or reshare it. Keep evidence only as screenshots.",
            "You can also ask a professional support agency to help with removal.",
          ],
        },
        {
          title: "Deepfakes of minors",
          description:
            "Synthetic content using a minor's face was created or shared. Acting quickly before the harm grows is especially important.",
          actions: [
            "Tell a trusted adult, such as a guardian or school, right away.",
            "Don't handle it alone. Get help from the police and professional agencies.",
            "Even when keeping evidence, never forward the content to anyone.",
          ],
        },
        {
          title: "Threats via social media or messengers",
          description:
            "Someone threatens to spread synthetic content or photos unless you give them money, more photos, or meet them.",
          actions: [
            "Don't give in. Demands often grow when you comply.",
            "Keep the threatening messages and the account information. Don't delete them.",
            "If you feel in immediate danger, call 112 right away.",
          ],
        },
        {
          title: "Re-distribution & secondary harm",
          description:
            "Content keeps being shared on other platforms even after the original was removed, or altered versions keep spreading. In this case, quick blocking support comes first.",
          actions: [
            "Organizing newly found addresses by date speeds up blocking requests.",
            "Signal's spread monitoring lets you keep checking for similar images.",
            "Ask a professional agency for ongoing removal support.",
          ],
        },
      ],
    },
    ja: {
      title: "通報ガイド",
      description: "被害を見つけたときにまず何をすべきか、状況別に順を追ってご案内します。",
      reportSupport: "通報サポート",
      stepsTitle: "通報の手順",
      casesTitle: "通報の事例",
      caseCount: (count) => `${count}件の事例`,
      helpTitle: "サポートが必要ですか？",
      helpDescription: "被害の状況に合った専門の支援機関をすぐに見つけておつなぎします。",
      helpButton: "専門機関につなぐ",
      ctaTitle: "通報書類が必要ですか？",
      ctaDescription: "覚えている内容を入力するだけで、機関に提出しやすい形に整理します。",
      ctaButton: "通報サポートを始める",
      shareLabel: "通報ガイドを共有する",
      shareTitle: "Signal 通報ガイド",
      shareFailed: "共有できませんでした。",
      linkCopied: "通報ガイドのリンクをコピーしました。",
      copyFailed: "リンクをコピーできませんでした。",
      steps: [
        {
          title: "証拠の収集",
          description:
            "元のファイル、URL、投稿日時、スクリーンショットなどの客観的な証拠を集めましょう。",
        },
        {
          title: "プラットフォームへの通報",
          description: "SNSやポータルサイトの通報機能を使って、該当投稿のブロックを求めます。",
        },
        {
          title: "捜査機関への届け出",
          description: "警察庁サイバー捜査隊または最寄りの警察署を訪れ、告訴状を提出します。",
        },
      ],
      cases: [
        {
          title: "顔の盗用・ディープフェイク",
          description:
            "自分の写真や顔が同意なく別のアカウントや広告、合成画像・動画に使われた場合です。",
          actions: [
            "盗用された投稿とアカウントのURLをスクリーンショットと一緒に保存しましょう。",
            "元の写真を保管しておくと、盗用の事実を証明するのに役立ちます。",
            "プラットフォームのなりすまし・肖像権侵害の通報機能で削除を求めましょう。",
          ],
        },
        {
          title: "知人による合成物の作成・拡散",
          description:
            "知り合いが自分の顔を合成した画像や動画を作り、グループチャットやSNSで共有した場合です。",
          actions: [
            "チャット名、参加者、共有日時がわかるように画面をキャプチャしましょう。",
            "加害者を直接問い詰めるより、先に証拠を確保するほうが安全です。",
            "拡散されたかはっきりしなくても、捜査機関や専門機関に相談してみましょう。",
          ],
        },
        {
          title: "盗撮・不正な拡散",
          description:
            "同意なく撮影された写真・動画、または同意のうえで撮影しても同意なく拡散された場合です。",
          actions: [
            "拡散されたサイトのURLと投稿日時をできるだけ記録しておきましょう。",
            "自分でダウンロードしたり再共有したりせず、スクリーンショットだけで証拠を残しましょう。",
            "専門の支援機関に削除のサポートもあわせて依頼できます。",
          ],
        },
        {
          title: "未成年者を対象としたディープフェイク",
          description:
            "未成年者の顔を使った合成物が作られたり共有されたりした場合で、被害が広がる前の迅速な対応が特に重要です。",
          actions: [
            "保護者や学校など、信頼できる大人にすぐに伝えてください。",
            "一人で対応せず、捜査機関や専門機関の助けを借りましょう。",
            "証拠として残す場合でも、合成物を他の人に転送しないでください。",
          ],
        },
        {
          title: "SNS・メッセンジャーでの脅迫",
          description:
            "合成物や写真をばらまくと脅して、お金や追加の写真、面会などを要求される場合です。",
          actions: [
            "要求に応じないでください。応じるほど要求がエスカレートすることが多いです。",
            "脅迫メッセージと相手のアカウント情報は削除せずにそのまま保管しましょう。",
            "差し迫った危険を感じたら、すぐに112に通報してください。",
          ],
        },
        {
          title: "再拡散・二次被害",
          description:
            "最初に拡散された画像や動画が削除された後も別のプラットフォームで再び共有されたり、元の画像を加工した合成物が拡散され続けたりする場合です。この場合は迅速なブロック対応が最優先です。",
          actions: [
            "新たに見つけたURLを日付ごとに整理しておくと、ブロック依頼が早く進みます。",
            "Signalの拡散モニタリングで類似画像を継続的に確認できます。",
            "専門機関に継続的な削除サポートを依頼してみましょう。",
          ],
        },
      ],
    },
    zh: {
      title: "举报指南",
      description: "发现伤害时应先做什么，我们会按情况一步步为你说明。",
      reportSupport: "举报支持",
      stepsTitle: "举报流程",
      casesTitle: "举报案例",
      caseCount: (count) => `${count}种案例`,
      helpTitle: "需要帮助吗？",
      helpDescription: "我们会根据你的情况，立即为你寻找并对接专业支援机构。",
      helpButton: "对接专业机构",
      ctaTitle: "需要举报文件吗？",
      ctaDescription: "只需输入你记得的内容，我们会整理成便于提交给机构的形式。",
      ctaButton: "开始举报支持",
      shareLabel: "分享举报指南",
      shareTitle: "Signal 举报指南",
      shareFailed: "分享失败。",
      linkCopied: "已复制举报指南链接。",
      copyFailed: "复制链接失败。",
      steps: [
        { title: "收集证据", description: "收集原始文件、URL、发布时间、截图等客观证据。" },
        {
          title: "向平台举报",
          description: "使用社交媒体或门户网站自带的举报功能，请求屏蔽相关帖子。",
        },
        { title: "向警方报案", description: "前往警察厅网络调查队或附近的警察局提交诉状。" },
      ],
      cases: [
        {
          title: "面部盗用·深度伪造",
          description: "你的照片或面部在未经同意的情况下被用于其他账号、广告或合成图片·视频。",
          actions: [
            "将被盗用的帖子和账号地址连同截图一起保存。",
            "保留原始照片有助于证明被盗用的事实。",
            "通过平台的冒充·肖像权侵害举报功能请求删除。",
          ],
        },
        {
          title: "熟人制作·传播合成内容",
          description: "认识的人用你的面部合成图片或视频，并在群聊或社交媒体上分享。",
          actions: [
            "截图时请确保能看到聊天群名称、参与者和分享时间。",
            "比起直接质问对方，先保全证据更安全。",
            "即使不确定是否已被传播，也可以先咨询警方或专业机构。",
          ],
        },
        {
          title: "非法拍摄·传播",
          description: "未经同意拍摄的照片·视频，或虽经同意拍摄但未经同意被传播的情况。",
          actions: [
            "尽可能记录被传播的网站地址和发布时间。",
            "不要自行下载或转发，只用截图保留证据。",
            "也可以请专业支援机构协助删除。",
          ],
        },
        {
          title: "针对未成年人的深度伪造",
          description:
            "利用未成年人面部的合成内容被制作或分享的情况，在伤害扩大前迅速应对尤为重要。",
          actions: [
            "请立即告诉监护人或学校等值得信赖的成年人。",
            "不要独自应对，请寻求警方和专业机构的帮助。",
            "即使是为了保留证据，也不要把合成内容转发给他人。",
          ],
        },
        {
          title: "通过社交媒体·即时通讯威胁",
          description: "对方威胁要散布合成内容或照片，以此索要金钱、更多照片或要求见面。",
          actions: [
            "不要答应要求。越是答应，要求往往会越多。",
            "不要删除威胁信息和对方账号信息，请原样保存。",
            "如果感到紧迫的威胁，请立即拨打112报警。",
          ],
        },
        {
          title: "再次传播·二次伤害",
          description:
            "最初传播的内容被删除后，仍通过其他平台再次被分享，或经过修改的合成内容持续被散布的情况。此时最重要的是迅速获得屏蔽支持。",
          actions: [
            "将新发现的地址按日期整理，可以加快屏蔽请求。",
            "可以通过 Signal 的传播监测持续检查相似图片。",
            "请专业机构提供持续的删除支持。",
          ],
        },
      ],
    },
  },
);

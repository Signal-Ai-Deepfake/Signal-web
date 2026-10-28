import { defineMessages } from "@/shared/i18n/defineMessages";

type SectionId =
  | "collectedData"
  | "purpose"
  | "retention"
  | "thirdParty"
  | "outsourcing"
  | "rights"
  | "security"
  | "consultationData"
  | "contact";

interface PrivacyText {
  title: string;
  description: string;
  toc: Record<SectionId, string>;
  sections: Record<SectionId, string>;
  collectedIntro: string;
  tableCategory: string;
  tableItems: string;
  collectedRows: { label: string; value: string }[];
  purposeItems: string[];
  retention: string;
  deletedRecords: { title: string; description: string };
  thirdParty: string;
  outsourcing: string;
  rights: string;
  securityItems: string[];
  consultationItems: { heading: string; description: string }[];
  contact: string;
}

export const privacyMessages = defineMessages<PrivacyText>(
  {
    title: "개인정보처리방침",
    description: "SIGNAL은 이용자의 개인정보를 소중하게 보호하고, 처리 과정을 투명하게 안내합니다.",
    toc: {
      collectedData: "1. 처리하는 개인정보",
      purpose: "2. 이용 목적",
      retention: "3. 보유 기간",
      thirdParty: "4. 제3자 제공",
      outsourcing: "5. 처리 업무 위탁",
      rights: "6. 이용자의 권리",
      security: "7. 안전성 확보 조치",
      consultationData: "8. 상담 및 분석 데이터",
      contact: "9. 문의 및 변경 안내",
    },
    sections: {
      collectedData: "1. 처리하는 개인정보",
      purpose: "2. 개인정보 이용 목적",
      retention: "3. 보유 및 이용 기간",
      thirdParty: "4. 개인정보의 제3자 제공",
      outsourcing: "5. 개인정보 처리 업무의 위탁",
      rights: "6. 이용자의 권리와 행사 방법",
      security: "7. 개인정보의 안전성 확보 조치",
      consultationData: "8. 상담 및 분석 데이터 처리",
      contact: "9. 문의 및 방침 변경 안내",
    },
    collectedIntro:
      "서비스는 회원가입, 기록 저장 및 문의 처리를 위해 필요한 범위에서 개인정보를 처리합니다.",
    tableCategory: "구분",
    tableItems: "처리 항목",
    collectedRows: [
      { label: "회원 정보", value: "이름, 이메일, 생년월일, 성별, 프로필 사진" },
      {
        label: "서비스 이용 정보",
        value: "분석·탐지 기록, 저장에 동의한 상담 내역, 신고 문서 내역",
      },
      { label: "자동 생성 정보", value: "접속 기록, 브라우저 및 기기 정보, 서비스 이용 시간" },
    ],
    purposeItems: [
      "회원 식별 및 계정 관리",
      "AI 이미지 분석과 딥페이크 탐지 결과 제공",
      "동의한 상담 및 신고 문서 내역 저장",
      "오류 확인, 보안 유지 및 서비스 개선",
      "문의 대응과 서비스 관련 안내",
    ],
    retention:
      "개인정보는 이용 목적이 달성되면 지체 없이 삭제합니다. 회원 정보는 회원 탈퇴 시까지 보관하며, 관계 법령에 따라 보존 의무가 있는 정보는 정해진 기간 동안 별도로 보관합니다.",
    deletedRecords: {
      title: "사용자가 삭제한 기록",
      description:
        "삭제한 상담 내역, 분석 결과 및 신고 문서는 복구할 수 없도록 처리하는 것을 원칙으로 합니다.",
    },
    thirdParty:
      "원칙적으로 이용자의 개인정보를 외부에 제공하지 않습니다. 법률에 특별한 규정이 있거나 이용자가 사전에 동의한 경우에만 필요한 범위에서 제공합니다.",
    outsourcing:
      "서버 운영, 데이터 보관 또는 본인 인증 업무를 전문 업체에 위탁할 수 있습니다. 위탁이 확정되면 수탁 업체와 업무 내용을 이 방침에 공개합니다.",
    rights:
      "이용자는 개인정보를 조회하거나 수정할 수 있으며, 저장 기록 삭제와 회원 탈퇴를 요청할 수 있습니다. 내 프로필 또는 서비스 문의 채널에서 처리할 수 있습니다.",
    securityItems: [
      "개인정보 접근 권한 최소화 및 접근 기록 관리",
      "전송 구간과 중요 정보 암호화",
      "보안 취약점 점검 및 비정상 접근 모니터링",
      "개인정보 취급자 교육과 내부 관리 절차 운영",
    ],
    consultationItems: [
      {
        heading: "익명 상담",
        description:
          "상담 내용은 기본적으로 저장하지 않으며, 사용자가 저장에 동의한 경우에만 계정의 대화 내역에 보관합니다.",
      },
      {
        heading: "이미지 및 영상 분석",
        description:
          "업로드한 파일은 분석 결과 제공에 필요한 범위에서 처리합니다. 저장 여부와 삭제 시점은 서버 정책 확정 후 구체적으로 안내합니다.",
      },
      {
        heading: "전문 기관 연결",
        description:
          "전화 연결이나 외부 홈페이지 이동 시 해당 기관의 개인정보처리방침이 적용됩니다.",
      },
    ],
    contact:
      "개인정보 관련 문의는 서비스 내 문의 채널을 통해 접수할 수 있습니다. 방침이 변경되는 경우 시행일 전에 서비스 공지사항으로 안내합니다.",
  },
  {
    en: {
      title: "Privacy Policy",
      description:
        "SIGNAL values and protects your personal information and explains clearly how it is processed.",
      toc: {
        collectedData: "1. Information we process",
        purpose: "2. Purposes of use",
        retention: "3. Retention period",
        thirdParty: "4. Disclosure to third parties",
        outsourcing: "5. Outsourced processing",
        rights: "6. Your rights",
        security: "7. Security measures",
        consultationData: "8. Chat and analysis data",
        contact: "9. Contact and changes",
      },
      sections: {
        collectedData: "1. Personal information we process",
        purpose: "2. Purposes of using personal information",
        retention: "3. Retention and use period",
        thirdParty: "4. Disclosure of personal information to third parties",
        outsourcing: "5. Outsourcing of personal information processing",
        rights: "6. Your rights and how to exercise them",
        security: "7. Measures to keep personal information secure",
        consultationData: "8. Handling of chat and analysis data",
        contact: "9. Contact and policy changes",
      },
      collectedIntro:
        "We process personal information only to the extent needed for sign-up, saving your records, and handling inquiries.",
      tableCategory: "Category",
      tableItems: "Information processed",
      collectedRows: [
        {
          label: "Account information",
          value: "Name, email, date of birth, gender, profile photo",
        },
        {
          label: "Service usage information",
          value:
            "Analysis and detection history, chat history you agreed to save, report document history",
        },
        {
          label: "Automatically generated information",
          value: "Access logs, browser and device information, service usage time",
        },
      ],
      purposeItems: [
        "Identifying members and managing accounts",
        "Providing AI image analysis and deepfake detection results",
        "Saving chat and report document history you agreed to keep",
        "Checking errors, maintaining security, and improving the service",
        "Responding to inquiries and sending service-related notices",
      ],
      retention:
        "We delete personal information without delay once its purpose has been fulfilled. Account information is kept until you delete your account, and information that must be preserved under applicable laws is stored separately for the required period.",
      deletedRecords: {
        title: "Records you delete",
        description:
          "As a rule, chat history, analysis results, and report documents you delete are processed so that they cannot be recovered.",
      },
      thirdParty:
        "As a rule, we do not provide your personal information to outside parties. We provide it only to the extent necessary when required by law or when you have given prior consent.",
      outsourcing:
        "We may entrust server operation, data storage, or identity verification to specialized companies. Once outsourcing is confirmed, we will disclose the contractors and their tasks in this policy.",
      rights:
        "You can view or correct your personal information and request deletion of saved records or of your account. You can do this from My Profile or through the service's inquiry channel.",
      securityItems: [
        "Minimizing access to personal information and keeping access logs",
        "Encrypting data in transit and sensitive information",
        "Checking for security vulnerabilities and monitoring abnormal access",
        "Training staff who handle personal information and running internal management procedures",
      ],
      consultationItems: [
        {
          heading: "Anonymous chat",
          description:
            "Chat content is not saved by default. It is kept in your account's chat history only if you agree to save it.",
        },
        {
          heading: "Image and video analysis",
          description:
            "Uploaded files are processed only as needed to provide analysis results. Whether they are stored and when they are deleted will be specified once the server policy is finalized.",
        },
        {
          heading: "Connecting to agencies",
          description:
            "When you call an agency or visit its website, that agency's own privacy policy applies.",
        },
      ],
      contact:
        "You can send privacy-related inquiries through the service's inquiry channel. If this policy changes, we will announce it in service notices before the effective date.",
    },
    ja: {
      title: "プライバシーポリシー",
      description:
        "SIGNALは利用者の個人情報を大切に保護し、その取り扱いについて分かりやすくご案内します。",
      toc: {
        collectedData: "1. 取り扱う個人情報",
        purpose: "2. 利用目的",
        retention: "3. 保有期間",
        thirdParty: "4. 第三者への提供",
        outsourcing: "5. 業務の委託",
        rights: "6. 利用者の権利",
        security: "7. 安全管理措置",
        consultationData: "8. 相談・分析データ",
        contact: "9. お問い合わせと変更のお知らせ",
      },
      sections: {
        collectedData: "1. 取り扱う個人情報",
        purpose: "2. 個人情報の利用目的",
        retention: "3. 保有および利用期間",
        thirdParty: "4. 個人情報の第三者への提供",
        outsourcing: "5. 個人情報の取り扱い業務の委託",
        rights: "6. 利用者の権利とその行使方法",
        security: "7. 個人情報の安全管理措置",
        consultationData: "8. 相談・分析データの取り扱い",
        contact: "9. お問い合わせとポリシー変更のお知らせ",
      },
      collectedIntro:
        "本サービスは、会員登録、記録の保存、お問い合わせへの対応に必要な範囲で個人情報を取り扱います。",
      tableCategory: "区分",
      tableItems: "取り扱う項目",
      collectedRows: [
        { label: "会員情報", value: "氏名、メールアドレス、生年月日、性別、プロフィール写真" },
        {
          label: "サービス利用情報",
          value: "分析・検出の記録、保存に同意した相談履歴、通報書類の履歴",
        },
        {
          label: "自動生成情報",
          value: "アクセス記録、ブラウザおよび端末の情報、サービス利用時間",
        },
      ],
      purposeItems: [
        "会員の識別およびアカウント管理",
        "AI画像分析とディープフェイク検出結果の提供",
        "同意を得た相談履歴および通報書類の保存",
        "エラーの確認、セキュリティの維持およびサービスの改善",
        "お問い合わせへの対応とサービスに関するご案内",
      ],
      retention:
        "個人情報は利用目的を達成した後、遅滞なく削除します。会員情報は退会するまで保管し、関係法令により保存義務がある情報は定められた期間、別途保管します。",
      deletedRecords: {
        title: "利用者が削除した記録",
        description:
          "削除された相談履歴、分析結果および通報書類は、復元できないよう処理することを原則とします。",
      },
      thirdParty:
        "原則として、利用者の個人情報を外部に提供しません。法律に特別な定めがある場合、または利用者の事前の同意がある場合に限り、必要な範囲で提供します。",
      outsourcing:
        "サーバー運用、データ保管または本人確認の業務を専門業者に委託する場合があります。委託が確定した場合は、委託先と業務内容を本ポリシーで公開します。",
      rights:
        "利用者は個人情報を照会・訂正でき、保存された記録の削除や退会を求めることができます。マイプロフィールまたはサービスのお問い合わせ窓口から手続きできます。",
      securityItems: [
        "個人情報へのアクセス権限の最小化とアクセス記録の管理",
        "通信区間および重要情報の暗号化",
        "セキュリティ脆弱性の点検と不正アクセスの監視",
        "個人情報取扱者への教育と内部管理手続きの運用",
      ],
      consultationItems: [
        {
          heading: "匿名相談",
          description:
            "相談内容は原則として保存しません。利用者が保存に同意した場合に限り、アカウントの会話履歴に保管します。",
        },
        {
          heading: "画像・動画の分析",
          description:
            "アップロードされたファイルは、分析結果の提供に必要な範囲で取り扱います。保存の有無と削除の時期は、サーバーのポリシー確定後に具体的にご案内します。",
        },
        {
          heading: "専門機関へのおつなぎ",
          description:
            "電話でのおつなぎや外部サイトへの移動の際は、その機関のプライバシーポリシーが適用されます。",
        },
      ],
      contact:
        "個人情報に関するお問い合わせは、サービス内のお問い合わせ窓口で受け付けています。本ポリシーを変更する場合は、施行日より前にサービスのお知らせでご案内します。",
    },
    zh: {
      title: "隐私政策",
      description: "SIGNAL 珍视并保护你的个人信息，并清晰说明其处理过程。",
      toc: {
        collectedData: "1. 处理的个人信息",
        purpose: "2. 使用目的",
        retention: "3. 保存期限",
        thirdParty: "4. 向第三方提供",
        outsourcing: "5. 委托处理",
        rights: "6. 用户的权利",
        security: "7. 安全保障措施",
        consultationData: "8. 咨询与分析数据",
        contact: "9. 咨询与变更通知",
      },
      sections: {
        collectedData: "1. 处理的个人信息",
        purpose: "2. 个人信息的使用目的",
        retention: "3. 保存及使用期限",
        thirdParty: "4. 向第三方提供个人信息",
        outsourcing: "5. 个人信息处理业务的委托",
        rights: "6. 用户的权利及行使方式",
        security: "7. 个人信息安全保障措施",
        consultationData: "8. 咨询与分析数据的处理",
        contact: "9. 咨询与政策变更通知",
      },
      collectedIntro: "本服务仅在注册会员、保存记录及处理咨询所需的范围内处理个人信息。",
      tableCategory: "类别",
      tableItems: "处理项目",
      collectedRows: [
        { label: "会员信息", value: "姓名、电子邮箱、出生日期、性别、头像" },
        { label: "服务使用信息", value: "分析与检测记录、同意保存的咨询记录、举报文件记录" },
        { label: "自动生成信息", value: "访问记录、浏览器及设备信息、服务使用时间" },
      ],
      purposeItems: [
        "识别会员及管理账号",
        "提供AI图片分析与深度伪造检测结果",
        "保存经同意的咨询记录及举报文件记录",
        "排查错误、维护安全及改进服务",
        "回复咨询并发送服务相关通知",
      ],
      retention:
        "个人信息在使用目的达成后将立即删除。会员信息保存至注销账号为止；根据相关法律法规须保存的信息，将在规定期限内另行保存。",
      deletedRecords: {
        title: "用户删除的记录",
        description: "原则上，已删除的咨询记录、分析结果及举报文件将被处理为无法恢复。",
      },
      thirdParty:
        "原则上不向外部提供用户的个人信息。仅在法律有特别规定或用户事先同意的情况下，在必要范围内提供。",
      outsourcing:
        "服务器运营、数据保管或身份验证业务可能委托给专业公司。委托确定后，将在本政策中公开受托公司及业务内容。",
      rights:
        "用户可以查询或修改个人信息，也可以申请删除已保存的记录或注销账号。可在“我的资料”或服务咨询渠道中办理。",
      securityItems: [
        "最小化个人信息访问权限并管理访问记录",
        "对传输过程及重要信息进行加密",
        "检查安全漏洞并监控异常访问",
        "对个人信息处理人员进行培训并执行内部管理流程",
      ],
      consultationItems: [
        {
          heading: "匿名咨询",
          description: "咨询内容默认不保存，仅在用户同意保存时才保存在账号的对话记录中。",
        },
        {
          heading: "图片与视频分析",
          description:
            "上传的文件仅在提供分析结果所需的范围内处理。是否保存及删除时间将在服务器政策确定后具体说明。",
        },
        {
          heading: "对接专业机构",
          description: "通过电话联系或跳转至外部网站时，将适用该机构的隐私政策。",
        },
      ],
      contact:
        "个人信息相关咨询可通过服务内的咨询渠道提交。如本政策发生变更，将在生效日前通过服务公告进行通知。",
    },
  },
);

import { defineMessages } from "@/shared/i18n/defineMessages";

type SectionId =
  | "purpose"
  | "effect"
  | "account"
  | "service"
  | "obligation"
  | "limitation"
  | "records"
  | "restriction"
  | "liability";

interface TermsText {
  title: string;
  description: string;
  toc: Record<SectionId, string>;
  sections: Record<SectionId, string>;
  purpose: string;
  definitions: { term: string; definition: string }[];
  effect: string;
  account: string;
  anonymousChat: { title: string; description: string };
  serviceItems: string[];
  serviceNote: string;
  obligation: string;
  obligationItems: string[];
  limitation: string;
  important: { title: string; description: string };
  records: string;
  restriction: string;
  liability: string;
}

export const termsMessages = defineMessages<TermsText>(
  {
    title: "이용약관",
    description: "SIGNAL 서비스 이용에 필요한 권리, 의무 및 유의사항을 안내합니다.",
    toc: {
      purpose: "1. 목적과 용어",
      effect: "2. 약관의 효력과 변경",
      account: "3. 계정과 비회원 이용",
      service: "4. 서비스 내용",
      obligation: "5. 이용자의 의무",
      limitation: "6. AI 결과의 한계",
      records: "7. 기록 저장과 삭제",
      restriction: "8. 서비스 제한",
      liability: "9. 책임과 분쟁",
    },
    sections: {
      purpose: "1. 목적과 용어",
      effect: "2. 약관의 효력과 변경",
      account: "3. 계정과 비회원 이용",
      service: "4. 서비스 내용",
      obligation: "5. 이용자의 의무",
      limitation: "6. AI 분석 결과의 한계",
      records: "7. 기록 저장과 삭제",
      restriction: "8. 서비스 이용 제한과 중단",
      liability: "9. 책임과 분쟁 해결",
    },
    purpose:
      "이 약관은 SIGNAL이 제공하는 AI 이미지 분석, 얼굴 도용·딥페이크 탐지, 익명 상담, 신고 문서 작성 및 기관 안내 서비스의 이용 조건을 정합니다.",
    definitions: [
      { term: "회원", definition: "계정을 생성하고 서비스를 이용하는 사람" },
      { term: "비회원", definition: "계정 없이 허용된 범위의 서비스를 이용하는 사람" },
      {
        term: "분석 결과",
        definition: "AI가 입력 자료를 바탕으로 제공하는 확률, 점수, 설명 및 권장사항",
      },
    ],
    effect:
      "이 약관은 서비스 화면에 게시하거나 이용자에게 안내한 시점부터 적용됩니다. 관련 법령이나 서비스 정책 변경이 필요한 경우 약관을 수정할 수 있으며, 중요한 변경은 시행 전에 알립니다.",
    account:
      "일부 분석, 상담 및 기관 안내 기능은 비회원에게 제공될 수 있습니다. 분석 결과 저장, 상담 내역 저장, 신고 문서 보관 등 계정에 기록이 귀속되는 기능은 로그인이 필요할 수 있습니다.",
    anonymousChat: {
      title: "익명 상담 안내",
      description:
        "상담 중 이름을 표시하지 않더라도 사용자가 저장에 동의하면 해당 대화는 로그인 계정에 연결될 수 있습니다.",
    },
    serviceItems: [
      "사진 속 개인정보 및 노출 위험 요소 분석",
      "얼굴 도용과 딥페이크 가능성 탐지",
      "피해 상황에 대한 AI 상담과 대응 절차 안내",
      "기관 제출용 신고 문서 초안 작성",
      "상담 및 신고 기관 안내",
    ],
    serviceNote: "서비스의 구체적인 내용과 제공 범위는 운영 상황에 따라 변경될 수 있습니다.",
    obligation:
      "이용자는 타인의 권리를 침해하거나 법령에 위반되는 목적으로 서비스를 이용해서는 안 됩니다.",
    obligationItems: [
      "타인의 자료를 정당한 권한 없이 업로드하는 행위",
      "분석 결과를 타인을 비방하거나 위협하는 근거로 사용하는 행위",
      "서비스 운영을 방해하거나 보안 체계를 우회하는 행위",
      "허위 정보로 신고 문서를 작성하는 행위",
    ],
    limitation:
      "AI가 제공하는 확률, 신뢰도 및 위험도는 입력 자료를 바탕으로 계산한 참고 정보입니다. 실제 얼굴 도용, 합성 여부, 범죄 성립 또는 피해 사실을 확정하는 결과가 아닙니다.",
    important: {
      title: "중요",
      description:
        "긴급한 위험이 있거나 법적 판단이 필요한 경우 경찰, 전문 상담 기관 또는 법률 전문가의 도움을 받아야 합니다.",
    },
    records:
      "비회원 이용 기록은 계정 내역으로 자동 이전되지 않을 수 있습니다. 회원은 저장된 분석 결과, 상담 내역 및 신고 문서를 삭제할 수 있으며, 삭제한 정보는 복구되지 않을 수 있습니다.",
    restriction:
      "시스템 점검, 장애, 보안 위협 또는 운영상 필요한 사유가 발생하면 서비스의 전부 또는 일부가 일시적으로 제한될 수 있습니다. 이용자가 약관을 위반하는 경우에도 이용을 제한할 수 있습니다.",
    liability:
      "SIGNAL은 관련 법령을 준수하고 합리적인 보호 조치를 수행합니다. 다만 이용자가 AI 결과만을 근거로 내린 판단이나 외부 기관의 처리 결과까지 보장하지 않습니다. 분쟁은 협의를 우선하며, 해결되지 않는 경우 관련 법령과 관할 법원의 절차를 따릅니다.",
  },
  {
    en: {
      title: "Terms of Service",
      description:
        "These terms explain the rights, obligations, and important notes for using SIGNAL.",
      toc: {
        purpose: "1. Purpose and definitions",
        effect: "2. Effect and changes",
        account: "3. Accounts and guest use",
        service: "4. Service description",
        obligation: "5. User obligations",
        limitation: "6. Limits of AI results",
        records: "7. Saving and deleting records",
        restriction: "8. Service restrictions",
        liability: "9. Liability and disputes",
      },
      sections: {
        purpose: "1. Purpose and definitions",
        effect: "2. Effect and changes to these Terms",
        account: "3. Accounts and guest use",
        service: "4. Service description",
        obligation: "5. User obligations",
        limitation: "6. Limits of AI analysis results",
        records: "7. Saving and deleting records",
        restriction: "8. Restriction and suspension of service",
        liability: "9. Liability and dispute resolution",
      },
      purpose:
        "These Terms set out the conditions for using SIGNAL's AI image analysis, face theft and deepfake detection, anonymous counseling, report document drafting, and agency guidance services.",
      definitions: [
        { term: "Member", definition: "A person who creates an account and uses the Service" },
        {
          term: "Guest",
          definition: "A person who uses the permitted parts of the Service without an account",
        },
        {
          term: "Analysis results",
          definition:
            "Probabilities, scores, explanations, and recommendations the AI provides based on the submitted material",
        },
      ],
      effect:
        "These Terms apply from the time they are posted on the Service or communicated to users. We may revise them when required by law or changes in service policy, and we will notify you of important changes before they take effect.",
      account:
        "Some analysis, counseling, and agency guidance features may be available to guests. Features that attach records to an account, such as saving analysis results, chat history, or report documents, may require signing in.",
      anonymousChat: {
        title: "About anonymous chat",
        description:
          "Even if your name is not shown during a chat, the conversation may be linked to your signed-in account if you agree to save it.",
      },
      serviceItems: [
        "Analysis of personal information and exposure risks in photos",
        "Detection of possible face theft and deepfakes",
        "AI counseling and guidance on how to respond to harm",
        "Drafting report documents for submission to agencies",
        "Guidance on counseling and reporting agencies",
      ],
      serviceNote:
        "The specific content and scope of the Service may change depending on operating conditions.",
      obligation:
        "You must not use the Service to infringe on the rights of others or for purposes that violate the law.",
      obligationItems: [
        "Uploading someone else's material without proper authorization",
        "Using analysis results as grounds to defame or threaten others",
        "Interfering with the Service or circumventing its security",
        "Creating report documents with false information",
      ],
      limitation:
        "Probabilities, confidence levels, and risk levels provided by the AI are reference information calculated from the submitted material. They do not confirm actual face theft, synthesis, the commission of a crime, or the occurrence of harm.",
      important: {
        title: "Important",
        description:
          "If you are in urgent danger or need a legal judgment, seek help from the police, a professional counseling agency, or a legal expert.",
      },
      records:
        "Records from guest use may not be transferred to your account automatically. Members can delete saved analysis results, chat history, and report documents, and deleted information may not be recoverable.",
      restriction:
        "All or part of the Service may be temporarily restricted due to system maintenance, outages, security threats, or other operational needs. We may also restrict use if you violate these Terms.",
      liability:
        "SIGNAL complies with applicable laws and takes reasonable protective measures. However, we do not guarantee decisions you make based solely on AI results or the outcomes of external agencies' handling. Disputes will first be resolved through discussion; if unresolved, they will follow the procedures of applicable laws and the competent court.",
    },
    ja: {
      title: "利用規約",
      description: "SIGNALのサービス利用に必要な権利、義務および注意事項をご案内します。",
      toc: {
        purpose: "1. 目的と用語",
        effect: "2. 規約の効力と変更",
        account: "3. アカウントと非会員利用",
        service: "4. サービスの内容",
        obligation: "5. 利用者の義務",
        limitation: "6. AI結果の限界",
        records: "7. 記録の保存と削除",
        restriction: "8. サービスの制限",
        liability: "9. 責任と紛争",
      },
      sections: {
        purpose: "1. 目的と用語",
        effect: "2. 規約の効力と変更",
        account: "3. アカウントと非会員の利用",
        service: "4. サービスの内容",
        obligation: "5. 利用者の義務",
        limitation: "6. AI分析結果の限界",
        records: "7. 記録の保存と削除",
        restriction: "8. サービスの利用制限と中断",
        liability: "9. 責任と紛争の解決",
      },
      purpose:
        "本規約は、SIGNALが提供するAI画像分析、顔の盗用・ディープフェイク検出、匿名相談、通報書類の作成および機関案内サービスの利用条件を定めます。",
      definitions: [
        { term: "会員", definition: "アカウントを作成してサービスを利用する人" },
        { term: "非会員", definition: "アカウントなしで、許可された範囲のサービスを利用する人" },
        {
          term: "分析結果",
          definition: "AIが入力資料をもとに提供する確率、スコア、説明およびおすすめ事項",
        },
      ],
      effect:
        "本規約は、サービス画面に掲示した時点または利用者に案内した時点から適用されます。関係法令やサービスポリシーの変更が必要な場合は規約を改定することがあり、重要な変更は施行前にお知らせします。",
      account:
        "一部の分析、相談および機関案内の機能は非会員にも提供される場合があります。分析結果の保存、相談履歴の保存、通報書類の保管など、記録がアカウントに紐づく機能はログインが必要な場合があります。",
      anonymousChat: {
        title: "匿名相談について",
        description:
          "相談中に名前を表示しない場合でも、利用者が保存に同意すると、その会話はログイン中のアカウントに紐づけられることがあります。",
      },
      serviceItems: [
        "写真に含まれる個人情報や露出リスクの分析",
        "顔の盗用とディープフェイクの可能性の検出",
        "被害状況に関するAI相談と対応手順のご案内",
        "機関提出用の通報書類の下書き作成",
        "相談・通報機関のご案内",
      ],
      serviceNote: "サービスの具体的な内容と提供範囲は、運営状況に応じて変更される場合があります。",
      obligation:
        "利用者は、他人の権利を侵害する目的や法令に違反する目的でサービスを利用してはなりません。",
      obligationItems: [
        "正当な権限なく他人の資料をアップロードする行為",
        "分析結果を他人を誹謗中傷・脅迫する根拠として利用する行為",
        "サービスの運営を妨げ、またはセキュリティを回避する行為",
        "虚偽の情報で通報書類を作成する行為",
      ],
      limitation:
        "AIが提供する確率、信頼度および危険度は、入力資料をもとに算出した参考情報です。実際の顔の盗用、合成の有無、犯罪の成立または被害の事実を確定するものではありません。",
      important: {
        title: "重要",
        description:
          "緊急の危険がある場合や法的な判断が必要な場合は、警察、専門の相談機関または法律の専門家に相談してください。",
      },
      records:
        "非会員として利用した記録は、アカウントの履歴に自動で移行されない場合があります。会員は保存された分析結果、相談履歴および通報書類を削除でき、削除した情報は復元できない場合があります。",
      restriction:
        "システムの点検、障害、セキュリティ上の脅威または運営上必要な事由が生じた場合、サービスの全部または一部が一時的に制限されることがあります。利用者が本規約に違反した場合も利用を制限することがあります。",
      liability:
        "SIGNALは関係法令を遵守し、合理的な保護措置を講じます。ただし、利用者がAIの結果のみに基づいて行った判断や、外部機関による処理結果までは保証しません。紛争は協議による解決を優先し、解決しない場合は関係法令および管轄裁判所の手続きに従います。",
    },
    zh: {
      title: "服务条款",
      description: "说明使用 SIGNAL 服务所需的权利、义务及注意事项。",
      toc: {
        purpose: "1. 目的与用语",
        effect: "2. 条款的效力与变更",
        account: "3. 账号与非会员使用",
        service: "4. 服务内容",
        obligation: "5. 用户的义务",
        limitation: "6. AI结果的局限",
        records: "7. 记录的保存与删除",
        restriction: "8. 服务限制",
        liability: "9. 责任与争议",
      },
      sections: {
        purpose: "1. 目的与用语",
        effect: "2. 条款的效力与变更",
        account: "3. 账号与非会员使用",
        service: "4. 服务内容",
        obligation: "5. 用户的义务",
        limitation: "6. AI分析结果的局限",
        records: "7. 记录的保存与删除",
        restriction: "8. 服务的使用限制与中断",
        liability: "9. 责任与争议解决",
      },
      purpose:
        "本条款规定了 SIGNAL 所提供的AI图片分析、面部盗用与深度伪造检测、匿名咨询、举报文件撰写及机构指引等服务的使用条件。",
      definitions: [
        { term: "会员", definition: "创建账号并使用本服务的人" },
        { term: "非会员", definition: "未创建账号、在允许范围内使用本服务的人" },
        { term: "分析结果", definition: "AI根据提交的资料提供的概率、分数、说明及建议" },
      ],
      effect:
        "本条款自在服务页面公布或通知用户之时起适用。如因相关法律法规或服务政策变更需要，可能会修改本条款，重要变更将在生效前通知。",
      account:
        "部分分析、咨询及机构指引功能可能向非会员开放。保存分析结果、保存咨询记录、保管举报文件等需要将记录归属于账号的功能，可能需要登录。",
      anonymousChat: {
        title: "关于匿名咨询",
        description: "即使咨询过程中不显示姓名，如用户同意保存，该对话也可能与已登录的账号关联。",
      },
      serviceItems: [
        "分析照片中的个人信息及暴露风险",
        "检测面部盗用与深度伪造的可能性",
        "针对受害情况的AI咨询及应对流程指引",
        "撰写提交给机构的举报文件草稿",
        "咨询及举报机构指引",
      ],
      serviceNote: "服务的具体内容和提供范围可能会根据运营情况发生变化。",
      obligation: "用户不得以侵害他人权利或违反法律法规为目的使用本服务。",
      obligationItems: [
        "未经合法授权上传他人资料的行为",
        "将分析结果用作诽谤或威胁他人依据的行为",
        "妨碍服务运营或绕过安全机制的行为",
        "使用虚假信息撰写举报文件的行为",
      ],
      limitation:
        "AI提供的概率、可信度及风险等级是根据提交资料计算出的参考信息，并不能确认实际是否存在面部盗用、合成、犯罪成立或受害事实。",
      important: {
        title: "重要",
        description: "如遇紧急危险或需要法律判断，请向警方、专业咨询机构或法律专业人士寻求帮助。",
      },
      records:
        "非会员的使用记录可能不会自动转入账号记录。会员可以删除已保存的分析结果、咨询记录及举报文件，删除的信息可能无法恢复。",
      restriction:
        "如发生系统维护、故障、安全威胁或其他运营所需的情况，服务的全部或部分可能会被暂时限制。用户违反本条款时，也可能会被限制使用。",
      liability:
        "SIGNAL 遵守相关法律法规并采取合理的保护措施。但对于用户仅依据AI结果作出的判断，以及外部机构的处理结果，SIGNAL 不作保证。争议优先通过协商解决；协商未果时，依照相关法律法规及管辖法院的程序处理。",
    },
  },
);

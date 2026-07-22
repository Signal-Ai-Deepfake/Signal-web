export interface SupportReferral {
  key: string;
  situationLabel: string;
  situationDescription: string;
  agencyName: string;
  agencyDescription: string;
  supportFields: string;
  operatingHours: string;
  consultMethod: string;
  phoneNumber?: string;
  onlineUrl?: string;
  noticeMessage: string;
}

export const supportReferrals: SupportReferral[] = [
  {
    key: "online-harassment",
    situationLabel: "온라인 괴롭힘·협박 피해",
    situationDescription: "협박의 긴급성을 확인하고 경찰 신고 경로를 우선 안내합니다.",
    agencyName: "중앙디지털성범죄피해자지원센터",
    agencyDescription:
      "딥페이크·비동의 유포 피해의 상담, 삭제 지원, 모니터링 및 수사·법률·의료 연계를 통합 지원합니다.",
    supportFields: "상담 · 삭제 지원 · 수사 연계",
    operatingHours: "평일 08:00–22:00 · 주말/공휴일 09:00–18:00",
    consultMethod: "전화 · 온라인",
    phoneNumber: "02-735-8994",
    onlineUrl: "https://d4u.stop.or.kr",
    noticeMessage:
      "딥페이크·얼굴 도용 피해는 삭제 지원과 유포 모니터링을 함께 제공하는 전문 센터를 우선 안내합니다.",
  },
  {
    key: "face-deepfake",
    situationLabel: "얼굴 도용·딥페이크",
    situationDescription:
      "내 얼굴이 합성된 영상·이미지가 있는지 확인하고, 삭제 지원과 유포 모니터링을 우선 안내합니다.",
    agencyName: "중앙디지털성범죄피해자지원센터",
    agencyDescription:
      "딥페이크 성착취물(합성 편집물) 피해자를 위한 삭제 지원, 유포 현황 모니터링, 상담 및 수사·법률·의료 연계를 제공합니다.",
    supportFields: "상담 · 삭제 지원 · 모니터링 · 수사·법률 연계",
    operatingHours:
      "평일 08:00–22:00 · 주말/공휴일 09:00–18:00 (운영시간 외에는 여성긴급전화 1366으로 연결)",
    consultMethod: "전화 · 온라인 게시판",
    phoneNumber: "02-735-8994",
    onlineUrl: "https://d4u.stop.or.kr",
    noticeMessage:
      "딥페이크 영상물은 삭제해도 재유포되는 경우가 많아, 유포 여부를 지속적으로 모니터링해주는 전문 센터를 우선 안내합니다.",
  },
  {
    key: "acquaintance-synthetic",
    situationLabel: "지인 얼굴 합성물 유포",
    situationDescription:
      "지인의 사진이 동의 없이 성적 합성물로 제작·유포된 경우, 삭제 지원과 함께 형사 고소 절차를 안내합니다.",
    agencyName: "중앙디지털성범죄피해자지원센터",
    agencyDescription:
      "지인 대상 합성물(지인 능욕) 피해에 대한 삭제 지원과 함께, 가해자 특정을 위한 증거 채증 및 경찰 수사 의뢰 연계를 지원합니다.",
    supportFields: "상담 · 삭제 지원 · 증거 채증 · 수사 연계",
    operatingHours: "평일 08:00–22:00 · 주말/공휴일 09:00–18:00",
    consultMethod: "전화 · 온라인",
    phoneNumber: "02-735-8994",
    onlineUrl: "https://d4u.stop.or.kr",
    noticeMessage:
      "지인을 대상으로 한 합성물은 명백한 범죄이며, 유포 전 증거를 최대한 확보한 뒤 신고하는 것이 중요합니다.",
  },
  {
    key: "minor-deepfake",
    situationLabel: "미성년자 대상 딥페이크 피해",
    situationDescription:
      "피해자(또는 가해 대상)가 미성년자인 경우, 아동·청소년 보호 절차에 따라 우선 신고와 전담 지원을 안내합니다.",
    agencyName: "중앙디지털성범죄피해자지원센터 (경찰 112·117 병행 신고)",
    agencyDescription:
      "미성년자 대상 딥페이크 성착취물에 대해 삭제 지원과 함께 경찰청 여성·청소년 수사부서로 즉시 연계합니다.",
    supportFields: "상담 · 삭제 지원 · 아동·청소년 전담 수사 연계",
    operatingHours: "24시간 (112·117 경찰 신고는 상시)",
    consultMethod: "전화 · 온라인",
    phoneNumber: "02-735-8994 (센터) / 112·117 (경찰, 아동·청소년 대상 성범죄는 긴급신고 우선)",
    onlineUrl: "https://d4u.stop.or.kr",
    noticeMessage:
      "미성년자가 연루된 경우 지체 없이 112 또는 117로 먼저 신고하고, 센터의 삭제 지원을 함께 받는 것을 권장합니다.",
  },
  {
    key: "urgent-takedown",
    situationLabel: "삭제·유포 차단 요청",
    situationDescription:
      "이미 퍼진 게시물의 빠른 삭제·접속 차단이 최우선인 경우, 24시간 신고 창구로 바로 연결합니다.",
    agencyName: "방송미디어통신위원회 (디지털성범죄 원스톱 신고 ARS)",
    agencyDescription:
      "365일 24시간 운영되는 원스톱 신고 ARS로, 접수된 불법합성물은 매일 열리는 전자심의를 거쳐 24시간 이내 삭제·차단 조치가 이뤄집니다.",
    supportFields: "삭제·접속차단 심의 · 상담·법률·의료 연계",
    operatingHours: "24시간 (365일)",
    consultMethod: "전화 (ARS)",
    phoneNumber: "1377",
    noticeMessage:
      "삭제가 급한 경우 1377로 신고하면 24시간 이내 심의를 거쳐 빠르게 삭제·차단 조치를 받을 수 있습니다.",
  },
  {
    key: "criminal-report",
    situationLabel: "형사 고소·수사 진행",
    situationDescription:
      "가해자 특정과 형사처벌을 원하는 경우, 경찰 사이버수사 절차로 안내합니다.",
    agencyName: "경찰청 사이버수사국",
    agencyDescription:
      "온라인상 증거 채증부터 가해자 검거, 고소 접수까지 사이버범죄 수사 전 과정을 지원합니다.",
    supportFields: "신고 접수 · 증거 채증 · 수사 · 고소 대리 연계",
    operatingHours: "112는 24시간 · 사이버범죄 신고시스템(ECRM)은 온라인 상시 접수",
    consultMethod: "전화 · 온라인 신고",
    phoneNumber: "112 (긴급) / 182 (민원)",
    onlineUrl: "https://ecrm.cyber.go.kr",
    noticeMessage:
      "형사처벌을 원하신다면 유포 전 캡처·링크 등 증거를 최대한 확보한 뒤 112 또는 사이버범죄 신고시스템으로 접수하는 것이 좋습니다.",
  },
  {
    key: "emergency-counseling",
    situationLabel: "긴급 심리 상담",
    situationDescription:
      "센터 운영시간 외에도 즉시 이야기할 사람이 필요한 경우, 24시간 여성긴급전화로 연결합니다.",
    agencyName: "여성긴급전화 1366",
    agencyDescription:
      "성폭력·디지털성범죄·스토킹 등으로 긴급한 상담이나 보호가 필요할 때 365일 24시간 전화로 1차 상담과 기관 연계를 제공합니다.",
    supportFields: "긴급 심리상담 · 기관 연계 · 위기 개입",
    operatingHours: "24시간 (365일)",
    consultMethod: "전화",
    phoneNumber: "1366",
    noticeMessage:
      "지금 당장 이야기할 곳이 필요하다면 1366으로 전화하면 24시간 언제든 상담받을 수 있습니다.",
  },
];

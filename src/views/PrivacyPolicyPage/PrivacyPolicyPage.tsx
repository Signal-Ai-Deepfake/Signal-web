import LegalBulletList from "@/shared/ui/LegalBulletList";
import LegalCallout from "@/shared/ui/LegalCallout";
import LegalSection from "@/shared/ui/LegalSection";
import LegalPageLayout from "@/widgets/LegalPageLayout";

const tocItems = [
  { id: "collected-data", label: "1. 처리하는 개인정보" },
  { id: "purpose", label: "2. 이용 목적" },
  { id: "retention", label: "3. 보유 기간" },
  { id: "third-party", label: "4. 제3자 제공" },
  { id: "outsourcing", label: "5. 처리 업무 위탁" },
  { id: "rights", label: "6. 이용자의 권리" },
  { id: "security", label: "7. 안전성 확보 조치" },
  { id: "consultation-data", label: "8. 상담 및 분석 데이터" },
  { id: "contact", label: "9. 문의 및 변경 안내" },
];

const consultationDataItems = [
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
    description: "전화 연결이나 외부 홈페이지 이동 시 해당 기관의 개인정보처리방침이 적용됩니다.",
  },
];

const collectedDataRows = [
  {
    label: "회원 정보",
    value: "이름, 이메일, 생년월일, 성별, 프로필 사진",
  },
  {
    label: "서비스 이용 정보",
    value: "분석·탐지 기록, 저장에 동의한 상담 내역, 신고 문서 내역",
  },
  {
    label: "자동 생성 정보",
    value: "접속 기록, 브라우저 및 기기 정보, 서비스 이용 시간",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout
      breadcrumbLabel="개인정보처리방침"
      title="개인정보처리방침"
      description="SIGNAL은 이용자의 개인정보를 소중하게 보호하고, 처리 과정을 투명하게 안내합니다."
      tocItems={tocItems}
    >
      <LegalSection id="collected-data" title="1. 처리하는 개인정보" first>
        <p className="text-body-2 text-gray-700">
          서비스는 회원가입, 기록 저장 및 문의 처리를 위해 필요한 범위에서 개인정보를 처리합니다.
        </p>
        <div className="mt-5 overflow-hidden rounded-[10px] border border-gray-300">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-primary-50">
                <th className="text-small w-40 px-4 py-3.5 text-left font-bold text-primary-500">
                  구분
                </th>
                <th className="text-small px-4 py-3.5 text-left font-bold text-primary-500">
                  처리 항목
                </th>
              </tr>
            </thead>
            <tbody>
              {collectedDataRows.map((row, index) => (
                <tr
                  key={row.label}
                  className={index === collectedDataRows.length - 1 ? "" : "border-b border-gray-300"}
                >
                  <th className="text-caption bg-gray-100 w-40 px-4 py-3.5 text-left font-bold text-black">
                    {row.label}
                  </th>
                  <td className="text-caption px-4 py-3.5 text-black">{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </LegalSection>

      <LegalSection id="purpose" title="2. 개인정보 이용 목적">
        <LegalBulletList
          items={[
            "회원 식별 및 계정 관리",
            "AI 이미지 분석과 딥페이크 탐지 결과 제공",
            "동의한 상담 및 신고 문서 내역 저장",
            "오류 확인, 보안 유지 및 서비스 개선",
            "문의 대응과 서비스 관련 안내",
          ]}
        />
      </LegalSection>

      <LegalSection id="retention" title="3. 보유 및 이용 기간">
        <p className="text-body-2 text-gray-700">
          개인정보는 이용 목적이 달성되면 지체 없이 삭제합니다. 회원 정보는 회원 탈퇴 시까지
          보관하며, 관계 법령에 따라 보존 의무가 있는 정보는 정해진 기간 동안 별도로 보관합니다.
        </p>
        <LegalCallout
          title="사용자가 삭제한 기록"
          description="삭제한 상담 내역, 분석 결과 및 신고 문서는 복구할 수 없도록 처리하는 것을 원칙으로 합니다."
        />
      </LegalSection>

      <LegalSection id="third-party" title="4. 개인정보의 제3자 제공">
        <p className="text-body-2 text-gray-700">
          원칙적으로 이용자의 개인정보를 외부에 제공하지 않습니다. 법률에 특별한 규정이 있거나
          이용자가 사전에 동의한 경우에만 필요한 범위에서 제공합니다.
        </p>
      </LegalSection>

      <LegalSection id="outsourcing" title="5. 개인정보 처리 업무의 위탁">
        <p className="text-body-2 text-gray-700">
          서버 운영, 데이터 보관 또는 본인 인증 업무를 전문 업체에 위탁할 수 있습니다. 위탁이
          확정되면 수탁 업체와 업무 내용을 이 방침에 공개합니다.
        </p>
      </LegalSection>

      <LegalSection id="rights" title="6. 이용자의 권리와 행사 방법">
        <p className="text-body-2 text-gray-700">
          이용자는 개인정보를 조회하거나 수정할 수 있으며, 저장 기록 삭제와 회원 탈퇴를 요청할 수
          있습니다. 내 프로필 또는 서비스 문의 채널에서 처리할 수 있습니다.
        </p>
      </LegalSection>

      <LegalSection id="security" title="7. 개인정보의 안전성 확보 조치">
        <LegalBulletList
          items={[
            "개인정보 접근 권한 최소화 및 접근 기록 관리",
            "전송 구간과 중요 정보 암호화",
            "보안 취약점 점검 및 비정상 접근 모니터링",
            "개인정보 취급자 교육과 내부 관리 절차 운영",
          ]}
        />
      </LegalSection>

      <LegalSection id="consultation-data" title="8. 상담 및 분석 데이터 처리">
        {consultationDataItems.map((item, index) => (
          <div key={item.heading} className={`flex flex-col gap-1 ${index === 0 ? "mt-2" : "mt-6"}`}>
            <h3 className="text-body-2 font-bold text-black">{item.heading}</h3>
            <p className="text-body-2 text-gray-700">{item.description}</p>
          </div>
        ))}
      </LegalSection>

      <LegalSection id="contact" title="9. 문의 및 방침 변경 안내" last>
        <p className="text-body-2 text-gray-700">
          개인정보 관련 문의는 서비스 내 문의 채널을 통해 접수할 수 있습니다. 방침이 변경되는 경우
          시행일 전에 서비스 공지사항으로 안내합니다.
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}

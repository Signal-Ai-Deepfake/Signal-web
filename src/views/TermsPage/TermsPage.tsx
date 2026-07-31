import LegalBulletList from "@/shared/ui/LegalBulletList";
import LegalCallout from "@/shared/ui/LegalCallout";
import LegalSection from "@/shared/ui/LegalSection";
import LegalPageLayout from "@/widgets/LegalPageLayout";

const tocItems = [
  { id: "purpose", label: "1. 목적과 용어" },
  { id: "effect", label: "2. 약관의 효력과 변경" },
  { id: "account", label: "3. 계정과 비회원 이용" },
  { id: "service", label: "4. 서비스 내용" },
  { id: "obligation", label: "5. 이용자의 의무" },
  { id: "limitation", label: "6. AI 결과의 한계" },
  { id: "records", label: "7. 기록 저장과 삭제" },
  { id: "restriction", label: "8. 서비스 제한" },
  { id: "liability", label: "9. 책임과 분쟁" },
];

export default function TermsPage() {
  return (
    <LegalPageLayout
      breadcrumbLabel="이용약관"
      title="이용약관"
      description="SIGNAL 서비스 이용에 필요한 권리, 의무 및 유의사항을 안내합니다."
      tocItems={tocItems}
    >
      <LegalSection id="purpose" title="1. 목적과 용어" first>
        <p className="text-body-2 text-gray-700">
          이 약관은 SIGNAL이 제공하는 AI 이미지 분석, 얼굴 도용·딥페이크 탐지, 익명 상담, 신고 문서
          작성 및 기관 안내 서비스의 이용 조건을 정합니다.
        </p>
        <LegalBulletList
          items={[
            <>
              <span className="font-bold">회원</span>: 계정을 생성하고 서비스를 이용하는 사람
            </>,
            <>
              <span className="font-bold">비회원</span>: 계정 없이 허용된 범위의 서비스를 이용하는
              사람
            </>,
            <>
              <span className="font-bold">분석 결과</span>: AI가 입력 자료를 바탕으로 제공하는 확률,
              점수, 설명 및 권장사항
            </>,
          ]}
        />
      </LegalSection>

      <LegalSection id="effect" title="2. 약관의 효력과 변경">
        <p className="text-body-2 text-gray-700">
          이 약관은 서비스 화면에 게시하거나 이용자에게 안내한 시점부터 적용됩니다. 관련 법령이나
          서비스 정책 변경이 필요한 경우 약관을 수정할 수 있으며, 중요한 변경은 시행 전에 알립니다.
        </p>
      </LegalSection>

      <LegalSection id="account" title="3. 계정과 비회원 이용">
        <p className="text-body-2 text-gray-700">
          일부 분석, 상담 및 기관 안내 기능은 비회원에게 제공될 수 있습니다. 분석 결과 저장, 상담
          내역 저장, 신고 문서 보관 등 계정에 기록이 귀속되는 기능은 로그인이 필요할 수 있습니다.
        </p>
        <LegalCallout title="익명 상담 안내" description="상담 중 이름을 표시하지 않더라도 사용자가 저장에 동의하면 해당 대화는 로그인 계정에 연결될 수 있습니다." />
      </LegalSection>

      <LegalSection id="service" title="4. 서비스 내용">
        <LegalBulletList
          items={[
            "사진 속 개인정보 및 노출 위험 요소 분석",
            "얼굴 도용과 딥페이크 가능성 탐지",
            "피해 상황에 대한 AI 상담과 대응 절차 안내",
            "기관 제출용 신고 문서 초안 작성",
            "상담 및 신고 기관 안내",
          ]}
        />
        <p className="text-body-2 mt-4 text-gray-700">
          서비스의 구체적인 내용과 제공 범위는 운영 상황에 따라 변경될 수 있습니다.
        </p>
      </LegalSection>

      <LegalSection id="obligation" title="5. 이용자의 의무">
        <p className="text-body-2 text-gray-700">
          이용자는 타인의 권리를 침해하거나 법령에 위반되는 목적으로 서비스를 이용해서는 안 됩니다.
        </p>
        <LegalBulletList
          items={[
            "타인의 자료를 정당한 권한 없이 업로드하는 행위",
            "분석 결과를 타인을 비방하거나 위협하는 근거로 사용하는 행위",
            "서비스 운영을 방해하거나 보안 체계를 우회하는 행위",
            "허위 정보로 신고 문서를 작성하는 행위",
          ]}
        />
      </LegalSection>

      <LegalSection id="limitation" title="6. AI 분석 결과의 한계">
        <p className="text-body-2 text-gray-700">
          AI가 제공하는 확률, 신뢰도 및 위험도는 입력 자료를 바탕으로 계산한 참고 정보입니다. 실제
          얼굴 도용, 합성 여부, 범죄 성립 또는 피해 사실을 확정하는 결과가 아닙니다.
        </p>
        <LegalCallout
          variant="secondary"
          title="중요"
          description="긴급한 위험이 있거나 법적 판단이 필요한 경우 경찰, 전문 상담 기관 또는 법률 전문가의 도움을 받아야 합니다."
        />
      </LegalSection>

      <LegalSection id="records" title="7. 기록 저장과 삭제">
        <p className="text-body-2 text-gray-700">
          비회원 이용 기록은 계정 내역으로 자동 이전되지 않을 수 있습니다. 회원은 저장된 분석 결과,
          상담 내역 및 신고 문서를 삭제할 수 있으며, 삭제한 정보는 복구되지 않을 수 있습니다.
        </p>
      </LegalSection>

      <LegalSection id="restriction" title="8. 서비스 이용 제한과 중단">
        <p className="text-body-2 text-gray-700">
          시스템 점검, 장애, 보안 위협 또는 운영상 필요한 사유가 발생하면 서비스의 전부 또는 일부가
          일시적으로 제한될 수 있습니다. 이용자가 약관을 위반하는 경우에도 이용을 제한할 수
          있습니다.
        </p>
      </LegalSection>

      <LegalSection id="liability" title="9. 책임과 분쟁 해결" last>
        <p className="text-body-2 text-gray-700">
          SIGNAL은 관련 법령을 준수하고 합리적인 보호 조치를 수행합니다. 다만 이용자가 AI 결과만을
          근거로 내린 판단이나 외부 기관의 처리 결과까지 보장하지 않습니다. 분쟁은 협의를 우선하며,
          해결되지 않는 경우 관련 법령과 관할 법원의 절차를 따릅니다.
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}

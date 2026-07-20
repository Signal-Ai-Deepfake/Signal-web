export default function PrivacyPolicyContent() {
  return (
    <div className="flex flex-col gap-4 text-body-2 text-gray-700">
      <section>
        <h3 className="mb-1 font-semibold text-black">제1조 (개인정보 수집 목적)</h3>
        <p>
          SIGNAL은 회원 관리, AI 분석 서비스 제공, 문의 응대 및 서비스 개선을 위해 필요한 최소한의
          개인정보를 수집합니다.
        </p>
      </section>
      <section>
        <h3 className="mb-1 font-semibold text-black">제2조 (수집하는 개인정보 항목)</h3>
        <p>서비스 이용을 위해 다음 정보를 수집할 수 있습니다.</p>
        <ul className="list-disc pl-5">
          <li>이메일</li>
          <li>비밀번호</li>
          <li>프로필 이미지(선택)</li>
          <li>서비스 이용 기록</li>
          <li>AI 분석을 위해 업로드한 사진 및 영상</li>
        </ul>
      </section>
      <section>
        <h3 className="mb-1 font-semibold text-black">제3조 (개인정보 이용 목적)</h3>
        <p>수집한 개인정보는 다음의 목적으로만 이용됩니다.</p>
        <ul className="list-disc pl-5">
          <li>회원 식별 및 로그인</li>
          <li>AI 분석 서비스 제공</li>
          <li>신고 문서 작성 지원</li>
          <li>고객 문의 대응</li>
          <li>서비스 품질 개선</li>
        </ul>
      </section>
      <section>
        <h3 className="mb-1 font-semibold text-black">제4조 (보유 및 이용 기간)</h3>
        <p>
          개인정보는 회원 탈퇴 시까지 보관하며, 관계 법령에 따라 보관이 필요한 경우 해당 기간 동안
          안전하게 보관합니다.
        </p>
      </section>
      <section>
        <h3 className="mb-1 font-semibold text-black">제5조 (개인정보 보호)</h3>
        <p>
          SIGNAL은 개인정보 보호를 위해 접근 권한 관리, 암호화 및 보안 조치를 적용하여 개인정보를
          안전하게 관리합니다.
        </p>
      </section>
      <section>
        <h3 className="mb-1 font-semibold text-black">제6조 (이용자의 권리)</h3>
        <p>
          이용자는 언제든지 개인정보 조회, 수정 및 삭제를 요청할 수 있으며 회원 탈퇴를 통해
          개인정보 삭제를 요청할 수 있습니다.
        </p>
      </section>
    </div>
  );
}

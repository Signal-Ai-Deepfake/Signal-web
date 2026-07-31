export default function TermsOfServiceContent() {
  return (
    <div className="flex flex-col gap-4 text-body-2 text-gray-700">
      <section>
        <h3 className="mb-1 font-semibold text-black">제1조 (목적)</h3>
        <p>
          본 약관은 SIGNAL(이하 &quot;서비스&quot;)이 제공하는 AI 기반 온라인 피해 예방 및 대응
          서비스의 이용조건과 절차, 이용자와 서비스 운영자의 권리·의무 및 책임사항을 규정함을
          목적으로 합니다.
        </p>
      </section>
      <section>
        <h3 className="mb-1 font-semibold text-black">제2조 (서비스의 내용)</h3>
        <p>서비스는 다음과 같은 기능을 제공합니다.</p>
        <ul className="list-disc pl-5">
          <li>AI 사진 위험도 분석</li>
          <li>얼굴 도용 및 딥페이크 탐지</li>
          <li>이미지 보호(워터마크·노이즈 삽입)</li>
          <li>익명 상담 챗봇</li>
          <li>신고 문서 자동 작성</li>
          <li>피해 상황에 맞는 기관 안내 및 연결</li>
        </ul>
      </section>
      <section>
        <h3 className="mb-1 font-semibold text-black">제3조 (회원가입)</h3>
        <p>
          회원은 정확한 정보를 입력하여 회원가입을 진행해야 하며, 허위 정보를 입력할 경우 서비스
          이용이 제한될 수 있습니다.
        </p>
      </section>
      <section>
        <h3 className="mb-1 font-semibold text-black">제4조 (이용자의 의무)</h3>
        <p>이용자는 다음 행위를 하여서는 안 됩니다.</p>
        <ul className="list-disc pl-5">
          <li>타인의 개인정보 도용</li>
          <li>불법 콘텐츠 업로드</li>
          <li>서비스의 정상적인 운영을 방해하는 행위</li>
          <li>법령 또는 공공질서에 반하는 행위</li>
        </ul>
      </section>
      <section>
        <h3 className="mb-1 font-semibold text-black">제5조 (서비스 이용 제한)</h3>
        <p>다음의 경우 서비스 이용이 제한될 수 있습니다.</p>
        <ul className="list-disc pl-5">
          <li>약관을 위반한 경우</li>
          <li>타인에게 피해를 주는 목적으로 서비스를 이용한 경우</li>
          <li>시스템을 악의적으로 이용한 경우</li>
        </ul>
      </section>
      <section>
        <h3 className="mb-1 font-semibold text-black">제6조 (면책사항)</h3>
        <p>
          서비스의 AI 분석 결과는 참고용으로 제공되며, 최종 판단은 사용자의 책임과 관련 기관의
          검토를 통해 이루어질 수 있습니다.
        </p>
      </section>
    </div>
  );
}

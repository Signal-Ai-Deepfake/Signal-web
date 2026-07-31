import CheckCircle from "@/shared/asset/svg/CheckCircle";
import LinkButton from "@/shared/ui/LinkButton";

export default function StepComplete() {
  return (
    <div className="flex w-full max-w-[480px] flex-col items-center gap-5 rounded-2xl bg-white px-12 py-8 shadow-md">
      <div className="text-secondary-500 [&>svg]:h-14 [&>svg]:w-14">
        <CheckCircle />
      </div>
      <div className="flex flex-col items-center gap-3 text-center">
        <h1 className="text-h3 font-bold text-black">회원가입 완료</h1>
        <p className="text-body-2 text-gray-800">
          회원가입이 완료되었습니다.
          <br />
          로그인 후 서비스를 이용해주세요.
        </p>
      </div>
      <LinkButton href="/login" variant="primary" className="w-full">
        로그인 하러가기
      </LinkButton>
    </div>
  );
}

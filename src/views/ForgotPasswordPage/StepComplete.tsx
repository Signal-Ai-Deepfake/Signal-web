import CheckCircle from "@/shared/asset/svg/CheckCircle";
import LinkButton from "@/shared/ui/LinkButton";

export default function StepComplete() {
  return (
    <div className="flex w-full flex-col items-center gap-5">
      <div className="text-secondary-500 [&>svg]:h-14 [&>svg]:w-14">
        <CheckCircle />
      </div>
      <div className="flex flex-col items-center gap-3 text-center">
        <h1 className="text-h3 font-bold text-black">비밀번호 변경 완료</h1>
        <p className="text-body-2 text-gray-800">
          비밀번호가 성공적으로 변경되었습니다.
          <br />
          새로운 비밀번호로 로그인해 주세요.
        </p>
      </div>
      <LinkButton href="/login" variant="primary" className="w-full">
        로그인 하러가기
      </LinkButton>
    </div>
  );
}

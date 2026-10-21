import Link from "next/link";
import Phone from "@/shared/asset/svg/Phone";

export default function GuideHelpCard() {
  return (
    <section className="bg-primary-500 relative flex w-full flex-col overflow-hidden rounded-2xl p-6">
      <div className="pointer-events-none absolute -right-4 -bottom-4 size-32 rounded-full bg-white/10 blur-[20px]" />
      <div className="pointer-events-none absolute -top-4 -left-4 size-24 rounded-full bg-white/5 blur-[12px]" />
      <div className="relative flex flex-col items-start gap-2">
        <h3 className="text-body-1 font-bold text-white">도움이 필요하신가요?</h3>
        <p className="text-small pb-4 break-keep text-white/80">
          피해 상황에 맞는 전문 지원 기관을 바로 찾아 연결해 드려요.
        </p>
        <Link
          href="/support-referral"
          className="text-small text-primary-500 hover:bg-primary-50 active:bg-primary-100 flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-bold transition-colors [&>svg]:size-3.5"
        >
          <Phone />
          전문 기관 연결
        </Link>
      </div>
    </section>
  );
}

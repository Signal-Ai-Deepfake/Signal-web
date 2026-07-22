import Bot from "@/shared/asset/svg/Bot";
import FileText from "@/shared/asset/svg/FileText";
import Message from "@/shared/asset/svg/Message";
import PhotoScan from "@/shared/asset/svg/PhotoScan";
import ScanFace from "@/shared/asset/svg/ScanFace";
import Search from "@/shared/asset/svg/Search";
import ShieldTask from "@/shared/asset/svg/ShieldTask";
import QuickActionLink from "@/shared/ui/QuickActionLink";
import ScrollReveal from "@/shared/ui/ScrollReveal";
import ServiceCategory from "@/shared/ui/ServiceCategory";

export default function QuickFeaturesSection() {
  return (
    <section className="w-full">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-4 px-5">
        <h2 className="text-h3 px-1 font-semibold text-black">빠른 기능</h2>
        <div className="flex flex-col gap-6 md:flex-row md:justify-center md:gap-8">
          <ScrollReveal className="md:shrink-0">
            <ServiceCategory
              icon={ShieldTask}
              label="예방"
              description={
                <>
                  업로드 전 위험을 확인하고
                  <br />
                  이미지를 안전하게 보호하세요.
                </>
              }
              className="w-full md:h-[323px] md:w-[342px]"
            >
              <QuickActionLink
                icon={PhotoScan}
                title="사진 위험도 분석 및 보호"
                description={
                  <>
                    사진을 업로드 하면 AI가 위험 요소를
                    <br />
                    분석하고 보호 처리를 제공합니다.
                  </>
                }
                href="/analyze"
              />
            </ServiceCategory>
          </ScrollReveal>
          <ScrollReveal delay={80} className="md:shrink-0">
            <ServiceCategory
              icon={Search}
              label="탐지"
              description={
                <>
                  공개된 사진의 도용과
                  <br />
                  합성 여부를 확인하세요.
                </>
              }
              className="w-full md:h-[323px] md:w-[342px]"
            >
              <QuickActionLink
                icon={ScanFace}
                title="얼굴 도용·딥페이크 탐지"
                description={
                  <>
                    얼굴 도용 여부와 딥페이크 합성 여부를
                    <br />한 번에 확인할 수 있습니다.
                  </>
                }
                href="/detect"
              />
            </ServiceCategory>
          </ScrollReveal>
          <ScrollReveal delay={160} className="md:shrink-0">
            <ServiceCategory
              icon={Message}
              label="대응"
              description={
                <>
                  피해가 발생했을 때,
                  <br />
                  필요한 도움을 빠르게 받으세요.
                </>
              }
              className="w-full md:h-[323px] md:w-[528px]"
            >
              <QuickActionLink
                icon={Bot}
                title="익명 상담 챗봇"
                description={
                  <>
                    AI 상담 챗봇과
                    <br />
                    익명으로 대화할 수 있습니다.
                  </>
                }
                href="/chat"
              />
              <QuickActionLink
                icon={FileText}
                title="신고 지원"
                description={
                  <>
                    신고에 필요한 문서를 작성하고
                    <br />
                    전문 기관과 연결해 드립니다.
                  </>
                }
                href="/report"
              />
            </ServiceCategory>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

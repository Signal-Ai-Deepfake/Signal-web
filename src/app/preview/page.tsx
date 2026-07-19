import Bot from "@/shared/asset/svg/Bot";
import Chart from "@/shared/asset/svg/Chart";
import Cpu from "@/shared/asset/svg/Cpu";
import FileText from "@/shared/asset/svg/FileText";
import Image from "@/shared/asset/svg/Image";
import ImageArrowUp from "@/shared/asset/svg/ImageArrowUp";
import ImageSearch from "@/shared/asset/svg/ImageSearch";
import Message from "@/shared/asset/svg/Message";
import ScanFace from "@/shared/asset/svg/ScanFace";
import ScanUser from "@/shared/asset/svg/ScanUser";
import Search from "@/shared/asset/svg/Search";
import ShieldCheck from "@/shared/asset/svg/ShieldCheck";
import AnalysisGuideCard from "@/shared/ui/AnalysisGuideCard";
import AnalysisProgressCard from "@/shared/ui/AnalysisProgressCard";
import AnalysisResultCard from "@/shared/ui/AnalysisResultCard";
import AnalysisStepStack from "@/shared/ui/AnalysisStepStack";
import FeatureCard from "@/shared/ui/FeatureCard";
import InfoCard from "@/shared/ui/InfoCard";
import PhotoResetButton from "@/shared/ui/PhotoResetButton";
import RiskTag from "@/shared/ui/RiskTag";
import ServiceCard from "@/shared/ui/ServiceCard";
import ServiceCategory from "@/shared/ui/ServiceCategory";
import StepCard from "@/shared/ui/StepCard";
import SuspicionBanner from "@/shared/ui/SuspicionBanner";
import UploadStepCard from "@/shared/ui/UploadStepCard";

export default function PreviewPage() {
  return (
    <main className="flex min-h-screen flex-wrap items-start justify-center gap-6 bg-gray-100 p-10">
      <FeatureCard
        items={[
          {
            icon: Message,
            title: "익명 상담 챗봇",
            description: "AI 상담 챗봇이 24시간 상담해요.",
          },
          {
            icon: FileText,
            title: "신고 지원",
            description: "신고 문서 작성과 기관 연계를 도와드려요.",
          },
        ]}
      />
      <FeatureCard
        items={[
          {
            icon: ScanFace,
            title: "얼굴 도용·딥페이크 탐지",
            description: "얼굴 도용 및 딥페이크 여부를 확인해요.",
          },
          { icon: Image, title: "AI 이미지 분석", description: "사진의 위험도를 분석해요." },
        ]}
      />
      <div className="flex w-full flex-wrap justify-center gap-6">
        <StepCard
          icon={ImageArrowUp}
          step="01"
          title="이미지 업로드"
          description="분석할 사진을 업로드 합니다."
        />
        <StepCard
          icon={Cpu}
          step="02"
          title="AI 위험도 분석"
          description="AI 위험 요소와 노출 가능성을 분석합니다."
        />
        <StepCard
          icon={Chart}
          step="03"
          title="분석결과 확인"
          description="위험도와 원인, 주요 요소를 확인할 수 있습니다."
          emphasized
        />
        <StepCard
          icon={ShieldCheck}
          step="04"
          title="보호 가이드 제공"
          description="상황에 맞는 보호 방법과 대응 가이드를 제공합니다."
          emphasized
        />
      </div>
      <div className="flex w-full flex-wrap justify-center gap-6">
        <InfoCard
          icon={ScanUser}
          title="AI 이미지 분석"
          description="사진 속 위험 요소를 AI가 분석하고 안전 여부를 확인합니다."
        />
        <InfoCard
          icon={ScanFace}
          title="얼굴 도용·딥페이크 탐지"
          description="얼굴 도용과 AI 합성 여부를 빠르고 정확하게 분석합니다."
        />
        <InfoCard
          icon={Message}
          title="익명 상담 챗봇"
          description="익명으로 상담하며 상황에 맞는 대응 방법을 안내받을 수 있습니다."
        />
        <InfoCard
          icon={FileText}
          title="신고 지원"
          description="신고에 필요한 절차와 문서 작성을 쉽고 빠르게 도와드립니다."
        />
      </div>
      <div className="flex w-full flex-wrap justify-center gap-6">
        <InfoCard
          size="md"
          icon={ScanUser}
          title="AI 이미지 분석"
          description="사진 속 위험 요소를 AI가 분석하고 안전 여부를 확인합니다."
        />
        <InfoCard
          size="md"
          icon={ScanFace}
          title="얼굴 도용·딥페이크 탐지"
          description="얼굴 도용과 AI 합성 여부를 빠르고 정확하게 분석합니다."
        />
        <InfoCard
          size="md"
          icon={Message}
          title="익명 상담 챗봇"
          description="익명으로 상담하며 상황에 맞는 대응 방법을 안내받을 수 있습니다."
        />
        <InfoCard
          size="md"
          icon={FileText}
          title="신고 지원"
          description="신고에 필요한 절차와 문서 작성을 쉽고 빠르게 도와드립니다."
        />
      </div>
      <div className="flex w-full flex-wrap justify-center gap-6">
        <ServiceCategory
          icon={ShieldCheck}
          label="예방"
          description={
            <>
              업로드 전 위험을 확인하고
              <br />
              이미지를 안전하게 보호하세요.
            </>
          }
        >
          <ServiceCard
            icon={ImageSearch}
            title="사진 위험도 분석 및 보호"
            description="사진을 업로드 하면 AI가 위험 요소를 분석하고 보호 처리를 제공합니다."
          />
        </ServiceCategory>
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
        >
          <ServiceCard
            icon={ScanFace}
            title="얼굴 도용·딥페이크 탐지"
            description="얼굴 도용 여부와 딥페이크 합성 여부를 한 번에 확인할 수 있습니다."
          />
        </ServiceCategory>
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
        >
          <ServiceCard
            icon={Bot}
            title="익명 상담 챗봇"
            description="AI 상담 챗봇과 익명으로 대화할 수 있습니다."
          />
          <ServiceCard
            icon={FileText}
            title="신고 지원"
            description="신고에 필요한 문서를 작성하고 전문 기관과 연결해 드립니다."
          />
        </ServiceCategory>
      </div>
      <div className="flex w-full max-w-md flex-col gap-6">
        <SuspicionBanner status="의심" />
        <SuspicionBanner status="주의" />
        <SuspicionBanner status="의심없음" />
      </div>
      <div className="flex w-full max-w-md flex-wrap items-center gap-4">
        <RiskTag level="안전" />
        <RiskTag level="위험" />
        <RiskTag level="주의" />
      </div>
      <AnalysisGuideCard />
      <PhotoResetButton />
      <div className="flex w-full flex-wrap justify-center gap-6">
        <UploadStepCard />
        <AnalysisProgressCard percent={72} />
        <AnalysisResultCard riskPercent={24} level="안전" message="현재 이미지는 안전합니다." />
      </div>
      <AnalysisStepStack
        percent={72}
        riskPercent={24}
        level="안전"
        message="현재 이미지는 안전합니다."
      />
    </main>
  );
}

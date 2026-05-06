"use client";

import { toast } from "sonner";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-3xl font-bold">5·18 인물 빙의 프로젝트</h1>
      <p className="text-gray-600">초기 세팅 테스트</p>
      <div className="flex gap-2">
        <button
          className="rounded bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
          onClick={() => toast.success("저장되었습니다.")}
        >
          성공 토스트
        </button>
        <button
          className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          onClick={() => toast.error("네트워크 오류")}
        >
          에러 토스트
        </button>
      </div>
    </main>
  );
}
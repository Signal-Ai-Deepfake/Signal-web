"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useEffect, useRef, useState } from "react";
import { Toaster, toast } from "sonner";
import { makeQueryClient } from "@/shared/config/queryClient";
import { defineMessages } from "@/shared/i18n/defineMessages";
import { useT } from "@/shared/i18n/I18nProvider";

const messages = defineMessages(
  { loadFailed: "데이터를 불러오지 못했습니다." },
  {
    en: { loadFailed: "Couldn't load data." },
    ja: { loadFailed: "データを読み込めませんでした。" },
    zh: { loadFailed: "无法加载数据。" },
  },
);

export default function Providers({ children }: { children: React.ReactNode }) {
  const t = useT(messages);
  const tRef = useRef(t);
  useEffect(() => {
    tRef.current = t;
  }, [t]);

  const [client] = useState(() => {
    const qc = makeQueryClient();
    qc.getQueryCache().config.onError = (error) => {
      toast.error(tRef.current.loadFailed, {
        description: error instanceof Error ? error.message : undefined,
      });
    };
    return qc;
  });

  return (
    <QueryClientProvider client={client}>
      {children}
      <Toaster
        position="top-right"
        richColors
        duration={3500}
        toastOptions={{
          classNames: {
            toast: "!w-[300px] !min-h-[64px] !p-4 !rounded-lg",
            title: "!text-sm",
            description: "!text-xs !leading-relaxed",
            icon: "!w-4 !h-4",
          },
        }}
      />
      {process.env.NODE_ENV === "development" && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}

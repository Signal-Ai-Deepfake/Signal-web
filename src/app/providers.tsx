"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { Toaster, toast } from "sonner";
import { makeQueryClient } from "@/shared/config/queryClient";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [client] = useState(() => {
    const qc = makeQueryClient();
    qc.getQueryCache().config.onError = (error) => {
      toast.error("데이터를 불러오지 못했습니다.", {
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

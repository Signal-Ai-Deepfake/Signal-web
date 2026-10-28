import { notFound } from "next/navigation";
import PreviewContent from "./PreviewContent";

export default function PreviewPage() {
  if (process.env.NODE_ENV === "production") notFound();

  return <PreviewContent />;
}

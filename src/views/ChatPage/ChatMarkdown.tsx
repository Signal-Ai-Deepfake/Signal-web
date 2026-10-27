import { translate } from "@/shared/i18n/currentLocale";
import { chatMessages } from "./messages";
interface Inline {
  text: string;
  bold: boolean;
}

type Block =
  | { kind: "paragraph" | "heading"; lines: Inline[][] }
  | { kind: "bullet" | "number"; items: Inline[][] };

const HEADING = /^#{1,6}\s+/;
const BULLET = /^\s*[-*•]\s+/;
const NUMBER = /^\s*\d+[.)]\s+/;

function parseInline(line: string): Inline[] {
  return line
    .split(/(\*\*[^*]+\*\*)/g)
    .filter(Boolean)
    .map((part) =>
      part.startsWith("**") && part.endsWith("**") && part.length > 4
        ? { text: part.slice(2, -2), bold: true }
        : { text: part, bold: false },
    );
}

const SENTENCE_BREAK = /(?<=[.!?])\s+/;
const QUOTED = /([‘“"'])([^’”"'\n]{1,30})([’”"'])/g;
const AGENCY = /([가-힣]*(?:경찰청|수사대|센터|위원회|상담소|지원단))/g;
const HOTLINE =
  /(?<![\d-])(\d{2,4}-\d{3,4}-\d{4}|112|117|118|119|182|1332|1366|1377|1388|1398)(?![\d-])/g;
const SENTENCES_PER_PARAGRAPH = 2;
const FULL_HOTLINE = /^(\d{2,4}-\d{3,4}-\d{4}|112|117|118|119|182|1332|1366|1377|1388|1398)$/;

function formatPlainReply(text: string) {
  if (text.includes("\n") || text.includes("**")) return text;
  const emphasized = text
    .replace(QUOTED, "$1**$2**$3")
    .replace(AGENCY, "**$1**")
    .replace(HOTLINE, "**$1**")
    .replace(/\*\*\*\*/g, "");
  const sentences = emphasized.split(SENTENCE_BREAK).filter(Boolean);
  if (sentences.length < 3) return emphasized;
  const paragraphs: string[] = [];
  for (let i = 0; i < sentences.length; i += SENTENCES_PER_PARAGRAPH) {
    paragraphs.push(sentences.slice(i, i + SENTENCES_PER_PARAGRAPH).join(" "));
  }
  return paragraphs.join("\n\n");
}

export function parseChatMarkdown(source: string): Block[] {
  const text = formatPlainReply(source);
  const blocks: Block[] = [];
  let current = null as Block | null;

  for (const rawLine of text.split("\n")) {
    const line = rawLine.trimEnd();
    if (!line.trim()) {
      current = null;
      continue;
    }
    if (HEADING.test(line)) {
      blocks.push({ kind: "heading", lines: [parseInline(line.replace(HEADING, ""))] });
      current = null;
      continue;
    }
    const listKind = BULLET.test(line) ? "bullet" : NUMBER.test(line) ? "number" : null;
    if (listKind) {
      const item = parseInline(line.replace(listKind === "bullet" ? BULLET : NUMBER, ""));
      if (current && "items" in current && current.kind === listKind) {
        current.items.push(item);
      } else {
        current = { kind: listKind, items: [item] };
        blocks.push(current);
      }
      continue;
    }
    if (current && "lines" in current && current.kind === "paragraph") {
      current.lines.push(parseInline(line));
    } else {
      current = { kind: "paragraph", lines: [parseInline(line)] };
      blocks.push(current);
    }
  }
  return blocks;
}

function lineLength(line: Inline[]) {
  return line.reduce((sum, inline) => sum + Array.from(inline.text).length, 0);
}

export function countChatMarkdown(blocks: Block[]) {
  return blocks.reduce(
    (sum, block) =>
      sum + ("lines" in block ? block.lines : block.items).reduce((s, l) => s + lineLength(l), 0),
    0,
  );
}

function limitLine(line: Inline[], budget: number): [Inline[], number] {
  const trimmed: Inline[] = [];
  let left = budget;
  for (const inline of line) {
    if (left <= 0) break;
    const chars = Array.from(inline.text);
    trimmed.push({ ...inline, text: chars.slice(0, left).join("") });
    left -= chars.length;
  }
  return [trimmed, Math.max(left, 0)];
}

function limitBlocks(blocks: Block[], limit: number): Block[] {
  const result: Block[] = [];
  let left = limit;
  for (const block of blocks) {
    if (left <= 0) break;
    const source = "lines" in block ? block.lines : block.items;
    const kept: Inline[][] = [];
    for (const line of source) {
      if (left <= 0) break;
      const [trimmed, rest] = limitLine(line, left);
      kept.push(trimmed);
      left = rest;
    }
    result.push(
      "lines" in block ? { kind: block.kind, lines: kept } : { kind: block.kind, items: kept },
    );
  }
  return result;
}

function InlineText({ line }: { line: Inline[] }) {
  return (
    <>
      {line.map((inline, index) =>
        inline.bold && FULL_HOTLINE.test(inline.text) ? (
          <a
            key={index}
            href={`tel:${inline.text.replace(/-/g, "")}`}
            aria-label={translate(chatMessages).call(inline.text)}
            className="text-primary-500 font-bold underline underline-offset-2"
          >
            {inline.text}
          </a>
        ) : inline.bold ? (
          <strong key={index} className="text-primary-500 font-bold">
            {inline.text}
          </strong>
        ) : (
          <span key={index}>{inline.text}</span>
        ),
      )}
    </>
  );
}

interface ChatMarkdownProps {
  blocks: Block[];
  limit?: number;
}

export default function ChatMarkdown({ blocks, limit }: ChatMarkdownProps) {
  const visibleBlocks = limit === undefined ? blocks : limitBlocks(blocks, limit);

  return (
    <div className="flex flex-col gap-3">
      {visibleBlocks.map((block, blockIndex) => {
        if ("lines" in block) {
          return (
            <p key={blockIndex} className={block.kind === "heading" ? "font-bold" : undefined}>
              {block.lines.map((line, i) => (
                <span key={i}>
                  {i > 0 && <br />}
                  <InlineText line={line} />
                </span>
              ))}
            </p>
          );
        }
        const ListTag = block.kind === "bullet" ? "ul" : "ol";
        return (
          <ListTag
            key={blockIndex}
            className={`flex flex-col gap-1 pl-5 ${block.kind === "bullet" ? "list-disc" : "list-decimal"}`}
          >
            {block.items.map((item, i) => (
              <li key={i}>
                <InlineText line={item} />
              </li>
            ))}
          </ListTag>
        );
      })}
    </div>
  );
}

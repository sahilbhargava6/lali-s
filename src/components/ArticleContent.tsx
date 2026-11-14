import React from "react";

interface ArticleContentProps {
  content: string;
  className?: string;
}

/**
 * Parses inline formatting:
 * **bold**, *italic*, <u>underline</u>, [link text](url), <b>bold</b>, <i>italic</i>
 */
function parseInline(text: string): React.ReactNode[] {
  // Regex to match markdown links, bold, italic, underline, or html tags
  const tokens: React.ReactNode[] = [];
  let remaining = text;
  let keyIndex = 0;

  // Pattern matches:
  // 1. Markdown link: [text](url)
  // 2. Bold: **text**
  // 3. Italic: *text* or _text_
  // 4. Underline: <u>text</u>
  // 5. HTML bold: <b>text</b>
  // 6. HTML italic: <i>text</i>
  const regex = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*|_([^_]+)_|<u>(.*?)<\/u>|<b>(.*?)<\/b>|<i>(.*?)<\/i>/;

  while (remaining.length > 0) {
    const match = remaining.match(regex);
    if (!match || match.index === undefined) {
      tokens.push(remaining);
      break;
    }

    // Push text before match
    if (match.index > 0) {
      tokens.push(remaining.substring(0, match.index));
    }

    const fullMatch = match[0];
    const key = `inline-${keyIndex++}`;

    if (match[1] && match[2]) {
      // Link [text](url)
      tokens.push(
        <a
          key={key}
          href={match[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#D22027] font-bold underline hover:text-[#b01920] transition-colors"
        >
          {match[1]}
        </a>
      );
    } else if (match[3]) {
      // **bold**
      tokens.push(
        <strong key={key} className="font-extrabold text-slate-900">
          {match[3]}
        </strong>
      );
    } else if (match[4] || match[5]) {
      // *italic* or _italic_
      tokens.push(
        <em key={key} className="italic text-slate-800">
          {match[4] || match[5]}
        </em>
      );
    } else if (match[6]) {
      // <u>underline</u>
      tokens.push(
        <span key={key} className="underline decoration-[#D22027] decoration-2 underline-offset-4">
          {match[6]}
        </span>
      );
    } else if (match[7]) {
      // <b>bold</b>
      tokens.push(
        <strong key={key} className="font-extrabold text-slate-900">
          {match[7]}
        </strong>
      );
    } else if (match[8]) {
      // <i>italic</i>
      tokens.push(
        <em key={key} className="italic text-slate-800">
          {match[8]}
        </em>
      );
    } else {
      tokens.push(fullMatch);
    }

    remaining = remaining.substring(match.index + fullMatch.length);
  }

  return tokens;
}

export default function ArticleContent({ content, className = "" }: ArticleContentProps) {
  if (!content) return null;

  // Split into block sections by double newlines or single newlines
  const blocks = content.split(/\n\s*\n/);

  return (
    <div className={`space-y-5 text-slate-700 text-base md:text-lg leading-relaxed font-sans ${className}`}>
      {blocks.map((block, blockIndex) => {
        const trimmed = block.trim();
        if (!trimmed) return null;

        // 1. Horizontal Rule (--- or ***)
        if (trimmed === "---" || trimmed === "***") {
          return <hr key={blockIndex} className="my-8 border-slate-200" />;
        }

        // 2. Heading 1 (# ...)
        if (trimmed.startsWith("# ")) {
          return (
            <h2
              key={blockIndex}
              className="text-2xl sm:text-3xl font-black text-slate-900 mt-8 mb-4 border-l-4 border-[#D22027] pl-4 tracking-tight"
            >
              {parseInline(trimmed.replace(/^#\s+/, ""))}
            </h2>
          );
        }

        // 3. Heading 2 (## ...)
        if (trimmed.startsWith("## ")) {
          return (
            <h3
              key={blockIndex}
              className="text-xl sm:text-2xl font-black text-slate-900 mt-7 mb-3 border-l-4 border-[#D22027] pl-3.5 tracking-tight"
            >
              {parseInline(trimmed.replace(/^##\s+/, ""))}
            </h3>
          );
        }

        // 4. Heading 3 (### ...)
        if (trimmed.startsWith("### ")) {
          return (
            <h4
              key={blockIndex}
              className="text-lg sm:text-xl font-bold text-slate-900 mt-6 mb-2 tracking-tight"
            >
              {parseInline(trimmed.replace(/^###\s+/, ""))}
            </h4>
          );
        }

        // 5. Blockquote (> ...)
        if (trimmed.startsWith("> ")) {
          const quoteLines = trimmed
            .split("\n")
            .map((line) => line.replace(/^>\s*/, ""))
            .join(" ");
          return (
            <blockquote
              key={blockIndex}
              className="border-l-4 border-[#D22027] bg-red-50/40 p-4 sm:p-5 rounded-r-2xl my-5 text-slate-800 italic font-medium leading-relaxed shadow-sm"
            >
              {parseInline(quoteLines)}
            </blockquote>
          );
        }

        // 6. Unordered List (- item or * item or • item)
        const lines = trimmed.split("\n");
        const isBulletList = lines.every((line) => /^[-*•]\s+/.test(line.trim()));
        if (isBulletList) {
          return (
            <ul key={blockIndex} className="space-y-2.5 my-4 pl-2">
              {lines.map((line, liIndex) => {
                const itemText = line.trim().replace(/^[-*•]\s+/, "");
                return (
                  <li key={liIndex} className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#D22027] shrink-0 mt-2.5"></span>
                    <span className="flex-1 leading-relaxed">{parseInline(itemText)}</span>
                  </li>
                );
              })}
            </ul>
          );
        }

        // 7. Numbered List (1. item, 2. item)
        const isNumberedList = lines.every((line) => /^\d+\.\s+/.test(line.trim()));
        if (isNumberedList) {
          return (
            <ol key={blockIndex} className="space-y-2.5 my-4 pl-2">
              {lines.map((line, liIndex) => {
                const itemText = line.trim().replace(/^\d+\.\s+/, "");
                return (
                  <li key={liIndex} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-red-100 text-[#D22027] text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                      {liIndex + 1}
                    </span>
                    <span className="flex-1 leading-relaxed">{parseInline(itemText)}</span>
                  </li>
                );
              })}
            </ol>
          );
        }

        // 8. Standard Paragraph (with line breaks inside)
        return (
          <p key={blockIndex} className="leading-relaxed">
            {lines.map((line, lineIdx) => (
              <React.Fragment key={lineIdx}>
                {parseInline(line)}
                {lineIdx < lines.length - 1 && <br />}
              </React.Fragment>
            ))}
          </p>
        );
      })}
    </div>
  );
}

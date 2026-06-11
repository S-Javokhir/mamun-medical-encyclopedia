import { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

interface EditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

const toolbarOptions = [
  [{ header: [1, 2, 3, false] }],
  ["bold", "italic", "underline", "strike"],
  [{ color: [] }, { background: [] }],
  [{ align: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["blockquote", "code-block"],
  ["link", "image"],
  ["clean"],
];

export const Editor = ({ content, onChange, placeholder }: EditorProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);
  const onChangeRef = useRef(onChange);
  // Track if the editor has been initialized with content already
  const initializedRef = useRef(false);

  // Keep onChange ref up to date without re-creating the editor
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    if (!containerRef.current || quillRef.current) return;

    const quill = new Quill(containerRef.current, {
      theme: "snow",
      placeholder: placeholder || "Matnni shu yerga yozing...",
      modules: {
        toolbar: toolbarOptions,
        clipboard: {
          // Allow Google Docs/Word HTML paste with images
          matchVisual: false,
        },
      },
    });

    // Set initial content
    if (content) {
      quill.clipboard.dangerouslyPasteHTML(content);
    }

    // Handle image paste from clipboard (files like screenshots)
    quill.root.addEventListener("paste", (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (const item of Array.from(items)) {
        if (item.type.startsWith("image/")) {
          e.preventDefault();
          const file = item.getAsFile();
          if (!file) continue;

          const reader = new FileReader();
          reader.onload = (ev) => {
            const src = ev.target?.result as string;
            const range = quill.getSelection(true);
            quill.insertEmbed(range.index, "image", src);
            quill.setSelection(range.index + 1);
          };
          reader.readAsDataURL(file);
          return;
        }
      }
    });

    quill.on("text-change", () => {
      const html = quill.root.innerHTML;
      onChangeRef.current(html === "<p><br></p>" ? "" : html);
    });

    quillRef.current = quill;
  }, []);

  // Sync external content changes — only when editor has NOT been initialized yet
  useEffect(() => {
    const quill = quillRef.current;
    if (!quill) return;
    // Only set content once (initial load). After that, user is in control.
    if (initializedRef.current) return;

    const currentHTML = quill.root.innerHTML;
    const normalizedContent = content || "";
    const normalizedCurrent = currentHTML === "<p><br></p>" ? "" : currentHTML;

    if (normalizedContent && normalizedContent !== normalizedCurrent) {
      quill.clipboard.dangerouslyPasteHTML(normalizedContent);
      initializedRef.current = true;
    } else if (normalizedContent === "") {
      initializedRef.current = true;
    }
  }, [content]);

  return (
    <div className="w-full rounded-lg border bg-background overflow-hidden shadow-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
      <div ref={containerRef} style={{ minHeight: "220px" }} />
    </div>
  );
};

export default Editor;

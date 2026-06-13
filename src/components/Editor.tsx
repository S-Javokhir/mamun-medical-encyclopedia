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
  // Keep the latest onChange always accessible without re-creating the editor
  const onChangeRef = useRef(onChange);
  // Capture the INITIAL content value so we can set it once on mount
  const initialContentRef = useRef(content);

  // Keep onChange ref up to date
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  // Create Quill once on mount — never recreate
  useEffect(() => {
    if (!containerRef.current || quillRef.current) return;

    const quill = new Quill(containerRef.current, {
      theme: "snow",
      placeholder: placeholder || "Matnni shu yerga yozing...",
      modules: {
        toolbar: toolbarOptions,
        clipboard: {
          matchVisual: false,
        },
      },
    });

    // Set initial content ONCE using the captured ref value
    if (initialContentRef.current) {
      quill.clipboard.dangerouslyPasteHTML(initialContentRef.current);
    }

    // Handle image paste from clipboard (screenshots, etc.)
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
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="w-full rounded-lg border bg-background overflow-hidden shadow-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
      <div ref={containerRef} style={{ minHeight: "220px" }} />
    </div>
  );
};

export default Editor;

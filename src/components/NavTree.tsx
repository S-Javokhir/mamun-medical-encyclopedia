import { Link } from "@tanstack/react-router";
import { ChevronDown, ChevronRight, FileText } from "lucide-react";
import { useState, useEffect } from "react";
import { NavItem, findNavItemPath } from "../data/library";

interface NavTreeProps {
  items: NavItem[];
  activeId?: string;
  level?: number;
}

export function NavTree({ items, activeId, level = 0 }: NavTreeProps) {
  return (
    <ul className="space-y-0.5">
      {items.map((item) => (
        <NavNode key={item.id} item={item} activeId={activeId} level={level} />
      ))}
    </ul>
  );
}

function NavNode({ item, activeId, level }: { item: NavItem; activeId?: string; level: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const isActive = item.id === activeId;
  const hasChildren = item.children && item.children.length > 0;

  // Auto-expand if child is active
  useEffect(() => {
    if (activeId && item.children) {
      const path = findNavItemPath(activeId, item.children);
      if (path) setIsOpen(true);
    }
  }, [activeId, item.children]);

  // Indentation logic
  const paddingLeft = level === 0 ? "px-3" : level === 1 ? "pl-[12px] pr-3" : "pl-[24px] pr-3";

  if (item.type === "article") {
    return (
      <li>
        <Link
          to="/article/$id"
          params={{ id: item.id }}
          className={`flex items-center gap-2 rounded-md py-1.5 text-sm transition-colors ${paddingLeft} ${
            isActive
              ? "bg-[#E0F2F1] font-medium text-[#00796B]"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          }`}
        >
          <FileText size={14} className={isActive ? "text-[#00796B]" : "text-muted-foreground/70"} />
          <span className="truncate">{item.title}</span>
        </Link>
      </li>
    );
  }

  return (
    <li>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex w-full items-center justify-between rounded-md py-1.5 text-sm transition-colors ${paddingLeft} ${
          level === 0
            ? "font-semibold text-foreground"
            : "font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
        }`}
      >
        <span className="flex items-center gap-2 truncate">
          {hasChildren && (
            <span className="text-muted-foreground/70">
              {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </span>
          )}
          <span className="truncate">{item.title}</span>
        </span>
      </button>
      {isOpen && hasChildren && (
        <div className="mt-0.5">
          <NavTree items={item.children!} activeId={activeId} level={level + 1} />
        </div>
      )}
    </li>
  );
}

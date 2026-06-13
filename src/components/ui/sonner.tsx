import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            "group toast !flex !w-full !max-w-[380px] !items-start !gap-4 !rounded-lg !border !bg-white !p-4 !shadow-xl !transition-all !border-l-[6px] !pointer-events-auto",
          title: "!text-[15px] !font-bold !text-[#262626] !leading-normal !flex-1",
          description: "!text-[13px] !text-[#595959] !leading-relaxed !mt-1 !flex-1",
          closeButton:
            "!absolute !right-2 !top-2 !text-[#bfbfbf] hover:!text-[#595959] !cursor-pointer",

          // Color schemes matching Image 2 perfectly (Ant Design palette)
          success: "!bg-[#f6ffed] !border-[#b7eb8f] !border-l-[#52c41a] !text-[#389e0d]",
          info: "!bg-[#e6f7ff] !border-[#91d5ff] !border-l-[#1890ff] !text-[#0050b3]",
          error: "!bg-[#fff1f0] !border-[#ffa39e] !border-l-[#ff4d4f] !text-[#cf1322]",
          warning: "!bg-[#fffbe6] !border-[#ffe58f] !border-l-[#faad14] !text-[#d48806]",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };

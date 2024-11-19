import { cn } from "@/lib/utils";
import { H } from "./ui/typography";

interface ContainerProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  margins?: boolean;
  paddings?: boolean;
}

const Container = ({
  title,
  margins = true,
  paddings = true,
  children,
  className,
}: ContainerProps) => {
  return (
    <div
      id={title ? title : "#"}
      className={cn(
        "w-full",
        paddings && "px-4 sm:px-6 lg:px-8",
        margins && "max-w-7xl mx-auto",
        className
      )}
    >
      {title && (
        <H size="h4" className="capitalize text-start w-full">
          {title}
        </H>
      )}

      {children}
    </div>
  );
};

export default Container;

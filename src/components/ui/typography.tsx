import { cn } from "@/lib/utils";

interface CommonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  key?: string;
}

interface HeadingProps extends CommonProps {
  size?: "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl";
}

interface TextProps extends CommonProps {
  size?: "xxs" | "xs" | "sm" | "base" | "lg" | "xl";
}

export const H = ({
  size = "xl",
  children,
  className,
  onClick,
  key,
}: HeadingProps) => {
  const textSizeClass = () => {
    switch (size) {
      case "lg":
        return "text-lg";
      case "xl":
        return "text-xl";
      case "2xl":
        return "text-2xl";
      case "3xl":
        return "text-3xl";
      case "4xl":
        return "text-4xl";
      case "5xl":
        return "text-5xl";
      case "6xl":
        return "text-6xl";
      default:
        return "text-xl";
    }
  };

  return (
    <h1 key={key} onClick={onClick} className={cn(textSizeClass(), className)}>
      {children}
    </h1>
  );
};

export const P = ({
  size = "base",
  children,
  className,
  onClick,
  key,
}: TextProps) => {
  const textSizeClass = () => {
    switch (size) {
      case "xxs":
        return "text-[10px]";
      case "xs":
        return "text-xs";
      case "sm":
        return "text-sm";
      case "lg":
        return "text-lg";
      case "xl":
        return "text-xl";
      default:
        return "text-base";
    }
  };

  return (
    <p key={key} onClick={onClick} className={cn(textSizeClass(), className)}>
      {children}
    </p>
  );
};

import { cn } from "@/lib/utils";

const MyCard = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("shadow-lg rounded-md bg-secondary", className)}>
      {children}
    </div>
  );
};

export default MyCard;

import { cn } from "@/lib/utils";

const SkeletonItem = ({
  h = "full",
  w = "full",
  roundedFull = false,
  className = "",
}) => {
  return (
    <div className={cn(`relative`, `w-${w}`, `h-${h}`, className)}>
      <div
        className={cn(
          "absolute top-0 left-0 w-full h-full bg-muted animate-pulse",
          roundedFull && "rounded-full"
        )}
      />
    </div>
  );
};

export default SkeletonItem;

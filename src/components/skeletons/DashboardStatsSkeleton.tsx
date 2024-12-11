import SkeletonItem from "../SkeletonItem";

const DashboardStatsSkeleton = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="flex flex-col justify-center
          h-28 gap-4 rounded-lg p-4 border border-muted"
        >
          <div className="flex justify-between items-center">
            <div className="space-y-2">
              <SkeletonItem h="3" w="12" />
              <SkeletonItem h="4" w="10" />
            </div>

            <SkeletonItem h="6" w="6" roundedFull />
          </div>
          <SkeletonItem h="3" w="16" />
        </div>
      ))}
    </div>
  );
};

export default DashboardStatsSkeleton;

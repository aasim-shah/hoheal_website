import { isLessChange } from "@/utils/reuseableMethods";

const StatsCard: React.FC<StatsData> = ({ title, icon: Icon, data }) => {
  const { total, change } = data;

  return (
    <div className="flex items-center bg-background rounded-lg p-4 shadow-md">
      <div className="mr-4 text-xl">
        <Icon />
      </div>
      <div>
        <h3 className="text-gray-500 text-sm">{title}</h3>
        <div className="flex items-center gap-2">
          <p className="text-lg font-semibold">{total}</p>
          <p className={`text-sm ${isLessChange(change)}`}>{change}</p>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;

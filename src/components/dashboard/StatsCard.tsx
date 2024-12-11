import { isLessChange } from "@/utils/reuseableMethods";

interface Props {
  title: string;
  icon: React.ElementType;
  total: number | string;
  change: string;
}

const StatsCard = ({ title, icon: Icon, total, change }: Props) => {
  return (
    <div className="flex flex-col h-28 justify-center gap-1 bg-secondary rounded-lg p-4 shadow-md">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <p className="text-lg font-semibold">{total}</p>
        </div>
        <div className="text-xl p-2 bg-signature/20 text-signature rounded-full">
          <Icon size={16} />
        </div>
      </div>
      <p className={`text-sm ${isLessChange(change)}`}>{change}</p>
    </div>
  );
};

export default StatsCard;

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  tabData: string[];
  selectedTab: string;
  handleTabClick: (tab: string) => void;
}

const Tabs = ({ tabData, selectedTab, handleTabClick }: Props) => {
  const activeTab = (tab: string) => {
    return tab === selectedTab
      ? "bg-signature text-white"
      : "hover:bg-signature hover:text-white text-signature";
  };
  return (
    <>
      <div className="h-full hidden md:flex items-center gap-4">
        {tabData.map((tab) => (
          <div
            key={tab}
            onClick={() => handleTabClick(tab)}
            className={`h-9 flex items-center border border-signature px-8 py-2 cursor-pointer rounded-md transition-colors capitalize ${activeTab(
              tab
            )}`}
          >
            {tab}
          </div>
        ))}
      </div>

      <div className="md:hidden w-full">
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={selectedTab} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {tabData.map((tab) => (
                <SelectItem
                  key={tab}
                  value={tab}
                  onClick={() => handleTabClick(tab)}
                >
                  {tab}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

export default Tabs;

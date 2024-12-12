import AddNewButton from "./AddNewButton";
import MyCard from "./MyCard";

const TopBar = ({
  addButtonTitle,
  children,
}: {
  addButtonTitle?: AddButtonTitle;
  children: React.ReactNode;
}) => {
  return (
    <MyCard className="flex flex-col-reverse gap-4 p-4 md:flex-row justify-between items-center">
      <>{children}</>
      {addButtonTitle && (
        <AddNewButton title={addButtonTitle} className="w-full md:w-auto" />
      )}
    </MyCard>
  );
};

export default TopBar;

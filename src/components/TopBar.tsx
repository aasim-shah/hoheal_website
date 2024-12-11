import AddNewButton from "./AddNewButton";

const TopBar = ({
  addButtonTitle,
  children,
}: {
  addButtonTitle?: AddButtonTitle;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col-reverse gap-4  md:flex-row justify-between items-center">
      <>{children}</>
      {addButtonTitle && (
        <AddNewButton title={addButtonTitle} className="w-full md:w-auto" />
      )}
    </div>
  );
};

export default TopBar;

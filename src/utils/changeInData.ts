const isLessChange = (change: string) => {
  return change.includes("-") ? "text-red-500" : "text-green-500";
};

export default isLessChange;

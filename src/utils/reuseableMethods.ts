export const isLessChange = (change: string) => {
  return change.includes("-") ? "text-red-500" : "text-green-500";
};

export function value(input: any) {
  return input !== undefined && input !== null ? input : "-";
}

export const formatTableHeader = (header: string) => {
  return header
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^./, (str) => str.toUpperCase());
};

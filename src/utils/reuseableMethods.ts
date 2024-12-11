export const isLessChange = (change: string) => {
  return change.includes("-") ? "text-red-500" : "text-green-500";
};

export function value(input: any) {
  return input !== undefined && input !== null ? input : "-";
}

export const camelCaseToNormalCase = (key: string) => {
  return key
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^./, (str) => str.toUpperCase());
};

export const normalCaseToCamelCase = (key: string) => {
  return key
    .toLowerCase()
    .replace(/ (\w)/g, (_, letter) => letter.toUpperCase())
    .replace(/^./, (str) => str.toLowerCase());
};

export const xAxisValues = (timeFilter: "month" | "year") => {
  let xAxisValues: { [key: string]: string }[] = [];

  if (timeFilter === "month") {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    xAxisValues = months.map((month) => ({ month }));
  } else if (timeFilter === "year") {
    const weeks = ["1", "2", "3", "4"];

    xAxisValues = weeks.map((week) => ({ week }));
  }

  return xAxisValues;
};

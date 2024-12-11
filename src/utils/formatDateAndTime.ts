export const formatContractDate = (periodOfContract: {
  from: string;
  to: string;
}) => {
  const { from, to } = periodOfContract;

  return from && to
    ? `${new Date(from).getFullYear()} - ${new Date(to).getFullYear()}`
    : "-";
};

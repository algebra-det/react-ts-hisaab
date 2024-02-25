export const thousandSeparator = (x: number) => {
  return Number(x).toLocaleString("en-IN", {
    maximumFractionDigits: 0,
    style: "currency",
    currency: "INR",
  });
};

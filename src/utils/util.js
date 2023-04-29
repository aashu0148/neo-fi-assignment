export const handleNumericInputKeyDown = (event) => {
  let key = event.key;
  if (
    key === "Backspace" ||
    key === "Tab" ||
    key === "Delete" ||
    key.toLowerCase() === "arrowleft" ||
    key.toLowerCase() === "arrowright"
  )
    return;

  if (!/[0-9]/.test(key)) {
    event.returnValue = false;

    if (event.preventDefault) event.preventDefault();
  }
};

export const numberToKConvertor = (num) => {
  num = parseInt(num);

  return Math.abs(num) > 999
    ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "K"
    : Math.sign(num) * Math.abs(num);
};

export const getFormattedPrice = (price = 0, maxDecimal = 2) => {
  if (!price) return "";

  return parseFloat(price).toLocaleString("en-IN", {
    maximumFractionDigits: maxDecimal,
    style: "currency",
    currency: "INR",
  });
};

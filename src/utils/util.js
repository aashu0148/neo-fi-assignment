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

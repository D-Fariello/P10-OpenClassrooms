//
//   Check if the value is empty.
//
//   @param {*} value - The Value to verify.
//   @returns {boolean} - Send `true` if the value is Empty, otherwise `false`.
//

export const isEmpty = (value) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  );
};

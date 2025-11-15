export const parseData = (string) => {
  const date = new Date(string);

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // months start at 0
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  const formatted = `${day}-${month}-${year} ${hours}:${minutes}`;
  return formatted;
};

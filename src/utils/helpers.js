export const parseData = (string) => {
  const date = new Date(string);

  const year = date.getUTCFullYear();
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0"); // lunile încep de la 0
  const day = date.getUTCDate().toString().padStart(2, "0");
  const hours = date.getUTCHours().toString().padStart(2, "0");
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");

  const formatted = `${day}-${month}-${year} ${hours}:${minutes}`;
  return formatted;
};

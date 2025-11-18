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

export const getOrCreateDeviceId = () => {
  console.log("Calling [getOrCreateDeviceId]");
  let deviceId = localStorage.getItem("deviceId");
  if (!deviceId) {
    deviceId = crypto.randomUUID();
    localStorage.setItem("deviceId", deviceId);
  }
  return deviceId;
};

export const normalizeText = (text) => {
  return (
    text
      // 1) Replace REAL newlines (Enter key) with spaces
      .replace(/\r?\n/g, " ")

      // 2) Replace literal "\n" (backslash + n) with REAL newline
      .replace(/\\n/g, "\n")
  );
};

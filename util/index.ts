const randomStr = (prefix: string = randomChar()) =>
  `${prefix ? prefix + "-" : ""}${new Date().getTime()}${Math.floor(
    10000000 + Math.random() * 90000000
  )}`;

const randomChar = (length: number = 5) => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const charactersLength = characters.length;
  let result = "";
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const truncateStr = (text: string, length: number) => {
  let string = text.replace(/(\r\n|\n|\r)/gm, "");
  return string.length > length ? string.substr(0, length - 1) + "..." : string;
};

export { randomChar, randomStr, truncateStr };

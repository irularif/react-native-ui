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

export { randomChar, randomStr };

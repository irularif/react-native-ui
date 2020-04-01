import { format as formatFNS, parseISO } from "date-fns";
import * as locales from "date-fns/locale";

const dateParse = (value: any) => {
  if (typeof value === "string") {
    return parseISO(value);
  }
  return value;
};
const dateFormat = (value: any, format?: string) => {
  const locale = "enUS";
  const inputFormat = format ? format : "dd MMM yyyy - HH:mm";
  if (typeof value === "string") {
    return formatFNS(parseISO(value), inputFormat, {
      locale: locales[locale]
    });
  }

  try {
    return formatFNS(value, inputFormat, {
      locale: locales[locale]
    });
  } catch (e) {
    return value;
  }
};

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

const findLargestSmallest = (a: string, b: string) =>
  a.length > b.length
    ? {
        largest: a,
        smallest: b
      }
    : {
        largest: b,
        smallest: a
      };

const fuzzyMatch = (strA: string, strB: string, fuzziness = 0) => {
  if (strA === "" || strB === "") {
    return false;
  }

  if (strA === strB) return true;

  const { largest, smallest } = findLargestSmallest(strA, strB);
  const maxIters = largest.length - smallest.length;
  const minMatches = smallest.length - fuzziness;

  for (let i = 0; i < maxIters; i++) {
    let matches = 0;
    for (let smIdx = 0; smIdx < smallest.length; smIdx++) {
      if (smallest[smIdx] === largest[smIdx + i]) {
        matches++;
      }
    }
    if (matches > 0 && matches >= minMatches) {
      return true;
    }
  }

  return false;
};
export { randomChar, randomStr, truncateStr, fuzzyMatch, dateParse, dateFormat };

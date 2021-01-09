const generateSecureData = (data: string, salt: string) => {
  const arraySymbols = data.split("");
  const secureString = arraySymbols.reduce((acc, elem) => {
    return acc + salt[elem.charCodeAt(0) % salt.length];
  }, "");
  return secureString;
};

export default generateSecureData;

const convertStringToObject = (string) => {
  try {
    const plainText = JSON.stringify(string.replace(/\n/g, ''));
    const doubleQuotes = plainText.replace(/\s/g, '').replace(/'/g, '"');
    const jsonText = doubleQuotes
      .trim()
      .replace(/(\w+:)|(\w+ :)/g, (matchedStr) => '"' + matchedStr.substring(0, matchedStr.length - 1) + '":')
      .slice(1, -1);
    const obj = JSON.parse(jsonText);

    return obj;
  } catch (error) {
    console.log(error);
    alert('Invalid JSON payload');
  }
};

export default convertStringToObject;

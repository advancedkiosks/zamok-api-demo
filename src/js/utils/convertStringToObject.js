const convertStringToObject = (string) => {
  try {
    const plainText = JSON.stringify(string.replace(/\n/g, ''));
    const doubleQuotes = plainText.replace(/\s/g, '').replace(/'/g, '"');
    const jsonText = doubleQuotes
      .trim() // remove all empty spaces in start and end
      .replace(/,\s*(?=[\]}])/g, '') // remove all comma beside the closing bracket } or ]
      .replace(/(\w+:)|(\w+ :)/g, (matchedStr) => '"' + matchedStr.substring(0, matchedStr.length - 1) + '":') // make the object key into a JSON key
      .slice(1, -1); // remove the quotation marks at the start and end
    const obj = JSON.parse(jsonText); // parse to JSON object

    return obj;
  } catch (error) {
    console.log(error);
    alert('Invalid JSON payload');
  }
};

export default convertStringToObject;

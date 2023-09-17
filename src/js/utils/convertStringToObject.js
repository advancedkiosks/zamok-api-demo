import { parse } from 'json-z';

const convertStringToObject = (string) => {
  try {
    return parse(string);
  } catch (error) {
    console.log(error);
    alert('Invalid JSON payload');
  }
};

export default convertStringToObject;

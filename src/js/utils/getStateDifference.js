import { isEqual, isObject } from 'lodash';

const getStateDifference = (obj1, obj2) => {
  const findDifferences = (currentObj1, currentObj2) => {
    const differences = {};

    for (const key in currentObj1) {
      const value1 = currentObj1[key];
      const value2 = currentObj2[key];

      if (isObject(value1) && isObject(value2)) {
        const nestedDifferences = findDifferences(value1, value2);
        if (Object.keys(nestedDifferences).length > 0) {
          differences[key] = nestedDifferences;
        }
      } else if (!isEqual(value1, value2)) {
        differences[key] = value2;
      }
    }

    return differences;
  };

  return findDifferences(obj1, obj2);
};

export default getStateDifference;

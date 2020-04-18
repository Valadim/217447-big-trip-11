const generatePoint = () => {
  return {};
};

const generatePoints = (count) => {
  return new Array(count)
    .fill(``)
    .map(generatePoint);
};


export {generatePoint, generatePoints};

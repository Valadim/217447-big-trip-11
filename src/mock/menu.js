const menuNames = [`Table`, `Stats`, `Join`];

const generateMenuItems = () => {
  return menuNames.map((it) => {
    return {
      name: it,
    };
  });
};

export {generateMenuItems};

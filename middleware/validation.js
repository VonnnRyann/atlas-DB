export const isAdult = (req, res, next) => {
  const { age } = req.body;
  if (parseInt(age) < 18) {
    const error = new Error("You are not old enough");
    error.status = 400;
    next(error);
  }
  next();
};

export const validKeys = (req, res, next) => {
  const { firstName, lastName, age } = req.body;

  if (!firstName || !lastName || !age) {
    const error = new Error("Some fields are missing");
    error.status = 400;
    next(error);
  }
  next();
};
//isFam - FbW function
export const isFam = (req, res, next) => {
  const { fbw } = req.body;

  if (fbw !== "36") {
    const error = new Error("Your on the wrong Class");
    error.status = 400;
  }
  next();
};

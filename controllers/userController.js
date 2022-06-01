export const validationResp = (req, res) => {
  res.send("This user is valid!");
};

export const sanitizationResp = (req, res) => {
  res.send(req.body);
};

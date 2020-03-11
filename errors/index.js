exports.handlePathErrors = (req, res, next) => {
  res.status(404).send({ msg: "path not found" });
};

exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status) res.status(err.status).send(err.msg);
  else next(err);
};
exports.handlePsqlErrors = (err, req, res, next) => {
  // console.log(err);
  if (err.code === "22P02" || err.code === "42703")
    res.status(400).send("bad request");
  if (err.code === "23502" || err.code === "23503")
    res.status(404).send("not found");
  else next(err);
};

exports.handle405s = (req, res, next) => {
  res.status(405).send({ msg: "method not found" });
};

exports.handle500s = (err, req, res, next) => {
  res.status(500).send({ msg: "internal server error" });
};

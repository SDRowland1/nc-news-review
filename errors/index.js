exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status) res.status(err.status).send(err.msg);
  else next(err);
};
exports.handlePsqlErrors = (err, req, res, next) => {
  if (err.code === "22P02" || err.code === "23503" || err.code === "42703")
    res.status(400).send("bad request");
  else next(err);
};

exports.handle405s = (req, res, next) => {
  res.status(405).send({ msg: "method not found" });
};

exports.handle500s = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "internal server error" });
};

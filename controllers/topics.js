const { fetchAllTopics } = require("../models/topics");

exports.getAllTopics = (req, res, next) => {
  return fetchAllTopics().then(topics => {
    res.status(200).send({ topics });
  });
};

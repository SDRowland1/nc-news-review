exports.formatDates = list => {
  const formattedDate = list.map(object => {
    const newObj = { ...object };
    const newDate = new Date(newObj.created_at);
    newObj.created_at = newDate;

    return newObj;
  });

  return formattedDate;
};

exports.makeRefObj = list => {
  const reference = {};
  if (!list.length) return reference;
  else {
    list.forEach(obj => {
      console.log(obj.article_id);
      reference[obj.title] = Number(obj.article_id);
    });

    return reference;
  }
};

exports.formatComments = (comments, articleRef) => {};

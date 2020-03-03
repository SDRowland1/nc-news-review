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
      reference[obj.title] = Number(obj.article_id);
    });

    return reference;
  }
};

exports.formatComments = (comments, articleRef) => {
  if (!comments.length) return [];
  else {
    const formatComments = comments.map(function(comment) {
      for (let key in articleRef) {
        if (comment.belongs_to === key) {
          const { ...commentCopy } = comment;
          commentCopy.author = commentCopy.created_by;
          commentCopy.article_id = articleRef[key];

          const { created_by, belongs_to, ...newComment } = commentCopy;
          newDate = new Date(newComment.created_at);
          newComment.created_at = newDate;

          return newComment;
        }
      }
    });

    return formatComments;
  }
};

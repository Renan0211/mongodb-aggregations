db.movies.aggregate([
  { $addFields: {
    title_split: { $split: ["$title", " "] },
  } }, {
    $project: {
      title_split: 1,
      _id: 0,
    },
  }, {
    $match: {
      title_split: { $size: 1 },
    },
  }, {
    $sort: {
      title_split: 1,
    },
  },
]);

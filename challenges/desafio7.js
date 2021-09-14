db.movies.aggregate([{ $match: {
  languages: { $all: ["English"] },
} }, { $unwind: "$cast" }, { $group: {
  _id: "$cast",
  numeroFilmes: { $sum: 1 },
  media: { $avg: "$imdb.rating" },
} }, { $sort: {
  numeroFilmes: -1,
  _id: -1,
} }, { $project: {
  numeroFilmes: 1,
  mediaIMDB: { $round: ["$media", 1] },
} }]);

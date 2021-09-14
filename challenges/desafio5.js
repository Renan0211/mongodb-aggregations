db.movies.aggregate([
  { $match: {
    countries: { $elemMatch: { $eq: "USA" } },
    "tomatoes.viewer.rating": { $gte: 3 },
    cast: { $exists: true },
  } }, { $addFields: {
    num_favs: { $let: {
      vars: { favActors: [
        "Sandra Bullock",
        "Tom Hanks",
        "Julia Roberts",
        "Kevin Spacey",
        "George Clooney",
      ],
      actors: "$cast" },
      in: { $size: { $setIntersection: ["$$favActors", "$$actors"] } },
    } },
  } }, { $sort: { num_favs: -1, "tomatoes.viewer.rating": -1, title: -1 } },
  { $limit: 25 }, { $skip: 24 }, { $project: { title: 1, _id: 0 } },
]);

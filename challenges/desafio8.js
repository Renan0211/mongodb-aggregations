db.air_alliances.aggregate([
  { $lookup: {
    from: "air_routes",
    let: { airlinesInAlliance: "$airlines" },
    pipeline: [
      { $match: {
        $expr: {
          $and: [
            { $in: ["$airline.name", "$$airlinesInAlliance"] },
            { $in: ["$airplane", ["747", "380"]] },
          ],
        },
      } },
    ],
    as: "route_info",
  } },
  { $addFields: {
    numberOfInfo: { $size: "$route_info" },
  } },
  { $group: {
    _id: "$name",
    totalRotas: { $sum: "$numberOfInfo" },
  } },
  { $limit: 1 },
]);

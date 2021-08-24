db.trips.aggregate([
  { $addFields: {
    timeInMinutes: { $divide: [{ $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 1000] }, 60] },
  } },
  {
    $group: {
      _id: "$bikeid",
      averageInMinutes: { $avg: "$timeInMinutes" },
    },
  },
  { $project: {
    _id: 0,
    bikeId: "$_id",
    duracaoMedia: { $ceil: "$averageInMinutes" },
  } },
  { $sort: {
    duracaoMedia: -1,
  } },
  { $limit: 5 },
]);

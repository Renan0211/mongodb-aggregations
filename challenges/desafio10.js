db.trips.aggregate([
  { $addFields: {
    flight_time: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 1000] },
  } },
  { $group: {
    _id: "$usertype",
    duracaoMedia1: { $avg: "$flight_time" },
  } },
  { $project: {
    _id: 0,
    tipo: "$_id",
    duracaoMedia: { $round: [{ $divide: ["$duracaoMedia1", 3600] }, 2] },
  } },
  { $sort: {
    duracaoMedia: 1,
  } },
]);

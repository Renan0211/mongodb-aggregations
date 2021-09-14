db.trips.aggregate([
  { $match: {
    startTime: { $gte: ISODate("2016-03-10T00:00:00.000Z") },
  } },
  { $addFields: {
    timeInMinutes: { $divide: [{ $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 1000] }, 60] },
  } },
  { $group: {
    _id: null,
    averageInMinutes: { $avg: "$timeInMinutes" },
  } },
  { $project: {
    _id: 0,
    duracaoMediaEmMinutos: { $ceil: "$averageInMinutes" },
  } },
]);

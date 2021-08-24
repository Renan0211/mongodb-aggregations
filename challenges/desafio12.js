db.trips.aggregate([
  { $addFields: {
    dayOfWeek: { $dayOfWeek: "$startTime" },
  } },
  { $match: {
    dayOfWeek: 5,
  } },
  { $group: {
    _id: "$startStationName",
    totalOfFlights: { $sum: 1 },
  } },
  { $sort: {
    totalOfFlights: -1,
  } },
  { $project: {
    _id: 0,
    nomeEstacao: "$_id",
    total: "$totalOfFlights",
  } },
  { $limit: 1 },
]);

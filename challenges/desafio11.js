db.trips.aggregate([
  { $addFields: {
    dayOfWeek: { $dayOfWeek: "$startTime" },
  } },
  { $group: {
    _id: "$dayOfWeek",
    totalOfFlights: { $sum: 1 },
  } },
  { $sort: {
    totalOfFlights: -1,
  } },
  { $project: {
    _id: 0,
    diaDaSemana: "$_id",
    total: "$totalOfFlights",
  } },
  { $limit: 1 },
]);

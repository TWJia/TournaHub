const StatisticsModel = require("../models/Statistics");

const handleCreateStatistics = (req, res) => {
    StatisticsModel.create(req.body)
      .then((statistics) => res.json(statistics))
      .catch((err) => res.json(err));
  };

  const handleGetStatistics = (req, res) => {
    const statisticsId = req.params.statisticsId;
  
    StatisticsModel.find({ statisticsId: statisticsId })
      .then(function (statistics) {
        res.json(statistics);
      })
      .catch(function (err) {
        console.error("Error fetching statistics:", err);
        res.status(500).json({ error: "Internal Server Error" });
      });
  };

  const handleUpdateStatistics = (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;
  
    console.log('Updating statistics with ID:', id);
    console.log('Updated data:', updatedData);
  
    StatisticsModel.findByIdAndUpdate(id, updatedData, { new: true })
      .then((updatedStatistics) => {
        if (!updatedStatistics) {
          console.log('Statistics not found');
          return res.status(404).json({ error: 'Statistics not found' });
        }
        console.log('Statistics updated successfully:', updatedStatistics);
        res.json(updatedStatistics);

      })
      .catch((err) => {
        console.error('Error updating statistics:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      });
  };
  
  module.exports = { 
    handleCreateStatistics,
    handleGetStatistics,
    handleUpdateStatistics
  };
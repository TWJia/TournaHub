const TournamentModel = require("../models/Tournaments");

const handleGetTournaments = (req, res) => {
  TournamentModel.find({})
    .then(function (tournaments) {
      res.json(tournaments);
    })
    .catch(function (err) {
      console.error("Error fetching tournaments:", err);
      res.Status(500).json({ error: "Internal Server Error" });
      //res.json(err)
    });
};

const UpdateTournamentStatus = async (req, res) => {
  try {
    const tournamentId = req.params.tournamentId;
    const newStatus = req.body.newStatus;

    // Validate if the new status is provided
    if (!newStatus) {
      return res.Status(400).json({ error: "New status is required" });
    }

    const updatedTournament = await TournamentModel.findByIdAndUpdate(
      tournamentId,
      { Status: newStatus },
      { new: true }
    );

    if (!updatedTournament) {
      return res.Status(404).json({ error: "Tournament not found" });
    }

    res.json(updatedTournament);
  } catch (err) {
    console.error("Error updating tournament status:", err);
    res
      .Status(500)
      .json({ error: "Internal Server Error", message: err.message });
  }
};

module.exports = { handleGetTournaments, UpdateTournamentStatus };

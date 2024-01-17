const TournamentModel = require("../models/Tournaments");
const MatchesModel = require("../models/Matches");
const RankingTableModel = require("../models/RankingTable");

const handleCreateTournament = (req, res) => {
  TournamentModel.create(req.body)
    .then((tournaments) => res.json(tournaments))
    .catch((err) => res.json(err));
};

const handleGetTournaments = (req, res) => {
  TournamentModel.find({})
    .then(function (tournaments) {
      res.json(tournaments);
    })
    .catch(function (err) {
      console.error("Error fetching tournaments:", err);
      res.status(500).json({ error: "Internal Server Error" });
      //res.json(err)
    });
};

const handleGetSingleTournament = (req, res) => {
  const id = req.params.id;
  TournamentModel.findById({ _id: id })
    .then((tournaments) => res.json(tournaments))
    .catch((err) => res.json(err));
};

const handleDeleteTournament = async (req, res) => {
  const tournamentId = req.params.id;

  try {
    // Delete the tournament
    const deletedTournament = await TournamentModel.findByIdAndDelete({ _id: tournamentId });

    // If the tournament is deleted successfully, delete associated matches and ranking tables
    if (deletedTournament) {
      // Delete matches associated with the tournament
      await MatchesModel.deleteMany({ tournamentId: deletedTournament._id });

      // Delete ranking tables associated with the tournament
      await RankingTableModel.deleteMany({ tournamentId: deletedTournament._id });

      res.json({ message: 'Tournament, matches, and ranking tables deleted successfully' });
    } else {
      res.status(404).json({ error: 'Tournament not found' });
    }
  } catch (err) {
    console.error('Error deleting tournament and associated data:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const handleUpdateTournament = (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  console.log('Updating tournament with ID:', id);
  console.log('Updated data:', updatedData);

  TournamentModel.findByIdAndUpdate(id, updatedData, { new: true })
    .then((updatedTournament) => {
      if (!updatedTournament) {
        console.log('Tournament not found');
        return res.status(404).json({ error: 'Tournament not found' });
      }
      console.log('Tournament updated successfully:', updatedTournament);
      res.json(updatedTournament);

    })
    .catch((err) => {
      console.error('Error updating Tournament:', err);
      res.status(500).json({ error: 'Internal Server Error' });
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

const countTournaments = (req, res) => {
  TournamentModel.countDocuments({})
      .then((tournaments) => {
        res.json(tournaments);
      })
      .catch((err) => {
        console.error('Error counting users:', err);
        res.json(err);
      });
}


module.exports = { 
  handleGetTournaments,
  UpdateTournamentStatus, 
  handleCreateTournament, 
  handleGetSingleTournament,
  handleDeleteTournament,
  handleUpdateTournament,
  countTournaments
};
const TournamentModel = require("../models/Tournaments");
const MatchesModel = require("../models/Matches");
const RankingTableModel = require("../models/RankingTable");
const mongoose = require("mongoose");
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
    const deletedTournament = await TournamentModel.findByIdAndDelete({
      _id: tournamentId,
    });

    // If the tournament is deleted successfully, delete associated matches and ranking tables
    if (deletedTournament) {
      // Delete matches associated with the tournament
      await MatchesModel.deleteMany({ tournamentId: deletedTournament._id });

      // Delete ranking tables associated with the tournament
      await RankingTableModel.deleteMany({
        tournamentId: deletedTournament._id,
      });

      res.json({
        message: "Tournament, matches, and ranking tables deleted successfully",
      });
    } else {
      res.status(404).json({ error: "Tournament not found" });
    }
  } catch (err) {
    console.error("Error deleting tournament and associated data:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const handleUpdateTournament = (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  console.log("Updating tournament with ID:", id);
  console.log("Updated data:", updatedData);

  TournamentModel.findByIdAndUpdate(id, updatedData, { new: true })
    .then((updatedTournament) => {
      if (!updatedTournament) {
        console.log("Tournament not found");
        return res.status(404).json({ error: "Tournament not found" });
      }
      console.log("Tournament updated successfully:", updatedTournament);
      res.json(updatedTournament);
    })
    .catch((err) => {
      console.error("Error updating Tournament:", err);
      res.status(500).json({ error: "Internal Server Error" });
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
      console.error("Error counting users:", err);
      res.json(err);
    });
};

const applyForTournament = async (req, res) => {
  console.log("Received request to apply for tournament", req.params);
  const tournamentId = req.params.tournamentId;
  console.log("Tournament ID:", tournamentId);
  const userid = req.params.userId;

  try {
    // Check if the tournamentId is not a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(tournamentId)) {
      return res.status(400).json({ error: "Invalid tournament ID" });
    }
    const tournament = await TournamentModel.findById(tournamentId);

    // Check if the tournament is open for application
    if (!tournament || tournament.tournamentStatus !== "Open for Application") {
      return res
        .status(404)
        .json({ error: "Tournament not found or not open for application" });
    }

    console.log(userid);

    // Check if the user has already applied for the tournament
    const userApplied = tournament.applications.some(
      (application) => application.user && application.user.equals(userid)
    );

    if (userApplied) {
      return res
        .status(400)
        .json({ error: "You have already applied for this tournament" });
    }

    // // Add the user to the list of tournament applications
    tournament.applications.push({ user: userid });
    await tournament.save();

    res.json({ message: "Application submitted successfully" });
    console.log("user ID:", userid);
  } catch (error) {
    console.error("Error applying for tournament:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
};

// Get tournaments open for application
const getOpenTournaments = async (req, res) => {
  try {
    const openTournaments = await TournamentModel.find({
      tournamentStatus: "Open for Application",
    });
    res.json(openTournaments);
  } catch (error) {
    console.error("Error fetching open tournaments:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
};

//test code
// Review tournament applications
const reviewTournamentApplications = async (req, res) => {
  try {
    const tournamentId = req.params.tournamentId;
    const applicationUserId = req.body.applicationUserId;
    const action = req.body.action; // 'accept' or 'reject'

    // Check if the tournament exists
    const tournament = await TournamentModel.findById(tournamentId);
    if (!tournament) {
      return res.status(404).json({ error: "Tournament not found" });
    }
    // Find the application in the tournament's applications array
    const applicationIndex = tournament.applications.findIndex((application) =>
      application.user.equals(applicationUserId)
    );

    if (applicationIndex === -1) {
      return res.status(404).json({ error: "Application not found" });
    }

    // Update the application status based on the action
    if (action === "accept") {
      tournament.applications[applicationIndex].status = "accepted";
    } else if (action === "reject") {
      tournament.applications[applicationIndex].status = "rejected";
    } else {
      return res.status(400).json({ error: "Invalid action" });
    }

    await tournament.save();

    res.json({ message: "Application reviewed successfully" });
  } catch (error) {
    console.error("Error reviewing tournament applications:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
};

module.exports = {
  handleGetTournaments,
  UpdateTournamentStatus,
  handleCreateTournament,
  handleGetSingleTournament,
  handleDeleteTournament,
  handleUpdateTournament,
  countTournaments,
  applyForTournament,
  getOpenTournaments,
  reviewTournamentApplications,
};

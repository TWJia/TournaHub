const express = require("express");
const mongoose = require("mongoose");
const router = require("express").Router();
const TournamentModel = require("../models/Tournaments");
const ApplicationModel = require("../models/ApplicantionStatus");

// Apply for a tournament
router.post("/applyForTournament/:tournamentId", async (req, res) => {
  const tournamentId = req.params.tournamentId;
  const userId = req.body.userId;
  const action = req.body.action || "apply";

  try {
    // Check if the tournamentId is not a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(tournamentId)) {
      return res.status(400).json({ error: "Invalid tournament ID" });
    }

    const tournament = await TournamentModel.findById(tournamentId);

    // Check if the tournament is found
    if (!tournament) {
      return res.status(404).json({ error: "Tournament not found" });
    }

    // Check if the tournament is open for application
    if (!tournament || tournament.tournamentStatus !== "Open for Application") {
      return res
        .status(404)
        .json({ error: "Tournament not found or not open for application" });
    }

    // Check if the user has already applied for the tournament
    const userApplied = tournament.applications.some(
      (application) =>
        application.user && application.user.toString() === userId
    );

    if (userApplied) {
      return res
        .status(400)
        .json({ error: "You have already applied for this tournament" });
    }

    // Create a new application and add it to the tournament
    const application = await ApplicationModel.create({ user: userId, action });
    tournament.applications.push(application);

    await tournament.save();

    res.json({ message: "Application submitted successfully" });
  } catch (error) {
    console.error("Error applying for tournament:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
});

// // Apply for a tournament
// router.post("/applyForTournament/:tournamentId", async (req, res) => {
//   const tournamentId = req.params.tournamentId;
//   // const userId = req.params.userId;
//   const userId = req.body.userId;
//   //const userId = req.body.user._id;
//   const action = req.body.action || "apply";
//   console.log("Tournament ID:", tournamentId);
//   console.log("User ID:", userId);
//   try {
//     // Check if the tournamentId is not a valid ObjectId
//     if (!mongoose.Types.ObjectId.isValid(tournamentId)) {
//       return res.status(400).json({ error: "Invalid tournament ID" });
//     }

//     const tournament = await TournamentModel.findById(tournamentId);
//     // Check if the tournament is found
//     if (!tournament) {
//       return res.status(404).json({ error: "Tournament not found" });
//     }
//     // Check if the tournament is open for application
//     if (!tournament || tournament.tournamentStatus !== "Open for Application") {
//       return res
//         .status(404)
//         .json({ error: "Tournament not found or not open for application" });
//     }

//     // Check if the user has already applied for the tournament
//     const userApplied =
//       userId &&
//       tournament.applications.some(
//         (application) => application.user && application.user.equals(userId)
//       );

//     if (userApplied) {
//       return res
//         .status(400)
//         .json({ error: "You have already applied for this tournament" });
//     }

//     // Create a new application and add it to the tournament
//     const application = await ApplicationModel.create({ user: userId, action });
//     tournament.applications.push(application);

//     await tournament.save();

//     res.json({ message: "Application submitted successfully" });
//   } catch (error) {
//     console.error("Error applying for tournament:", error);
//     res
//       .status(500)
//       .json({ error: "Internal Server Error", message: error.message });
//   }
// });

// Get tournaments open for application
router.get("/getOpenTournaments", async (req, res) => {
  try {
    const openTournaments = await TournamentModel.find({
      tournamentStatus: "Open for Application",
    }).populate("applications.user", "name");

    res.json(openTournaments);
  } catch (error) {
    console.error("Error fetching open tournaments:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
});

// Review tournament applications
router.get(
  "/reviewTournamentApplications/:tournamentId/:userId",
  async (req, res) => {
    try {
      const tournamentId = req.params.tournamentId;
      const userId = req.params.userId;
      const tournament = await TournamentModel.findById(tournamentId).populate(
        "applications.user",
        "name"
      );

      if (!tournament) {
        return res.status(404).json({ error: "Tournament not found" });
      }

      const userApplications = tournament.applications.filter(
        (application) => application.user && application.user.equals(userId)
      );

      res.json({ tournament, userApplications });
    } catch (error) {
      console.error("Error fetching tournament data:", error);
      res
        .status(500)
        .json({ error: "Internal Server Error", message: error.message });
    }
  }
);

module.exports = router;

const express = require("express");
const mongoose = require("mongoose");
const router = require("express").Router();
const TournamentModel = require("../models/Tournaments");
const ApplicationModel = require("../models/ApplicantionStatus");

// Apply for a tournament
router.post("/applyForTournament/:tournamentId", async (req, res) => {
  const tournamentId = req.params.tournamentId;
  const userId = req.body.userId;

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
    const application = await ApplicationModel.create({
      tournament: tournamentId,
      user: userId,
      action: "REQUESTED",
    });
    // tournament.applications.push(application._id);
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

router.get("/getUserApplications/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    // Find applications where the user has applied
    const userApplications = await ApplicationModel.find({ user: userId });

    // Extract tournament IDs from the applications
    const appliedTournamentIds = userApplications.map((app) => app.tournament);

    res.status(200).json(appliedTournamentIds);
  } catch (error) {
    console.error("Error fetching user applications:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/getApplicationOfTournament/:tournamentId", async (req, res) => {
  const { tournamentId } = req.params;

  try {
    if (!tournamentId) {
      throw new Error("Tournament id is missing ");
    }
    const applicants = await ApplicationModel.find({
      tournament: tournamentId,
    }).populate(["user", "tournament"]);

    res.json({ message: applicants, success: true });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Internal server error ", success: false });
  }
});

// Get tournaments open for application
router.get("/getOpenTournaments", async (req, res) => {
  try {
    const openTournaments = await TournamentModel.find({
      tournamentStatus: "Open for Application",
    }).populate(["applications._id"]);

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

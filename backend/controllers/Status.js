const StatusModel = require("../models/Status");

const handleCreateStatus = (req, res) => {
    StatusModel.create(req.body)
      .then((status) => res.json(status))
      .catch((err) => res.json(err));
  };

  module.exports = { 
    handleCreateStatus,

  };
const Emergency = require('../models/emergency');

const getEmergencies = async (req, res) => {
  try {
    const emergencies = await Emergency.find();
    res.json(emergencies);
  } catch (error) {
    res.status(500).json({ message: "Error in emergencies recovery" });
  }
};

const getEmergencyById = async (req, res) => {
  try {
    const emergency = await Emergency.findById(req.params.id);
    if (!emergency) return res.status(404).json({ message: "Emergency not found" });
    res.json(emergency);
  } catch (error) {
    res.status(500).json({ message: "Error in emergency recovery" });
  }
};

const createEmergency = async (req, res) => {
  try {
    let emergency = new Emergency(req.body);
    emergencyv = await emergency.save();
    let emergencyId = emergency._id;
    res.location('/api/emergencies/' + emergencyId).status(201).json(emergency);
  } catch (error) {
    res.status(400).json({ message: "Error in emergency creation" });
  }
};

const updateEmergency = async (req, res) => {
  try {
    const emergency = await Emergency.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!emergency) return res.status(404).json({ message: "Emergency not found" });
    res.json(emergency);
  } catch (error) {
    res.status(400).json({ message: "Error in emergency update" });
  }
};

const deleteEmergency = async (req, res) => {
  try {
    const emergency = await Emergency.findByIdAndDelete(req.params.id);
    if (!emergency) return res.status(404).json({ message: "Emergency non trovata" });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: "Error in emergency deletion" });
  }
};

module.exports = { getEmergencies, getEmergencyById, createEmergency, updateEmergency, deleteEmergency };

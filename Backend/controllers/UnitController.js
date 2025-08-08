const Unit = require('../Models/Unit');
const mongoose = require('mongoose');

exports.createUnit = async (req, res) => {
  try {
    const { Unitname, selectedLevels } = req.body;

    // Create the Unit
    const newUnit = await Unit.create({
      Unitname,
      Levels: selectedLevels.join(',')  // Save level names as comma-separated string
    });

    for (let levelName of selectedLevels) {
      // ✅ Reuse existing model if already compiled
      let LevelModel;
      if (mongoose.models[levelName]) {
        LevelModel = mongoose.models[levelName];
      } else {
        LevelModel = mongoose.model(
          levelName,
          new mongoose.Schema({
            unitIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Unit' }]
          }),
          levelName // Use the collection name as-is
        );
      }

      // Try to find any document in the level collection
      let levelDoc = await LevelModel.findOne();

      if (!levelDoc) {
        await LevelModel.create({ unitIds: [newUnit._id] });
      } else {
        levelDoc.unitIds.push(newUnit._id);
        await levelDoc.save();
      }
    }

    res.status(201).json({ message: 'Unit created and ID added to level collections', unit: newUnit });
  } catch (error) {
    console.error('Error creating unit:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};
// In your adminController.js

exports.getUnits = async (req, res) => {
  try {
    const units = await Unit.find().sort({ createdAt: -1 });
    res.status(200).json({ units });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching units' });
  }
};

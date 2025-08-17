const Unit = require('../Models/Unit');
const mongoose = require('mongoose');

// CREATE Unit (you already have this)
exports.createUnit = async (req, res) => {
  try {
    const { Unitname, selectedLevels } = req.body;

    const newUnit = await Unit.create({
      Unitname,
      Levels: selectedLevels.join(',')
    });

    for (let levelName of selectedLevels) {
      let LevelModel;
      if (mongoose.models[levelName]) {
        LevelModel = mongoose.models[levelName];
      } else {
        LevelModel = mongoose.model(
          levelName,
          new mongoose.Schema({
            unitIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Unit' }]
          }),
          levelName
        );
      }

      let levelDoc = await LevelModel.findOne();
      if (!levelDoc) {
        await LevelModel.create({ unitIds: [newUnit._id] });
      } else {
        levelDoc.unitIds.push(newUnit._id);
        await levelDoc.save();
      }
    }

    res.status(201).json({ message: 'Unit created and added to levels', unit: newUnit });
  } catch (error) {
    console.error('Error creating unit:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// GET Units
exports.getUnits = async (req, res) => {
  try {
    const units = await Unit.find().sort({ createdAt: -1 });
    res.status(200).json({ units });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching units' });
  }
};

// ✅ UPDATE Unit
exports.updateUnit = async (req, res) => {
  try {
    const { id } = req.params;
    const { Unitname, selectedLevels } = req.body;

    const updatedUnit = await Unit.findByIdAndUpdate(
      id,
      {
        Unitname,
        Levels: selectedLevels.join(',')
      },
      { new: true }
    );

    res.status(200).json({ message: 'Unit updated successfully', unit: updatedUnit });
  } catch (error) {
    console.error('Error updating unit:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// ✅ DELETE Unit and remove from Level collections
exports.deleteUnit = async (req, res) => {
  try {
    const { id } = req.params;

    const unit = await Unit.findById(id);
    if (!unit) return res.status(404).json({ message: 'Unit not found' });

    const levelNames = unit.Levels.split(',');

    for (let levelName of levelNames) {
      let LevelModel;
      if (mongoose.models[levelName]) {
        LevelModel = mongoose.models[levelName];
      } else {
        LevelModel = mongoose.model(
          levelName,
          new mongoose.Schema({
            unitIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Unit' }]
          }),
          levelName
        );
      }

      // Remove unitId from unitIds array in the level collection
      await LevelModel.updateMany(
        { unitIds: id },
        { $pull: { unitIds: id } }
      );
    }

    await Unit.findByIdAndDelete(id);

    res.status(200).json({ message: 'Unit deleted and removed from levels' });
  } catch (error) {
    console.error('Error deleting unit:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

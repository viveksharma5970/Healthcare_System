import Mapping from "../models/mapping.model.js";

export const addMapping = async (req, res) => {
  const { patientId, doctorId } = req.body;

  try {
    const patientAlreadyExists = await Mapping.findOne({ patientId });
    if(patientAlreadyExists) {
        if (!patientAlreadyExists.doctorId.includes(doctorId)) {
        patientAlreadyExists.doctorId.push(doctorId);
        await patientAlreadyExists.save();
      }
        res.status(200).json(patientAlreadyExists);
    } else {
        const newMapping = new Mapping({
            patientId,
            doctorId: [doctorId],
        });
        await newMapping.save();
        res.status(200).json(newMapping);
    }
  } catch (error) {
    console.log("Error in addMapping controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getMappings = async (req, res) => {
    try {
    const mappings = await Mapping.find()
      .populate("patientId", "fullName age gender")
      .populate("doctorId", "fullName specialization contact");
    res.status(200).json(mappings);
  } catch (error) {
    console.log("Error in getMapping controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getDoctorAssigned = async (req, res) => {
    const {patientId} = req.params;
    try {
    const mapping = await Mapping.findOne({ patientId })
      .populate("doctorId", "fullName specialization contact");
    if (!mapping) {
      return res.status(404).json({ message: "No doctors assigned to this patient" });
    }
    res.status(200).json(mapping.doctorId);
  } catch (error) {
    console.log("Error in getDoctorAssigned controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteAssignedDoctor = async (req, res) => {
  const { patientId, doctorId } = req.params;

  try {
    const mapping = await Mapping.findOne({ patientId });
    if (!mapping) {
      return res.status(404).json({ message: "No mapping found for this patient" });
    }

    mapping.doctorId = mapping.doctorId.filter(
      (doc) => doc.toString() !== doctorId
    );

    await mapping.save();

    res.status(200).json({ message: "Doctor unassigned successfully" });
  } catch (error) {
    console.log("Error in deleteAssignedDoctor controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


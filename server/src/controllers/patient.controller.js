import Patient from "../models/patient.model.js";

export const addPatient = async (req, res) => {
  const { fullName, age, gender,address, diagnosis } = req.body;

  if (!fullName || !age || !gender || !address || !diagnosis) {
    return res.status(400).json({ message: "All fields required" });
  }

  try {
    const newPatient = new Patient({
      fullName,
      age,
      gender,
      address,
      diagnosis,
      createdBy: req.user._id,
    });

    await newPatient.save();

    return res.status(200).json({
      fullName: newPatient.fullName,
      age: newPatient.age,
      gender: newPatient.gender,
      address: newPatient.address,
    });
  } catch (error) {
    console.log("error in addPatient controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    if(patients.length === 0) {
        res.status(404).json({message: "No patient found"});
    }
    res.status(200).json(patients);
  } catch (error) {
    console.error("Error in getPatients:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getSpecificPatient = async (req, res) => {
  const { id } = req.params;
  try {
    const patient = await Patient.findById(id);

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.status(200).json(patient);
  } catch (error) {
    console.log("Error in getSpecificPatient controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const updatePatient = async (req, res) => {
  const { id } = req.params;
  const updateDetails = req.body;

  try {
    const updated = await Patient.findByIdAndUpdate(id, updateDetails);
    if (!updated) {
      res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "Patient details updated successfully" });
  } catch (error) {
    console.log("Error in uodatePatient controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deletePatient = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Patient.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "Patient details deleted successfully" });
  } catch (error) {
    console.log("Error in deletePatient controller", error.message);
    req.status(500).json({ message: "Internal Server Error" });
  }
};

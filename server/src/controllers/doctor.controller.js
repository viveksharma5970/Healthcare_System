import Doctor from "../models/doctor.model.js";

export const addDoctor = async (req, res) => {
  const { fullName, specialization, experience, contact } = req.body;
  if (!fullName || !specialization || !experience || !contact) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newDoctor = new Doctor({
      fullName,
      specialization,
      experience,
      contact,
    });

    await newDoctor.save();

    res.status(200).json(newDoctor);
  } catch (error) {
    console.log("Error in saveDoctor controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    if (doctors.length === 0) {
      return res.status(404).json({ message: "No doctor found" });
    }
    res.status(200).json(doctors);
  } catch (error) {
    console.log("Error in getDoctor controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getSpecificDoctor = async (req, res) => {
  const { id } = req.params;
  try {
    const doctor = await Doctor.findById(id);
    if (!doctor) {
      return res.status(404).json({ message: "No doctor found" });
    }
    res.status(200).json(doctor);
  } catch (error) {
    console.log("Error in getSpecificDoctor controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateDoctor = async (req, res) => {
  const { id } = req.params;
  const updateDetails = req.body;

  try {
    const updated = await Doctor.findByIdAndUpdate(id, updateDetails);

    if (!updated) {
      return res.status(404).json({ message: "No doctor found" });
    }
    res.status(200).json({ message: "Doctor details updated successfully" });
  } catch (error) {
    console.log("Error in updateDoctor controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteDoctor = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Doctor.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "No doctor found" });
    }
  } catch (error) {
    console.log("Error in updateDoctor controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

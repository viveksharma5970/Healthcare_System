import mongoose from "mongoose";

const mappingSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    doctorId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
      }
    ],
  },
  { timestamps: true }
);

const Mapping = mongoose.model("Mapping", mappingSchema);
export default Mapping;

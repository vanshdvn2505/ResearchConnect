import mongoose from "mongoose";
const { Schema } = mongoose;

const projectSchema = new Schema({
  professorId: {
    type: Schema.Types.ObjectId,
    ref: "User", // 👈 link to User collection
    required: true,
  },
  title: { type: String, required: true },
  domain: { type: String, required: true },
  cover: { type: String },
  images: { type: [String], default: [] },
  desc: { type: String },
  shortTitle: { type: String },
  shortDesc: { type: String },
  durationWeeks: { type: Number, default: 0 },
  positionsAvailable: { type: Number, default: 0 },
  requirements: { type: [String], default: [] },
  stipend: { type: Number, default: 0 },
  applicants: [{ type: Schema.Types.ObjectId, ref: "User" }], // 👈 student refs
}, { timestamps: true });

export default mongoose.model("Project", projectSchema);

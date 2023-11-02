const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ageSchema = new Schema(
  {
   
    ageName: { type: String, require: true },
    isDelete: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Ages = mongoose.model("Ages", ageSchema);
module.exports = Ages;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paymentSchema = new Schema(
  {
    customerId: {
      type: String,
      required: true
    },
    packageId: {
      type: String,
      require: true
    },
    createDate: {
      type: Boolean,
      default: false
    },
    amount: {
      type: Float64Array,
      require: true
    },
    paymentStatus: {
      type: Boolean,
      default: false
    },
    privateCode: {
      type: String,
      require: true
    }
  },
  { timestamps: true }
);

const Payments = mongoose.model("Payments", paymentSchema);
module.exports = Payments;

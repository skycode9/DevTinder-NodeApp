const mongoose = require("mongoose");

const ConnectionRequestSchema = mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["ignored", "interested", "accepeted", "rejected"],
        message: `{VALUE} is incorrect status type`,
      },
    },
  },
  { timestamps: true }
);

ConnectionRequestSchema.pre("save", function (next) {
  const user = this;
  // Check if the fromUserId is same as toUserId
  if (user.fromUserId.equals(user.toUserId)) {
    throw new Error("Can not send conncetion request to your self..!");
  }
  next();
});

const ConnectionRequest = mongoose.model(
  "ConnectionRequest",
  ConnectionRequestSchema
);
module.exports = ConnectionRequest;

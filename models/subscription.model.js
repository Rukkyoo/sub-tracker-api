import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Subscription name is required"],
      trim: true,
      minlength: [3, "Subscription name must be at least 3 characters long"],
      maxlength: [50, "Subscription name must be at most 50 characters long"],
    },
    price: {
      type: Number,
      required: [true, "Subscription price is required"],
      min: [0, "Subscription price must be a positive number"],
    },
    currency: {
      type: String,
      enum: [
        "USD",
        "EUR",
        "GBP",
        "JPY",
        "AUD",
        "CAD",
        "CHF",
        "CNY",
        "SEK",
        "NZD",
        "NGN",
      ],
      required: [true, "User password is required"],
      default: "NGN",
    },
    frequency: {
      type: String,
      enum: ["weekly", "monthly", "yearly"],
      default: "monthly",
    },
    category: {
      type: String,
      enum: ["entertainment", "education", "health", "other"],
      required: [true, "Subscription category is required"],
      default: "other",
    },
    paymentMethod: {
      type: String,
      enum: ["credit_card", "debit_card", "paypal", "bank_transfer"],
      required: [true, "Payment method is required"],
      default: "credit_card",
    },
    status: {
      type: String,
      enum: ["active", "inactive", "cancelled", "expired"],
      default: "active",
    },
    startDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          return value <= new Date();
        },
        message: "Start date cannot be in the future",
      },
    },
    renewalDate: {
      type: Date,
      required: false,
      validate: {
        validator: function (value) {
          return value > this.startDate();
        },
        message: "Renewal date must be after the start date",
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
      index: true,
    },
  },
  { timestamps: true }
);


// Auto calculate renewal date if missing
subscriptionSchema.pre("save", function (next) {
  if (!this.renewalDate) {
    const renewalPeriods = {
      daily: 1,
      weekly: 7,
      monthly: 30,
      yearly: 365,
    };

    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setDate(
      this.renewalDate.getDate() + renewalPeriods[this.frequency]
    );

    // Check if the renewal date is in the past
    if (this.renewalDate < new Date()) {
        this.status = "expired";
    }
  }
  next()
});

const Subscription = mongoose.model("Subscription", subscriptionSchema)

export default Subscription

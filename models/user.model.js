import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "User name is required"],
        trim: true,
        minlength: [3, "User name must be at least 3 characters long"],
        maxlength: [50, "User name must be at most 50 characters long"],
    },
    email: {
        type: String,
        required: [true, "User email is required"],
        unique: true,
        lowercase: true,
        trim: true,
        minlength: [5, "User name must be at least 3 characters long"],
        maxlength: [255, "User name must be at most 50 characters long"],
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    password: {
        type: String,
        required: [true, "User password is required"],
        trim: true,
        minlength: [6, "User password must be at least 6 characters long"],
        maxlength: [1024, "User password must be at most 1024 characters long"],
    }

}, {timestamps: true});

const User = mongoose.model("User", userSchema);
export default User;
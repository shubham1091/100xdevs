const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

const main = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("Connected to the database");
    } catch (error) {
        console.error("Error connecting to the database:", error);
        process.exit(1);
    }
};

main();

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30,
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50,
    },
    resetToken: {
        type: String,
        default: null,
    },
});

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    } catch (error) {
        return next(error);
    }
});

UserSchema.pre("findOneAndUpdate", async function (next) {
    const update = this.getUpdate();
    if (!update.password) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(update.password, salt);
        update.password = hashedPassword;
        next();
    } catch (error) {
        return next(error);
    }
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

UserSchema.methods.generateResetToken = async function () {
    try {
        // Generate a random token
        const resetToken = uuidv4();

        // Hash the token
        const hashedResetToken = await bcrypt.hash(resetToken, 10);

        // Store the hashed token in the resetToken field
        this.resetToken = hashedResetToken;

        // Return the unhashed token
        return resetToken;
    } catch (error) {
        // Handle error if any
        throw new Error("Error generating reset token");
    }
};

const AccountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    balance: {
        type: Number,
        required: true,
    },
});

const User = mongoose.model("User", UserSchema);
const Account = mongoose.model("Account", AccountSchema);

module.exports = {
    User,
    Account,
};

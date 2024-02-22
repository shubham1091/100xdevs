const mongoose = require("mongoose");

const main = async () => {
    await mongoose.connect(process.env.DB_URL);
};

main().catch((err) => console.log(err));

const UserSchema = new mongoose.Schema({
    username: String,
    firstName: String,
    lastName: String,
    password: String,
});

const User = mongoose.model("User", UserSchema);

module.exports = {
    User,
};

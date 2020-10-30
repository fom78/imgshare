const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;

const userSchema = new Schema(
    {
        email: String,
        password: String
    },
    {
        timestamps: true,
    }
);

// userSchema.methods.encryptPassword = (password) => {
//   return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
// };

// userSchema.methods.comparePassword= function (password) {
//   return bcrypt.compareSync(password, this.password);
// };

userSchema.statics.encryptPassword = async function (password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

module.exports = mongoose.model('User', userSchema);

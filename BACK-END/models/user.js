const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//mongoose schema for the users collection
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    roles: [
      {
        type: String,
        required: true,
      },
    ],
    resetToken: {
      type: String,
    },
    resetTokenExpiration: {
      type: Date,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.methods.encryptPassword = async (password) =>{
const salt = await bcrypt.genSalt(10);
 return bcrypt.hash(password, salt);
};

userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};


module.exports = mongoose.model('users', userSchema);

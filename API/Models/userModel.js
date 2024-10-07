const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // this helps us to encrypt the password bbefore storing it in the databasee

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name"]
  },
  email: {
    type: String,
    required: [true, "Please tell us your email"],
    unique: true,
    lowercase: true,
  },
  role: {
    type: String,
    enum: ["user, admin"],
    default: "user"
  },
  password: {
    type: String,
    required: [true, "Please provide a password"]
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
        validator: function (el) {
            return el === this.password;
        },
        message: "Passwords are not the same"
    },
},
});

userSchema.pre("save", async function (next) {
  //only runs this function if password was actually modified
  if (!this.isModified("password")) return next();

  //Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  //Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
})

//We will also define another method for checking for password based on date and time.
userSchema.pre("save", function (next) {
  if(!this.isModified("password") || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
})

//This is the third method, and in this, we get all the data and display it
//This points to the current query
userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
})

//We will define another method, and this will run when the user put his password and check if the current password matches the encrypted password and the user password
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
}
  
// This is another method which checks
userSchema.methods.passwordChangedAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
      const changedTimestamp = parseInt(
          this.passwordChangedAt.getTime() / 1000,
          10
      );

      return JWTTimestamp < changedTimestamp;
  }
  // False means NOT changed
  return false;
}; 

module.exports = mongoose.model('User', userSchema);

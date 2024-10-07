const jwt = require('jsonwebtoken');
const User = require('../Models/userModel');

const signToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
res.json({ signToken });

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id)

  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ), 
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  })
}
// Remove password frorm output
user.password = undefined;

res.status(statusCode).json({
  status: "success",
  token,
  data: {
    user,
  }
})

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
    createSendToken(newUser, 201, req, res)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
/* OR
exports.register = async (req, res) => {
  const newUser = await User.create({
  name: req.body.name,
  email: req.body.email,
  password: req.body.password
  })
}
*/
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/*
exports.login = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({message: 'Please provide your information'})
  }
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return res.status(401).json({message: 'Incorrect email or password'})
  }
  createSendToken(user, 200, req, res); 
}
*/

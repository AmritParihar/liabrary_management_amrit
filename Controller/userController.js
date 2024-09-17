const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Model/User');

// Register
const register = async (req, res) => {
    const { username, password, role } = req.body;
    try {
        console.log("req.body=-=--=-=>>>>>",req.body)
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({ username, password: hashedPassword, role });
        console.log("newUser =-=-=-=->>>>",newUser)
        res.status(201).json({ message: 'User registered successfully', newUser });
    } catch (err) {
        console.log("erorr=--==-=-=-=->>>>>",err)
        res.status(500).json({ message: 'Error during registration' });
    }
};

// Login
const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ where: { username } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.SECRET_KEY);
        res.json({ message: 'Login successful', token });
    } catch (err) {
        res.status(500).json({ message: 'Error during login' });
    }
};

module.exports = { register, login };

const asyncHandler = require("express-async-handler")
const User = require("../model/userSchema")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const registerUser = asyncHandler(async (req, res) => {

    const { name, email, password } = req.body

    if (!name || !email || !password) {
        res.status(401)
        throw new Error("Pls fill all details")
    }

    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(401)
        throw new Error("User already Exist")
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hashSync(password, salt)

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if (user) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            password: hashedPassword,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error("Invalid Credentials")
    }

})

const loginUser = async (req, res) => {

    const { email, password } = req.body

    if (!email || !password) {
        res.status(401)
        throw new Error("Pls fill all details")
    }

    const user = await User.findOne({ email })

    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user._id,
            email: user.email,
            password: user.password,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error("Invalid Credentials")
    }

}

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d"
    })
}

const getMe = async(req,res) => {
    res.send("I am from Get me")
} 

module.exports = { registerUser, loginUser , getMe}
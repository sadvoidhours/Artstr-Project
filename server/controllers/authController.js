const UserModel = require('../models/users');

const testEndpoint = (res) => {
    res.json('Hello from the server!')
}

const registerUser = async(req, res) => {
    try {
        const {username, email, password} = req.body;
        if(!username || !email || !password){
            return res.status(400).json({msg: 'Please enter all fields'})
        }
        if(password.length < 6){
            return res.status(400).json({msg: 'Password must be at least 6 characters long'})
        }
        const existingUser = await UserModel.findOne({email})
        if(existingUser){
            return res.status(400).json({msg: 'An account with this email already exists'})
        }
        const user = await UserModel.create({
            username,
            email,
            password
        });
        return res.json(user);
    } catch (error) {
        console.log(error);
        logger.error(error.message, { metadata: error });
        res.status(500).json({ msg: 'Server error' });
    }
}


module.exports = {  
    testEndpoint,
    registerUser
}
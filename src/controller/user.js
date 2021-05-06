const User = require("../model/user");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports.signup = (req, res) => {
    const { name, email, password } = req.body;
    if(!name || !email || !password){
        return res.status(422).json({ message: 'Please Fill all the required Fields' })
    }
    User.findOne({ email: email }).then(async (user) => {
        if(user){
            return res.status(422).json({ message: 'User Already Exists' })
        }
        else{
            const encryptedPassword = await bcrypt.hash(password, 10);
            const createdUser = new User({
                name, email, password: encryptedPassword
            })
            createdUser.save().then((createdUser) => {
                return res.status(201).json({
                    user: createdUser
                })
            }).catch((err) => {
                return res.status(500).json({ message: 'Something went Wrong' })
            })
           
        }
    }).catch((err) => {
        return res.status(500).json({ message: 'Something went Wrong' })
    })

}

module.exports.signin = (req, res) => {
    const { password, email } = req.body;
    // async 
    User.findOne({ email: email }).then((user) => {
        if(user){   
            bcrypt.compare(password, user.password).then((passwordMatched) => {
                if(passwordMatched){ 
                    return res.status(200).json({ token: jwt.sign({ _id: user._id }, process.env.JWT_SECURITY_KEY, { expiresIn: '15d' }) , user })
                }
                else{
                    return res.status(422).json({ message: 'Email or Password is wrong' })
                } 
            })
            // const passwordMatched = await bcrypt.compare(password, user.password)
        }else{
            return res.status(422).json({ message: 'Email or Password is wrong' })
        }
    }).catch((err) => {
        return res.status(500).json({ err: err })
    })
}
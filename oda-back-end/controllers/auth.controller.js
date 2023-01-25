const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../schemas/User.js'); 

const { SECRET } = process.env;

exports.signup = async (req, res) => {
    const { email, password, name } = req.body;

    const user = new User({ 
      email,
      name, 
      password: bcrypt.hashSync(password, 10),
    });

    user.save((err, user) => {
      if (err) {
        console.log(err);
        res.status(500)
          .send({
            error: err
          });
        return;
      } else {
        res.status(200)
          .send({
            message: "User Registered successfully!",
            username: user.name,
            email: user.email,
            _id: user._id
          })
      }
    })
}

exports.login = async (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .exec( (err, user) => {
      if(err) {
        res.status(400).json({ error: err });
        return;
      }

      if(!user) {
        res.status(400).json({ error: 'User not found' });
        return;
      }

      const isPasswordValid = bcrypt.compareSync(password, user.password);
      if(!isPasswordValid) {
        return res.status(400).json({ error: 'Invalid password' });
      }

      const token = jwt.sign({username: user.name, email: user.email, _id: user._id}, SECRET);

      res.status(200).send({ 
        message: 'Login succesful',
        acessToken: token,
        username: user.name,
        email: user.email,
        _id: user._id
      })
    })
}
const jwt = require('jsonwebtoken');
const User = require('../schemas/User.js');

const verifyToken = (req, res, next) => {
  if(!req.headers ||  !req.headers.authorization || req.headers.authorization.split(' ')[0] !== 'Bearer') {
    return res.status(401).json({ error: 'Invalid JWT token' });
  }

  const token = req.headers.authorization.split(' ')[1];
  
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if(err) {
      return res.status(401).json({ error: 'Invalid JWT token' });
    }

    User.findOne({ _id: decoded._id })
      .exec( (err, user) => {
        if(err) {
          res.status(500).send({ error: err });
        }
        else {
          req.user = user;
          next(req, res);
        }
      });
  });
};

module.exports = verifyToken;
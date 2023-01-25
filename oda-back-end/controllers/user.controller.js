const Query = require('../schemas/Query.js');
const tokenValidation = require('../middleware/verifyJWT.js'); 

async function saveQuery(req, res) {
    const { email, query, type, outValues, entryValues } = req.body;

    const queryToSave = new Query({
        email,
        query,
        type,
        outValues, 
        entryValues
    });

    queryToSave.save((err, queryToSave) => {
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
              message: "Query saved successfully!",
              email: queryToSave.email,
              query: queryToSave.query,
              _id: queryToSave._id
            })
        }
      })
}

exports.save = async (req, res) => tokenValidation(req, res, saveQuery);

async function getQueries(req, res) {
    const email = req.user.email;

    Query.find({ email })
    .exec( (err, queries) => {
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
              queries: queries
            })
        }
      })
}

exports.queries = async (req, res) => tokenValidation(req, res, getQueries);

async function getQuery(req, res) {
    const queryId = req.params.id;

    Query.findById(queryId)
    .exec( (err, query) => {
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
              query: query
            })
        }
      })
}

exports.query = async (req, res) => tokenValidation(req, res, getQuery);

async function shareQuery(req, res) {
    const userEmail = req.user.email;
    const queryId = req.body.id;
    const friendEmail = req.body.email;

    Query.findById(queryId)
    .exec( (err, query) => {
        if (err) {
          console.log(err);

          res.status(500)
            .send({
              error: err
            });

          return;
        } 
        
        console.log('query email: ' + query.email);
        console.log('user email: ' + userEmail);

        if(query.email != userEmail) {
            res.status(403).json({ error: 'You cannot share a query that is not yours!' });

            return;
        }

        const newQuery = new Query({
            email: friendEmail,
            query: query.query,
            type: query.type,
            outValues: query.outValues,
            entryValues: query.entryValues
        })

        newQuery.save((err, newQuery) => {
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
                  message: "Query shared successfully!",
                  email: newQuery.email,
                  query: newQuery.query,
                  _id: newQuery._id
                })
            }
        })
    })
}

exports.shareQuery = async (req, res) => tokenValidation(req, res, shareQuery);

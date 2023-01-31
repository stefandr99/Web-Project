const Query = require("../schemas/Query.js");
const tokenValidation = require("../middleware/verifyJWT.js");

async function saveQuery(req, res) {
  try {
    const {
      email,
      query,
      type,
      outValues,
      entryValues,
      title,
      description,
      source,
    } = req.body;

    const queryToSave = new Query({
      title,
      description,
      email,
      query,
      source,
      type,
      outValues,
      entryValues,
    });

    queryToSave.save((err, queryToSave) => {
      if (err) {
        console.log(err);

        res.status(500).send({
          error: err,
        });

        return;
      } else {
        res.status(200).send({
          message: "Query saved successfully!",
          email: queryToSave.email,
          query: queryToSave.query,
          _id: queryToSave._id,
        });
      }
    });
  } catch (err) {
    res.status(500).send({
      error: err,
    });
  }
}

exports.save = async (req, res) => tokenValidation(req, res, saveQuery);

async function getQueries(req, res) {
  try {
    const email = req.user.email;

    Query.find({ email }).exec((err, queries) => {
      if (err) {
        console.log(err);

        res.status(500).send({
          error: err,
        });

        return;
      } else {
        res.status(200).send({
          queries: queries,
        });
      }
    });
  } catch (err) {
    res.status(500).send({
      error: err,
    });
  }
}

exports.queries = async (req, res) => tokenValidation(req, res, getQueries);

async function getQuery(req, res) {
  try {
    const queryId = req.params.id;

    Query.findById(queryId).exec((err, query) => {
      if (err) {
        console.log(err);

        res.status(500).send({
          error: err,
        });

        return;
      } else {
        res.status(200).send({
          query: query,
        });
      }
    });
  } catch (err) {
    res.status(500).send({
      error: err,
    });
  }
}

exports.query = async (req, res) => tokenValidation(req, res, getQuery);

async function shareQuery(req, res) {
  try {
    const userEmail = req.body.userEmail;
    const queryId = req.body.queryId;
    const friendEmail = req.body.friendEmail;

    Query.findById(queryId).exec((err, query) => {
      if (err) {
        console.log(err);

        res.status(500).send({
          error: err,
        });

        return;
      }

      if (query.email != userEmail) {
        res
          .status(403)
          .json({ error: "You cannot share a query that is not yours!" });

        return;
      }

      const newQuery = new Query({
        title: query.title,
        description: query.description,
        email: friendEmail,
        query: query.query,
        source: query.source,
        type: query.type,
        outValues: query.outValues,
        entryValues: query.entryValues,
      });

      newQuery.save((err, newQuery) => {
        if (err) {
          console.log(err);

          res.status(500).send({
            error: err,
          });

          return;
        } else {
          res.status(200).send({
            message: "Query shared successfully!",
            email: newQuery.email,
            query: newQuery.query,
            _id: newQuery._id,
          });
        }
      });
    });
  } catch (err) {
    res.status(500).send({
      error: err,
    });
  }
}

exports.shareQuery = async (req, res) => tokenValidation(req, res, shareQuery);

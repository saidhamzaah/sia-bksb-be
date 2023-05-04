const jwt = require("jsonwebtoken");

module.exports = {
  auth0: function (req, res, next) {
    const bearerToken = req.header("auth-token");
    if (!bearerToken) {
      res.status(404).send({
        success: false,
        message: "Token is Empty",
      });
    } else {
      const token = bearerToken.split(" ")[1];
      jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (!err) {
          if (!decoded.role == 0) next();
          else {
            res.status(403).send({
              success: false,
              message: "Forbidden Access",
            });
          }
        } else {
          res.status(401).send({
            success: false,
            message: err,
          });
        }
      });
    }
  },
  auth1: function (req, res, next) {
    const bearerToken = req.header("auth-token");
    if (!bearerToken) {
      res.status(404).send({
        success: false,
        message: "Token is Empty",
      });
    } else {
      const token = bearerToken.split(" ")[1];
      jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (!err) {
          if (!decoded.role == 1) next();
          else {
            res.status(403).send({
              success: false,
              message: "Forbidden Access",
            });
          }
        } else {
          res.status(401).send({
            success: false,
            message: err,
          });
        }
      });
    }
  },
  auth3: function (req, res, next) {
    const bearerToken = req.header("auth-token");
    if (!bearerToken) {
      res.status(404).send({
        success: false,
        message: "Token is Empty",
      });
    } else {
      const token = bearerToken.split(" ")[1];
      jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (!err) {
          if (!decoded.role == 3) next();
          else {
            res.status(403).send({
              success: false,
              message: "Forbidden Access",
            });
          }
        } else {
          res.status(401).send({
            success: false,
            message: err,
          });
        }
      });
    }
  },
  auth4: function (req, res, next) {
    const bearerToken = req.header("auth-token");
    if (!bearerToken) {
      res.status(404).send({
        success: false,
        message: "Token is Empty",
      });
    } else {
      const token = bearerToken.split(" ")[1];
      jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (!err) {
          if (!decoded.role == 4) next();
          else {
            res.status(403).send({
              success: false,
              message: "Forbidden Access",
            });
          }
        } else {
          res.status(401).send({
            success: false,
            message: err,
          });
        }
      });
    }
  },
};

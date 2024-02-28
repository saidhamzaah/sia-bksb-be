const jwt = require("jsonwebtoken");

module.exports = {
  auth_SU: function (req, res, next) {
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
          if (!decoded.role_id == 0) next();
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
  auth_1: function (req, res, next) {
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
          if (!decoded.role_id == 1) next();
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
  auth_2: function (req, res, next) {
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
          if (!decoded.role_id == 2) next();
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
  authentication: (req, res, next) => {
    const bearerHeader = req.headers.authorization;
    let token;
    if (bearerHeader) {
      token = bearerHeader.split(" ")[1];
    }
    if (!token) {
      return res.sendStatus(403);
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      // console.log(token, "token");
      if (user.roleId === 100) {
       return res.sendStatus(403);
      }

      req.token = user;
      next();
    });
  },
  authorization: (req, res, next) => {
    const token = req.token;
    console.log(token.roleId);
    if (token.role === 100) {
      res.sendStatus(403);
    }
    next();
  },
};

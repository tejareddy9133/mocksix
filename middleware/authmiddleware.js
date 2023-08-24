const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  const token = req.headers.authourization.split(" ")[1];
  if (token) {
    try {
      const decoded = jwt.verify(token, "teju");
      if (decoded) {
        console.log("hii", decoded);
        req.body.userID = decoded.userID;
        req.body.username = decoded.name;

        next();
      } else {
        res.json({ msg: "not authenticated" });
      }
    } catch (err) {
      res.json({
        err: err.message,
      });
    }
  } else {
    res.json({ msg: "please login again" });
  }
};
module.exports = {
  auth,
};

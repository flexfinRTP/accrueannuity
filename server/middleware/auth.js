const jwt = require('jsonwebtoken'); //auth api
const { pool } = require('../db/connect'); //required for connect to postgres db

const authMiddleware = async function (req, res, next) {
  try {
    const token = req.header('Authorization').split(' ')[1];
    const decoded = jwt.verify(token, process.env.secret); //cheks env for correct secret
    const result = await pool.query(
      'select b.userid,b.first_name,b.last_name,b.email,t.access_token from accrue_user b inner join tokens t on b.userid=t.userid where t.access_token=$1 and t.userid=$2',
      [token, decoded.userid]
    );
    const user = result.rows[0]; 
    if (user) {
      req.user = user;
      req.token = token;
      next();
    } else {
      throw new Error('Error while authentication');
    }
  } catch (error) {
    res.status(400).send({
      auth_error: 'Authentication failed.'
    });
  }
};

module.exports = authMiddleware;
const bcrypt = require('bcryptjs'); //password hashing
const jwt = require('jsonwebtoken'); //auth api
const { pool } = require('../db/connect');

//checks fields are valid
const isInvalidField = (receivedFields, validFieldsToUpdate) => {
  return receivedFields.some(
    (field) => validFieldsToUpdate.indexOf(field) === -1
  );
};
//checks user is in database, passwords match to db
const validateUser = async (email, password) => {
  const result = await pool.query(
    'select userid,  email, password from accrue_user where email = $1',
    [email]
  );
  const user = result.rows[0];
  if (user) {
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      delete user.password;
      return user;
    } else {
      throw new Error();
    }
  } else {
    throw new Error();
  }
};
//auth function, generate jwt token
const generateAuthToken = async (user) => {
  const { userid, email } = user;
  const secret = process.env.secret;
  const token = await jwt.sign({ userid, email }, secret);
  return token;
};

module.exports = {
  isInvalidField,
  validateUser,
  generateAuthToken
};

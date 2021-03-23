const express = require('express'); //express server
const bcrypt = require('bcryptjs'); //handles mutilple sql queries
const { pool } = require('../db/connect');
const {
  validateUser,
  isInvalidField,
  generateAuthToken
} = require('../utils/common');
const authMiddleware = require('../middleware/auth'); //auth api

const Router = express.Router();

//sign up route
Router.post('/signup', async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    const validFieldsToUpdate = [
      'first_name',
      'last_name',
      'email',
      'password'
    ];
    const receivedFields = Object.keys(req.body); //checks register fields are valid

    const isInvalidFieldProvided = isInvalidField( //checks ALL fields(receivedFields) are valid
      receivedFields,
      validFieldsToUpdate
    );

    if (isInvalidFieldProvided) { // throw error msg
      return res.status(400).send({
        signup_error: 'Invalid field.'
      });
    }

    const result = await pool.query( //checks db to make sure email doesnt already exsist
      'select count(*) as count from accrue_user where email=$1',
      [email]
    );
    const count = result.rows[0].count;
    if (count > 0) {
      return res.status(400).send({
        signup_error: 'User with this email address already exists.'
      });
    }
    //encrypt pass with bcrypt, sql query, $ = dynamic variable/prevents sql injection attack
    const hashedPassword = await bcrypt.hash(password, 8);
    await pool.query(
      'insert into accrue_user(first_name, last_name, email, password) values($1,$2,$3,$4)',
      [first_name, last_name, email, hashedPassword]
    );
    res.status(201).send();
  } catch (error) {
    console.log('err', error);
    res.status(400).send({
      signup_error: 'Error while signing up..Try again later.'
    });
  }
});
//sign in Route, validate match, create token on login
Router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await validateUser(email, password);
    if (!user) {
      res.status(400).send({
        sigin_error: 'Email/password does not match.'
      });
    }
    const token = await generateAuthToken(user); //expecting api token when logging in
    const result = await pool.query(
      'insert into tokens(access_token, userid) values($1,$2) returning *',
      [token, user.userid]
    );
    if (!result.rows[0]) {
      return res.status(400).send({
        signin_error: 'Error while signing in..Try again later.'
      });
    }
    user.token = result.rows[0].access_token; //throw error when email, pass do not match
    res.send(user);
  } catch (error) {
    res.status(400).send({
      signin_error: 'Email/password does not match.'
    });
  }
});

Router.post('/logout', authMiddleware, async (req, res) => {
  try {
    const { userid, access_token } = req.user; //makes sure token and userid is not in the database when logging out, else throw error
    await pool.query('delete from tokens where userid=$1 and access_token=$2', [
      userid,
      access_token
    ]);
    res.send();
  } catch (error) {
    res.status(400).send({
      logout_error: 'Error while logging out..Try again later.'
    });
  }
});

module.exports = Router;

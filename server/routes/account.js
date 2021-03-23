const express = require('express'); //express server
const authMiddleware = require('../middleware/auth'); //auth api
const { pool } = require('../db/connect');
const Router = express.Router();

const getAccountByAccountId = async function (account_id) { //fetch acct id
  try {
    const result = await pool.query(
      'select * from account a inner join accrue_user b on a.userid = b.userid where a.account_id=$1',
      [account_id]
    );
    return result.rows[0];
  } catch (error) {
    return null;
  }
};

async function getAccountByEmail(email) { //fetch acct email
  try {
    const result = await pool.query(
      'select * from account a inner join accrue_user b on a.userid = b.userid where b.email=$1',
      [email]
    );
    delete result.rows[0].password;
    return result.rows[0];
  } catch (error) {
    return null;
  }
}

// fetch email, throws error if no acct email
Router.get('/account', authMiddleware, async (req, res) => {
  try {
    const result = await getAccountByEmail(req.user.email);
    if (result) {
      res.send({ account: result });
    } else {
      res.status(400).send({
        get_error: 'Account details does not exist.'
      });
    }
  } catch (error) {
    res.status(400).send({
      get_error: 'Error while getting account details..Try again later.'
    });
  }
});
//
Router.post('/account', authMiddleware, async (req, res) => {
  const { payout_freq, contract_name, payout_amt } = req.body;
  try {
    await pool.query(
      'insert into account(payout_freq,contract_name,payout_amt,userid) values($1,$2,$3,$4)',
      [payout_freq, contract_name, payout_amt, req.user.userid]
    );
    res.status(201).send();
  } catch (error) {
    res.send({
      add_error: 'Error while adding new account..Try again later.'
    });
  }
});

Router.patch('/account', authMiddleware, async (req, res) => {
  const { payout_amt } = req.body;
  try {
    const result = await pool.query(
      'update account set payout_amt=$1 where userid=$2 returning *',
      [payout_amt, req.user.userid]
    );
    res.send({ account: result.rows[0] });
  } catch (error) {
    res.send({
      update_error: 'Error while updating account..Try again later.'
    });
  }
});

module.exports = { Router, getAccountByAccountId };
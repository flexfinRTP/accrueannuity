const express = require('express'); //express server
const authMiddleware = require('../middleware/auth'); //auth api
const { getClient } = require('../db/connect');
const Router = express.Router();
const { getTransactions} = require('../utils/common');

//contract_balance server transactions

Router.post('/deposit/:id', authMiddleware, async (req, res) => {
  const client = await getClient();
  try {
    await client.query('begin');
    const { transaction_date, deposit_amount } = req.body;
    const account_id = req.params.id;
    const result = await client.query(
      'select contract_balance from account where account_id=$1',
      [account_id]
    );

    const contract_balance = +result.rows[0].contract_balance;
    const total = contract_balance + deposit_amount;
    
    await client.query(
      'insert into transactions(transaction_date, deposit_amount, account_id, balance) values($1,$2,$3,$4) returning *',
      [transaction_date, deposit_amount, account_id, total]
    );
    await client.query(
      'update account set contract_balance = contract_balance + $1 where account_id=$2',
      [deposit_amount, account_id]
    );
    await client.query('commit');
    res.send();
  } catch (error) {
    await client.query('rollback');
    res.status(400).send({
      add_error: 'Error while depositing amount..Try again later.'
    });
  } finally {
    client.release();
  }
});

Router.post('/withdraw/:id', authMiddleware, async (req, res) => {
  const client = await getClient();
  try {
    await client.query('begin'); //adds withdraw amt to table
    const { transaction_date, withdraw_amount } = req.body;
    const account_id = req.params.id;
    const result = await client.query(
      'select contract_balance from account where account_id=$1',
      [account_id]
    );
    const contract_balance = +result.rows[0].contract_balance;
    const total = contract_balance - withdraw_amount;

    if (withdraw_amount <= contract_balance) { //checks withdraw updated contract total balance
      await client.query(
        'insert into transactions(transaction_date, withdraw_amount, account_id, balance) values($1,$2,$3,$4) returning *',
        [transaction_date, withdraw_amount, account_id, total]
      );
      await client.query(
        'update account set contract_balance = contract_balance - $1 where account_id=$2',
        [withdraw_amount, account_id]
      );
      await client.query('commit'); //pushes to table
    } else {
      return res.status(400).send({
        withdraw_error: "You don't have enough balance in your account"
      });
    }
    res.send();
  } catch (error) {
    await client.query('rollback'); //if there is an error, do not push changes to table and rollback changes
    res.status(400).send({
      withdraw_error: 'Error while withdrawing amount..Try again later.'
    });
  } finally {
    client.release();
  }
});

Router.get('/transactions/:id', authMiddleware, async (req, res) => {
  const { start_date, end_date } = req.query;
  try {
    const result = await getTransactions(req.params.id, start_date, end_date);
    res.send(result.rows);
  } catch (error) {
    res.status(400).send({
      transactions_error:
        'Error while getting transactions list..Try again later.'
    });
  }
});


module.exports = Router;
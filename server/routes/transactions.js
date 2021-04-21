const express = require('express'); //express server
const authMiddleware = require('../middleware/auth'); //auth api
const { getClient } = require('../db/connect');
const Router = express.Router();
const { getTransactions} = require('../utils/common');

//deposit func into database tables
Router.post('/deposit/:id', authMiddleware, async (req, res) => {
  const client = await getClient();
  try {
    await client.query('begin');
    const { transaction_date, deposit_amount } = req.body;
    const account_id = req.params.id;
    const result = await client.query( //posts total_balance to unique account id
      'select total_balance from account where account_id=$1',
      [account_id]
    );
      
    const total_balance = +result.rows[0].total_balance;
    const total = total_balance + deposit_amount;
    //posts updated transactions to transactions table, date, deposit amount, account id, balance
    await client.query(
      'insert into transactions(transaction_date, deposit_amount, account_id, balance) values($1,$2,$3,$4) returning *',
      [transaction_date, deposit_amount, account_id, total]
    );

    await client.query(
      'update account set total_balance = total_balance + $1 where account_id=$2',
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
//withdraw func into database tables
Router.post('/withdraw/:id', authMiddleware, async (req, res) => {
  const client = await getClient();
  try {
    await client.query('begin'); //adds withdraw amt to table
    const { transaction_date, withdraw_amount } = req.body;
    const account_id = req.params.id;
    const result = await client.query(
      'select total_balance from account where account_id=$1',
      [account_id]
    );
    const total_balance = +result.rows[0].total_balance;
    const total = total_balance - withdraw_amount;

    if (withdraw_amount <= total_balance) { //checks withdraw updated total balance
      await client.query(
        'insert into transactions(transaction_date, withdraw_amount, account_id, balance) values($1,$2,$3,$4) returning *',
        [transaction_date, withdraw_amount, account_id, total]
      );
      await client.query(
        'update account set total_balance = total_balance - $1 where account_id=$2',
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
//fetch transactions table, start_date and end_date
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
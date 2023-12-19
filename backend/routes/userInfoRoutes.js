const express =require("express");
const connectDB = require("./../models/_db");
const router = express.Router();

router.get('/count-users', async (req, res) => {
    try {
      const conn = connectDB;
      conn.then(async (client) => {
        const db = client.db('SE_Project');
        const collection = db.collection('UserAuth');
  
        const count = await collection.countDocuments({ category: 'user'});
  
        res.status(200).json({ count });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

router.get('/get-user', async (req, res) => {
    try {
      const searchTerm = req.query.term;
      const searchType = req.query.type;
  
      if (!searchTerm || !searchType) {
        return res.status(400).json({ error: 'Missing required parameters' });
      }

      const conn = connectDB;
      conn.then(async (client) => {
            const db = client.db('SE_Project');
            const collection = db.collection('UserAuth');
        
            let query = {};
            if (searchType === 'username') {
                query = { user_id: searchTerm };
            } else if (searchType === 'fullName') {
                const [firstName, lastName] = searchTerm.split(' ');
                query = { first_name: firstName, last_name: lastName };
            } else {
                return res.status(400).json({ error: 'Invalid search type' });
            }
        
            const user = await collection.findOne(query, { projection: { user_passkey: 0 } });
        
            if (!user) {
                return res.status(200).json({user});
            }
        
            res.status(200).json({ user });
      });
      
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.get('/amount-due', async (req, res) => {
    try {
      const user_id = req.query.user_id;
      console.log(user_id);

      if (!user_id) {
        return res.status(400).json({ error: 'Missing required parameter' });
      }

      const conn = connectDB;
      conn.then(async (client)  => {
        const db = client.db('SE_Project');
        const collection = db.collection('payments_db');

        const paymentDetails = await collection.findOne({ user_id});

        if (!paymentDetails) {
            return res.status(404).json({ error: 'User not found in payments database' });
        }
        const { amount } = paymentDetails;
  
        res.json({ amount });
      });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.get('/payment-info', async (req, res) => {
    try {
      const user_id = req.query.user_id;
      console.log(user_id);
  
      if (!user_id) {
        return res.status(400).json({ error: 'Missing required parameter' });
      }
  
      const conn = connectDB;
      conn.then(async (client) => {
        const db = client.db('SE_Project');
        const collection = db.collection('payments_db');
  
        const paymentDetails = await collection.findOne({ user_id }, { projection: { user_id: 0, amount: 0, _id: 0 } });
        if (!paymentDetails) {
          return res.status(404).json({ error: 'User not found in payments database' });
        }
  
        const formattedDate = new Date(paymentDetails.publishedDate);
        const formattedDateString = formattedDate.toLocaleDateString('en-US');
        const formattedTimeString = formattedDate.toLocaleTimeString('en-US');

        paymentDetails.formattedDate = `${formattedDateString} ${formattedTimeString}`;
  
        delete paymentDetails.publishedDate;
  
        res.json(paymentDetails);
      });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });


  router.post('/update-amount', async (req, res) => {
    try {   
      const { user_id, payment } = req.body; 
      console.log(user_id);
      console.log(payment);
  
      if (!user_id || !payment) {
        return res.status(400).json({ error: 'Missing required parameters' });
      }
  
      const conn = connectDB;
      conn.then(async (client) => {
        const db = client.db('SE_Project');
        const collection = db.collection('payments_db');
  
        const paymentDetails = await collection.findOne({ user_id });
  
        if (!paymentDetails) {
          return res.status(404).json({ error: 'User not found in payments database' });
        }
  
        let { amount } = paymentDetails;
  
        if (isNaN(parseFloat(payment))) {
          return res.status(400).json({ error: 'Invalid payment value' });
        }
  
        amount -= parseFloat(payment);
  
        await collection.updateOne({ user_id }, { $set: { amount } });
  
        res.json({ amount });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  module.exports = router;


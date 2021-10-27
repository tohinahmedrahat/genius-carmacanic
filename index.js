const express = require('express')
const { MongoClient } = require('mongodb');
const cors = require('cors');
require('dotenv').config();
const app = express()
const port = 5000
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ogc1i.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
      await client.connect();
      const database = client.db("car-macanic");
      const serviceContainer = database.collection("service");
        
    //   add service post method 
    app.post('/service', async(req,res) => {
      const service = req.body;
        console.log("i am from send request",service);
        const result = await serviceContainer.insertOne(service);
        console.log(result)
        res.json(result);
    })
    // get data 
    app.get('/service', async(req,res) => {
      const query = serviceContainer.find({});
      const service =await query.toArray()
        res.send(service);
    })

      console.log(`A document was inserted with the _id`);
    } finally {
      // await client.close();
    }
  }
  run().catch(console.dir);
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.3lmgp.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        await client.connect();
        const productCollection = client.db('cameraZone').collection('product');
        const reviewCollection = client.db('cameraZone').collection('review');
        const portfolioCollectoin = client.db('cameraZone').collection('portfolio');
        const orderCollectoin = client.db('cameraZone').collection('order');

        // API For Products
        app.get('/product', async (req, res) => {
            const query = {};
            const cursor = productCollection.find(query);
            const products = await cursor.toArray();
            res.send(products);
        });

        // Add new item API
        app.get('/order', async (req, res) => {
            // Finding data according to different user
            const email = req.query.email;
            const query = { email: email };
            const cursor = orderCollectoin.find(query);
            const addOrder = await cursor.toArray();
            res.send(addOrder);
        })

        // Adding orders
        app.post('/order', async (req, res) => {
            const newAdded = req.body;
            const result = await orderCollectoin.insertOne(newAdded);
            res.send(result);
        })

        // API For Reviews
        app.get('/review', async (req, res) => {
            const query = {};
            const cursor = reviewCollection.find(query);
            const reviews = await cursor.toArray();
            res.send(reviews);
        });

        // API For User Portfolio
        app.post('/portfolio', async (req, res) => {
            const portfolio = req.body;
            const query = { email: user.email, name: user.displayName }
            const exists = await bookingCollection.findOne(query);
            if (exists) {
                return res.send({ success: false, portfolio: exists })
            }
            const result = await portfolioCollectoin.insertOne(portfolio);
            return res.send({ success: true, result });
        })
    }
    finally {

    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
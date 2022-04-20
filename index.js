const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.port || 5000;



//use middleware

app.use(cors())
app.use(express.json())

//db id & pass
// id : dbuser1
// password : nhplndDIyEnX2G8M



const uri = "mongodb+srv://dbuser1:nhplndDIyEnX2G8M@cluster0.fgmis.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();

        const userCollection = client.db("foodExpress").collection("user");
        // const user = { name: 'Sabbir', email: 'sabbir@gmail.com', age: 24 };
        // const result = await userCollection.insertOne(user)
        // console.log(`user inset wiht id : ${result.insertedId}`)

        app.post('/user', async (req, res) => {

            const newUser = req.body;

            console.log('added user', newUser)

            const result = await userCollection.insertOne(newUser)

            res.send({ result: 'res in reswuitest' })
        })

    }
    finally {
        // await client.close();
    }

}
run().catch(console.dir)



app.get('/', (req, res) => {
    res.send('Runnig Node Mongodb server')
})

app.listen(port, () => {
    console.log('listen to port no :', port)
})
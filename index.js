const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require('dotenv').config()
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


const uri =
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.off1efx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
   
    // await client.connect();
    const projectCollection =client.db("projectDB").collection("project")

    app.get('/project',async(req,res)=>{
        const project =req.body;
        const result =await projectCollection.find(project).toArray()
        res.send(result)
    })
    app.get('/project/:id',async(req,res)=>{
        const id =req.params.id;
        const query ={_id: new ObjectId(id)}
        const result =await projectCollection.findOne(query)
        res.send(result)
    })

   
    // await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("project server is running");
});

app.get("/test", (req, res) => {
  res.send("project");
});

app.listen(port, () => {
  console.log(`server is running at:${port}`);
});

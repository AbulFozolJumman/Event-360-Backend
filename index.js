const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
const app = express();
const port = process.env.PORT;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB uri
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.0ztfqf2.mongodb.net/?retryWrites=true&w=majority`;

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
    // DB collections
    const eventsCollection = client.db("Event-360").collection("events");

    // Get all events
    app.get("/events", async (req, res) => {
      const allEvents = await eventsCollection.find().toArray();
      res.send(allEvents);
    });

    // Add a event
    app.post("/events", async (req, res) => {
      const addedEvent = req.body;
      const result = await eventsCollection.insertOne(addedEvent);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Event 360 backend is running...");
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

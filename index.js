const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
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
    const eventItemsCollection = client
      .db("Event-360")
      .collection("event-items");
    const eventServicesCollection = client
      .db("Event-360")
      .collection("event-services");

    // Events CRUD
    // Get all events
    app.get("/events", async (req, res) => {
      const allEvents = await eventsCollection.find().toArray();
      res.send(allEvents);
    });

    // Get event by ID
    app.get("/events/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const event = await eventsCollection.findOne(query);
      res.send(event);
    });

    // Add a event
    app.post("/events", async (req, res) => {
      const addedEvent = req.body;
      const result = await eventsCollection.insertOne(addedEvent);
      res.send(result);
    });

    // Update event by Id
    app.put("/events/:id", async (req, res) => {
      const id = req.params.id;
      const updatedEvent = req.body;
      const query = { _id: new ObjectId(id) };

      try {
        const result = await eventsCollection.updateOne(query, {
          $set: updatedEvent,
        });
        if (result.matchedCount === 0) {
          return res.status(404).json({ error: "Event not found" });
        }
        res.json(result);
      } catch (error) {
        console.error("Error updating event:", error);
        res
          .status(500)
          .json({ error: "Internal server error", message: error.message });
      }
    });

    // Delete event by Id
    app.delete("/events/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await eventsCollection.deleteOne(query);
      res.send(result);
    });

    // Event services CRUD
    // Get all event services
    app.get("/event-services", async (req, res) => {
      const allEventServices = await eventServicesCollection.find().toArray();
      res.send(allEventServices);
    });

    // Get event service by ID
    app.get("/event-services/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const eventService = await eventServicesCollection.findOne(query);
      res.send(eventService);
    });

    // Add a event service
    app.post("/event-services", async (req, res) => {
      const addedEventService = req.body;
      const result = await eventServicesCollection.insertOne(addedEventService);
      res.send(result);
    });

    // Update event service by Id
    app.put("/event-services/:id", async (req, res) => {
      const id = req.params.id;
      const updatedEventService = req.body;
      const query = { _id: new ObjectId(id) };

      try {
        const result = await eventServicesCollection.updateOne(query, {
          $set: updatedEventService,
        });
        if (result.matchedCount === 0) {
          return res.status(404).json({ error: "Event service not found" });
        }
        res.json(result);
      } catch (error) {
        console.error("Error updating event service:", error);
        res
          .status(500)
          .json({ error: "Internal server error", message: error.message });
      }
    });

    // Delete event service by Id
    app.delete("/event-services/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await eventServicesCollection.deleteOne(query);
      res.send(result);
    });

    // Event items CRUD
    // Get all event items
    app.get("/event-items", async (req, res) => {
      const allEventItems = await eventItemsCollection.find().toArray();
      res.send(allEventItems);
    });

    // Get event item by ID
    app.get("/event-items/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const eventItem = await eventItemsCollection.findOne(query);
      res.send(eventItem);
    });

    // Add a event item
    app.post("/event-items", async (req, res) => {
      const addedEventItem = req.body;
      const result = await eventItemsCollection.insertOne(addedEventItem);
      res.send(result);
    });

    // Update event item by Id
    app.put("/event-items/:id", async (req, res) => {
      const id = req.params.id;
      const updatedEventItem = req.body;
      const query = { _id: new ObjectId(id) };

      try {
        const result = await eventItemsCollection.updateOne(query, {
          $set: updatedEventItem,
        });
        if (result.matchedCount === 0) {
          return res.status(404).json({ error: "Event item not found" });
        }
        res.json(result);
      } catch (error) {
        console.error("Error updating event item:", error);
        res
          .status(500)
          .json({ error: "Internal server error", message: error.message });
      }
    });

    // Delete event item by Id
    app.delete("/event-items/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await eventItemsCollection.deleteOne(query);
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

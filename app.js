const express = require("express");
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");

const app = express();
const port = 8080;

// MongoDB Connection
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/BookMyStay');
}

main()
.then(() => {
    console.log("✅ Connected to DB");
})
.catch((e) => {
    console.error("❌ DB Connection Error:", e);
});

//EJS setup 
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

// Routes
app.get("/", (req, res) => {
    res.send("Server is running");
});

//index route
app.get("/listings",async(req,res)=>{
    const allListings = await Listing.find({});
    res.render("./listings/index.ejs",{allListings});
});

//new route
app.get("/listings/new",(req,res)=>{
    res.render("./listings/new.ejs");
});

//show route
app.get("/listings/:id",async(req,res)=>{
    const {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("./listings/show.ejs",{listing});
});

//create route
app.post("/listings",async(req,res)=>{
    const newListing = new Listing(req.body.Listing);
    await newListing.save();
    res.redirect("/listings");
});

//edit route
app.get("/listings/:id/edit",async(req,res)=>{
    const {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("./listings/edit.ejs",{listing});
});

//update route
app.put("/listings/:id",async(req,res)=>{
    const {id} = req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.Listing});
    res.redirect("/listings")
});

//delete route
app.delete('/listings/:id', async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect('/listings');
});

// app.get("/testlisting", async (req, res) => {
//     try {
//         let sampleListing = new Listing({
//             title: "My New Villa",
//             description: "Seaside",
//             price: 10000,
//             location: "Calangute, Goa",
//             country: "India",
//         });
//         await sampleListing.save();
//         console.log("✅ Sample listing saved");
//         res.send("✅ Successful testing");
//     } catch (err) {
//         console.error("❌ Error saving listing:", err);
//         res.status(500).send("❌ Failed to save listing");
//     }
// });

// Start server
app.listen(port, () => {
    console.log(`🚀 Server is listening on port ${port}`);
});

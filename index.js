const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const {connectDB, closeDB ,client} = require("./db/database");


connectDB();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("img"));
app.use(express.static("script"));
app.use(express.static("style"));
app.use(express.static("views"));
app.set("view engine", "ejs");


app.get("/kerja-projek", (req,res) => {
    res.render("code");
})


app.get("/admin", async (req,res) => {
     const databaseucup = await client.db("databaseucup");
     const feedback = await databaseucup.collection("feedback");
     const arrayOffeedback = await feedback.find({}).toArray();
     const length = arrayOffeedback.length;
     res.render("admin", {
        r: arrayOffeedback,
        length,
     })
})


app.post("/feedback", async (req,res) => {
   const {nama, email,saran, time} = req.body;
   const databaseucup = await client.db("databaseucup");
   const feedback  = await databaseucup.collection("feedback");
   await feedback.insertOne({nama,email,saran,time});
})

app.delete("/admin", async (req,res) => {
    const {nama} = req.body;
    const bd = await client.db("databaseucup");
    const cd = await bd.collection("feedback");
    const hasilHapus = await cd.deleteOne({nama});
    console.log(hasilHapus.deletedCount)
    res.json({nama});
})



process.on("SIGINT", ()=> {
    closeDB();
    process.exit();
})

app.listen(port, () => {
    console.log("berhasil konek di port 3000");
})
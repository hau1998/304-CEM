const mongoose = require("mongoose");
const db ="mongodb+srv://hau:ah095223@cluster0-ayzsb.gcp.mongodb.net/Anime?retryWrites=true&w=majority";

mongoose
.connect(db, { useNewUrlParser: true })
.then(() => {
    console.log("Connected to Database");
})
.catch(() =>{
    console.log("Error connecting to database");

});

const animeSchema = new mongoose.Schema({
    ID:{type: Number},
    title: {type: String},
    image: {type: String},
    rating: {type: String},
    episodes:{type: String},
});

const Anime = mongoose.model("Data", animeSchema);

module.exports = Anime;
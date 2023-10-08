const mongoose = require("mongoose")
const Url ="mongodb+srv://aqibmasood96:DEfault99@cluster0.anxtxij.mongodb.net/"
mongoose.connect(Url, {
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("db connected")
})

const db=mongoose.connection;
db.on("error", console.error.bind(console, "connection failed"))

module.exports = mongoose;
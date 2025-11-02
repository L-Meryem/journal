const mongoose = require("mongoose");
const mongoURI = 'mongodb+srv://sandboxer:AKZdKrMvsSZDxleU@sandboxcluster.er1seez.mongodb.net/journal'; //users id db name

const connectMongo = async ()=>{
    try{
        await mongoose.connect(mongoURI);
        console.log(`Connected to ${mongoose.connection.name} DB`);
        
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log(`Collections: ${collections.map(c=> c.name)}`);
    }catch(e) {
        console.error(e);
    }
}

module.exports = connectMongo; //async fn that returns a promise


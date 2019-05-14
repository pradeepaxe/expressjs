const express = require('express');
const adminRouter = express.Router();
const {MongoClient} = require('mongodb');
const debug = require('debug')('app:bookRoutes');


const books = [
    {title:'robinhood', author:'enid',genre:'action',read:false},
    {title:'xmen', author:'stan lee',genre:'comic',read:true},
    {title:'avengers', author:'stephan',genre:'comic',read:true},
  
  ];

function router(nav){
  

adminRouter.route('/').get((req,res)=>{

    const url = 'mongodb://localhost:27017';
    const dbName='libraryApp';
    
    (async function mongo() {
        let client;
        try{
            client = await MongoClient.connect(url);
            debug('connected correclt to server');
            const db = client.db(dbName);
            const response  = await db.collection('books').insertMany(books);
            res.json(response);
        }catch(err){
            debug(err.stack);

        }
        client.close();
    }());
   
});
return adminRouter;
}
module.exports=router;
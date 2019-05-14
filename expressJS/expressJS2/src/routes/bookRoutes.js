const express = require('express');
const bookRouter = express.Router();
const {MongoClient,ObjectID} = require('mongodb');

const app = express();



  function router(nav){
    const books = [
      {title:'robinhood', author:'enid',genre:'action',read:false},
      {title:'xmen', author:'stan lee',genre:'comic',read:true},
      {title:'avengers', author:'stephan',genre:'comic',read:true},
    
    ];

    bookRouter.route('/single').get((req,res)=>{
      res.send('single books');
      });
    
    bookRouter.route('/').get((req,res)=>{
        const url = 'mongodb://localhost:27017';
    const dbName='libraryApp';
    
    (async function mongo() {
        let client;
        try{
            client = await MongoClient.connect(url);
            const db = client.db(dbName);
            const col  = await db.collection('books');
      
            const books = await col.find().toArray(); 
      
      
      res.render(
        'bookListView',
        {  nav,
           books
        }
      );
      }catch(err){
       }
    client.close();
        }());
    });
    
    bookRouter.route('/:id').get((req,res)=>{
      const url = 'mongodb://localhost:27017';
    const dbName='libraryApp';
    
    (async function mongo() {
        let client;
        try{
            client = await MongoClient.connect(url);
            const db = client.db(dbName);
            const col  = await db.collection('books');
      
            const books = await col.findOne({_id:ObjectID(id)}); 
      
    res.render(
      'bookView',
      {  nav,
         books:books[id]
      }
    );
    }catch(err){

    }
    });
    return bookRouter;
    });
  module.exports= router;

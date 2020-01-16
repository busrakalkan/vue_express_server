const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Search Posts
router.get('/:ad', async (req, res) => {
  const posts = await loadPostsCollection();
  
  res.send(await posts.find({ marka:{ $regex:req.params.ad}}).toArray());
  
});

//filtrele
router.get('/', async (req, res) => {
  
  const posts = await loadPostsCollection();
    res.send(await posts.find({ marka:{ $regex:req.body.marka}}).toArray());
  
});


async function loadPostsCollection() {
  const client = await mongodb.MongoClient.connect(
    'mongodb+srv://bus_kal:1010@cluster3-0nvsz.mongodb.net/test?retryWrites=true&w=majority',
    {
        
      useNewUrlParser: true
    }
  );

  return client.db('vue_express').collection('urun');
}

module.exports = router;
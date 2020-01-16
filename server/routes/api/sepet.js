const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get Posts
router.get('/', async (req, res) => {
  const sepet = await loadSepetCollection();
  res.send(await sepet.find({}).toArray());
});

//Update adet
router.post('/insert', async (req, res) => {
  const posts = await loadSepetCollection();
  await posts.updateOne({ _id: new mongodb.ObjectID(req.body.id) },{ $inc:{adet:1} });
  res.status(200).send();
});

// Add Post
router.post('/', async (req, res) => {
    const sepet = await loadSepetCollection();

    await sepet.insertOne({
        ad:req.body.ad,
        fiyat:req.body.fiyat,
        img:req.body.img,
        adet:1
    });
    res.status(201).send();
  });

// Delete Post
router.delete('/:id', async (req,res) => {
    const sepet = await loadSepetCollection();
    await sepet.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
    res.status(200).send();
});

async function loadSepetCollection() {
    const client = await mongodb.MongoClient.connect(
      'mongodb+srv://bus_kal:1010@cluster3-0nvsz.mongodb.net/test?retryWrites=true&w=majority',
      {
        useNewUrlParser: true
      }
    );
  
    return client.db('vue_express').collection('sepet');
  }

module.exports = router;
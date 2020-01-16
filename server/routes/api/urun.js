const express = require ('express');
const mongodb = require ('mongodb');
const router= express.Router();

// get posts

router.get('/', async (req, res) => {
    const urun = await loadUrunCollection();
    res.send(await urun.find({}).toArray());
});

//add post
router.post('/', async (req, res) => {
    const urun = await loadUrunCollection();
    await urun.insertOne({
        ad:req.body.ad,
        fiyat:req.body.fiyat,
        img:req.body.img,
        marka:req.body.marka
    });
    res.status(201).send();
});

//delete post
router.delete('/:id', async (req,res) => {
    const urun = await loadUrunCollection();
    await urun.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
    res.status(200).send();
});

async function loadUrunCollection(){
    const client = await mongodb.MongoClient.connect(
    'mongodb+srv://bus_kal:1010@cluster3-0nvsz.mongodb.net/test?retryWrites=true&w=majority',
    {
      useNewUrlParser: true
    }
  );

  return client.db('vue_express').collection('urun');
}
module.exports = router;""
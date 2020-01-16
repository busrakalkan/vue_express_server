const express = require ('express');
const mongodb = require ('mongodb');
const router= express.Router();


// get posts
router.get('/', async (req, res) => {
    const uye = await loadUyeCollection();
    res.send(await uye.find({}).toArray());
});
//add post
router.post('/', async (req, res) => {
    const uye = await loadUyeCollection();
    await uye.insertOne({
        ad:req.body.ad,
        soyad:req.body.soyad,
        email:req.body.email,
        sifre: req.body.sifre
    });
    res.status(201).send();
});

//delete post
router.delete('/:id', async (req,res) => {
    const uye = await loadUyeCollection();
    await uye.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
    res.status(200).send();
});

async function loadUyeCollection(){
    const client = await mongodb.MongoClient.connect(
    'mongodb+srv://bus_kal:1010@cluster3-0nvsz.mongodb.net/test?retryWrites=true&w=majority',
    {
      useNewUrlParser: true
    }
  );

  return client.db('vue_express').collection('uye');
}
module.exports = router;""
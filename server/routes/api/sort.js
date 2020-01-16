const express = require ('express');
const mongodb = require ('mongodb');
const router= express.Router();



router.get('/', async (req, res) => {
    const urun = await loadUrunCollection();
    res.send(await urun.find({}).sort({ad:1}).toArray());
});
router.get('/af', async (req, res) => {
    const urun = await loadUrunCollection();
    res.send(await urun.find({}).sort({fiyat:1}).toArray());
});

router.get('/cf', async (req, res) => {
    const urun = await loadUrunCollection();
    res.send(await urun.find({}).sort({fiyat:-1}).toArray());
});


/*
//filtreleme

router.options('/', async (req,res) => {
    const urun = await loadUrunCollection();

    const istek=req.body.istek;
    res.send(await urun.find({ marka: istek }).toArray());
});

//arama

router.search('/', async (req,res) => {
    const urun = await loadUrunCollection();
    const tur=req.body.tur;
    const istek=req.body.istek;
    if(tur=="marka"){
        res.send(await urun.find({ marka: istek }).toArray());
    }else if(tur=="urun"){
        res.send(await urun.find({ marka: istek }).toArray());
    }
    
});*/

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
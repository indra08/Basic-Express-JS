// untuk melakukan handling terhadap penmanggilan service
const express = require('express');
const router = express.Router();
const master = require('../services/master');

router.get('/provinsi', async function(req, res, next) {
  try {
    res.json(await master.getMasterProfinsi(req.query.page));
  } catch (err) {
    console.error(`Error while getting master provinsi `, err.message);
    next(err);
  }
});

router.get('/kota', async function(req, res, next) {
    try {
      res.json(await master.getMasterKota(req.query.page));
    } catch (err) {
      console.error(`Error while getting master kota `, err.message);
      next(err);
    }
  });

router.post('/partai', async function(req, res, next) {
    try {
      res.json(await master.savePartai(req.body));
    } catch (err) {
      console.error(`Error while getting master kota `, err.message);
      next(err);
    }
  });

router.put('/partai/:id', async function(req, res, next) {
    try {
      res.json(await master.updatePartai(req.params.id, req.body));
    } catch (err) {
      console.error(`Error while getting master kota `, err.message);
      next(err);
    }
  });


module.exports = router;


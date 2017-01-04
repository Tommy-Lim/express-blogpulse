var express = require('express');
var db = require('../models');
var router = express.Router();

//find all tags
router.get('/', function(req,res){
  db.tag.findAll().then(function(tags){
    res.render('tags/all',{tags:tags});
  });
});

//find specific tag and its posts
router.get('/:id', function(req,res){
  var id = req.params.id;
  db.tag.find({
    where: {id: id},
    include: [db.post]
  }).then(function(tag){
    console.log('TAG: '+tag.name);
    res.render('tags/show', {tag:tag});
  });
});


module.exports = router;

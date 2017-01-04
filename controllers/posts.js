var express = require('express');
var db = require('../models');
var router = express.Router();

// POST /posts - create a new post
router.post('/', function(req, res) {
  console.log('req body is: ',req.body);

  // make the comma seperted list into array
  var tags = [];
  if(req.body.tags){
     tags = req.body.tags.split(',');
    console.log(tags);
  } else{
    console.log('NO TAGS');
  }

  // check if the title is greater than 2 letters
  if(!req.body.title || req.body.title.trim().length <2){
    res.send("Error: please include a title containing at least 3 letters");
  }

  // check if the content is greater than
  if(!req.body.content || req.body.content.trim().length < 5){
    res.send("Error: please include content containing at least 5 letters");
  }

  db.post.create({
    title: req.body.title,
    content: req.body.content,
    authorId: req.body.authorId,
  })
  .then(function(post) {
    if(tags.length > 0){
      //add tags here
      tags.forEach(function(tag){
        db.tag.findOrCreate({
          where: {name: tag}
        })
        .spread(function(newTag, wasCreated){
          if(newTag){
            // add the relationship in the third table, post_tag
            post.addTag(newTag);
          }
        });
      }); // and of forEach
    }
    res.redirect('/');
  })
  .catch(function(error) {
    res.status(400).render('main/404');
  });
});

// GET /posts/new - display form for creating new posts
router.get('/new', function(req, res) {
  db.author.findAll()
  .then(function(authors) {
    res.render('posts/new', { authors: authors });
  })
  .catch(function(error) {
    res.status(400).render('main/404');
  });
});

// GET /posts/:id - display a specific post and its author
router.get('/:id', function(req, res) {
  db.post.find({
    where: { id: req.params.id },
    include: [db.author,db.comment,db.tag],
  })
  .then(function(post) {
    if (!post) throw Error();
    // post.getTags().then(function(tags){
    //   res.render('posts/show', { post:post, tags:tags });
    // });
    res.render('posts/show', { post:post });
  })
  .catch(function(error) {
    res.status(400).render('main/404');
  });
});

// POST /posts/:id - display a specific post and its author
router.post('/:id/comments', function(req, res) {
  db.comment.create({
    name: req.body.name || 'Anonymous',
    content: req.body.content,
    postId: req.params.id
  }).then(function(comment) {
    console.log(comment.get());
    res.redirect('/posts/'+req.params.id);
  });
});

module.exports = router;

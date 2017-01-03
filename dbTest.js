// Add these snippets to the end of the index.js in root directory


// Test adding to the comments data table
var db = require('./models');

db.comment.create({
  name: 'Paul Allen',
  content: 'This is really neat! Thanks for posting.',
  postId: 1
}).then(function(comment) {
  console.log(comment.get());
});

// Test querying the comments data table
var db = require('./models');

db.post.find({
  where: { id: 1 },
  include: [db.comment]
}).then(function(post) {
  // by using eager loading, the post model should have a comments key
  console.log(post.comments);
});

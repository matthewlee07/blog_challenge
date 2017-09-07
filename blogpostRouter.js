const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const router = express.Router();
const {BlogPosts} = require("./models.js");

BlogPosts.create('title', 'content', 'author', 'publishDate');

router.get("/",(req, res) => {

  res.json(BlogPosts.get());
});

router.post("/", jsonParser, (req, res) => {
  const requiredFields = ["title", "content", "author", "publishDate"];
  for (let i = 0; i< requiredFields.length; i++){
 
 
    const field = requiredFields[i];
    if(!(field in req.body)){
      const message = `No field: ${field}`;

      return res.status(400).send(message);
    }
  }
  const result = BlogPosts.create(req.body.title, req.body.content, req.body.author, req.body.publishDate)
  res.json(result).status(204)
});

router.put("/:id", jsonParser, (req, res) => {
  const requiredFields = ["title", "content", "author", "publishDate"];
  for (let i = 0; i< requiredFields.length; i++){
 
    const field = requiredFields[i];
    if(!(field in req.body)){
      const message = `No field: ${field}`;

      return res.status(400).send(message);
    }
  }
  if (req.params.id !== req.body.id) {
    const message = (
      `Request path id (${req.params.id}) and request body id `
      `(${req.body.id}) must match`);

    return res.status(400).send(message);
  }

  const updatedItem = BlogPosts.update({title:req.body.title, content:req.body.content, author:req.body.author, publishDate:req.body.publishDate})
  res.json(updatedItem).status(204)
});


router.delete("/:id", (req, res) => {
  BlogPosts.delete(req.params.id);
  res.status(204).end();
  console.log('deleting');
});

module.exports=router;
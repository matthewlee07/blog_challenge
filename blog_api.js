const express = require('express');
const app = express();
const blogpostRouter = require('./blogpostRouter')
 

// const bodyParser = require("bodyParser");
// const jsonPaser = bodyParser.json();
const router = express.Router();


// app.use('/shopping-list', shoppingListRouter);

app.use('/blog-posts', blogpostRouter);
app.use(express.static("public"));




app.listen(process.env.PORT||8080, () => {
  
});


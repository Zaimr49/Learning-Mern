const express = require("express");
const app = express();
const port = 3000
const path=require('path');

const exphbs =require('express-handlebars');


// changing the engine 
app.engine('handlebars', exphbs.engine());

/* if we want to change the directory for the partials folder, to for example sections by default the name of the folder is partials*/
// app.engine('handlebars',exphbs.engine({
//   partialsDir:"./views/sections*"
// }))

app.set('view engine', 'handlebars');
app.set('views', './views');






// require(path.join(__dirname,'/database/dbconnect'));

app.use('/',require(path.join(__dirname,'/routes/routes.js')));
app.use('/api/',require(path.join(__dirname,'/routes/api/routes.js')));

const server=app.listen(port, () => {
  console.log(`Node Express Server Started, Example app listening on port ${port}`)

  console.log(server)
  console.log(server.address())
})
const express = require("express");
const app = express();
const port = 3000
const path=require('path');

const exphbs =require('express-handlebars');


// changing the engine //yeh neeche shift ho gaya hai
// app.engine('handlebars', exphbs.engine());

/* if we want to change the directory for the partials folder, to for example sections by default the name of the folder is partials*/
// app.engine('handlebars',exphbs.engine({
//   partialsDir:"./views/sections*"
// }))


// yeh neeche kar diya hai
// app.set('view engine', 'handlebars');
// app.set('views', './views');


//Neeche wali sari cheezain karni parti hain so that you won't have to do the mapping jo ham pehle kar rahe thae while passing data to handlebars and using it their
const Handlebars = require("handlebars");
const {allowInsecurePrototypeAccess}=require('@handlebars/allow-prototype-access');
const insecureHandlebars=allowInsecurePrototypeAccess(Handlebars);

app.engine('handlebars',exphbs.engine({
  handlebars:allowInsecurePrototypeAccess(Handlebars)
}))

// This is to be used when we want static images then we make a public folder 
app.use(express.static(path.join(__dirname,'/public')))

app.set('view engine','handlebars');
app.set('views','./views');




// require(path.join(__dirname,'/database/dbconnect'));

app.use('/',require(path.join(__dirname,'/routes/routes.js')));
app.use('/api/',require(path.join(__dirname,'/routes/api/routes.js')));


app.use('/user/',require(path.join(__dirname,'/routes/userroutes.js')));
app.use('/blog/',require(path.join(__dirname,'/routes/blogroutes.js')));



const server=app.listen(port, () => {
  console.log(`Node Express Server Started, Example app listening on port ${port}`)

  console.log(server)
  console.log(server.address())
})
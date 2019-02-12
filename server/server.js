const path = require('path');
const express = require('express')
const app = express();
const publicPAth =path.join(__dirname,'/../public');
const port =  process.env.PORT || 3000;
app.use(express.static(publicPAth));
app.listen(port,()=>{console.log('app  is running at '+port)})
const express = require('express')
const db = require('./config/mysql_config');
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')

require('dotenv').config()
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cors)

// route middleware
const adminRoute = require('./routes/admin')

// cors configurasi
app.use(cors);

app.use((req,res, next)=>{
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization');
  next();
})
const port = process.env.PORT || 4000

app.use('/api/admin',adminRoute);

app.listen(port, () => {
  db.sync({  })
    .then(() => console.log(`app is running on port ${port}`))
    .catch(err => console.log(err.message))
})
const express = require('express');
const morgan = require('morgan');
const cors=require('cors');
const app=express();
app.use(cors());

app.set('port',process.env.PORT || 3000)
app.set('json spaces', 2);

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(require('./routes/index'));


app.listen(3000,() =>{
    console.log(`Server on port ${app.get('port')}`);
});

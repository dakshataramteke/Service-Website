const mongoose = require('mongoose');
// const Contact = require('./models/db.js');
// const {Installation} = require('./models/db.js');
const {WaterQuality} = require('./models/db.js');

//name,phone, email,address,model,description,date,time
const data = new WaterQuality({ 
    name: "Dakshata",
    phone: 1235689012,
    email: "dakshataramteke00@gmail.com",
    address: "Mumbai",
    model: "Oppo A32",
    description: "New Model" ,
    date: new Date('2024-12-12'),
    time:12,
    plan:"abcd"
});
data.save();
console.log(data);
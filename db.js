const mongoose = require("mongoose");

require('dotenv').config();
mongoose.set('strictQuery', false);
mongoose.connect(process.env.DATABASE).then(() => {
    console.log('connect to database');
}).catch((err)=>{
    console.log(err);
});
balaji PerformanceObserverEntryList

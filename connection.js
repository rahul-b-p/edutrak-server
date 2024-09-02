const mongoose = require('mongoose')

const connectionString = process.env.DATABASE

mongoose.connect(connectionString).then(()=>{
    console.log('Mongoose connected successfully');
    
}).catch((err)=>{
    console.log(`Mongoose not connnexted due to ${err}`);
    
})

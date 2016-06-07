var mongoose = require('mongoose');

var mongoUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/simple-business-card';

mongoose.connect(mongoUrl, function(err){
  if(err) throw err;
  console.log('database connected');
});

module.exports = mongoose;

var express = require("express")
var app = express()
var bodyParser = require("body-parser")



var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/my_db', {useNewUrlParser: true, useUnifiedTopology: true});

app.set( 'view engine' , 'ejs' )

var personSchema = mongoose.Schema({
    name: String,
    password: String,
 });
 var Person = mongoose.model("Person", personSchema);

 app.use(bodyParser.json()); 
 app.use(bodyParser.urlencoded({ extended: true })); 
 app.get('/person', function(req, res){
    res.render('person');
 });

 app.post('/person', function(req, res){
    var personInfo = req.body; //Get the parsed information
   
    if(!personInfo.name || !personInfo.age || !personInfo.nationality){
       res.render('showmsg', {
          message: "Sorry, you provided worng info", type: "error"});
    } else {
       var newPerson = new Person({
          name: personInfo.name,
          age: personInfo.age,
          nationality: personInfo.nationality
       });
         
       newPerson.save(function(err, Person){
        if(err)
           res.render('showmsg', {message: "Database error", type: "error"});
        else
           res.render('showmsg', {
              message: "New person added", type: "success", person: personInfo});
     });
  }
    
 })




 app.listen(3000, () => {
    console.log("Server up at 3000")
  });



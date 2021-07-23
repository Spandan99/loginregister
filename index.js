var express = require("express")
var app = express()
var bodyParser = require("body-parser")
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/data');

app.set( 'view engine' , 'ejs' )

var personSchema = mongoose.Schema({
    name: {
       type: String,
       unique:true
    },
    password: String,
 });
 var Person = mongoose.model("mojo", personSchema);

 app.use(bodyParser.json()); 
 app.use(bodyParser.urlencoded({ extended: true })); 
 app.get('/person', function(req, res){
    res.render('person');
 });

 app.post('/person', function(req, res){
    var personInfo = req.body; //Get the parsed information
   
    if(!personInfo.name || !personInfo.password){
       res.render('showmsg', {
          message: "Sorry, you provided worng info", type: "error"});
    } else {
       var newPerson = new Person({
          name: personInfo.name,
          password: personInfo.password
       });
         
       newPerson.save(function(err, Person){
        if(err)
           res.render('showmsg', {message: "Already registered!"});
        else
           res.render('showmsg', {
              message: `New person added, ${personInfo.name}`});
     });
  }
    
 })

 app.get('/login', function(req,res) {
    res.render('login')
 })

 app.post('/login', function(req, res){
   var personInfo = req.body; //Get the parsed information
   Person.find({name: personInfo.name}, function(err, data) {
      if(err) {
         res.render('showmsg', {
            message: "Some error occured!"
         })
      } else if(data.length) {
         if(data[0].password === personInfo.password) {
            res.render('showmsg', {
               message: data[0].name
            });
         } else {
            res.render('showmsg', {
               message: "Wrong password!"
            })
         }   
      } else {
         res.render('showmsg', {
            message: "No such user exists!"
         })
      }
   });
 
  
 
   //{ name: 'saitama', password: 'genos' }
   })

 app.listen(3000, () => {
    console.log("Server up at 3000")
  });


var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose'); 
var path = require('path');

app.use(express.static( __dirname + '/angular/dist' ));

var RestaurantSchema = new mongoose.Schema({
    name: {type: String, required: [true, 'Name must be 3 or more characters!'], minlength: 3, unique: true},
    cusine: {type: String, required: [true, 'Type must be 3 or more characters!'], minlength: 3},
    review: [{
        customer: {type: String, required: true},
        stars: { type: Number, required: true},
        desc: {type: String, required: true}
    }]
}, {timestamps: true });

mongoose.model('Restaurant', RestaurantSchema);

var Restaurant = mongoose.model('Restaurant');

app.use(bodyParser.json());

app.use(express.static( __dirname + '/angular/dist' ));

mongoose.connect('mongodb://localhost/restaurant');

mongoose.Promise = global.Promise;

app.post('/new', function(request, response){ //add pet
    console.log("p",request.body.type)
    var add = new Restaurant(
        {name: request.body.name, 
        cusine: request.body.cusine}
    )
    console.log("add",add)
    add.save(function(err){
        if(err){
            console.log(err)
            response.json({message: "Error", error: err});
        }
        else{
            response.json({message: "success!", data: add});
        }
    })
})

app.get('/getAll', function(request, response) { //view all restrants
    Restaurant.find({}, function(err, task) {
    if(err) {
        response.json({message: "Error", error: err})
    }
    else {
        response.json({message: "success", data: task})
        }
    })
})

app.get('/getReviews/:id', function(request, response) { //view all reviews of a resturant
    Restaurant.find({_id: request.params.id}, function(err, task) {
    if(err) {
        response.json({message: "Error", error: err})
    }
    else {
        response.json({message: "success", data: task})
        }
    })
})

app.put("/newReview/:id", function(request, response){ //add review
    console.log(request.params.id)
    Restaurant.findOne({_id: request.params.id}, function(err, data){
        data.review.push({desc: request.body.review, customer: request.body.customer, stars: request.body.star})
    data.save(function(err){
        if(err){
            console.log("error update")
            response.json({message: "Error", error: err});
        }
        else{
            console.log("success update")
            response.json({message: "success", data: data});
        }
    })
})
})

app.delete("/delete/:id", function(request, response)  { //delete pet
    Restaurant.remove({_id: request.params.id}, function(err){
        if(err){
            response.json({message: "Error", error: err});
        }
        else{
            response.json({message: "success"});
        }
    })
})

app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./angular/dist/index.html"))
  });

app.listen(8000, function() {
    console.log("listening on port 8000");
})
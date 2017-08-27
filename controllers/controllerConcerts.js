const Concert = require('../models/concertModel.js')
const Joi = require('joi')

 //validation Schema with Joi   
var conSchema = Joi.object().keys({
    artist: Joi.string().min(3).max(40).required().error(new Error("Artist must contain min 3 and max 40 characters")),
    country: Joi.string().min(3).max(50).required().error(new Error("Country must contain min 3 and max 50 characters")),
    state: Joi.string().min(3).max(50).required().error(new Error("State must contain min 3 and max 50 characters")),
    city: Joi.string().min(5).max(50).required().error(new Error("City must contain min 5 and max 50 characters")),
    place: Joi.string().min(3).max(50).required().error(new Error("Place must contain min 3 and max 50 characters")),
    date: Joi.string(),
    hour: Joi.string().min(5).max(10).required().regex(/^(([01][0-9]|2[0-3])h)|(([01][0-9]|2[0-3]):[0-5][0-9])$/).error(new Error("Hour must contain min 5 and max 10 characters with format hh:mm")),
    price: Joi.number().integer().min(0).max(100000),
    category: Joi.string().min(3).max(50).required().error(new Error("Category must contain min 3 and max 50 characters "))
})


exports.create = function(req, res) {
 // Create and Save a new concert 
    var result =  Joi.validate(req.body, conSchema)
    if(result.error !== null) return  res.send(` ${result.error}`)
   
    var concert = new Concert({
    artist: req.body.artist,
    country: req.body.country,
    state: req.body.state,
    city: req.body.city,
    place: req.body.place,
    date: req.body.date,
    hour: req.body.hour,
    price: req.body.price,
    category: req.body.category 
    });

    concert.save(function(err, data) {      
        if(err) {            
            return res.status(500).send({message: "Error occured while creating the concert: "+ String(err)});
        } else {
            return res.send(data);
        }
    });
}

exports.getAll = function(req, res) {
 // Retrieve and return all concerts from the database.
    Concert.find({}, function(err, concerts){
        if(err) 
           return res.status(500).send({message: "Some error ocuured while retrieving concerts"})
         else
          return  res.send({ data: concerts })
        
    });
}

exports.getOne = function(req, res) {
 // Find a single concert with a concertId
    Concert.findById(req.params.concertId, function(err, concert) {
        if(err) {
            res.status(500).send({message: "Could not retrieve concert with id " + req.params.concertId});
        } else {
            res.send({ data: concert });
        }
    });
}

exports.update = function(req, res) {
    //update a concert by concertId
  let concertId = req.params.concertId
  let update = req.body

  Concert.findByIdAndUpdate(concertId, update, (err, concertUpdated) => {
    if (err) res.status(500).send({message: `Could not update concert: ${err}`})

    res.status(200).send({ data: concertUpdated })
  })
}


exports.delete = function(req, res) {
 // Delete a concert with the specified concertId in the request
    Concert.remove({_id: req.params.concertId}, function(err, concert) {
        if(err) {
            res.status(500).send({message: "Could not delete concert with id " + req.params.concertId});
        } else {
            res.send({message: "Concert deleted successfully"})
        }
    });
}

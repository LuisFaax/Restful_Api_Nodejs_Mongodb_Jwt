//Model for the concerts collections
const mongoose = require('mongoose')

const values_category =['Pop','Country','Electronic','Comedy','Ballad','Jazz']

var ConcertSchema = mongoose.Schema({
    artist: String,
    country: String,
    state: String,
    city: String,
    place: String,
    date: { type:String, default: Date.now() },
    hour: String,
    price:{ type:Number, default:0 },
    category: { type:String, enum:{values: values_category, message:"Should be [ "+ values_category +" ]" }}

})

module.exports = mongoose.model('Concert', ConcertSchema)
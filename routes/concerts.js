module.exports = function(app)  {

const Concert = require('../controllers/controllerConcerts')
const auth = require('../middlewares/auth')
const token = require('../services/token')

//create a welcome route
app.get('/', (req, res) => {
    res.send({message: "Welcome to Concerts RESTful API,  ¡¡Have fun!! "})
});

//retrieve all concert
app.get('/concerts',  Concert.getAll)

//retrieve a single concert by concertId
app.get('/concerts/:concertId', Concert.getOne)

//creating a new concert
app.post('/concerts', auth, Concert.create)

//update a concert with concertId
app.put('/concerts/:concertId', Concert.update)

//delete one concert with concertId
app.delete('/concerts/:concertId', auth , Concert.delete)

//for testing enable this route and  get tokens
app.get('/api/token', token.getToken)

}

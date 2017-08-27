//database connection uri
//token secret allow us encrypt tokens
//port application listening
module.exports = {		
	db: 'mongodb://localhost:27017/concerts',
	SECRET_TOKEN: '589849f068e24a9dad2e8b3dc94481b2',
	port: process.env.PORT || 3000
	
}
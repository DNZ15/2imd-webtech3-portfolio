//code runnen
// 1) npm install
// 2) DEBUG=HIERFOLDERNAAM:* npm start
// 3) code runt automatisch op poort 3000


const express = require('express');
const route = express.Router();

// static data (array)
const messages = [
 {
   id: 1,
   user: "Pikachu",
   message: "pika pika"
 },
 {
   id: 2,
   user: "Ash",
   message: "I choose you!"
 },
 {
   id: 3,
   user: "Misty",
   message: "Can't drive, it's to misty"
 }
];


// ga naar pagina => POSTMAN: localhost:3000/
route.get('/', function(request, response, next) {

  // Render express index pagina
  response.render('index', { title: 'Lab 5' });
  response.end();
});


// GET: alle messages
// link => URL: localhost:3000/api/v1/messages
// link => URL: localhost:3000/api/v1/messages?user=Ash
route.get('/api/v1/messages', (request, response) => {

  if (!request.query.user) {
      //geen message gevonden = foutmelding
      response.json({status:"success",message: "GETTING all messages, count "+ messages.length +" messages"});
  }
  else {
      //wel message gevongen = json doorsturen
      response.json({"message" : "GETTING message with username "+ request.query.user});
  }
});


// GET: via id
// link => URL: localhost:3000/api/v1/messages/1
// link => URL: localhost:3000/api/v1/messages/2
// link => URL: localhost:3000/api/v1/messages/3
route.get('/api/v1/messages/:id', (request, response) => {

  // Controleren of er een ID overeenkomt met een bestaande ID
  const message = messages.find(my_int => my_int.id === parseInt(request.params.id));

  
  if(!message){
    //geen message gevonden = foutmelding
    response.status(404).json({status:"error","message":"Message with ID " + request.params.id +" does not exist"})
  }
  else {
    //wel message gevongen = json doorsturen
    response.json({status:"success", message:"GETTING message with ID " + request.params.id});
  }
});






module.exports = route;
console.log('Server is running on port', 3000);

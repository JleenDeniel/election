const express = require("express");
const bodyParser = require("body-parser");  
const app = express();
const port = 5000;
  
// создаем парсер для данных application/x-www-form-urlencoded
const urlencodedParser = bodyParser.urlencoded({extended: false});

const server = app.listen(port, (error) => {
  if (error) return console.log(`Error: ${error}`);
  console.log(`Server listening on port ${server.address().port}`);
});
 
app.get("/", urlencodedParser, function (request, response){
  response.sendFile(__dirname + "/index.html");
});

app.use(express.static(__dirname + '/static'));

var bool = false;
app.post("/login", urlencodedParser, function (request, response){
  if (!request.body) return response.sendStatus(400);
  console.log(request.body);
  if (request.body.userName == "maxrusmos") bool = true;
  else bool = false;
  response.sendFile(__dirname + "/index.html");
});

app.get("/login", urlencodedParser, function (request, response){
  response.send({"bool": bool});
});
  
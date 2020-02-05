const express = require("express");
const bodyParser = require("body-parser"); 
const app = express();
const port  = 5000;

const urlencodedParser = bodyParser.urlencoded({extended: false});

app.use(express.static(__dirname + '/static'));

app.get("/", urlencodedParser, function (request, response) {
	response.sendFile(__dirname + "/index.html");
});

app.post("/login", urlencodedParser, function (request, response) {
  if (!request.body) return response.sendStatus(400);
  console.log(request.body.userName);
  console.log(request.body.userPassword);
  response.send();
});

console.log(port);
app.listen(port);
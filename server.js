var Mysql = require('./mysql.js');
var Marking = require('./marking');
var express = require('express'); 
var routers = express.Router();
var moment = require('moment');
var bodyParser = require('body-parser');
var app = express();
var portIn = 21039;

app.all("*", (req, res, next) => {
    console.log('Time:', moment(Date.now(), '').format() + ` - ${req.method} ${req.originalUrl}`);
    console.log(`Data in body: ${req.body}`);
    console.log(`Data in params: ${req.params}`);
    next();
});

// ROTAS NO ROUTER E NÃO NO APP
routers.get("/", (req, res) => res.send("ROOT"));

routers.post('/marking_add', function(req, res) { 
    const m = new Mysql();
    const new_marking = new Marking({type: req.body.Type, createdin: req.body.CreatedIn });
    // const r = 
    m.AddMarking(new_marking, res); 
    // res.send(r);

}); 

routers.post('/marking_del', function(req, res) {

    // res.json(req.body);
    const m = new Mysql();
    m.DelMarking(req.body.id, res);

});

routers.get('/markings_all', function(req, res, next){
    const m = new Mysql();
    m.GetAllMarkings(res);
});

routers.get('/teste', function (req, res){
    res.send('ok');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('//', routers);

app.listen(portIn, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is listening on port ${portIn}`);
  });

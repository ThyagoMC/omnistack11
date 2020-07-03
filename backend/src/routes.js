const express = require("express");
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express();

routes.get("/ongs" , OngController.index);
routes.post("/ongs" , OngController.create);

routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);
routes.get('/incidents/:id', IncidentController.get);
routes.put('/incidents/:id', IncidentController.update);


routes.post('/sessions', SessionController.create);

routes.get('/profile', ProfileController.index);


module.exports = routes;
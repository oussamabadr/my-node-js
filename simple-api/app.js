const express = require('express');
const Joi = require('joi');
const app = express();

app.use(express.json());

const rootUrl = '/sports'

const sportSchema = Joi.string().min(1).required()

let sports = [
  {id: 1, name: 'Tennis'},
  {id: 2, name: 'Handball'},
  {id: 3, name: 'Golf'},
  {id: 4, name: 'Soccer'},
  {id: 5, name: 'Basketball'}
]

app.get(rootUrl, (req, res) => {
    res.send(sports)
});

app.get(`${rootUrl}/:id`, (req, res) => {
  const id = req.params.id

  const sportFound = sports.find( sport => sport.id == id);

  if (sportFound) {
    return res.send(sportFound)
  } else {
    return res.status(404).json(null)
  }
});

app.post(rootUrl, (req, res) => {
  const newSport = req.body
  const validationError = sportSchema.validate(newSport?.name).error  

  if (validationError) {
    return res.status(400).send('Sport name should not be null or empty.')
  }

  const sportFound = sports.find( sport => sport.name === newSport?.name);

  
  if (sportFound) {
    return res.status(400).send(`Sport [${newSport.name}] already exist.`)
    
  } else {
    const newId = sports.length + 1
    const savedSport = {id: newId, name: newSport.name}
    sports.push(savedSport)
    return res.status(200).send(savedSport)
  }
});

const initDb = () => {  
  sports = [
    {id: 1, name: 'Tennis'},
    {id: 2, name: 'Handball'},
    {id: 3, name: 'Golf'},
    {id: 4, name: 'Soccer'},
    {id: 5, name: 'Basketball'}]
}
  
module.exports = {
  app: app,
  initDb: initDb
}

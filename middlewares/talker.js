const fs = require('fs').promises;
const express = require('express');

const router = express.Router();

const { nameExists, ageIsValid,
  watchedAtIsValid, rateIsValid, talkIsValid, tokenIsValid } = require('../validations/talker');

const file = './talker.json';

router.get('/', async (_req, res) => {
  const data = JSON.parse(await fs.readFile(file, 'utf-8'));

  res.status(200).json(data);
});

router.get('/search', tokenIsValid, async (req, res) => {
  const { name } = req.query;
  const data = JSON.parse(await fs.readFile(file, 'utf-8'));

  console.log(name);
  if (!name) return res.status(200).json(data);

  const speaker = data.filter((element) => element.name.toLowerCase().includes(name.toLowerCase()));

  res.status(201).json(speaker);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const data = JSON.parse(await fs.readFile(file, 'utf-8'));
  const speaker = data.find((element) => element.id === +id);

  if (!speaker) { res.status(404).json({ message: 'Pessoa palestrante não encontrada' }); }

  res.status(200).json(speaker);
});

router.post('/', tokenIsValid, nameExists, ageIsValid, talkIsValid, watchedAtIsValid, rateIsValid, 
async (req, res) => {
  const { name, age, talk } = req.body;
  const data = JSON.parse(await fs.readFile(file, 'utf-8'));

  const newSpeaker = {
    name,
    age,
    id: data.length + 1,
    talk,
  };
  
  const speakers = [...data, newSpeaker];
  await fs.writeFile(file, JSON.stringify(speakers));
  res.status(201).json(newSpeaker);
});

router.put('/:id', tokenIsValid, nameExists, ageIsValid, talkIsValid, watchedAtIsValid, rateIsValid,
async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const data = JSON.parse(await fs.readFile(file, 'utf-8'));

  const speaker = data.findIndex((element) => +element.id === +id);
  data[speaker] = { id: +id, name, age, talk };
  await fs.writeFile(file, JSON.stringify(data));
  res.status(200).json(data[speaker]);
});

router.delete('/:id', tokenIsValid, async (req, res) => {
  const { id } = req.params;
  const data = JSON.parse(await fs.readFile(file, 'utf-8'));
  const speaker = data.findIndex((element) => +element.id === +id);

  if (!speaker) return res.status(404).json({ message: 'ID not found!' });

  data.splice(speaker, 1);

  await fs.writeFile(file, JSON.stringify(data));
  res.status(204).json(data);
});

module.exports = router;
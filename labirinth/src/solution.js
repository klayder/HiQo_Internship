const Escape = require('./escape.js');
const labyrinth=require('./labyrinth.json');

const escape1 = new Escape(labyrinth.mainLabyrinth);
escape1.findeWayOut();

const escape2 = new Escape(labyrinth.labyrinthWithoutExit);
escape2.findeWayOut();

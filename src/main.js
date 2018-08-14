import game from './app';
import io from 'socket.io-client/lib';

const socket = io('http://10.0.60.142:3000');

//startand as scenes
game.remote = socket;
game.changer.start(game);

// verificando as requisições do remoto
socket.on('commands', (msg) => {  
  game.joystick(game.sprites.persona, msg);
});

export default game;

import animation from './animation'
import listCommands from '../utils/listCommands';

/**
 * constants
 */

 const VELOCITY_CONTAINER = 10;
 const VELOCITY_PERSONA = 3;

 const REMOTE = {
    LEFT: 'left',
    RIGHT: 'right',
    UP: 'up',
    DOWN: 'down',
 };


/*
-----------------
keyboards
-----------------
*/
let keyboard = {
    logic: keyCode => {
        let key = {};
        key.code = keyCode;
        key.isDown = false;
        key.isUp = true;
        key.press = undefined;
        key.release = undefined;
        //The `downHandler`
        key.downHandler = event => {
            if (event.keyCode === key.code) {
                if (key.isUp && key.press) key.press();
                key.isDown = true;
                key.isUp = false;
            }
            // event.preventDefault();
        };

        //The `upHandler`
        key.upHandler = event => {
            if (event.keyCode === key.code) {
                if (key.isDown && key.release) key.release();
                key.isDown = false;
                key.isUp = true;
            }
            event.preventDefault();
        };

        //Attach event listeners
        window.addEventListener(
            "keydown", key.downHandler.bind(key), false
        );
        window.addEventListener(
            "keyup", key.upHandler.bind(key), false
        );
        return key;
    },    
    fisics: {
        text: PIXI.Text,
        cb: {},
        sprite: {},
        color: {
            in: 'ffffff',
            out: '000000'
        },
        create: (x, y, width, height) => {
            // generate the texture
            let gfx = new PIXI.Graphics();
            gfx.beginFill(keyboard.fisics.color.in, 1);
            gfx.drawRoundedRect(0, 0, width, height, height / 5);
            gfx.endFill();

            keyboard.fisics.sprite = new PIXI.Sprite(gfx.generateCanvasTexture());

            // set the x, y and anchor
            keyboard.fisics.sprite.x = x;
            keyboard.fisics.sprite.y = y;
            keyboard.fisics.sprite.anchor.x = 0.5;
            keyboard.fisics.sprite.anchor.y = 0.5;

            // create the text object
            keyboard.fisics.text = new PIXI.Text("", 'arial');
            keyboard.fisics.text.anchor = new PIXI.Point(0.5, 0.5);
            keyboard.fisics.sprite.addChild(keyboard.fisics.text);

            // set the interactivity to true and assign callback functions
            keyboard.fisics.sprite.interactive = true;

            return { ...keyboard.fisics }
        },
        events: (btn) => {
            btn.sprite.on("mousedown", () => {
                keyboard.fisics.onDown();
            }, this);

            btn.sprite.on("mouseup", () => {
                keyboard.fisics.onUp();
            }, this);

            btn.sprite.on("mouseover", () => {
                keyboard.fisics.onHover();
            }, this);

            btn.sprite.on("mouseout", () => {
                keyboard.fisics.onOut();
            }, this);

        },
        setColors: o => {
            keyboard.fisics.color = o
        },
        setText: (val, style) => {
            // Set text to be the value passed as a parameter
            keyboard.fisics.text.text = val;
            // Set style of text to the style passed as a parameter
            keyboard.fisics.text.style = style;
        },
        onDown: () => {
            keyboard.fisics.sprite.y += 5;
            keyboard.fisics.sprite.tint = keyboard.fisics.color.in;
        },
        onUp: () => {
            if (typeof (keyboard.fisics.cb) === 'function') {
                keyboard.fisics.cb();
            }
            keyboard.fisics.sprite.y -= 5;
            keyboard.fisics.sprite.tint = keyboard.fisics.color.out;
        },
        onHover: () => {
            keyboard.fisics.sprite.tint = keyboard.fisics.color.out;
            keyboard.fisics.sprite.scale.x = 1.2;
            keyboard.fisics.sprite.scale.y = 1.2;
        },
        onOut: () => {
            keyboard.fisics.sprite.tint = keyboard.fisics.color.in;
            keyboard.fisics.sprite.scale.x = 1;
            keyboard.fisics.sprite.scale.y = 1;
        },
        click: (f) => {
            keyboard.fisics.cb = f;
        }
    }
}


/**
 * 
 * remote controls
 * 
 * usado para poder usar controle remoto
 * para poder controlar o personagem
 * 
 * 
 */

 const remote = (...args) => {
     const pos = args[1] == null ? null : args[1].pos;
     const velocity = args[1] == null ? null : args[1].velocity;
     const sprite = args[0];

     // a sprite demora pra ser instanciada e o jogo buga se tirar esssa validaçaõ aqui
    if(sprite == undefined) {
        console.log('sprite ainda não instanciada');        
    } else if (pos == null) {
        sprite.vx = 0;
        sprite.vy = 0;
    } else if (pos === REMOTE.LEFT) {                
        sprite.vx = -VELOCITY_PERSONA + ((velocity / 10));
        sprite.vy = 0;
        sprite.texture.frame = animation.move.directions.left()

    } else if (pos === REMOTE.RIGHT) {
        sprite.vx = VELOCITY_PERSONA + (Math.abs(velocity) / 10);
        sprite.vy = 0;

        sprite.texture.frame = animation.move.directions.right()
    } else if (pos === REMOTE.UP) {        
        sprite.vy = -VELOCITY_PERSONA + ((velocity / 10) * -1);
        sprite.vx = 0;

        sprite.texture.frame = animation.move.directions.up()
    } else if (pos === REMOTE.DOWN) {
        sprite.vy = VELOCITY_PERSONA + (Math.abs(velocity) / 10);
        sprite.vx = 0;

        sprite.texture.frame = animation.move.directions.down()
    }
 }


/*
-----------------
move the sprites

dependencies: animation.move, keyboard
-----------------
*/
let joystick = (sprite) => {
    //Capture the keyboard arrow keys
    let left = keyboard.logic(37),
        up = keyboard.logic(38),
        right = keyboard.logic(39),
        down = keyboard.logic(40);

    let VELOCITY_PERSONA = 3


    //Left arrow key `press` method
    left.press = () => {
        //Change the cat's VELOCITY_PERSONA when the key is pressed
        sprite.vx = -VELOCITY_PERSONA;
        sprite.vy = 0;

        sprite.texture.frame = animation.move.directions.left()
    };

    //Left arrow key `release` method
    left.release = () => {
        //If the left arrow has been released, and the right arrow isn't down,
        //and the cat isn't moving vertically:
        //Stop the cat


        if (!right.isDown && sprite.vy === 0) {
            sprite.texture.frame = animation.move.directions.left()
            sprite.vx = 0;
        }
    };

    //Up
    up.press = () => {
        sprite.vy = -VELOCITY_PERSONA;
        sprite.vx = 0;

        sprite.texture.frame = animation.move.directions.up()

    };
    up.release = () => {
        sprite.texture.frame = animation.move.directions.up()

        if (!down.isDown && sprite.vx === 0) {
            sprite.vy = 0;
        }
    };

    //Right
    right.press = () => {
        sprite.vx = VELOCITY_PERSONA;
        sprite.vy = 0;

        sprite.texture.frame = animation.move.directions.right()

    };
    right.release = () => {

        sprite.texture.frame = animation.move.directions.right()

        if (!left.isDown && sprite.vy === 0) {
            sprite.vx = 0;
        }
    };

    //Down
    down.press = () => {
        sprite.vy = VELOCITY_PERSONA;
        sprite.vx = 0;

        sprite.texture.frame = animation.move.directions.down()


    };

    down.release = () => {
        sprite.texture.frame = animation.move.directions.down()

        if (!up.isDown && sprite.vx === 0) {
            sprite.vy = 0;
        }
    };
}


/**
 * este é um joystic onde o persona não anda (não ele pela pagina)
 * mas sim só a animação
 * 
 * 
 */

let joystickMoveContainer = {
    move: (sprite, container) => {
        console.log(this);
        
        //Capture the keyboard arrow keys
        let left = keyboard.logic(37),
            up = keyboard.logic(38),
            right = keyboard.logic(39),
            down = keyboard.logic(40);

        //Left arrow key `press` method
        left.press = () => {
            //Change the cat's VELOCITY_PERSONA when the key is pressed    
            sprite.texture.frame = animation.move.directions.left()

            this.b.movedContainer.left(container)
        };        
        //Left arrow key `release` method
        left.release = () => {
            if (!right.isDown && container.y === 0) {
                sprite.texture.frame = animation.move.directions.left()
                // this.b.movedContainer.left(container)
            }            
        };

        //Up
        up.press = () => {
            sprite.texture.frame = animation.move.directions.up()
        };
        up.release = () => {
            sprite.texture.frame = animation.move.directions.up()
        };

        //Right
        right.press = () => {
            sprite.texture.frame = animation.move.directions.right()
        };
        right.release = () => {
            sprite.texture.frame = animation.move.directions.right()
        };

        //Down
        down.press = () => {
            sprite.texture.frame = animation.move.directions.down()
        };
        down.release = () => {
            sprite.texture.frame = animation.move.directions.down()
        };

    },
    movedContainer: {
        left: container => {
            container.x += -VELOCITY_CONTAINER;
            container.y += 0;
        },
        right: container => {
            container.x += -VELOCITY_CONTAINER;
            container.y += 0;
        }
    }
}

joystick

/**
 * chamada de comandos dados pelos jogador ao bixiho on xão
 */
let commands = {
    listen: (lalo) => {
        let enter = keyboard.logic(13),
            alt = keyboard.logic(18)
        // quando precionar enter deve mandar a mensagem para o sistema e assim fazer alguma coisa
        enter.press = () => {
            if (_.isFunction(listCommands[document.getElementById("command").value])) {
                listCommands[document.getElementById("command").value](lalo)
            } else {
                listCommands.clean()
            }
        };

        //dando focus ao elemento de texto para dar comandos 
        alt.press = () => {
            document.getElementById("command").focus
        }
    }
}

export {
    keyboard,
    joystick,
    commands,
    joystickMoveContainer,
    remote
}
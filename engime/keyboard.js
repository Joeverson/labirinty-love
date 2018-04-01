/*
-----------------
keyboards
-----------------
*/
let keyboard = keyCode => {
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
        event.preventDefault();
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
}

/*
-----------------
move the sprites

dependencies: animation.move, keyboard
-----------------
*/
let joystick = (sprite) => {
    //Capture the keyboard arrow keys
    let left = keyboard(37),
        up = keyboard(38),
        right = keyboard(39),
        down = keyboard(40);

    let velocity = 3


    //Left arrow key `press` method
    left.press = () => {
        //Change the cat's velocity when the key is pressed
        sprite.vx = -velocity;
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
        sprite.vy = -velocity;
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
        sprite.vx = velocity;
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
        sprite.vy = velocity;
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

//import data from './data.json' assert {type:"json"};
import { createEntity } from './entity.js';
import { Componets } from './components.js';
import { Systems } from './systems.js';
import { Tags } from './tags.js';

//canvas element
/** @type {HTMLCanvasElement} */
const canvas =  document.getElementById('canvas1');
//canvas api
/** @type {CanvasRenderingContext2D} */ 
const ctx = canvas.getContext('2d');

//width and height
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//add event
window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});


//ALL SYSTEMS
const sys = [];
const entities = [];

// style
const styles = ['#F70B0B','#0B2BF7','#3B9B0A','#9B790A'];

function randomStyles(){
    return styles[Math.floor((Math.random()*styles.length))];
}

function randomPosition(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


//*-------------------------------------------------------------------------------------*//
//*----------------------------------GAME LOOP------------------------------------------*//
//*-------------------------------------------------------------------------------------*//

//setinitialState
function setInitState(){

    //FPS entity
    let entityText = createEntity();
    entityText.AddComponent(Componets.Position({x:10, y:50}));
    entityText.AddComponent(Componets.Shape({style:'#FFFFFF',type:Tags.FILL_TEXT}));
    entityText.AddComponent(Componets.FPS());
    entityText.AddComponent(Componets.Text(''));
    entities.push(entityText); 

    //
    let entityRect = createEntity();
    entityRect.AddComponent(Componets.Position({x: canvas.width /2, y: canvas.height /2}));
    entityRect.AddComponent(Componets.Dimension());
    entityRect.AddComponent(Componets.Velocity());
    entityRect.AddComponent(Componets.Acceleration({ax:0, ay:-0.5}));
    entityRect.AddComponent(Componets.Shape({style:'#F70B0B',type:Tags.FILL_RECT}));
    entities.push(entityRect)
    //
    let image = new Image();
    let src = './images/ship_0009.png'

    let entitySprite = createEntity();
    entitySprite.AddComponent(Componets.Position({x: 300, y: canvas.height /2}));
    entitySprite.AddComponent(Componets.Dimension({w:150,h:150}));
    entitySprite.AddComponent(Componets.Velocity());
    entitySprite.AddComponent(Componets.Acceleration({ax:0, ay:-0.5}));
    entitySprite.AddComponent(Componets.Sprite({image:image, src:src}));
    entities.push(entitySprite);

    const COUNT = 50;

    for (let i = 0; i < COUNT; i++) {
        const ship = createEntity();
        ship.AddComponent(Componets.Position({x: randomPosition(0, canvas.width), y: randomPosition(50, canvas.height)}));
        ship.AddComponent(Componets.Dimension({w:150,h:150}));
        ship.AddComponent(Componets.Velocity());
        ship.AddComponent(Componets.Acceleration({ax:0, ay:-0.3}));
        ship.AddComponent(Componets.Sprite({image:image, src:src}));
        entities.push(ship)
    }

    console.log(entities.length);

    //render system
    sys.push(Systems.SystemRender(ctx, entities));
    sys.push(Systems.SystemMovement(ctx, entities));


}

//update game logic
function update(dt){
   

}
//draw game object
function draw(dt){
    //clear canva
    ctx.clearRect(0, 0, canvas.width, canvas.height);
   
    for (let i = 0; i < sys.length; i++) {
        const system = sys[i];
        //
        system.Run(dt);
        
    }

    
}

let fps = 30;
let delta = 0; //delta time
let lastTime = window.performance.now();
let currentTime =0;
let interval = 1000/fps;


//Immediately-Invoked Function Expression (IIFE)
;(()=>{
    function main(){
        currentTime = window.performance.now();
        delta = (currentTime - lastTime);

        if(delta > interval){

            //update
            update(delta);
            //render
            draw(delta);

            //
            lastTime = currentTime - (delta%interval);
        }

        window.requestAnimationFrame(main);
    }
   
    //setInitState
    setInitState();

    main(); //Start the cycle
})();
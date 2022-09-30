//import data from './data.json' assert {type:"json"};
import { createEntity } from './entity.js';
import { Componets } from './components.js';
import { Systems } from './systems.js';

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
    let entityText = createEntity();
    entityText.AddComponent(Componets.Position({x:10, y:50}));
    entityText.AddComponent(Componets.Sprite('#FFFFFF'));
    entityText.AddComponent(Componets.SpriteType(Componets.SpriteType().FILL_TEXT));
    entityText.AddComponent(Componets.FPS());
    entityText.AddComponent(Componets.Text(''));
    entities.push(entityText);  

    let style = null;
    
    let pos = {
        x:0,
        y:0
    };
    //
    
    for (let i = 0; i < 10; i++) {
        pos.x = randomPosition(50,canvas.width);
        pos.y = randomPosition(50,canvas.height);
        style = randomStyles();
    
        let entity = createEntity();
        entity.AddComponent(Componets.Health());
        entity.AddComponent(Componets.Position(pos));
        entity.AddComponent(Componets.SpriteType());
        entity.AddComponent(Componets.Sprite(style));
        entity.AddComponent(Componets.Dimension({w:50,h:70}));
        entities.push(entity);        
    }
    //

    style = '#38f';
    let entity1 = createEntity('Player');
    entity1.AddComponent(Componets.Health());
    entity1.AddComponent(Componets.Position({x:50,y:700}));
    entity1.AddComponent(Componets.SpriteType(Componets.SpriteType().STROKE_RECT));
    entity1.AddComponent(Componets.Sprite(style));
    entity1.AddComponent(Componets.Dimension({w:50,h:70}));
    entities.push(entity1);

    //
    let entityArc = createEntity();
    entityArc.AddComponent(Componets.Position({x:300,y:500}));
    entityArc.AddComponent(Componets.Velocity({vx:0, vy:0}));
    entityArc.AddComponent(Componets.Acceleration({ax:0.5, ay:0.5}));
    entityArc.AddComponent(Componets.SpriteType(Componets.SpriteType().ARC));
    entityArc.AddComponent(Componets.Sprite(style));
    entityArc.AddComponent(Componets.Arc({radius:25,stroke:0,lineWidth:5}));
    entities.push(entityArc);


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
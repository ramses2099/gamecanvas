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

//*-------------------------------------------------------------------------------------*//
//*----------------------------------GAME LOOP------------------------------------------*//
//*-------------------------------------------------------------------------------------*//

//setinitialState
function setInitState(){
    let entity = createEntity();
    entity.AddComponent(Componets.Health());
    entity.AddComponent(Componets.Position({x:500,y:60}));
    entity.AddComponent(Componets.Sprite('#F90C0C'));
    entity.AddComponent(Componets.Dimension({w:50,h:70}));
    
    
    let entity1 = createEntity('Player');
    entity1.AddComponent(Componets.Health());
    entity1.AddComponent(Componets.Position({x:50,y:700}));
    entity1.AddComponent(Componets.Sprite('#163DDA'));
    entity1.AddComponent(Componets.Dimension({w:50,h:70}));
    
    //
    entities.push(entity);
    entities.push(entity1);


    //render system
    sys.push(Systems.SystemRender(ctx, entities));
 

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

    console.log(getComputedStyle());
}

let now = 0;
let dt = 0; //delta time
let last = window.performance.now();
let step = 1/60;

//Immediately-Invoked Function Expression (IIFE)
;(()=>{
    function main(){
        now = window.performance.now();
        dt = dt + Math.min(1, (now - last ) / 1000);
        while(dt > step){
            dt = dt - step
            //update
            update(dt)
        }
        //draw
        draw(dt);
        last = now;
        window.requestAnimationFrame(main);
    }
   
    //setInitState
    setInitState();

    main(); //Start the cycle
})();
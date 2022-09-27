//import data from './data.json' assert {type:"json"};

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

//*-------------------------------------------------------------------------------------*//
//*----------------------------------ECS------------------------------------------------*//
//*-------------------------------------------------------------------------------------*//
class Entity{
    count = 0;

    constructor(){
        this.id =(+new Date()).toString(16) + (Math.random() * 100000000 | 0).toString();
        this.count++;
        this.components = new Map();
    }
    // ADD COMPONENT TO ENTITY
    addComponent(component){        
        this.components.set(component.name, component);
    }
    // GET COMPONENT
    getComponent(componentName){
        return this.components.get(componentName);
    }
    // REMOVE COMPONENT TO ENTITY
    removeComponent(componentName){
       this.components.delete(componentName);
    }
    // PRINT COMPONENT IN THE ENTITY
    print(){
        console.log(JSON.stringify(this, null, 4));       
    }

}
//
class ComponentHealth{
    constructor( value ) {
        this.value = value || 20;
        this.name = 'health';
    }
}

class ComponentPosition{
    constructor( setting ) {
        this.x = setting.x || 0;
        this.y = setting.y || 0;
        this.name = 'position';
    }
}

class ComponentVelocity{
    constructor( setting ) {
        this.dx = setting.dx || 0;
        this.dy = setting.dy || 0;
        this.name = 'velocity';
    }
}

class ComponentDimension{
    constructor(setting){
        this.w = (setting)?setting.w : 50;
        this.h = (setting)?setting.h : 50;
        this.name = 'dimension';
    }
}

class ComponenetSprite{
    constructor(setting){
        this.name = 'sprite';        
    }
}

class SystemRender{
    constructor( entities, ctx ){
        this.entities = entities;
        this.ctx = ctx;
        this.pos = null;
        this.dim = null;
        this.sprite = null;
    }
    //
    run(dt){
        for (let [entityId, entity] of Object.entries(this.entities)){
           for (const [key, component] of entity.components) {
               if(component.name === 'position'){
                 this.pos = component;
               }            
               //
               if(component.name === 'dimension'){
                 this.dim = component;                
               }
               //
               if(component.name === 'sprite'){
                 this.sprite = component;
               }
    
               if(this.sprite){
                 this.ctx.beginPath();
                 this.ctx.fillStyle ='#ff8080';
                 this.ctx.fillRect(this.pos.x, this.pos.y, this.dim.w, this.dim.h);
                 this.ctx.closePath();
               }                          
           }
        }
    }

}

class SystemMovement{
    constructor( entities ){
        this.entities = entities;
        this.pos = null;
        this.dim = null;
        this.vel = null;
    }
    //
    run(dt){
        for (let [entityId, entity] of Object.entries(this.entities)){
           for (const [key, component] of entity.components) {
               if(component.name === 'position'){
                 this.pos = component;
               }            
               //
               if(component.name === 'dimension'){
                 this.dim = component;                
               }
               //
               if(component.name === 'velocity'){
                 this.vel = component;                
               }

                     
           }
        }
    }

}


const entities = [];
const systems = [];

//*-------------------------------------------------------------------------------------*//
//*----------------------------------GAME LOOP------------------------------------------*//
//*-------------------------------------------------------------------------------------*//

//setinitialState
function setInitState(){    
    const entity1 = new Entity();
    entity1.addComponent(new ComponentHealth());
    entity1.addComponent(new ComponentPosition({x: 50, y:56}));
    entity1.addComponent(new ComponentDimension());
    entity1.addComponent(new ComponenetSprite());
    //
    const entity2 = new Entity();
    entity2.addComponent(new ComponentHealth());
    entity2.addComponent(new ComponentPosition({x: 350, y:56}));
    entity2.addComponent(new ComponentDimension());
    entity2.addComponent(new ComponenetSprite());

    //
    entities.push(entity1);
    entities.push(entity2);

    systems.push(new SystemRender(entities, ctx));
   

}

//update game logic
function update(dt){
   

}
//draw game object
function draw(dt){
    //clear canva
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    //RUN ALL SYSTEMS
    for (let i = 0; i < systems.length; i++) {
        systems[i].run(dt)        
    }

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
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
        this.components ={};
    }
    // ADD COMPONENT TO ENTITY
    addComponent(component){
        this.components[component.name]=component;
    }
    // REMOVE COMPONENT TO ENTITY
    removeComponent(componentName){
        delete this.components[componentName];
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


//

class SystemRender{
    constructor( entities ){
        this.entities = entities;
        this.pos = null;
        this.dim = null;
        this.sprite = null;
    }
    //
    render(ctx){
        for (let [entityId, entity] of Object.entries(this.entities)){
           for(let [componentId, component] of Object.entries(entity.components)){
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
                ctx.beginPath();
                ctx.fillStyle ='#ff8080';
                ctx.fillRect(this.pos.x, this.pos.y, this.dim.w, this.dim.h);
                ctx.closePath();                

              }

           }
        }
    }

}



const entity1 = new Entity();
const entities = [];
const systemRender = new SystemRender(entities);

//*-------------------------------------------------------------------------------------*//
//*----------------------------------GAME LOOP------------------------------------------*//
//*-------------------------------------------------------------------------------------*//

//setinitialState
function setInitState(){
   
    
    const health = new ComponentHealth();
    const position = new ComponentPosition({x: 50, y:56});
    
    entity1.addComponent(health);
    entity1.addComponent(position);
    entity1.addComponent(new ComponentDimension());
    entity1.addComponent(new ComponenetSprite());
    
    entities.push(entity1);
    entity1.print();

    entity1.removeComponent('helath');
    entity1.print();

}

//update game logic
function update(dt){
   

}
//draw game object
function draw(dt){
    //clear canva
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    
    systemRender.render(ctx);
   
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
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
//*----------------------------------GAME LOOP------------------------------------------*//
//*-------------------------------------------------------------------------------------*//

//setinitialState
function setInitState(){
   console.log("set init");
}

//update game logic
function update(dt){
    console.log("update");

}
//draw game object
function draw(dt){
    //clear canva
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    console.log("draw");
   
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
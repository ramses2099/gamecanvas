//*-------------------------------------------------------------------------------------*//
//*----------------------------------ECS COMPONENTS-------------------------------------*//
//*-------------------------------------------------------------------------------------*//
import { Tags } from "./tags.js";

//Module Pattern IIFF
const Componets =(()=>{

    const Health = function(value){        
        let state = { value: value || 50};      
        return {name:Tags.Health, state};
    };
    //
    const Position = function(pos){
        let state ={
          x: pos.x || 0,
          y: pos.y || 0
        };
        return {name:Tags.Position, state};
    };
    //
    const Velocity = function(vel){
        let state = {
            vx : (vel) ? vel.vx : 0,
            vy : (vel) ? vel.vy : 0
        }
        return {name:Tags.Velocity, state};
    };
    //
    const Acceleration = function(acc){        
        let state ={
          ax: (acc) ? acc.ax : 0,
          ay: (acc) ? acc.ay : 0
        }
        return {name:Tags.Acceleration, state};
    };
    //
    const Dimension = function(dim){
        let state ={
           w : (dim ) ? dim.w : 50,
           h : (dim) ? dim.h : 50
        };
        return {name:Tags.Dimension, state};
    };
    //
    const Sprite = function(setting){        
        let state ={
            src:setting.src,
            image:setting.image
        }
        return{ name:Tags.Sprite, state };
    };
    //
    const Shape = function(setting){
        let state ={
            style: setting.style || '#FFFFFF',
            type: setting.type,
            radius: setting.radius || 0,
            stroke: setting.stroke || 0,
            lineWidth: setting.lineWidth || 0,
        }
        return{name:Tags.Shape, state}
    }
    //
    const Text = function(text){
        let state ={
            text : text || 'none'
        };
        return{ name:Tags.Text, state };
    };
    //
    const FPS = function(){        
        return{ name:Tags.FPS };
    };
    //
    
    return {Health,Position,Dimension,Sprite,Shape,Velocity,Acceleration,Text,FPS};
})();

export {Componets}
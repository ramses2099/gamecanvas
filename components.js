//*-------------------------------------------------------------------------------------*//
//*----------------------------------ECS COMPONENTS-------------------------------------*//
//*-------------------------------------------------------------------------------------*//
//Module Pattern IIFF
const Componets =(()=>{

    const Health = function(value){
        const name = 'health';
        value = value || 50;         
        return {name, value};
    };
    //
    const Position = function(pos){
        const name = 'position';
        let x = pos.x || 0;
        let y = pos.y || 0;
        return {name, x, y};
    };
    //
    const Velocity = function(vel){
        const name = 'velocity';
        let vx = vel.vx || 0;
        let vy = vel.vy || 0;
        return {name, vx, vy};
    };
    //
    const Acceleration = function(acc){
        const name = 'acceleration';
        let ax = acc.ax || 0;
        let ay = acc.ay || 0;
        return {name, ax, ay};
    };
    //
    const Dimension = function(dim){
        const name = 'dimension';
        let w = dim.w || 50;
        let h = dim.h || 50;
        return {name, w, h};
    };
    //
    const Sprite = function(style){
        const name = 'sprite';
        style = style || '#FFFFFF';
        return{ name, style };
    };
    //
    const Text = function(text){
        const name = 'text';
        text = text || 'none';
        return{ name, text };
    };
    //
    const Arc = function(obj){
        const name = 'arc';
        let radius = obj.radius || 50;
        let stroke = obj.stroke || 0;
        let lineWidth = obj.lineWidth || 0;
        return{ name, radius, stroke, lineWidth };
    };
    //
    const FPS = function(){
        const name = 'fps';
        return{ name };
    };
    //
    const SpriteType = function(type){
        const name = 'spritetype';
        const FILL_RECT = 'fillRect';
        const FILL_TEXT = 'fillText';
        const ARC = 'arc';
        const DRAW_IMAGE = 'drawImage';
        const STROKE_RECT = 'strokeRect';
        type = type || FILL_RECT;

        return {name, FILL_RECT, FILL_TEXT, ARC, DRAW_IMAGE, STROKE_RECT, type};
    }
    //
    return {Health,Position,Dimension,Sprite,SpriteType,Arc,Velocity,Acceleration,Text,FPS};
})();

export {Componets}
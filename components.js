//*-------------------------------------------------------------------------------------*//
//*----------------------------------ECS COMPONENTS-------------------------------------*//
//*-------------------------------------------------------------------------------------*//
//Module Pattern IIFF
const Componets =(()=>{

    const Health = function(value){
        let name = 'health';
        value = value || 50;         
        return {name, value};
    };
    //
    const Position = function(pos){
        let name = 'position';
        let x = pos.x || 0;
        let y = pos.y || 0;
        return {name, x, y};
    };
    //
    const Dimension = function(dim){
        let name = 'dimension';
        let w = dim.w || 50;
        let h = dim.h || 50;
        return {name, w, h};
    };
    //
    const Sprite = function(style){
        let name = 'sprite';
        style = style || '#FFFFFF';
        return{ name, style };
    }

    //
    return {Health,Position,Dimension,Sprite};
})();

export {Componets}
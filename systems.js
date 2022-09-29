//*-------------------------------------------------------------------------------------*//
//*----------------------------------ECS SYSTEMS----------------------------------------*//
//*-------------------------------------------------------------------------------------*//

const Systems =(()=>{
    //system render
    const systemRender = function(ctx, entities = [] ){
        
        //run
        const run = function(dt){
            if(entities.length > 0){
                for (let i = 0; i < entities.length; i++) {
                    const entity = entities[i];
                    //
                    if(entity.HasComponent('sprite')){
                        let style = entity.GetComponentByName('sprite').style;
                        let pos = entity.GetComponentByName('position');
                        let dim = entity.GetComponentByName('dimension');            
                        //draw 
                        draw(ctx,pos.x, pos.y, dim.w, dim.h, style); 
                        
                    }
                }

            }
        }

        const draw = function(ctx, x, y, w, h, style){
            ctx.beginPath();
            ctx.fillStyle = style;
            ctx.fillRect(x, y, w, h);
            ctx.closePath();    
        }

        return{
            "Run":run
        }

    }
    //


    return {
        "SystemRender":systemRender,
    };
})();

export {Systems}
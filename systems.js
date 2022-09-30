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
                        let type = entity.GetComponentByName('spritetype').type;
                        let text ='';
                        let arc = null;

                        if(entity.HasComponent('text')){
                            text = entity.GetComponentByName('text').text;
                        }
                        //
                        if(entity.HasComponent('arc')){
                            arc = entity.GetComponentByName('arc');
                        }

                        //switch 
                        switch (type) {
                            case 'fillRect':
                                drawFillRect(ctx,pos.x, pos.y, dim.w, dim.h, style);
                                break;
                            case 'fillText':
                                drawFillText(ctx,pos.x,pos.y,text,style);
                                break;
                            case 'arc':
                                drawArc(ctx,pos.x, pos.y,arc.radius,arc.stroke,arc.lineWidth, style);
                                break;
                            case 'strokeRect':
                                drawStrokeRect(ctx,pos.x, pos.y, dim.w, dim.h, style);
                                break;
                            case 'drawImage':

                                break;                        
                            default:
                                drawFillRect(ctx,pos.x, pos.y, dim.w, dim.h, style);                               
                                break;
                        }
                        
                    }
                }

            }
        }
        //fillRect
        const drawFillRect = function(ctx, x, y, w, h, style){
            ctx.beginPath();
            ctx.fillStyle = style;
            ctx.fillRect(x, y, w, h);
            ctx.closePath();    
        }
        //strokeRect
        const drawStrokeRect = function(ctx, x, y, w, h, style){            
            ctx.beginPath();
            ctx.strokeStyle  = style;
            ctx.strokeRect(x, y, w, h);
            ctx.closePath();    
        }
        //fillText
        const drawFillText = function(ctx, x, y, text, style){            
            ctx.beginPath();
            ctx.font ="35px serif";
            ctx.fillStyle =style;
            ctx.fillText(text, x, y);
            ctx.closePath();    
        }
        //arc
        const drawArc = function(ctx, x, y, radius, stroke, lineWidth, style){            
            ctx.beginPath();
            ctx.fillStyle =style;
            ctx.arc(x, y, radius, 0, 2 * Math.PI);
            if(stroke === 1){
                ctx.lineWidth = lineWidth;               
                ctx.stroke(); 
            }else{
                ctx.fill();
            }

            ctx.closePath();    
        }

        return{
            "Run":run
        }

    }

    //system Movement
    const systemMovement = function(ctx, entities = [] ){
        
        //run
        const run = function(dt){
            if(entities.length > 0){
                for (let i = 0; i < entities.length; i++) {
                    const entity = entities[i];
                    //
                    if(entity.HasComponent('position')){
                        let pos = entity.GetComponentByName('position');
                        let dim = entity.GetComponentByName('dimension');
                        let vel = entity.GetComponentByName('velocity');
                        let acc = entity.GetComponentByName('acceleration');            
                        //
                        if(entity.HasComponent('text') && entity.HasComponent('fps')){
                            entity.GetComponentByName('text').text = `FPS:${dt.toFixed(2)}`;
                        }
                        //
                        if(entity.HasComponent('velocity') && entity.HasComponent('acceleration')){
                            //vel.vx += acc.ax * dt;
                            //vel.vy += acc.ay * dt

                            //pos.x += vel.vx * dt;
                            //pos.y += vel.vy * dt;

                            vel.vx += acc.ax;
                            vel.vy += acc.ay;

                            pos.x += vel.vx;
                            pos.y += vel.vy;

                            vel.vx = 0;
                            vel.vy = 0;

                            console.log(pos.x, ' ' , pos.y);
                            console.log(vel.vx, ' ' , vel.vy);
                            console.log(acc.ax, ' ' , acc.ay);
                        }
                    }
                }

            }
        }

        return{
            "Run":run
        }

    }
    //


    return {
        "SystemRender":systemRender,
        "SystemMovement":systemMovement
    };
})();

export {Systems}
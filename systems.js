//*-------------------------------------------------------------------------------------*//
//*----------------------------------ECS SYSTEMS----------------------------------------*//
//*-------------------------------------------------------------------------------------*//
import { Tags } from "./tags.js";

const Systems = (() => {
    //system render
    const systemRender = function (ctx, entities = []) {
        //run
        const run = function (dt) {
            if (entities.length > 0) {
                for (let i = 0; i < entities.length; i++) {
                    const entity = entities[i];

                    //shape
                    if (entity.HasComponent(Tags.Shape)) {
                        let shape = entity.GetComponentByName(Tags.Shape).state;
                        let pos = entity.GetComponentByName(Tags.Position).state;
                       
                            //test
                            let text = "";
                            if (entity.HasComponent("text")) {
                                text = entity.GetComponentByName("text").text;
                            }

                            //dimemsion
                            let dim = null;
                            if (shape.type !== Tags.FILL_TEXT) {
                                dim = entity.GetComponentByName(Tags.Dimension).state;
                            }
                            //switch
                            switch (shape.type) {
                                case Tags.FILL_RECT:
                                    drawFillRect(ctx, pos.x, pos.y, dim.w, dim.h, shape.style);
                                    break;
                                case Tags.FILL_TEXT:
                                    drawFillText(ctx, pos.x, pos.y, text, shape.style);
                                    break;
                                case Tags.ARC:
                                    drawArc(
                                        ctx,
                                        pos.x,
                                        pos.y,
                                        shape.radius,
                                        shape.stroke,
                                        shape.lineWidth,
                                        shape.style
                                    );
                                    break;
                                case Tags.STROKE_RECT:
                                    drawStrokeRect(ctx, pos.x, pos.y, dim.w, dim.h, shape.style);
                                    break;
                                default:
                                    drawFillRect(ctx, pos.x, pos.y, dim.w, dim.h, shape.style);
                                    break;
                            }
                        
                    }

                    //sprite
                    if (entity.HasComponent(Tags.Sprite)) {
                        let sprite = entity.GetComponentByName(Tags.Sprite).state;
                        let pos = entity.GetComponentByName(Tags.Position).state;
                        let dim = entity.GetComponentByName(Tags.Dimension).state;

                        
                        //
                        drawImage(ctx, sprite.image, sprite.src, pos.x, pos.y, dim.w, dim.h);


                    }

                }
            }
        };
        //fillRect
        const drawFillRect = function (ctx, x, y, w, h, style) {
            ctx.beginPath();
            ctx.fillStyle = style;
            ctx.fillRect(x, y, w, h);
            ctx.closePath();
        };
        //strokeRect
        const drawStrokeRect = function (ctx, x, y, w, h, style) {
            ctx.beginPath();
            ctx.strokeStyle = style;
            ctx.strokeRect(x, y, w, h);
            ctx.closePath();
        };
        //fillText
        const drawFillText = function (ctx, x, y, text, style) {
            ctx.beginPath();
            ctx.font = "35px serif";
            ctx.fillStyle = style;
            ctx.fillText(text, x, y);
            ctx.closePath();
        };
        //arc
        const drawArc = function (ctx, x, y, radius, stroke, lineWidth, style) {
            ctx.beginPath();
            ctx.fillStyle = style;
            ctx.arc(x, y, radius, 0, 2 * Math.PI);
            if (stroke === 1) {
                ctx.lineWidth = lineWidth;
                ctx.stroke();
            } else {
                ctx.fill();
            }

            ctx.closePath();
        };
        //image
        const drawImage = function (ctx, image, src, x, y, w, h) {
            image.addEventListener("load", (e) => {
                ctx.clearRect(x, y, w, h);
                ctx.beginPath();
                ctx.drawImage(image, x, y, w, h);
                ctx.closePath();
            });
            image.src = src;
        };

        return {
            Run: run,
        };
    };

    //system Movement
    const systemMovement = function (ctx, entities = []) {
        //run
        const run = function (dt) {
            if (entities.length > 0) {
                for (let i = 0; i < entities.length; i++) {
                    const entity = entities[i];
                    //
                    if (entity.HasComponent("position")) {
                        let pos = entity.GetComponentByName("position").state;

                        //
                        if (entity.HasComponent("text") && entity.HasComponent("fps")) {
                            entity.GetComponentByName("text").text = `FPS:${dt.toFixed(2)}`;
                        }
                        //
                        if (
                            entity.HasComponent("velocity") &&
                            entity.HasComponent("acceleration")
                        ) {
                            let vel = entity.GetComponentByName("velocity").state;
                            let acc = entity.GetComponentByName("acceleration").state;

                            vel.vx += acc.ax;
                            vel.vy += acc.ay;

                            pos.x += vel.vx;
                            pos.y += vel.vy;

                            vel.vx = 0;
                            vel.vy = 0;
                        }
                    }
                }
            }
        };

        return {
            Run: run,
        };
    };
    //

    return {
        SystemRender: systemRender,
        SystemMovement: systemMovement,
    };
})();

export { Systems };

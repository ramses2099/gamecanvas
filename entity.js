//*-------------------------------------------------------------------------------------*//
//*----------------------------------ECS ENTITY-----------------------------------------*//
//*-------------------------------------------------------------------------------------*//
const createEntity = (name) =>{
    let id =(+new Date()).toString(16) + (Math.random() * 100000000 | 0).toString();
    let components = new Map();
    name = name || "NPC";
    //
    const addComponent = function(componet){
        components.set(componet.name, componet);
    }
    //
    const removeComponent = function(compentName){
        components.delete(compentName);
    }
    //
    const getComponents = function(){
        return components;
    }
    //
    const getComponentByName = function(componentName){
        return components.get(componentName);
    }
    //
    const hasComponent = function(componentName){
        return components.has(componentName);
    }

    return {
        "ID": id,
        "Name":name,
        "AddComponent": addComponent,
        "RemoveComponent": removeComponent,
        "GetComponents":getComponents,
        "GetComponentByName":getComponentByName,
        "HasComponent":hasComponent
    };
}

export { createEntity };

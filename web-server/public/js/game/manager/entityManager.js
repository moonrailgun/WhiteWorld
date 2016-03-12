/**
 * Created by Chen on 2016-01-12.
 */

var EntityManager = function() {
    var entities = [];
    var manager = this;

    manager.AddEntity = function (entityData) {
        for(var i = 0;i< entityData.length; i++){
            entities.push(new Entity(entityData[i]));
        }
    }
};
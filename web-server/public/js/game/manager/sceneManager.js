/**
 * Created by Chen on 2015-12-14.
 */

var SceneManager = function(canvas){
    var buildings = [];
    var entities = [];

    var manager = this;
    manager.addEntity = function(entity){
        entities.push(entity);
    };

    manager.init = function(_entities, _buildings){
        entities = _entities;
        buildings = _buildings;
    }
};
/**
 * Created by Chen on 2015-12-14.
 */

var SceneManager = function(_canvas,_context){
    var buildings = [];
    var entities = [];
    var canvas = _canvas;
    var context = _context;
    var entityManager = new EntityManager();

    var manager = this;
    manager.addEntity = function(entity){
        entities.push(entity);
    };

    manager.init = function(_entities, _buildings) {
        entities = _entities;
        buildings = _buildings;
    };
};
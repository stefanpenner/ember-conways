import Ember from 'ember';
import world from 'conways/lib/worlds/one';

export default Ember.Route.extend({
  setupController(controller) {
    this._super(...arguments);

    function foo() {
      controller.model.advance();
      controller.notifyPropertyChange('model');
      requestAnimationFrame(foo);
    }

    requestAnimationFrame(foo);
  },

  model() {
    return world;
  }
});

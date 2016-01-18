import world from 'conways/lib/worlds/one';
import Ember from 'ember';

export default Ember.Route.extend({
  setupController(controller, model) {
    this._super(...arguments);

    function foo() {
      model.advance();
      // controller.notifyPropertyChange('model');
      requestAnimationFrame(foo);
    }

    requestAnimationFrame(foo);

  },
  model() {
    return world;
  }
});

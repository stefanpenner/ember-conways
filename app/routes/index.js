import Ember from 'ember';
import { world, alive } from 'conways/lib/world';
import { LIVE, DIE as DEAD } from 'conways/lib/fate';

export default Ember.Route.extend({
  setupController(controller) {
    this._super(...arguments);

    function foo() {
      controller.model.advance();
      controller.notifyPropertyChange('model');
      self.requestAnimationFrame(foo);
    }

    self.requestAnimationFrame(foo);
  },

  model() {
    return world(99, 99, ...alive(99, 99, [1,49], [2,49], [3,49], [4,49], [5,49], [6,49], [7,49], [8,49], [10,49], [11,49], [12,49], [13,49], [14,49], [18,49], [19,49], [20,49], [27,49], [28,49], [29,49], [30,49], [31,49], [32,49], [33,49], [35,49], [36,49], [37,49], [38,49], [39,49]));
  }
});

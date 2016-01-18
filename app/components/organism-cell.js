import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'organism-cell',
  classNameBindings: ['cell.isAlive:alive'],
  attributeBindings: ['style'],
  style: Ember.computed('cell', function() {
    let { x, y } = this.get('cell');
    return `top: ${y}0px; left: ${x}0px;`;
  })
});

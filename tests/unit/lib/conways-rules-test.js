import { module, test } from 'qunit';
// Test Helpers
import Cell from 'conways/lib/cell';
import World from 'conways/lib/world';
import fate, { LIVE, DIE } from 'conways/lib/fate';

function world(...cells) {
  return new World({ cells });
}

function alive(x, y) {
  return new Cell(x, y, true);
}

function dead(x, y) {
  return new Cell(x, y, false);
}

function cell(x, y) {
  return alive(x, y);
}

function shouldBecomeAlive(assert, cell, world, message) {
  assert.ok(world.willLive(cell) === true, message || 'expected: ' + cell + ' to live, but died');
}

function assertShouldDie(assert, cell, world, message) {
  assert.ok(world.willLive(cell) === false, message || 'expected: ' + cell + ' to die, but lives');
}

module('Conways rules');
test('sum', function(assert) {
  assert.equal(
    world(
      dead(0,0),  dead(0,1),  dead(0,2),
      dead(1,0),  dead(1,1),  dead(1,2),
      dead(2,0),  dead(2,1),  dead(2,2)
    ).sum(cell(1, 1)), 0
  );

  assert.equal(
    world(
      alive(0,0),  dead(0,1),  dead(0,2),
       dead(1,0),  dead(1,1),  dead(1,2),
       dead(2,0),  dead(2,1),  dead(2,2)
    ).sum(cell(1, 1)), 1
  );

  assert.equal(
    world(
      alive(0,0),  alive(0,1),  dead(0,2),
       dead(1,0),  dead(1,1),  dead(1,2),
       dead(2,0),  dead(2,1),  dead(2,2)
    ).sum(cell(1, 1)), 2
  );

  assert.equal(
    world(
      alive(0,0), alive(0,1), alive(0,2),
       dead(1,0),  dead(1,1),  dead(1,2),
       dead(2,0),  dead(2,1),  dead(2,2)
    ).sum(cell(1, 1)), 3
  );
});

test('fate', function(assert) {
   // if the sum of all nine fields is 3, the inner field state for the next generation will be life (no matter of its previous contents);
   // if the all-field sum is 4, the inner field retains its current state and every other sum sets the inner field to death.
  assert.equal(fate(0), DIE);
  assert.equal(fate(1), DIE);
  assert.equal(fate(2), DIE);
  assert.equal(fate(3), LIVE);
  assert.equal(fate(4), LIVE); // NOTHING
  assert.equal(fate(5), DIE);
  assert.equal(fate(6), DIE);
  assert.equal(fate(7), DIE);
  assert.equal(fate(8), DIE);
  assert.equal(fate(9), DIE);
});

module('Conways Rules');

test('1. Any live cell with fewer than two live neighbours dies, as if caused by under-population.', function(assert) {
  assertShouldDie(assert, cell(1, 1), world(
    alive(0,0),  dead(0,1),  dead(0,2),
     dead(1,0), alive(1,1),  dead(1,2),
     dead(2,0),  dead(2,1),  dead(2,2)
  ));

  assertShouldDie(assert, cell(1, 1), world(
     dead(0,0),  dead(0,1),  dead(0,2),
     dead(1,0), alive(1,1),  dead(1,2),
     dead(2,0),  dead(2,1),  dead(2,2)
  ));

  assertShouldDie(assert, cell(1, 1), world(
     dead(0,0),  dead(0,1),  dead(0,2),
     dead(1,0),  dead(1,1),  dead(1,2),
     dead(2,0),  dead(2,1),  dead(2,2)
  ));
});

test('2. Any live cell with two or three live neighbours lives on to the next generation.', function(assert) {
  shouldBecomeAlive(assert, cell(1, 1), world(
    alive(0,0),  dead(0,1),  dead(0,2),
    alive(1,0), alive(1,1),  dead(1,2),
     dead(2,0),  dead(2,1),  dead(2,2)
  ));

  shouldBecomeAlive(assert, cell(1, 1), world(
    alive(0,0),  dead(0,1),  dead(0,2),
    alive(1,0), alive(1,1),  dead(1,2),
    alive(2,0),  dead(2,1),  dead(2,2)
  ));
});

test('3. Any live cell with more than three live neighbours dies, as if by over-population.', function(assert) {
  assertShouldDie(assert, cell(1, 1), world(
    alive(0,0), alive(0,1),  dead(0,2),
    alive(1,0), alive(1,1),  dead(1,2),
    alive(2,0),  dead(2,1),  dead(2,2)
  ));

  assertShouldDie(assert, cell(1, 1), world(
    alive(0,0), alive(0,1),  dead(0,2),
    alive(1,0), alive(1,1),  dead(1,2),
    alive(2,0), alive(2,1),  dead(2,2)
  ));

  assertShouldDie(assert, cell(1, 1), world(
    alive(0,0), alive(0,1), alive(0,2),
    alive(1,0), alive(1,1),  dead(1,2),
    alive(2,0), alive(2,1),  dead(2,2)
  ));

  assertShouldDie(assert, cell(1, 1), world(
    alive(0,0), alive(0,1), alive(0,2),
    alive(1,0), alive(1,1), alive(1,2),
    alive(2,0), alive(2,1),  dead(2,2)
  ));

  assertShouldDie(assert, cell(1, 1), world(
    alive(0,0), alive(0,1), alive(0,2),
    alive(1,0), alive(1,1), alive(1,2),
    alive(2,0), alive(2,1), alive(2,2)
  ));
});

test('4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.', function(assert) {
  shouldBecomeAlive(assert, cell(1, 1), world(
    alive(0,0),  dead(0,1),  dead(0,2),
    alive(1,0),  dead(1,1),  dead(1,2),
    alive(2,0),  dead(2,1),  dead(2,2)
  ));

  shouldBecomeAlive(assert ,cell(1, 1), world(
     dead(0,0), alive(0,1),  dead(0,2),
    alive(1,0),  dead(1,1),  dead(1,2),
    alive(2,0),  dead(2,1),  dead(2,2)
  ));

  shouldBecomeAlive(assert, cell(1, 1), world(
     dead(0,0), alive(0,1),  dead(0,2),
     dead(1,0),  dead(1,1),  dead(1,2),
    alive(2,0), alive(2,1),  dead(2,2)
  ));

  shouldBecomeAlive(assert, cell(1, 1), world(
     dead(0,0), alive(0,1), alive(0,2),
     dead(1,0),  dead(1,1),  dead(1,2),
     dead(2,0), alive(2,1),  dead(2,2)
  ));

  shouldBecomeAlive(assert, cell(1, 1), world(
     dead(0,0),  dead(0,1), alive(0,2),
     dead(1,0),  dead(1,1), alive(1,2),
     dead(2,0), alive(2,1),  dead(2,2)
  ));

  shouldBecomeAlive(assert, cell(1, 1), world(
     dead(0,0),  dead(0,1), alive(0,2),
     dead(1,0),  dead(1,1), alive(1,2),
     dead(2,0),  dead(2,1), alive(2,2)
  ));

  shouldBecomeAlive(assert, cell(1, 1), world(
    alive(0,0),  dead(0,1), alive(0,2),
     dead(1,0),  dead(1,1), dead(1,2),
     dead(2,0),  dead(2,1), alive(2,2)
  ));

  shouldBecomeAlive(assert, cell(1, 1), world(
    alive(0,0),  dead(0,1), dead(0,2),
     dead(1,0),  dead(1,1), dead(1,2),
    alive(2,0),  dead(2,1), alive(2,2)
  ));

  shouldBecomeAlive(assert, cell(1, 1), world(
    alive(0,0),  dead(0,1), alive(0,2),
     dead(1,0),  dead(1,1),  dead(1,2),
    alive(2,0),  dead(2,1),  dead(2,2)
  ));

  shouldBecomeAlive(assert, cell(1, 1), world(
     dead(0,0),  dead(0,1), alive(0,2),
     dead(1,0),  dead(1,1),  dead(1,2),
    alive(2,0),  dead(2,1), alive(2,2)
  ));

  shouldBecomeAlive(assert, cell(1, 1), world(
     dead(0,0), alive(0,1),  dead(0,2),
    alive(1,0),  dead(1,1), alive(1,2),
     dead(2,0),  dead(2,1),  dead(2,2)
  ));

  shouldBecomeAlive(assert, cell(1, 1), world(
     dead(0,0),  dead(0,1),  dead(0,2),
    alive(1,0),  dead(1,1), alive(1,2),
     dead(2,0), alive(2,1),  dead(2,2)
  ));

  shouldBecomeAlive(assert, cell(1, 1), world(
     dead(0,0), alive(0,1),  dead(0,2),
    alive(1,0),  dead(1,1),  dead(1,2),
     dead(2,0), alive(2,1),  dead(2,2)
  ));

  shouldBecomeAlive(assert, cell(1, 1), world(
     dead(0,0), alive(0,1),  dead(0,2),
     dead(1,0),  dead(1,1), alive(1,2),
     dead(2,0), alive(2,1),  dead(2,2)
  ));
});

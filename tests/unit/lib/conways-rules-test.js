import { module, test } from 'qunit';
// Test Helpers
import Cell from 'conways/lib/cell';
import World from 'conways/lib/world';
import fate, { LIVE, DIE as DEAD } from 'conways/lib/fate';

function world(width, height, ..._cells) {
  let cells = _cells.map((state, index) => {
    return new Cell(index % width, Math.floor(index / width), state === LIVE);
  });

  return new World({ width, height, cells });
}

const world3x3 = world.bind(null, 3, 3);
const world4x4 = world.bind(null, 4, 4);

function cell(x, y) {
  return new Cell(x, y, true);
}

function shouldBecomeAlive(assert, cell, world, message) {
  assert.ok(world.willLive(cell) === true, message || 'expected: ' + cell + ' to live, but died');
}

function assertShouldDie(assert, cell, world, message) {
  assert.ok(world.willLive(cell) === false, message || 'expected: ' + cell + ' to die, but lives');
}

module('Conways rules');
test('sum (3x3)', function(assert) {
  assert.equal(
      world3x3(
        DEAD, DEAD, DEAD,
        DEAD, DEAD, DEAD,
        DEAD, DEAD, DEAD
        ).sum(cell(1, 1)), 0
      );

  assert.equal(
      world3x3(
        LIVE, DEAD, DEAD,
        DEAD, DEAD, DEAD,
        DEAD, DEAD, DEAD
        ).sum(cell(1, 1)), 1
      );

  assert.equal(
      world3x3(
        LIVE, LIVE, DEAD,
        DEAD, DEAD, DEAD,
        DEAD, DEAD, DEAD
        ).sum(cell(1, 1)), 2
      );

  assert.equal(
      world3x3(
        LIVE, LIVE, LIVE,
        DEAD, DEAD, DEAD,
        DEAD, DEAD, DEAD
        ).sum(cell(1, 1)), 3
      );

  assert.equal(
      world3x3(
        DEAD, DEAD, DEAD,
        DEAD, DEAD, DEAD,
        DEAD, DEAD, DEAD
        ).sum(cell(0, 0)), 0
      );

  assert.equal(
      world3x3(
        DEAD, LIVE, DEAD,
        DEAD, DEAD, DEAD,
        DEAD, LIVE, DEAD
        ).sum(cell(0, 0)), 1
      );

  assert.equal(
      world3x3(
        DEAD, LIVE, DEAD,
        LIVE, DEAD, LIVE,
        DEAD, LIVE, DEAD
        ).sum(cell(0, 0)), 2
      );

  assert.equal(
      world3x3(
        DEAD, LIVE, DEAD,
        LIVE, LIVE, DEAD,
        DEAD, LIVE, DEAD
        ).sum(cell(0, 0)), 3
      );
});

test('sum (4x4)', function(assert) {
  assert.equal(
      world3x3(
        DEAD, DEAD, DEAD, DEAD,
        DEAD, DEAD, DEAD, DEAD,
        DEAD, DEAD, DEAD, DEAD,
        DEAD, DEAD, DEAD, DEAD
        ).sum(cell(1, 1)), 0
      );

  assert.equal(
      world3x3(
        LIVE, DEAD, DEAD, DEAD,
        DEAD, DEAD, DEAD, DEAD,
        DEAD, DEAD, DEAD, DEAD,
        DEAD, DEAD, DEAD, DEAD
        ).sum(cell(1, 1)), 1
      );

  assert.equal(
      world3x3(
        LIVE, LIVE, DEAD, DEAD,
        DEAD, DEAD, DEAD, DEAD,
        DEAD, DEAD, DEAD, DEAD,
        DEAD, DEAD, DEAD, DEAD
        ).sum(cell(1, 1)), 2
      );

  assert.equal(
      world3x3(
        LIVE, LIVE, LIVE, DEAD,
        DEAD, DEAD, DEAD, DEAD,
        DEAD, DEAD, DEAD, DEAD,
        DEAD, DEAD, DEAD, DEAD
        ).sum(cell(1, 1)), 3
      );

  assert.equal(
      world4x4(
        DEAD, DEAD, DEAD, DEAD,
        DEAD, DEAD, DEAD, DEAD,
        DEAD, DEAD, DEAD, DEAD,
        DEAD, DEAD, DEAD, DEAD
        ).sum(cell(0, 0)), 0
      );

  assert.equal(
      world4x4(
        DEAD, LIVE, DEAD, DEAD,
        DEAD, DEAD, DEAD, DEAD,
        DEAD, LIVE, DEAD, DEAD,
        DEAD, DEAD, DEAD, DEAD
        ).sum(cell(0, 0)), 1
      );

  assert.equal(
      world4x4(
        DEAD, LIVE, DEAD, DEAD,
        LIVE, DEAD, LIVE, DEAD,
        DEAD, LIVE, DEAD, DEAD,
        DEAD, DEAD, DEAD, DEAD
        ).sum(cell(0, 0)), 2
      );

  assert.equal(
      world4x4(
        DEAD, LIVE, DEAD, DEAD,
        LIVE, LIVE, DEAD, DEAD,
        DEAD, LIVE, DEAD, DEAD,
        DEAD, DEAD, DEAD, DEAD
        ).sum(cell(0, 0)), 3
      );
});

test('fate', function(assert) {
  // if the sum of all nine fields is 3, the inner field state for the next generation will be life (no matter of its previous contents);
  // if the all-field sum is 4, the inner field retains its current state and every other sum sets the inner field to death.
  assert.equal(fate(0), DEAD);
  assert.equal(fate(1), DEAD);
  assert.equal(fate(2), DEAD);
  assert.equal(fate(3), LIVE);
  assert.equal(fate(4), LIVE); // NOTHING
  assert.equal(fate(5), DEAD);
  assert.equal(fate(6), DEAD);
  assert.equal(fate(7), DEAD);
  assert.equal(fate(8), DEAD);
  assert.equal(fate(9), DEAD);
});

module('Conways Rules');

test('1. Any live cell with fewer than two live neighbours dies, as if caused by under-population.', function(assert) {
  assertShouldDie(assert, cell(1, 1), world3x3(
        LIVE, DEAD, DEAD,
        DEAD, LIVE, DEAD,
        DEAD, DEAD, DEAD
        ));

  assertShouldDie(assert, cell(1, 1), world3x3(
        DEAD, DEAD, DEAD,
        DEAD, LIVE, DEAD,
        DEAD, DEAD, DEAD
        ));

  assertShouldDie(assert, cell(1, 1), world3x3(
        DEAD, DEAD, DEAD,
        DEAD, DEAD, DEAD,
        DEAD, DEAD, DEAD
        ));
});

test('2. Any live cell with two or three live neighbours lives on to the next generation.', function(assert) {
  shouldBecomeAlive(assert, cell(1, 1), world3x3(
        LIVE, DEAD, DEAD,
        LIVE, LIVE, DEAD,
        DEAD, DEAD, DEAD
        ));

  shouldBecomeAlive(assert, cell(1, 1), world3x3(
        LIVE, DEAD, DEAD,
        LIVE, LIVE, DEAD,
        LIVE, DEAD, DEAD
        ));
});

test('3. Any live cell with more than three live neighbours dies, as if by over-population.', function(assert) {
  assertShouldDie(assert, cell(1, 1), world3x3(
        LIVE, LIVE, DEAD,
        LIVE, LIVE, DEAD,
        LIVE, DEAD, DEAD
        ));

  assertShouldDie(assert, cell(1, 1), world3x3(
        LIVE, LIVE, DEAD,
        LIVE, LIVE, DEAD,
        LIVE, LIVE, DEAD
        ));

  assertShouldDie(assert, cell(1, 1), world3x3(
        LIVE, LIVE, LIVE,
        LIVE, LIVE, DEAD,
        LIVE, LIVE, DEAD
        ));

  assertShouldDie(assert, cell(1, 1), world3x3(
        LIVE, LIVE, LIVE,
        LIVE, LIVE, LIVE,
        LIVE, LIVE, DEAD
        ));

  assertShouldDie(assert, cell(1, 1), world3x3(
        LIVE, LIVE, LIVE,
        LIVE, LIVE, LIVE,
        LIVE, LIVE, LIVE
        ));
});

test('4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.', function(assert) {
  shouldBecomeAlive(assert, cell(1, 1), world3x3(
        LIVE, DEAD, DEAD,
        LIVE, DEAD, DEAD,
        LIVE, DEAD, DEAD
        ));

  shouldBecomeAlive(assert ,cell(1, 1), world3x3(
        DEAD, LIVE, DEAD,
        LIVE, DEAD, DEAD,
        LIVE, DEAD, DEAD
        ));

  shouldBecomeAlive(assert, cell(1, 1), world3x3(
        DEAD, LIVE, DEAD,
        DEAD, DEAD, DEAD,
        LIVE, LIVE, DEAD
        ));

  shouldBecomeAlive(assert, cell(1, 1), world3x3(
        DEAD, LIVE, LIVE,
        DEAD, DEAD, DEAD,
        DEAD, LIVE, DEAD
        ));

  shouldBecomeAlive(assert, cell(1, 1), world3x3(
        DEAD, DEAD, LIVE,
        DEAD, DEAD, LIVE,
        DEAD, LIVE, DEAD
        ));

  shouldBecomeAlive(assert, cell(1, 1), world3x3(
        DEAD, DEAD, LIVE,
        DEAD, DEAD, LIVE,
        DEAD, DEAD, LIVE
        ));

  shouldBecomeAlive(assert, cell(1, 1), world3x3(
        LIVE, DEAD, LIVE,
        DEAD, DEAD, DEAD,
        DEAD, DEAD, LIVE
        ));

  shouldBecomeAlive(assert, cell(1, 1), world3x3(
        LIVE, DEAD, DEAD,
        DEAD, DEAD, DEAD,
        LIVE, DEAD, LIVE
        ));

  shouldBecomeAlive(assert, cell(1, 1), world3x3(
        LIVE, DEAD, LIVE,
        DEAD, DEAD, DEAD,
        LIVE, DEAD, DEAD
        ));

  shouldBecomeAlive(assert, cell(1, 1), world3x3(
        DEAD, DEAD, LIVE,
        DEAD, DEAD, DEAD,
        LIVE, DEAD, LIVE
        ));

  shouldBecomeAlive(assert, cell(1, 1), world3x3(
        DEAD, LIVE, DEAD,
        LIVE, DEAD, LIVE,
        DEAD, DEAD, DEAD
        ));

  shouldBecomeAlive(assert, cell(1, 1), world3x3(
        DEAD, DEAD, DEAD,
        LIVE, DEAD, LIVE,
        DEAD, LIVE, DEAD
        ));

  shouldBecomeAlive(assert, cell(1, 1), world3x3(
        DEAD, LIVE, DEAD,
        LIVE, DEAD, DEAD,
        DEAD, LIVE, DEAD
        ));

  shouldBecomeAlive(assert, cell(1, 1), world3x3(
        DEAD, LIVE, DEAD,
        DEAD, DEAD, LIVE,
        DEAD, LIVE, DEAD
        ));
});

module('Conways Rules (transformation)');

function assertState(assert, current, expected) {
  current.forEach(function(cell) {
    assert.strictEqual(
        current.getAt(cell.x, cell.y),
        expected.getAt(cell.x, cell.y),
        `expects: ${cell}`
        );
  });
}


test('1. Any live cell with fewer than two live neighbours dies, as if caused by under-population.', function(assert) {
  let world = world3x3(
      LIVE, DEAD, DEAD,
      DEAD, LIVE, DEAD,
      DEAD, DEAD, DEAD
      );

  world.advance();

  assertState(assert, world, world3x3(
        DEAD, DEAD, DEAD,
        DEAD, DEAD, DEAD,
        DEAD, DEAD, DEAD
        ));
});

test('2. Any live cell with two or three live neighbours lives on to the next generation.', function(assert) {
  var world = world3x3(
      LIVE, DEAD, DEAD,
      LIVE, LIVE, DEAD,
      DEAD, DEAD, DEAD
      );

  assertState(assert, world, world3x3(
        LIVE, DEAD, DEAD,
        LIVE, LIVE, DEAD,
        DEAD, DEAD, DEAD
        ));
});

test('3. Any live cell with more than three live neighbours dies, as if by over-population.', function(assert) {
  let world = world3x3(
      LIVE, LIVE, DEAD,
      LIVE, LIVE, DEAD,
      LIVE, DEAD, DEAD
      );

  world.advance();

  assertState(assert, world, world3x3(
        LIVE, LIVE, DEAD,
        DEAD, DEAD, DEAD,
        LIVE, LIVE, DEAD
        ));
});

test('4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.', function(assert) {
  let world = world3x3(
        LIVE, DEAD, DEAD,
        LIVE, DEAD, DEAD,
        LIVE, DEAD, DEAD
        );

  world.advance();

  assertState(assert, world, world3x3(
        DEAD, DEAD, DEAD,
        LIVE, LIVE, DEAD,
        DEAD, DEAD, DEAD
        ));
});

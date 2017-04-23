import _ from "lodash";

function toIndex(row, column, size) {
  if (row < 0 || row >= size || column < 0 || column >= size) { return -1; }
  return row * size + column;
}

function toCoordinates(index, size) {
  if (index < 0 || index >= size * size) { return -1; }
  return [Math.floor(index / size), index % size];
}

function connectionLength([ [ x1, y1 ], [ x2, y2 ] ]) {
  return Math.max(Math.abs(x1 - x2), Math.abs(y1 - y2)) + 1;
}

export default class Board {

  constructor(size) {
    this.size = size;
    this._marks = _.times(size * size).map(() => null)
  }

  // Fetch a mark on the board. If the space doesn't contain a mark, this returns `null`. If the
  // row and column are out of bounds, this returns `undefined`.
  get(row, column) {
    return this._marks[toIndex(row, column, this.size)];
  }

  // Set a mark on the board.
  set(row, column, mark) {
    let index = toIndex(row, column, this.size);
    if (index < 0 || index >= this.size * this.size) { return; }
    this._marks[index] = mark;
  }

  // Determine the the space at the provided coordinates is empty.
  isSpaceEmpty(row, column) {
    return _.isNil(this.get(row, column));
  }

  // Returns an array containing the coordinates of all of the spaces on the board.
  spaces() {
    return _.range(this.size * this.size).map(index => toCoordinates(index, this.size));
  }

  // Returns an array of row/column pairs representing the empty spaces on the board.
  emptySpaces() {
    return this.spaces().filter(coordinates => _.isEmpty(this.get(...coordinates)));
  }

  // Returns the connections for the given mark.
  connections(mark) {

    const minimumConnectionLength = 3;

    function add(c1, c2) {
      return [ c1[0] + c2[0], c1[1] + c2[1]];
    }

    // Define the steps
    const steps = [
      [0, 1],
      [1, 0],
      [1, 1],
      [1, -1]
    ];

    // Create a set of arrays to mark the traversals
    let traversals = _.fromPairs(steps.map((step, stepNumber) => [stepNumber, []]));

    return _(this.spaces())

      // Map each space into its possible connections
      .map((start) => {

        // Map over all of the possible steps
        return steps.map((step, stepNumber) => {

          // Ignore the space if it does not contain the mark
          if (this.get(...start) !== mark) { return; }

          // Ignore the space if it has already been traversed
          if (traversals[stepNumber][toIndex(...start, this.size)]) { return; }

          // Mark the current space as traversed
          traversals[stepNumber][toIndex(...start, this.size)] = true;

          // Find the end of the connection
          let end = start;

          while (this.get(...add(end, step)) === mark) {
            end = add(end, step);
            traversals[stepNumber][toIndex(...end, this.size)] = true;
          }

          // Return the connection
          return [ start, end ];
        });
      })

      // Flatten out the steps
      .flatten()

      // Filter out spaces without connections
      .compact()

      // Filter out connections that are too short
      .filter((connection) => connectionLength(connection) >= minimumConnectionLength)

      // Extract the value
      .value();
  }

  // Returns the score for the given mark (using an arithmetic sum).
  score(mark) {
    return _(this.connections(mark))
      .map((connection) => connectionLength(connection))
      .map((length) => (length - 2) * (1+ length - 2) / 2)
      .reduce(_.add, 0);
  }
}

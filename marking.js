class Marking {
    constructor(marking) {
      this.id = marking.id;
      this.type = marking.type;
      if (marking.createdin === undefined) {
        this.createdin = Date.now();
      } else {
        this.createdin = marking.createdin;
      }
    }
  }
  module.exports = Marking;
  
const employee = require('./employee');

class manager extends employee {
    constructor(name, id, email, Number) {
        super(name, id, email);
        this.Number = Number;
        this.role = "Manager";
    }
    getNumber() {
        return this.Number;
    }
}

module.exports = manager;
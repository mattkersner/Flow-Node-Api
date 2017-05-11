'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.parseProduce = parseProduce;
exports.parseUpdate = parseUpdate;
exports.parseId = parseId;
function parseProduce(input) {
  var requirements = [{ key: 'name', type: 'string' }, { key: 'quantity', type: 'number' }, { key: 'price', type: 'number' }];
  return requirements.every(function (req) {
    return input.hasOwnProperty(req.key) && _typeof(input[req.key]) === req.type;
  });
}

//parseUpdate takes in the payload from the request,
//and strips out any keys that are not name, quantity, or price.
//Then it just simply returns the trimmed object if there’s still keys left, and null if not.
function parseUpdate(input) {
  var validKeys = ['name', 'quantity', 'price'];
  var trimmed = Object.keys(input).reduce(function (obj, curr) {
    if (obj && validKeys.indexOf(curr) !== -1) {
      obj[curr] = input[curr];
      return obj;
    }
  }, {});
  return trimmed && Object.keys(trimmed).length > 0 ? trimmed : null;
}

//parseId is even simpler: It looks for an id property on
//the payload, converts it to a number (if necessary), and returns.
function parseId(input) {
  if (input.hasOwnProperty('id')) return typeof input.id === 'string' ? parseInt(input.id, 10) : input.id;
  return false;
}
//# sourceMappingURL=parsers.js.map

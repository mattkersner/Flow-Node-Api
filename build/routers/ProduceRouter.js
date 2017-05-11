'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // @ flow

var _produce = require('../../data/produce');

var _produce2 = _interopRequireDefault(_produce);

var _express = require('express');

var _save = require('../util/save');

var _save2 = _interopRequireDefault(_save);

var _parsers = require('../util/parsers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ProduceRouter = function () {

  // take the mount path as the constructor argument

  // these fields must be type annotated, or Flow will complain!
  function ProduceRouter() {
    var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '/api/v1/produce';

    _classCallCheck(this, ProduceRouter);

    // instantiate the express.Router
    this.router = (0, _express.Router)();
    this.path = path;
    // glue it all together
    this.init();
  }

  /**
   * Return all items in the inventory
   */


  _createClass(ProduceRouter, [{
    key: 'getAll',
    value: function getAll(req, res) {
      res.status(200).json(_produce2.default);
    }

    /**
     * Return an item from the inventory by ID.
     */

  }, {
    key: 'getById',
    value: function getById(req, res) {
      var id = parseInt(req.params.id, 10);
      var record = _produce2.default.find(function (item) {
        return item.id === id;
      });
      if (record) {
        res.status(200).json({
          message: 'Success!',
          item: record
        });
      } else {
        res.status(400).json({
          status: res.status,
          message: 'No item found with id: ' + id
        });
      }
    }

    /**
     * Add a new item to the inventory
     */

  }, {
    key: 'postOne',
    value: function postOne(req, res) {
      var received = (0, _parsers.parseProduce)(req.body);
      var newProduce = received ? req.body : null;
      if (received) {
        newProduce.id = (0, _save.genId)(received, _produce2.default);
        _produce2.default.push(newProduce);
        res.status(200).json({
          status: 200,
          message: 'Success!',
          item: newProduce
        });
        //write updated inventory to the file
        (0, _save2.default)(_produce2.default).then(function (writePath) {
          logger('Inventory updated. Written to:\n\t' + path.relative(path.join(__dirname, '..', '..'), writePath));
        }).catch(function (err) {
          logger('Error writing to inventory file.');
          logger(err.stack);
        });
      } else {
        res.status(400).json({
          status: 400,
          message: 'Bad Request. Make sure that you submit an item with a name, quantity, and price.'
        });
        logger('Malformed POST to /produce.');
      }
    }

    /**
    * Update a produce item by id
    */

  }, {
    key: 'updateOneById',
    value: function updateOneById(req, res) {
      var searchId = (0, _parsers.parseId)(req.params);
      var payload = (0, _parsers.parseUpdate)(req.body);
      var toUpdate = _produce2.default.find(function (item) {
        return item.id === searchId;
      });
      if (toUpdate && payload) {
        Object.keys(payload).forEach(function (key) {
          if (key === 'quantity' || key === 'price') toUpdate[key] = Number(payload[key]);else toUpdate[key] = payload[key];
        });
        res.json({
          status: res.status,
          message: 'Success!',
          item: toUpdate
        });
        (0, _save2.default)(_produce2.default).then(function (writePath) {
          logger('Item updated. Inventory written to:\n\t' + path.relative(path.join(__dirname, '..', '..'), writePath));
        }).catch(function (err) {
          logger('Error writing to inventory file.');
          logger(err.stack);
        });
      } else {
        res.status(400).json({
          status: res.status,
          message: 'Update failed. Make sure the item ID and submitted fields are correct.'
        });
      }
    }

    /**
    * Remove an item from the inventory by ID
    */

  }, {
    key: 'removeById',
    value: function removeById(req, res) {
      var searchId = (0, _parsers.parseId)(req.params);
      var toDel = _produce2.default.findIndex(function (item) {
        return item.id === searchId;
      });
      if (toDel !== -1) {
        var deleted = _produce2.default.splice(toDel, 1)[0];
        res.json({
          status: 200,
          message: 'Success!',
          deleted: deleted
        });
        //update json file
        (0, _save2.default)(_produce2.default).then(function (writePath) {
          logger('Item deleted. Inventory written to:\n\t' + writePath);
        }).catch(function (err) {
          logger('Error writing to inventory file.');
          logger(err.stack);
        });
      } else {
        res.status(400).json({
          status: 400,
          message: 'No item found with given ID.'
        });
      }
    }

    /**
     * Attach route handlers to their endpoints.
     */

  }, {
    key: 'init',
    value: function init() {
      this.router.get('/', this.getAll);
      this.router.get('/:id', this.getById);
      this.router.post('/', this.postOne);
      this.router.put('/:id', this.updateOneById);
      this.router.delete('/:id', this.removeById);
    }
  }]);

  return ProduceRouter;
}();

exports.default = ProduceRouter;
//# sourceMappingURL=ProduceRouter.js.map

// @ flow

import inventory from '../../data/produce';
import { Router }  from 'express';

export default class ProduceRouter {
  // these fields must be type annotated, or Flow will complain!
  router: Router;
  path: string;

  // take the mount path as the constructor argument
  constructor(path = '/api/v1/produce') {
    // instantiate the express.Router
    this.router = Router();
    this.path = path;
    // glue it all together
    this.init();
  }

  /**
   * Return all items in the inventory
   */
  getAll(req: $Request, res: $Response): void {
    res.status(200).json(inventory);
  }

  /**
   * Return an item from the inventory by ID.
   */
  getById(req: $Request, res: $Response): void {
    const id = parseInt(req.params.id, 10);
    const record = inventory.find(item => item.id === id);
    if(record) {
      res.status(200).json({
        message: 'Success!',
        item: record
      });
    } else {
      res.status(400).json({
        status: res.status,
        message: `No item found with id: ${id}`
      });
    }
  }

  /**
   * Attach route handlers to their endpoints.
   */
  init(): void {
    this.router.get('/', this.getAll);
    this.router.get('/:id', this.getById);
  }
}

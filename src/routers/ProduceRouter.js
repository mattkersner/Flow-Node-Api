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
   * Attach route handlers to their endpoints.
   */
  init(): void {
    this.router.get('/', this.getAll);
  }
}

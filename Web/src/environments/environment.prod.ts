import { BaseEnvironment } from './BaseEnvironment';

class ProdEnvironment extends BaseEnvironment {

  constructor() {
    super();
  }

  get isProduction(): boolean {
    return false;
  }

  get useFakeServices(): boolean {
    return false;
  }
}

export default new ProdEnvironment()

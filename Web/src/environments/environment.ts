import { BaseEnvironment } from './BaseEnvironment';

class LocalEnvironment extends BaseEnvironment {

  constructor() {
    super();
  }

  get isProduction(): boolean {
    return false;
  }
}

export default new LocalEnvironment()
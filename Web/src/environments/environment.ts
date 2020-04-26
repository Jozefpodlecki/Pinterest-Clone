import { BaseEnvironment } from "./BaseEnvironment";

class LocalEnvironment extends BaseEnvironment {
    constructor() {
        super();
    }

    get isProduction(): boolean {
        return false;
    }

    get useFakeServices(): boolean {
        return true;
    }
}

export default new LocalEnvironment();

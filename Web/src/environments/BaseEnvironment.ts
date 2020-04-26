import { DOCUMENT } from "@angular/common";
import { Inject } from "@angular/core";

export abstract class BaseEnvironment {
    constructor() {
        this.baseUrl = document.getElementsByTagName("base")[0].href;
    }

    abstract get isProduction(): boolean;
    baseUrl: string;
    abstract get useFakeServices(): boolean;
}

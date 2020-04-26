import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { AppModule } from "./app/app.module";
import { BaseEnvironment } from "./environments/BaseEnvironment";
import Environment from "./environments/environment";

export function getBaseUrl() {
    return document.getElementsByTagName("base")[0].href;
}

Environment.baseUrl = getBaseUrl();

const providers = [{ provide: BaseEnvironment, useValue: Environment }];

if (Environment.isProduction) {
    enableProdMode();
}

platformBrowserDynamic(providers)
    .bootstrapModule(AppModule)
    .catch((err) => console.error(err));

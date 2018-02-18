/**
 * main.ts
 *
 * @dateCreated 18/02/2018
 * @author Dean Heffernan
 */

// Imports.
import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppModule} from './app/app.module';
import {environment} from './environments/environment';
import {hmrBootstrap} from './hmr';

// Enable production.
if (environment.production) {
  enableProdMode();
}

// Bootstrap application.
const bootstrap = () => platformBrowserDynamic().bootstrapModule(AppModule);

// Setup hot module.
if (environment.hmr) {
  if (module['hot']) {
    hmrBootstrap(module, bootstrap);
  } else {
    console.error('Ammm.. HMR is not enabled for webpack');
  }
} else {
  bootstrap();
}


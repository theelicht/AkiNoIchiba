import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { I18nService } from './core/i18n.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideAppInitializer(() => inject(I18nService).initialize()),
    provideBrowserGlobalErrorListeners(),
  ],
};

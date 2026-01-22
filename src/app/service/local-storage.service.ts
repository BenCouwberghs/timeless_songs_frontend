import { Injectable } from '@angular/core';
import { AppSettings } from '@model/app-settings';

@Injectable({
  providedIn: 'root'
})

export class LocalStorageService {


   saveAppSettings(appSettings: AppSettings) {
     localStorage.setItem('appSettings', JSON.stringify(appSettings));
   }

   retrieveAppSettings(): AppSettings | undefined {
     const appSettings = localStorage.getItem('appSettings');
     return appSettings ? JSON.parse(appSettings) as AppSettings : undefined;
   }
}

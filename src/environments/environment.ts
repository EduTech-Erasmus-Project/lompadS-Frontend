// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const API_BACKEND="http://localhost:8000";

export const environment = {
  production: false,
  URL_UPLOAD_FILE: `${API_BACKEND}/uploadfile`,
  URL_READ_FILE: `${API_BACKEND}/private/read_file`,
  URL_UPDATE_FILE:`${API_BACKEND}/private/update`,
  URL_DOWNLOAD:`${API_BACKEND}/private_download`,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

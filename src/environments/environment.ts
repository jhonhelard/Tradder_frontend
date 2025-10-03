// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
 // truchartsAPI: 'http://localhost:21503/api',
 //  truchartsAPI: 'https://132.148.143.31:442/api',
  truchartsAPI: 'https://trucharts.net/api',
  tradierAPI:'https://api.tradier.com/v1',
 // tradierClientId:'AoOCdon4u1ma0Vysv3DUP18RWIfr2egO',
 tradierClientId:'NEOe5MAJAKBKKC4yafRQUoTGV6X0UCjG',
  StripePublishableKey: 'pk_test_1bx1HympFx0vTulfV9Qt4BUn',
  //StripePublishableKey: 'pk_live_fVU9f6sA6WYxna1kkuwq6sWH',
  oldwebsiteUrl: 'https://trucharts.in'

 // oldwebsiteUrl: 'http://trucharts.com:8084'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
  
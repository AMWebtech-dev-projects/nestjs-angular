// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */

export const environment: any = {
  production: false,
  baseUrl: 'http://localhost:3000/',
  // baseUrl: '/',
  cookieToken: 'news1qazTrackxsw2tra',
  cookieExpirationTime: 10,
  uploadsFolder: {
    profile: 'profile',
  },
  jwtTokenKey: 'newsTrack_JwtTken',
  currentUserKey: 'newsTrack_currentUser',
  role: {
    userRole: 'user',
    adminRole: 'admin',
  },

};

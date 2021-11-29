// Replace the example domain name with your deployed address.
export const environment = {
  production: true,
  // remove http/https to appear relative. xsrf-token skips absolute paths.
  participantManagerDatastoreUrl: '//participants.scrumlaunch2-dev.providencemt.com/participant-manager-datastore',
  baseHref: '/participant-manager/',
  hydraLoginUrl: 'https://participants.scrumlaunch2-dev.providencemt.com/oauth2/auth',
  authServerUrl: 'https://participants.scrumlaunch2-dev.providencemt.com/auth-server',
  authServerRedirectUrl: 'https://participants.scrumlaunch2-dev.providencemt.com/auth-server/callback',
  hydraClientId: 'participant-manager/Dockerfile b/participant-manager/Dockerfile',
  appVersion: 'v0.1',
  termsPageTitle: 'Terms title goes here',
  termsPageDescription: 'Terms description goes here',
  aboutPageTitle: 'About page title goes here',
  aboutPageDescription: 'About page description goes here',
  copyright: 'Copyright 2020-2021 Google LLC.',
};

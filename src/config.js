let config = {api: {}};

let production = false;

if (production) {
  config.api.url = '//ersetzen';
  config.ciamURLAuthenticate = "https://api.secure.mercedes-benz.com/oidc10/auth/oauth/v2/authorize?response_type=code&client_id=2561a7e-da8a-4308-9c82-9715a69360f2&scope=openid%20profile%20email%20address%20phone";
  config.ciamURLRegister = "https://login.secure.mercedes-benz.com/profile/register?app-id=MBOS.PREPROD";
  config.ciamURLConfirmRegistration = "https://login.secure.mercedes-benz.com/profile/confirm-registration?app-id=MBOS.PREPROD&";
  config.ciamURLSetPassword = "https://login.secure.mercedes-benz.com/profile/set-password?app-id=MBOS.PREPROD&";
  config.ciamURLLogout = "https://login.secure.mercedes-benz.com/wl/logout?app-id=MBOS.PREPROD";
  config.ciamURLChangeEmail = "https://login.secure.mercedes-benz.com/profile/edit/email?app-id=MBOS.PREPROD";
  config.ciamURLChangePassword = "https://login.secure.mercedes-benz.com/profile/edit/password?app-id=MBOS.PREPROD";
  config.ciamResetPassword = "https://login.secure.mercedes-benz.com/profile/set-password?app-id=MBOS.PREPROD&";
  config.ciamConfirmEmail = "https://login.secure.mercedes-benz.com/profile/confirm-email?app-id=MBOS.PREPROD&";
} else{
  config.api.url = '//mbos-dev.nolteundlauth.de';
  config.ciamURLAuthenticate = "https://api-test.secure.mercedes-benz.com/oidc10/auth/oauth/v2/authorize?response_type=code&client_id=c1df72e9-30ee-4e49-b334-5ace8ec7092c&scope=openid%20profile%20email%20address%20phone";
  config.ciamURLRegister = "https://login-test.secure.mercedes-benz.com/profile/register?app-id=MBOS.INT";
  config.ciamURLConfirmRegistration = "https://login-test.secure.mercedes-benz.com/profile/confirm-registration?app-id=MBOS.INT&";
  config.ciamURLSetPassword = "https://login-test.secure.mercedes-benz.com/profile/set-password?app-id=MBOS.INT&";
  config.ciamURLLogout = "https://login-test.secure.mercedes-benz.com/wl/logout?app-id=MBOS.INT";
  config.ciamURLChangeEmail = "https://login-test.secure.mercedes-benz.com/profile/edit/email?app-id=MBOS.INT";
  config.ciamURLChangePassword = "https://login-test.secure.mercedes-benz.com/profile/edit/password?app-id=MBOS.INT";
  config.ciamResetPassword = "https://login-test.secure.mercedes-benz.com/profile/set-password?app-id=MBOS.INT&";
  config.ciamConfirmEmail = "https://login-test.secure.mercedes-benz.com/profile/confirm-email?app-id=MBOS.INT&";
}

module.exports = config;

export interface IParamsLogin {
  email: string;
  password: string;
}

export interface IParamsRegister {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IParamsForgotPassword {
  email: string;
}

export interface IAuthState {
  token: {
    access_token: string;
    refresh_token: string;
  };
  loading: boolean;
}

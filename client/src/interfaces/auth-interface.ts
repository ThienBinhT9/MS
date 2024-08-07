export interface IParamsLogin {
  email: string;
  password: string;
}

export interface IParamsRegister {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  gender: number;
  dateOfBirth: Date;
}

export interface IParamsForgotPassword {
  email: string;
}

export interface IAuthState {
  token: {
    userId: string;
    access_token: string;
    refresh_token: string;
  };
  loading: boolean;
}

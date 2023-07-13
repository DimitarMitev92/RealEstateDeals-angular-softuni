export interface ILoginData {
  email: string | null | undefined;
  password: string | null | undefined;
}

export interface ILoginReturnData {
  email: string | null | undefined;
  password: string | null | undefined;
  _id: string | null | undefined;
  accessToken: string | null | undefined;
}

export interface IRegisterData {
  fullName: string | null | undefined;
  email: string | null | undefined;
  username: string | null | undefined;
  password: string | null | undefined;
}

export interface IRegisterReturnData {
  fullName: string | null | undefined;
  email: string | null | undefined;
  username: string | null | undefined;
  password: string | null | undefined;
  _id: string | null | undefined;
  accessToken: string | null | undefined;
}

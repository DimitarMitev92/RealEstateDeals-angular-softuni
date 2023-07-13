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

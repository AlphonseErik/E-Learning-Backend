import { Types, Document } from 'mongoose';
export interface IAccessToken extends Document {
  ID: String;
  accessToken: String;
  userID: String;
  isLogout: Boolean;
  expirationDate: Date;
}
export interface ICreateAccessToken extends Document {
  accessToken: String;
  userID: String;
  isLogout: Boolean;
  expirationDate: Date;
}



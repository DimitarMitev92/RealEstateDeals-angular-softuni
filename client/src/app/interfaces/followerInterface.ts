export interface IFollowerReturnData {
  idOffer?: string;
  _ownerId: string;
  title: string;
  location: string;
  quadrature: number;
  floors: number;
  imageUrl: string;
  price: number;
  information: string;
  ownerInfo: {
    email: string;
    fullName: string;
    username: string;
    phone: string;
    _id: string;
    accessToken: string;
  };
  _createdOn: number;
  _id: string;
}

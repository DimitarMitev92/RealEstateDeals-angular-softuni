export interface IOfferData {
  title?: string | null | undefined;
  location?: string | null | undefined;
  imageUrl?: string | null | undefined;
  price?: string | null | undefined;
  information?: string | null | undefined;
}

export interface IOfferReturnData {
  title?: string;
  location?: string;
  imageUrl?: string;
  price?: string;
  information?: string;
  _ownerId?: string;
  _id: string;
  _createdOn: number;
}

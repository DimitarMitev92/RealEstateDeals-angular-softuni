export interface IOfferData {
  title?: string | null | undefined;
  location?: string | null | undefined;
  imageUrl?: string | null | undefined;
  price?: string | null | undefined;
  information?: string | null | undefined;
}

export interface IOfferReturnData {
  title?: string | null | undefined;
  location?: string | null | undefined;
  imageUrl?: string | null | undefined;
  price?: number | null | undefined;
  information?: string | null | undefined;
  _ownerId?: string | null | undefined;
  _id: string | null | undefined;
  _createdOn: number | null | undefined;
}

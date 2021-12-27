export interface PinInterface {
  _id: string,
  destinaiton: string,
  image: {
    asset: {
      url: string
    }
  },
  postedBy: {
    _id: string,
    userName: string,
    image: string,
  },
  save: any,
}
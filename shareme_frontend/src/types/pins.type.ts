import { User } from "./user.type";

export interface PinInterface {
  _id: string,
  destination: string,
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
  save: { postedBy: User, userId: string }[] | null,
}
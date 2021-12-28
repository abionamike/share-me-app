import { User } from "./user.type";

export interface PinInterface {
  _id: string,
  title: string,
  about: string,
  category: string,
  comments: { postedBy: User, comment: string }[] | null,
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
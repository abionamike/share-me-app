import { useEffect, useState } from "react"
import { GoogleLogout } from "react-google-login"
import { AiOutlineLogout } from 'react-icons/ai'
import { useNavigate, useParams } from "react-router-dom"
import { client } from "../client"
import { userCreatedPinsQuery, userQuery, userSavedPinsQuery } from "../utils/data"
import MasonryLayout from "./MasonryLayout"
import Spinner from "./Spinner"

const UserProfile = () => {
  const navigate = useNavigate();
  const { userId } = useParams();

  const [user, setUser] = useState(null);
  const [pins, setPins] = useState(null);
  const [text, setText] = useState('created');
  const [activeBtn, setActiveBtn] = useState('created');

  if(!user) return <Spinner message="Loading profile..." />
  return (
    <div>
      UserProfile
    </div>
  )
}

export default UserProfile

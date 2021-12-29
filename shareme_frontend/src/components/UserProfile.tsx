import { useEffect, useState } from "react"
import { GoogleLogout } from "react-google-login"
import { AiOutlineLogout } from 'react-icons/ai'
import { useNavigate, useParams } from "react-router-dom"
import { client } from "../client"
import { PinInterface } from "../types/pins.type"
import { User } from "../types/user.type"
import { userCreatedPinsQuery, userQuery, userSavedPinsQuery } from "../utils/data"
import MasonryLayout from "./MasonryLayout"
import Spinner from "./Spinner"

const randomImg = 'https://source.unsplash.com/1600x900/?nature,photography,technology';
const activeBtnStyles = 'bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none'
const notActiveBtnStyles = 'bg-primary text-black mr-4 font-bold p-2 rounded-full w-20 outline-none'

const UserProfile = () => {
  const navigate = useNavigate();
  const { userId } = useParams();

  const [user, setUser] = useState<User | null>(null);
  const [pins, setPins] = useState<PinInterface[] | null>(null);
  const [text, setText] = useState('created');
  const [activeBtn, setActiveBtn] = useState('created');

  useEffect(() => {
    const query = userId && userQuery(userId);

    if(query) {
      client.fetch(query)
        .then((data) => setUser(data[0]))
    }
  }, [userId]);

  useEffect(() => {
    if(userId) {
      if(text === 'created') {
        const createdPinsQuery = userCreatedPinsQuery(userId)
  
        client.fetch(createdPinsQuery)
          .then((data) => setPins(data));
      } else {
        const savedPinsQuery = userSavedPinsQuery(userId)
  
        client.fetch(savedPinsQuery)
          .then((data) => setPins(data));
      }
    }
  }, [text, userId]);

  const logout = () => {
    localStorage.clear();

    navigate('/login');
  }

  if(!user) return <Spinner message="Loading profile..." />

  return (
    <div className="relative pb-2 h-full justify-center items-center">
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          <div className="flex flex-col justify-center items-center">
            <img src={randomImg} className="w-full h-370 xl:h-510 shadow-lg object-cover" alt="banner pic" />
            <img src={user.image} className="rounded-full w-20 h-20 -mt-10 shadow-xl object-cover" alt="" />
            <h1 className="font-bold text-3xl text-center mt-3">{user.userName}</h1>
            <div className="absolute top-0 z-1 right-0 p-2">
              {userId === user._id && (
                <GoogleLogout 
                  clientId={process.env.REACT_APP_GOOGLE_API_TOKEN || ''}
                  render={(renderProps) => (
                    <button 
                      type='button' 
                      className='bg-white p-2 rounded-full cursor-pointer outline-none shadow-md'
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                    >
                      <AiOutlineLogout color="red" fontSize={21} />
                    </button>
                  )}
                  onLogoutSuccess={logout}
                />
              )}
            </div>
          </div>
          <div className="text-center mb-7 mt-3">
            <button
              type="button"
              onClick={(e) => {
                setActiveBtn('created');
                setText('created');
              }}
              className={`${activeBtn === 'created' ? activeBtnStyles : notActiveBtnStyles}`}
            >
              Created
            </button>
            <button
              type="button"
              onClick={(e) => {
                setActiveBtn('saved');
                setText('saved');
              }}
              className={`${activeBtn === 'saved' ? activeBtnStyles : notActiveBtnStyles}`}
            >
              Saved
            </button>
          </div>
          {pins?.length ? (
            <div className="px-2">
              <MasonryLayout pins={pins} />
            </div>
          ) : (
            <div className="flex justify-center font-bold items-center w-full text-xl mt-2">No pins found!</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserProfile

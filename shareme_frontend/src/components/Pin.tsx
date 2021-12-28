import { useCallback, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { urlFor, client } from "../client"
import { PinInterface } from "../types/pins.type"
import { v4 as uuidv4 } from 'uuid'
import { MdDownloadForOffline } from 'react-icons/md'
import { AiTwotoneDelete } from 'react-icons/ai'
import { BsFillArrowUpCircleFill, BsFillArrowUpRightCircleFill } from 'react-icons/bs'
import { userInfo } from "../utils/fetchUser"

const Pin = ({ pin: { postedBy, _id, image, destination, save }, className }: { pin: PinInterface, className: string }) => {
  const navigate = useNavigate();

  const [postHovered, setPostHovered] = useState(false);

  const alreadySaved = !!(save?.filter((item) => item.postedBy?._id === userInfo.googleId))?.length;

  const savePin = (id: string) => {
    if(!alreadySaved) {
      client
        .patch(id)
        .setIfMissing({ save: [] })
        .insert('after', 'save[-1]', [{
          _key: uuidv4(),
          userId: userInfo.googleId,
          postedBy: {
            _type: postedBy,
            _ref: userInfo.googleId
          }
        }])
        .commit()
        .then(() => {
          window.location.reload();
        })
    }
  }

  const deletePin = (id: string) => {
    client
      .delete(id)
      .then(() => {
        window.location.reload();
      })
  }

  return (
    <div className="m-2">
      <div 
      className="relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
        onMouseEnter={() => setPostHovered(true)} 
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => navigate(`/pin-detail/${_id}`)}
      >
        <img src={urlFor(image.asset.url).width(250).url()} alt="user-post" className="rounded-lg w-full" />
        {postHovered && (
          <div className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pb-2 pt-2 z-50" style={{ height: '100%' }}>  
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <Link 
                  to={`/${image.asset.url}`} 
                  download 
                  onClick={(e) => e.stopPropagation()} 
                  className="bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
                >
                  <MdDownloadForOffline />
                </Link>
              </div>

              {alreadySaved ? (
                <button 
                  type="button" 
                  className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold text-base rounded-3xl outline-none px-5 py-1 hover:shadow-md"
                >
                  {save?.length} Saved
                </button>
              ) : (
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    savePin(_id);
                  }} 
                  type="button" 
                  className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold text-base rounded-3xl outline-none px-5 py-1 hover:shadow-md">
                    Save
                  </button>
              )}
            </div>
            <div className="flex justify-between items-center gap-2 w-full">
              {destination && (
                <Link to={`/${destination}`} target={'_blank'} rel="noreferer" className="flex bg-white items-center gap-2 p-2 px-4 font-bold text-black rounded-full opacity-70 hover:opacity-100 hover:shadow-md">
                  <BsFillArrowUpCircleFill /> {destination.length > 20 ? destination.slice(8, 20) : destination.slice(8)}
                </Link>
              )}
              {postedBy._id === userInfo.googleId && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deletePin(_id);
                  }}
                  type="button" 
                  className="bg-white p-2 opacity-70 hover:opacity-100 text-dark font-bold text-base rounded-3xl outline-none hover:shadow-md"
                >
                  <AiTwotoneDelete />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      
      <Link to={`/user-profile/${postedBy?._id}`} className="flex gap-2 mt-2 items-center">
        <img src={postedBy?.image} className="w-8 h-8 rounded-full object-cover" alt="user-profile" />
        <p className="font-semibold capitalize">{postedBy.userName}</p>
      </Link>
    </div>
  )
}

export default Pin

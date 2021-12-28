import { ChangeEvent, ChangeEventHandler, useState } from "react"
import { User } from "../types/user.type"
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { MdDelete } from 'react-icons/md'
import { useNavigate } from "react-router-dom"
import { client } from "../client"
import Spinner from "./Spinner"
import { categories } from "../utils/data"
import { SanityImageAssetDocument } from "@sanity/client"

const CreatePin = ({ user }: { user: User | null }) => {
  const navigate = useNavigate();
  // Spinner
  const [title, setTitle] = useState('');
  const [about, setAbout] = useState('');
  const [destination, setDestination] = useState('');
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState(null);
  const [category, setCategory] = useState(null);
  const [imageAsset, setImageAsset] = useState<SanityImageAssetDocument | null>(null);
  const [wrongImageType, setWrongImageType] = useState(false);

  const uploadImage = (e: ChangeEvent<HTMLInputElement>) => {

    if(e.target.files) {
      const { type, name } = e.target.files[0];

      if(type === 'image/png' || type === 'image/svg' || type === 'image/jpeg' || type === 'image/jpg' || type === 'image/gif' ||  type === 'image/tiff') {
        setWrongImageType(false);
        setLoading(true);

        client.assets.upload('image', e.target.files[0], { contentType: type, filename: name })
          .then((doc) => {
            setImageAsset(doc)
            setLoading(false)
          })
          .catch((err) => {
            console.log('Image upload error', err)
          })
      } else {
        setWrongImageType(true);
      }
    }
  }

  return (
    <div className="flex flex-col justify-center items-center mt-5 lg:h-4/5">
      {fields && (
        <p className="text-red-500 p-5 text-xl transition-all duration-150 ease-in">Pls fill in all the fields</p>
      )}
      <div className="flex lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3 w-full lg:w-4/5">
        <div className="bg-secondaryColor p-3 flex flex-0.7 w-4">
          <div className="flex justify-center items-center flex-col border-dotted border-2 border-gray-300 p-3 w-full h-420">
            {loading && (<Spinner />)}
            {wrongImageType && (<p>Wrong image type</p>)}
            {!imageAsset ? (
              <label>
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="flex flex-col justify-center items-center">
                    <p className="font-bold text-2xl cursor-pointer">
                      <AiOutlineCloudUpload />
                    </p>
                    <p className="text-lg">Click to upload</p>
                  </div>
                  <p className="mt-32 text-gray-400 text-xs md:text-sm lg:text-base">Use high-quality JPG, SVG, PNG or GIF less than 20MB</p>
                </div>

                <input type="file" name="upload-image" onChange={uploadImage} className="w-0 h-0" />
              </label>
            ) : (
              <div className="relative h-full">
                <img src={imageAsset.url} alt="uploaded pic" className="h-full w-full" />
                <button
                  type="button"
                  className="absolute bottom-3 right-3 p-3 rounded-full bg-white cursor-pointer text-xl outline-none hover:shadow-md transition-all duration-500 ease-in-out"
                  onClick={() => setImageAsset(null)}
                >
                  <MdDelete />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full">
          <input  
            type="text"  
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add your title here"
            className="outline-none text-2xl sm:text-3xl font-bold border-b-2 border-gray-200 p-2"
          />
        </div>
      </div>
    </div>
  )
}

export default CreatePin

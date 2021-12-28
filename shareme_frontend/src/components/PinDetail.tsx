import { User } from "../types/user.type"
import { MdDownloadForOffline } from 'react-icons/md'
import { Link, useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { client, urlFor } from "../client"
import { useEffect, useState } from "react"
import MasonryLayout from "./MasonryLayout"
import { pinDetailMorePinQuery, pinDetailQuery } from "../utils/data"
import Spinner from "./Spinner"

const PinDetail = ({ user }: { user: User | null }) => {
  const [pins, setPins] = useState(null);
  const [pinDetail, setPinDetail] = useState(null);
  const [comment, setComment] = useState('');
  const [addingComment, setAddingComment] = useState(false);

  const { pinId } = useParams();

  
  const fetchPinDetails = () => {
    let query = pinId && pinDetailQuery(pinId);
    
    if(query) {
      client.fetch(query)
      .then((data) => {
        setPinDetail(data[0]);
        
        if(data[0]) {
          query = pinDetailMorePinQuery(data[0]);
          
          client.fetch(query)
          .then((res) => setPins(res))
        }
      })
    }
  }
  
  useEffect(() => {
    fetchPinDetails();
  }, [pinId])
  
  if(!pinDetail) return <Spinner message="Loading pin..." />

  return (
    <div className="flex xl:flex-row flex-col m-auto bg-white" style={{ maxWidth: '1500px', borderRadius: '32px' }}>
      <div className="flex justify-center items-center md:items-start flex-initial">
      </div>
    </div>
  )
}

export default PinDetail

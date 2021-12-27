import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { client } from "../client"
import Pins from "../container/Pins";
import { feedQuery, searchQuery } from "../utils/data";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";

const Feed = () => {
  const [loading, setLoading] = useState(false);
  const [pins, setPins] = useState(null)
  const { categoryId } = useParams(); 

  useEffect(() => {
    setLoading(true);

    if(categoryId) {
      const query = searchQuery(categoryId);

      client.fetch(query)
        .then((data) => {
          console.log(data, 'first')
          setPins(data);
          setLoading(false);
        })
    } else {
      client.fetch(feedQuery)
        .then((data) => {
          console.log(data, 'second')
          setPins(data);
          setLoading(false);
        })
    }
  }, [categoryId]);

  if(loading) return <Spinner message="We are adding new ideas to your feed!" />

  return (
    <div>
      {/* Feed */}
      {pins && <MasonryLayout pins={pins} />}
    </div>
  )
}

export default Feed

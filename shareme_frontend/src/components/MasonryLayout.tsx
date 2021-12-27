import Masonry from "react-masonry-css"
import { PinInterface } from "../types/pins.type"
import Pin from "./Pin"

const breakPointObj = {
  default: 4,
  3000: 6,
  2000: 5, 
  1200: 3,
  1000: 2,
  500: 1
}

const MasonryLayout = ({ pins }: { pins: PinInterface[] | null }) => {
  // Masonry
  return (
    <div>
      <Masonry className="flex animate-slide-fwd" breakpointCols={breakPointObj}> 
        {pins?.map((pin) => (
          <Pin key={pin._id} pin={pin} className="w-max" />
        ))}
      </Masonry>
    </div>  
  )
}

export default MasonryLayout

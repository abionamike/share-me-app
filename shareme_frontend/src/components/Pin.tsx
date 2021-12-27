import { urlFor } from "../client"
import { PinInterface } from "../types/pins.type"

const Pin = ({ pin, className }: { pin: PinInterface, className: string }) => {
  return (
    <div>
      <img src={urlFor(pin.image.asset.url).width(250).url()} alt="user-post" className="rounded-lg w-full" />
    </div>
  )
}

export default Pin

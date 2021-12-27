import Loader from "react-loader-spinner"

const Spinner = ({ message }: { message: string }) => {
  
  return (
    <div className="flex flex-col justify-center items-center w-full h-full p-5">
      <Loader type="Circles" color="#00bfff" height={50} width={200} />
      <p className="text-lg text-center px-2 my-5">{message}</p>
    </div>
  )
}

export default Spinner

import { Dispatch, SetStateAction } from "react"

interface SearchProp { searchTerm: string, setSearchTerm: Dispatch<SetStateAction<string>>}

const Search = ({ searchTerm, setSearchTerm }: SearchProp) => {
  return (
    <div>
      Search
    </div>
  )
}

export default Search

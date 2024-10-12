import { SearchRounded } from '@mui/icons-material'
import './search.scss'

const Search = () => {
  return (
    <div className='search'>
        <SearchRounded className='icon'/>
        <input type="text" placeholder='Search...'/>
    </div>
  )
}

export default Search
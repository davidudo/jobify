import { FormRow, FormRowSelect } from '.'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/SearchContainer'

const SearchContainer = () => {
  const {
    isLoading,
    search,
    searchStatus,
    searchType,
    sort,
    sortOptions,
    statusOptions,
    jobTypeOptions,
    handleChange,
    clearFilters
  } = useAppContext()

  const handleSearch = (e) => {
    if (isLoading) return
    handleChange({
      name: e.target.name,
      value: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    clearFilters()
  }

  return (
    <Wrapper>
      <form className="form">
        <h4>Search Form</h4>
        {/* search position */}
        <div className="form-center">
          <FormRow type="text" name="search" value={search} handleChange={handleSearch}></FormRow>

          {/* search by status */}
          <FormRowSelect
            labelText="Job Status"
            name="searchStatus"
            value={searchStatus}
            handleChange={handleSearch}
            list={['all', ...statusOptions]}
          ></FormRowSelect>

          {/* search by type */}
          <FormRowSelect
            labelText="Type"
            name="searchType"
            value={searchType}
            handleChange={handleSearch}
            list={['all', ...jobTypeOptions]}
          ></FormRowSelect>

          {/* sort */}
          <FormRowSelect
            labelText="sort"
            name="sort"
            value={sort}
            handleChange={handleSearch}
            list={sortOptions}
          ></FormRowSelect>

          <button className="btn btn-block btn-danger" disabled={isLoading} onClick={handleSubmit}>
            Clear Values
          </button>
        </div>
      </form>
    </Wrapper>
  )
}

export default SearchContainer

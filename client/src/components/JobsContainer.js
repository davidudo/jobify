import { useAppContext } from '../context/appContext'
import { useEffect } from 'react'
import Loading from './Loading'
import Job from './Job'
import PageBtnContainer from './PageBtnContainer'
import Wrapper from '../assets/wrappers/JobsContainer'

const JobsContainer = () => {
  const { getJobs, jobs, isLoading, page, numOfPages, totalJobs, search, searchStatus, searchType, sort } =
    useAppContext()

  useEffect(() => {
    getJobs()
    // eslint-disable-next-line
  }, [page, search, searchStatus, searchType, sort])

  if (isLoading) {
    return <Loading center />
  }

  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <h5>
        {totalJobs} Job{jobs.length > 1 && 's'} Found
      </h5>

      <div className="jobs">
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />
        })}
      </div>

      {/* pagination buttons */}
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  )
}

export default JobsContainer

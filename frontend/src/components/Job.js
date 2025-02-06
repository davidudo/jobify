import moment from 'moment'
import { Link } from 'react-router-dom'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/Job'
import JobInfo from './JobInfo'
import { 
  FaLocationArrow, 
  FaBriefcase, 
  FaCalendarAlt
} from 'react-icons/fa'

const Job = ({
  _id,
  position,
  company, 
  jobLocation,
  jobType,
  createdAt,
  createdBy,
  status,
}) => {
  const { setEditJob, deleteJob } = useAppContext()
  
  let date = moment(createdAt)
  date = date.format('MMM Do, YYYY')

  const userId = JSON.parse(localStorage.getItem('user'))._id

  return (
    <Wrapper>
      <header>
        <div className='main-icon'>{ company.charAt(0) }</div>
        <div className='info'>
          <h5>{ position }</h5>
          <p>{ company }</p>
        </div>
      </header>
      <div className='content'>
        <div className='content-center'>
          <JobInfo icon={<FaLocationArrow />} text={ jobLocation } />
          <JobInfo icon={<FaCalendarAlt />} text={ date } />
          <JobInfo icon={<FaBriefcase />} text={ jobType } />
          <div className={ `status ${ status }` }>
            { status }
          </div>
        </div>
        <footer>
          {userId === createdBy ? (
            <div className='actions'>
              <Link
                to='/add-job'
                className='btn edit-btn'
                onClick={() => setEditJob(_id)}
              >
                Edit
              </Link>
              <button
                type='button'
                className='btn delete-btn'
                onClick={() => deleteJob(_id)}
              >
                Delete
              </button>
            </div>
          ) : null }
        </footer>
      </div>
    </Wrapper>
  )
}

export default Job
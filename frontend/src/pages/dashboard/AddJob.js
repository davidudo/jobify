import { FormRow, Alert, FormRowSelect } from '../../components'
import { useAppContext } from '../../context/appContext'
import Wrapper from '../../assets/wrappers/DashboardFormPage'

const AddJob = () => {
  const {
    isLoading,
    isEditing,
    showAlert,
    displayAlert,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    handleChange,
    clearValues,
    createJob,
    editJob,
  } = useAppContext()
  
  const handleSubmit = (e) => {
    e.preventDefault()
    
    // remove while testing
    if (!position || !company || !jobLocation) {
      displayAlert()
      return
    }
    if (isEditing) {
      editJob()
      return
    }
    createJob()
    // console.log('create job')
  }
  
  const handleJobInput = (e) => {
    handleChange({ 
      name: e.target.name, 
      value: e.target.value
    })
    // console.log(`${ name }: ${ value }`)
  }
  
  return (
    <Wrapper>
      <form className='form'>
        <h3>{ isEditing ? 'Edit Job' : 'Add Job' }</h3>
        { showAlert && <Alert /> }
        
        <div className='form-center'>
          {/* position */}
          <FormRow 
            type='text' 
            name='position' 
            value={ position }
            handleChange={ handleJobInput }
          />
          
          {/* company */}
          <FormRow 
            type='text' 
            name='company' 
            value={ company }
            handleChange={ handleJobInput }
          />
          
          {/* location */}
          <FormRow 
            labelText='Job Location'
            type='text' 
            name='jobLocation' 
            value={ jobLocation }
            handleChange={ handleJobInput }
          />
          
          {/* job status */}
          <FormRowSelect 
            labelText='Status' 
            name='status' 
            value={ status }
            handleChange={ handleJobInput }
            list={ statusOptions }
          />
          
          {/* job type */}
          <FormRowSelect 
            labelText='Job Type' 
            name='jobType' 
            value={ jobType }
            handleChange={ handleJobInput }
            list={ jobTypeOptions }
          />
        
          <div className='btn-container'>
            <button 
              className='btn btn-block submit-btn' 
              type='submit' 
              onClick={ handleSubmit }
              disabled={ isLoading }
            >
              Submit
            </button>
            
            <button 
              className='btn btn-block clear-btn' 
              onClick={(e) => {
                e.preventDefault()
                clearValues()
              }}
            >
              Clear
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  )
}

export default AddJob
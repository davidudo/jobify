import { Link } from 'react-router-dom'
import img from '../assets/images/not-found.svg'
import Wrapper from '../assets/wrappers/ErrorPage'

const ErrorPage = () => {
  return (
    <Wrapper className="full-page">
      <div>
        <img src={ img } alt="Not Found" />
        <h3>Ops! Page Not Found</h3>
        <p>We can't seem to find the page you're looking for</p>
        <Link to="/">Back Home</Link>
      </div>
    </Wrapper>
  )
}

export default ErrorPage
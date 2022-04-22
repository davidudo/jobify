import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { RegisterPage, LandingPage, ErrorPage, ProtectedRoute } from './pages'
import {
  AllJobs,
  Profile,
  SharedLayout,
  Stats,
  AddJob,
} from './pages/dashboard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ 
          <ProtectedRoute>
            <SharedLayout /> 
          </ProtectedRoute>
        }>
          <Route index element={ <Stats /> } />
          <Route path="all-jobs" element={ <AllJobs /> } />
          <Route path="add-job" element={ <AddJob /> } />
          <Route path="profile" element={ <Profile /> } />
        </Route>
        <Route path="/register" element={ <RegisterPage /> } />
        <Route path="/landingpage" element={ <LandingPage /> } />
        <Route path="*" element={ <ErrorPage /> } />
      </Routes>
    </BrowserRouter>
  )
}

export default App;

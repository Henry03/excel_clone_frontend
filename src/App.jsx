import { useState } from 'react'
import './App.css'
import Navbar from './component/navbar/Navbar'
import Sidebar from './component/sidebar/sidebar'
import Spreadsheet from './component/spreadsheet/Spreadsheet'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'
import Cookies from 'js-cookie'

function App() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const login = (e) => {
    e.preventDefault()
    
    setIsLoading(true);
    const input = {
      username: username,
      password: password
    }
    axios.post('/login', input)
    .then((res) => {
      Cookies.set('token', res.data.data.token);
      setIsLoading(false)
      document.getElementById('login_modal').close()
      toast.success('Login Success')
    })
    .catch((err) => {
      setError(err.response.data.message)
      setIsLoading(false)
    })
  }
  return (
    <>
      <Navbar/>
      <Sidebar children={<Spreadsheet/>}/>
      
      <dialog id="login_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Login</h3>
          <form onSubmit={(e) => login(e)}>
              <div className="mb-4">
                  <label className="form-control mt-5 w-full">
                      <div className="label">
                          <span className="label-text">Username</span>
                      </div>
                      <input type="text" name='username' placeholder="Input Username" className="input input-bordered w-full mb-3" onChange={(e)=>setUsername(e.target.value)}/>
                      <div className="label">
                          <span className="label-text">Password</span>
                      </div>
                      <input type="password" name='password' placeholder="Input Password" className="input input-bordered w-full" onChange={(e)=>setPassword(e.target.value)}/>
                      {
                          error && 
                          <div className="label">
                              <span className="label-text-alt text-red-500">{error}</span>
                          </div>
                      }
                      
                  </label>
              </div>

              {/* <ErrorText styleClass="mt-8">{errorMessage}</ErrorText> */}
              {/* <button type="submit" className={"btn mt-2 w-full btn-primary" + (loading ? " loading" : "")}>Login</button> */}
            <div className="modal-action grid grid-flow-col grid-cols-2">
              <form method="dialog">
                <button className="btn w-full">Close</button>
              </form>
              <button className="btn btn-primary " disabled={isLoading}>Login</button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
      <Toaster
          position='top-right'
      />
    </>
    
  )
}

export default App

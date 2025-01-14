import { useState } from 'react'
import homeBg from '../../../assets/imgs/home-bg.jpg'
import { Link } from 'react-router-dom'
function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/

  const handleInput = (e) => {
    const value = e.target.value
    setEmail(value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!email && !password) {
      setError('Both fields are required.')
      return
    }

    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    setError('')
  }
  const isValid = !error && emailRegex.test(email) && password

  return (
    <main>
      <div className='fixed top-0 -z-10 w-full h-full'>
        <img src={homeBg} alt="background" className='w-full h-full object-cover brightness-40' />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/70"></div>
      </div>
      <div className="bg-[#0000009c] h-[580px] max-w-[450px] mx-auto p-12 mt-8">
        <h1 className='text-white text-3xl font-semibold pb-6'>Sign In</h1>
        <div className='flex flex-col gap-4'>
          <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <div className='relative'>
              <input
                type="text"
                value={email}
                onChange={handleInput}
                placeholder="Email address"
                className={`${error && 'border-red-700'} peer focus:outline-2 outline-offset-2 h-[55px] pl-3 rounded-[.3rem] bg-[#191919b2] text-white border-[#dddddd4c] border-[1px] w-full 
                placeholder:text-transparent focus:pt-6 focus:pb-6 py-2 `}
              />
              <label
                className=" absolute top-1 left-0 p-3 pl-5 h-full text-white text-sm truncate pointer-events-none transition-all ease-in-out duration-100
        origin-[0_0] peer-focus:scale-90  peer-focus:-translate-y-4 peer-focus:text-gray-400 
        peer-[:not(:placeholder-shown)]:scale-90   peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:text-gray-400"
              >
                Email address
              </label>
            </div>
            <div className='relative'>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className={`${error && 'border-red-700'} peer focus:outline-2 outline-offset-2 h-[55px] pl-3 rounded-[.3rem] bg-[#191919b2] text-white border-[#dddddd4c] border-[1px] w-full 
                placeholder:text-transparent focus:pt-6 focus:pb-6 py-2 `}
              />
              <label
                className=" absolute top-1 left-0 p-3 pl-5 h-full text-white text-sm truncate pointer-events-none transition-all ease-in-out duration-100
        origin-[0_0] peer-focus:scale-90  peer-focus:-translate-y-4 peer-focus:text-gray-400 
        peer-[:not(:placeholder-shown)]:scale-90   peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:text-gray-400"
              >
                Password
              </label>
            </div>
            {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
            {isValid ? (
              <Link to={'/account'} type="submit" className='bg-red-600 flex justify-center items-center h-[42px] font-semibold text-white rounded-md'>
                Sign in
              </Link>
            ) : (
              <button className='bg-red-600 flex justify-center items-center h-[42px] font-semibold text-white rounded-md'>
                Sign in
              </button>
            )}
          </form>
          <p className='text-white text-center'>OR</p>
          <button className='bg-[#a8a8a846] h-[42px] font-semibold text-white rounded-md'>
            Use a Sign-In Code
          </button>
          <p className='text-[#ddd] text-sm text-center'>Forgot password?</p>
          <label className='text-white text-sm'><input type="checkbox" /> Remember me</label>
          <p className='text-[#ddd] text-sm'>New to Netflix? <span className='font-bold text-white'>Sign up now.</span></p>
          <p className='text-[#ddd] text-xs'>This page is protected by Google reCAPTCHA to ensure you're not a bot. Learn more.</p>
        </div>
      </div>
    </main>
  )
}

export default Login
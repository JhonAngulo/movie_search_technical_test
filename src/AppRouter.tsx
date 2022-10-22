import LoginLayout from '@containers/LoginLayout'
import MainLayout from '@containers/MainLayout/MainLayout'
import Devices from '@pages/Devices'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useRef } from 'react'
import { tokenLogin } from '@store/actions/auth'
import Home from '@pages/Home'
import About from '@pages/About'
import Settings from '@pages/Settings'

const AppRouter = (): JSX.Element => {
  const user = useSelector((state: any) => state.user)
  const token = localStorage.getItem('token')
  const refreshToken = localStorage.getItem('refreshToken')
  const checkTokens = useRef(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (token !== null && refreshToken !== null && !checkTokens.current) {
      checkTokens.current = true
      dispatch(tokenLogin({ token, refreshToken }))
    }
  }, [])

  useEffect(() => {
    if (user.status !== 'loading' && !checkTokens.current) {
      if (!(user.isAuth as boolean)) {
        navigate('/login')
      }
    }

    if (user.status === 'succeeded' && (user.isAuth as boolean)) {
      const validPathnames = ['/acerca', '/configuraciones', '/dispositivos']
      if (validPathnames.includes(location.pathname)) {
        navigate(location.pathname)
      } else {
        navigate('/')
      }
    }
  }, [user])

  if (user.status === 'loading') {
    return <>loading...</>
  }

  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginLayout />} />
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/acerca" element={<About />} />
          <Route path="/configuraciones" element={<Settings />} />
          <Route path="/dispositivos" element={<Devices />} />
        </Route>
      </Routes>
    </>
  )
}

export default AppRouter

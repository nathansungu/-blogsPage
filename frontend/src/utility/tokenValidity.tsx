import { useEffect } from 'react'
import useUserStore from '../store/userStates'
import axiosInstance from '../api/axios'

const AuthChecker = () => {
  const { setUser } = useUserStore()

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const response = await axiosInstance.get('auth/me')
        const { data } = response.data  
        setUser(data) 
      } catch (e) {
        setUser(null) 
      }
    }

    checkLogin()
  }, [setUser])

  return 
}

export default AuthChecker

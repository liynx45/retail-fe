import { Outlet, useLocation, useNavigate } from 'react-router-dom'
function AuthLayout() {

  return (
    <div
      className='min-h-screen w-full flex items-center justify-center'
    >
      <Outlet />
    </div>
  )
}

export default AuthLayout

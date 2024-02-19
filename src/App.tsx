import Redirect from './components/Redirect';
import { useSession } from './context/AuthProvider';
import { AppDispatch } from './libs/redux/store';
import AddRoom from './pages/admin/AddRoom';
import AnalyticFinance from './pages/admin/Finance/AnalyticFinance';
import Facility from './pages/admin/Room/Facility';
import Finance from './pages/admin/Finance';
import HistoryPayment from './pages/admin/Payment/HistoryPayment';
import Payment from './pages/admin/Payment';
import Rooms from './pages/admin/Rooms';
import Users from './pages/admin/Users';
import { fetchCompany } from './services/redux';
import { USER_ROLE } from './constants/status_code';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Setting from './pages/admin/Setting';
import SettingUser from './pages/admin/Setting/SettingUser';
import SettingPassword from './pages/admin/Setting/SettingPassword';
import SettingVerify from './pages/admin/Setting/SettingVerify';
import SettingCompany from './pages/admin/Setting/SettingCompany';
import Dashbord from './pages/admin/Dashbord';
import HomePage from './pages/home/HomePage';
import Contact from './pages/home/Contact';
import Room from './pages/home/Room';
import Order from './pages/home/Order';
import About from './pages/home/About';
import { AuthLayout, DashbordLayout, SettingLayout } from './components/layouts';
import { Login, Register } from './components/auth';
import { NavBar } from './components/navbar';

const privateRoute = (access: number[], role: number) => {
  if (access.includes(role)) {
    return true
  } else {
    return false
  }
};

function App() {

  // const router = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: <MiddlewareProvider />,
  //     children: [
  //       {
  //         index: true,
  //         element: <HomePage />
  //       },
  //       {
  //         path: "auth",
  //         element: <AuthLayout />,
  //         children: [
  //           {
  //             path: "login",
  //             element: <Login />
  //           },
  //           {
  //             path: "register",
  //             element: <Regitser />
  //           }
  //         ]
  //       },
  //       {
  //         path: "contact",
  //         element: <Contact />
  //       },
  //       {
  //         path: "rooms",
  //         element: <Room />
  //       },
  //       {
  //         path: "about",
  //         element: <About />
  //       },
  //       {
  //         path: "dashboard",
  //         element: <DashbordLayout />,
  //         children: [
  //           {
  //             index: true,
  //             element: <Dahsbord />
  //           },
  //           {
  //             path: "masteruser",
  //             element: <MasterUser />
  //           },
  //           {
  //             path: "rooms",
  //             children: [
  //               {
  //                 index: true,
  //                 element: <ListRoomDashbord />
  //               },
  //               {
  //                 path: "addrooms",
  //                 element: <AddRoom />
  //               }
  //             ]
  //           },
  //           {
  //             path: "payment",
  //             children: [
  //               {
  //                 index: true,
  //                 element: <Paymnet />
  //               },
  //               {
  //                 path: "history",
  //                 element: <PaymentHistory />
  //               }
  //             ]
  //           }
  //         ]
  //       }
  //     ]
  //   }
  // ])

  const { pathname } = useLocation()
  const { user } = useSession()
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchCompany())
  }, [])
  
  return (
    <>
      {!pathname.startsWith("/auth") && !pathname.startsWith("/dashboard") && <NavBar />}
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path="kontak" element={<Contact />} />
        <Route path="ruang" >
          <Route index element={<Room />} />
          <Route path=':orderId' element={<Order />} />
        </Route>
        <Route path="tentang" element={<About />} />
        <Route path="auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="dashboard" element={<DashbordLayout />}>
          <Route index element={<Dashbord />} />
          {
            privateRoute([USER_ROLE.ADMIN], user?.role!) ?
              <Route path="user" element={<Users />} /> :
              <Route path='user' element={<Redirect to="/dashboard" />} />
          }
          <Route path="ruang">
            {
              privateRoute([USER_ROLE.ADMIN], user?.role!) ?
                <>
                  <Route index element={<Rooms />} />
                  <Route path="tambah" element={<AddRoom />} />
                  <Route path='fasilitas' element={<Facility />} />
                </> :
                <Route index element={<Redirect to="/dashboard" />} />
            }
          </Route>
          <Route path="pembayaran">
            <Route index element={<Payment />} />
            <Route path="riwayat" element={<HistoryPayment />} />
          </Route>
          <Route path='keuangan'>
            {
              privateRoute([USER_ROLE.ADMIN], user?.role!) ?
                <>
                  <Route index element={<Finance />} />
                  <Route path='analisis' element={<AnalyticFinance />} />
                </> :
                <Route index element={<Redirect to="/dashboard" />} />
            }
          </Route>
          <Route path='setelan' element={<SettingLayout />}>
            <Route index element={<Setting />} />
            <Route path='user' element={<SettingUser />} />
            <Route path='password' element={<SettingPassword />} />
            <Route path='verifikasi' element={<SettingVerify />} />
            <Route path='company' element={<SettingCompany />} />
          </Route>
        </Route>
      </Routes>
    </>

  );
}

export default App;

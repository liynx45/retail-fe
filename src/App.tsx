import React, { useEffect } from 'react';
import { Route, RouteProps, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useUser } from './hooks/useUser';
import HomePage from './pages/views/HomePage';
import Contact from './pages/views/Contact';
import Room from './pages/views/Room';
import About from './pages/views/About';
import AuthLayout from './components/layouts/AuthLayout';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import DashbordLayout from './components/layouts/DashbordLayout';
import Dashbord from './pages/dashbord/Dashbord';
import Users from './pages/dashbord/Users';
import Rooms from './pages/dashbord/Rooms';
import AddRoom from './pages/dashbord/AddRoom';
import Payment from './pages/dashbord/Payment';
import Finance from './pages/dashbord/Finance';
import AnalyticFinance from './pages/dashbord/AnalyticFinance';
import NavBar from './components/navbar/NavBar';
import HistoryPayment from './pages/dashbord/HistoryPayment';
import Redirect from './components/Redirect';
import Facility from './pages/dashbord/Facility';
import { user_role } from './utils/code._status';
import SettingLayout from './components/layouts/SettingLayout';
import SettingMain from './pages/dashbord/SettingMain';
import SettingUser from './pages/dashbord/SettingUser';
import SettingPassword from './pages/dashbord/SettingPassword';
import Order from './pages/views/Order';
import SettingVerify from './pages/dashbord/SettingVerify';

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
  //         path: "dashbord",
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

  const location = useLocation()
  const navigate = useNavigate()
  const { status, user } = useUser()

  useEffect(() => {
    if (location.pathname.startsWith("/auth")) {
      if (status === "unauthorized") {
        if (location.pathname !== "/auth/register") {
          navigate("/auth/login")
        }
      } else if (status === "authorized") {
        navigate("/dashbord")
      }
    }

    if (location.pathname.startsWith("/dashbord")){
      if (status === "unauthorized") {
        navigate("/auth/login")
      }
    }
    
    console.log("App Root status :", status)
  }, [location.pathname, status])

  return (
    <>
      {!location.pathname.startsWith("/auth") && !location.pathname.startsWith("/dashbord") && <NavBar />}
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
        <Route path="dashbord" element={<DashbordLayout />}>
          <Route index element={<Dashbord />} />
          {
            privateRoute([user_role.ADMIN], user?.role!) ?
              <Route path="user" element={<Users />} /> :
              <Route path='user' element={<Redirect to="/dashbord" />} />
          }
          <Route path="ruang">
            {
              privateRoute([user_role.ADMIN], user?.role!) ?
                <>
                  <Route index element={<Rooms />} />
                  <Route path="tambah" element={<AddRoom />} />
                  <Route path='fasilitas' element={<Facility />} />
                </> :
                <Route index element={<Redirect to="/dashbord" />} />
            }
          </Route>
          <Route path="pembayaran">
            <Route index element={<Payment />} />
            <Route path="riwayat" element={<HistoryPayment />} />
          </Route>
          <Route path='keuangan'>
            {
              privateRoute([user_role.ADMIN], user?.role!) ?
                <>
                  <Route index element={<Finance />} />
                  <Route path='analisis' element={<AnalyticFinance />} />
                </> :
                <Route index element={<Redirect to="/dashbord" />} />
            }
          </Route>
          <Route path='setelan' element={<SettingLayout />}>
            <Route index element={<SettingMain />} />
            <Route path='user' element={<SettingUser />} />
            <Route path='password' element={<SettingPassword />} />
            <Route path='verifikasi' element={<SettingVerify />} />
          </Route>
        </Route>
      </Routes>
    </>

  );
}

export default App;

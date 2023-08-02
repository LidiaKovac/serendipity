
import { Outlet } from 'react-router-dom'
import { Navbar } from '../../components/Navbar/Navbar'
import { AlertList } from '../../components/Alert/AlertList/AlertList'
export const Layout = () => {
  return (
    <>
      <Navbar />
      <AlertList/>
      <Outlet />
    </>)
}
import { FC, Fragment } from 'react'
import { Outlet } from 'react-router'

const AppLayout: FC = () => {
  return (
    <Fragment>
      <Outlet />
    </Fragment>
  )
}

export default AppLayout

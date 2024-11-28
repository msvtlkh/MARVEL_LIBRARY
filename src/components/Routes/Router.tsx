import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import styles from './Layout.module.scss'
import HomePage from './Pages/MainPage/App'
import Comics from './Pages/Comics/Comics'
import ComicsCard from './Pages/ComicsCard/ComicsCard'
import CharCard from './Pages/CharCard/CharCard'
import Header from '../Header/Header'

export function Layout() {
  return (
    <div>
      <header className={styles.container}>
        <Header />
      </header>
      <Outlet/>
    </div>
  )
}

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children: [
            { 
                path: '/', 
                element: <HomePage/>, 
            },
            {
                path: ':id',
                element: <CharCard/>
            },
            { 
                path: 'comics', 
                element: <Comics/>,
            },
            {
                path: 'comics/:id',
                element: <ComicsCard/>
            }
        ],
    }
])

export function AppProvider() {
    return <RouterProvider router={router}/>
}
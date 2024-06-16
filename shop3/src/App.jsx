import { createContext, useState } from 'react'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import './App.css'
import Header from './components/header/header'
import Sidebar from './components/sidebar/sidebar'
import ProductsContainer from './components/product_area/product_container'
import CartContainer from './components/cart_page/cart_page'
import AdminSidebar from './components/admin_components/admin_sidebar'
import EditProducts from './components/admin_components/edit_products'

export const CategorContext = createContext()
export const DbUpdatedContext = createContext()

function App() {

  const [category, setCategory] = useState(undefined)
  const [dbUpdated, setDbUpdated] = useState(false)

  return (
    <div className="app-container grid grid-cols-12">
      <CategorContext.Provider value = {[category, setCategory]}>
      <DbUpdatedContext.Provider value = {[dbUpdated,setDbUpdated]}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={[<Header/>,<Sidebar/>,<ProductsContainer/>]}>
          <Route path='/:category' element={[<Header/>,<Sidebar/>,<ProductsContainer/>]}></Route>
          </Route>
          <Route path='/cart' element={[<Header/>,<Sidebar/>,<CartContainer/>]}></Route>
          <Route path='/admin' element={[<AdminSidebar/>,<EditProducts/>]}></Route>
        </Routes>
      </BrowserRouter>
      </DbUpdatedContext.Provider>
      </CategorContext.Provider>

    </div>
  )
}

export default App

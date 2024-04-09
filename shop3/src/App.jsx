import { createContext, useState } from 'react'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import './App.css'
import Header from './components/header/header'
import Sidebar from './components/sidebar/sidebar'
import ProductsContainer from './components/product_area/product_container'
import CartContainer from './components/cart_page/cart_page'

export const CategorContext = createContext()

function App() {

  const [category, setCategory] = useState(undefined)

  return (
    <div className="app-container grid grid-flow-row">
      <CategorContext.Provider value = {[category, setCategory]}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={[<Header/>,<Sidebar/>,<ProductsContainer/>]}>
            <Route path='/:category' element={[<Header/>,<Sidebar/>,<ProductsContainer/>]}></Route>
          </Route>
          <Route path='/cart' element={[<Header/>,<Sidebar/>,<CartContainer/>]}></Route>
        </Routes>
      </BrowserRouter>
      </CategorContext.Provider>

    </div>
  )
}

export default App

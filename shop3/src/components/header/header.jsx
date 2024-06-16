import CartBtn from "./sub_components/cart_btn/cart_btn"
import Nav from "./sub_components/nav/nav"
import SearchBar from "./sub_components/searchbar/searchbar"
import { NavLink } from "react-router-dom"
import logo from './example_logo.png'




export default function Header() {
    return(
        <div className="header-container flex flex-row max-h-fit col-span-12 border-2">
            <img className="h-40" src={logo} alt="logo"/>
            <Nav/>
            <NavLink to={'/cart'}>
                <CartBtn/>
            </NavLink>
            <SearchBar/>   
        </div>
    )
}
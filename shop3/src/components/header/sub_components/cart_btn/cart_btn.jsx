import { Button } from "@/components/ui/button"
import cart_icon from './pictures/cart.svg'


export default function CartBtn() {

    return(
    <div className="header-cart-container flex flex-row items-center justify-end">
        <Button variant="ghost" className="justify-self-end hover:bg-primary">
            <img className="h-5 w-5" src={cart_icon} alt={cart_icon}/>
            <div className="cart-label ml-1">Kosár</div>
        </Button> 
    </div>
    )
}
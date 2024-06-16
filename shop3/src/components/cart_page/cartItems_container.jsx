import { useEffect, useState } from "react"
import axios from 'axios'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { X } from 'lucide-react';

export default function CartItemsContainer() {

    const [cartItems, setCartItems] = useState([])

    useEffect(()=>{
        async function GetCartItems() {
            try{
                const response = await axios.get("http://localhost:8800/cartitems")
                //console.log(response.data)
                setCartItems(response.data)
                }
            catch(err){
                console.log(err)
            }
        }
        GetCartItems()
    },[])

    async function HandleRemoveFromCart(event){
        //console.log(event.target.id)
        try{
         const response = await axios.post("http://localhost:8800/removefromcart" ,{
             /*product_type: category,*/
             product_cart_id: event.target.id,
         })
         //console.log(response.data)
         setCartItems(response.data)
     }catch(err){
         console.log(err)
     }
     }

    return(
        <div className="products-container flex flex-col gap-3 p-4" style={{ width: '48rem' }}>
    <span className="font-bold mb-2">Termékek a kosaradban</span>
    {cartItems.map((item, index) => (
        <div key={index} className="product-card flex items-center border-2 border-accent rounded p-2">
            <div className="flex items-center">
                <img 
                    src={`http://localhost:8800/product_pics/${item.picture}`} 
                    alt='product picture' 
                    className='w-16 h-16 object-scale-down rounded-full ml-2'
                />
                <div className="ml-4 flex flex-row items-center space-x-8">
                    <span>{item.product_name}</span>
                    <span>Bögre színe</span>
                    <span>{item.product_price} Ft</span>
                </div>
            </div>
            <div className="ml-auto">
                <AlertDialog>
                    <AlertDialogTrigger>
                        <X className="w-5 h-5"/>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Törlöd a terméket a kosaradból?</AlertDialogTitle>
                            <AlertDialogDescription className="flex">
                                <img 
                                    src={`http://localhost:8800/product_pics/${item.picture}`} 
                                    alt='product picture' 
                                    className='w-16 h-16 object-scale-down rounded-full'
                                />
                                <div className="self-center font-semibold ml-2 text-black">
                                    {item.product_name}
                                </div>
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Nem</AlertDialogCancel>
                            <AlertDialogAction 
                                id={item.product_id} 
                                className="text-black" 
                                onClick={HandleRemoveFromCart}
                            >
                                Igen
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    ))}
</div>
    )
}
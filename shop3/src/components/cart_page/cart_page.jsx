import { useEffect, useState } from "react"
import CartItemCard from "./sub_components/product_in_cart_card"
import axios from 'axios'
import { Button } from "../ui/button"
import { Cross1Icon } from '@radix-ui/react-icons'
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

export default function CartContainer() {

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
        <div className="products-container w-full flex flex-col gap-3">
            {cartItems.map((item)=>
    
            <div key={cartItems.indexOf(item)} className="prduct-card h-32 w-64 border-2 border-accent rounded">
                <div className="grid grid-cols-5 grid-rows-5">
                    <div className="col-span-2 row-span-3 ml-2 max-w-fit h-32 flex items-center ">
                        <img src={`http://localhost:8800/product_pics/${item.picture}`} alt='product picture' className='w-16 h-16 object-scale-down rounded-full'/>
                    </div>
                <div className="col-span-2 col-start-3 ">{item.product_name}</div>
                <div className="col-start-5 flex justify-end ">
                

                    <AlertDialog>
                        <AlertDialogTrigger className='w-10 h-10 mr-1 mt-1 hover:bg-primary rounded-full'>
                            <Cross1Icon className=""/>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                            <AlertDialogTitle>Törlöd a terméket a kosaradból?</AlertDialogTitle>
                            <AlertDialogDescription className="flex">
                                <img src={`http://localhost:8800/product_pics/${item.picture}`} alt='product picture' className='w-16 h-16 object-scale-down rounded-full'/>
                                <div className="self-center font-semibold ml-2 text-black">{item.product_name}</div>
                            </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                            <AlertDialogCancel>Nem</AlertDialogCancel>
                            <AlertDialogAction id={item.product_id} className="text-black" onClick={HandleRemoveFromCart}>Igen</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
                <div className="col-span-3 col-start-3 row-start-2">Bögre színe</div>
                <div className="col-span-3 col-start-3 row-start-3">{item.product_price} Ft</div>
            </div>
        </div>
        )}
        </div>
    )
}
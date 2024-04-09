import cart from './pictures/cart.svg'
import { Button } from "@/components/ui/button"
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
import {
    ToggleGroup,
    ToggleGroupItem,
  } from "@/components/ui/toggle-group"
import { useState } from 'react'
import { Link } from "react-router-dom"


export default function ProductCard(props) {

    const [secondModal, setSecondModal] = useState(false)

    async function HandleAddToCart(event) {
        //console.log(event.target.id)
            try{
                await axios.post("http://localhost:8800/addtocart" ,{
                    product: event.target.id,
                })
                
                .then((response) => {
                    console.log(response.status);
                    if (response.status===200) {
                        console.log('kosárban')
                        setSecondModal(true)
                    }
                  })
              
            }catch(err){
                console.log(err)
            }
    }

    return(
        <div key={props.id} className="prduct-card flex flex-col h-fit w-48 rounded border-2 border-accent">
            <div className="img w-40 h-40 mt-2 mb-2 place-self-center rounded-full">
                <img src={`http://localhost:8800/product_pics/${props.picture}`} alt='product picture' className='object-scale-down rounded-full'/>
            </div>
            <div className="item-name ml-2 text-sm">{props.name}</div>
            <div className="price-addtocart-container flex items-center">
                <span className="item-price ml-2 text-sm w-2/3">{props.price} Ft</span>

                <AlertDialog>
                    <AlertDialogTrigger>
                        <Button variant="ghost" className="w-14 h-14 mb-1 mr-2 hover:bg-primary rounded-full">
                        <img id={props.id} className="w-5 h-5" src={cart} alt={cart}/>
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                    <AlertDialogHeader>
                        <div className='flex'>
                        <img src={`http://localhost:8800/product_pics/${props.picture}`} alt='product picture' className='object-scale-down w-12 h-12 rounded-full'/>
                        <div className='self-center font-semibold text-lg ml-2'>{props.name}</div>
                        </div>
                    <AlertDialogTitle>Kérlek válaszd ki a termék alapszínét!</AlertDialogTitle>
                    <AlertDialogDescription>
                        Az alapszín kiválasztásával megadhatod, hogy milyen színű legyen a termék, amelyre a kiválasztott minta kerül.

                        <ToggleGroup className="mt-5" variant="outline" type="single">
                            <ToggleGroupItem value="white">
                                <div className="h-5 w-5 bg-white border-2 rounded-full" ></div>
                            </ToggleGroupItem>
                            <ToggleGroupItem value="black">
                                <div className="h-5 w-5 bg-black rounded-full"></div>
                            </ToggleGroupItem>
                            <ToggleGroupItem value="grey">
                                <div className="h-5 w-5 bg-stone-400 rounded-full"></div>
                            </ToggleGroupItem>
                            <ToggleGroupItem value="blue">
                                <div className="h-5 w-5 bg-blue-300	 rounded-full"></div>
                            </ToggleGroupItem>
                            <ToggleGroupItem value="beige">
                                <div className="h-5 w-5 bg-amber-100 rounded-full"></div>
                            </ToggleGroupItem>
                        </ToggleGroup>

                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel>Vissza</AlertDialogCancel>
                    <AlertDialogAction className="text-black" id={props.id} onClick={HandleAddToCart}>Kosárba</AlertDialogAction>
                    </AlertDialogFooter>
                    </AlertDialogContent>
                    </AlertDialog>

                    <AlertDialog open={secondModal}>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                            <AlertDialogDescription className="flex"><img src={`http://localhost:8800/product_pics/${props.picture}`} alt='product picture' className='object-scale-down w-12 h-12 rounded-full'/>
                                <div className='self-center font-semibold text-lg text-black ml-2'>{props.name} a kosaradba került.</div>
                            </AlertDialogDescription>
                           
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                            <AlertDialogCancel onClick={()=>{setSecondModal(false)}}>Vissza a termékekhez</AlertDialogCancel>
                            <AlertDialogAction className="text-black"><Link to={'/cart'}>Kosárhoz</Link></AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>

            </div>
        </div>
    )
}
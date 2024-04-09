import axios from "axios"
import { Button } from "@/components/ui/button"
import { Cross1Icon } from '@radix-ui/react-icons'


export default function CartItemCard(props) {

    async function HandleRemoveFromCart(event){
       console.log(event.target.id)
       try{
        const response = await axios.post("http://localhost:8800/removefromcart" ,{
            /*product_type: category,*/
            product_cart_id: event.target.id,
        })
        //console.log(response.data)
    }catch(err){
        console.log(err)
    }
    }
    
    

    return(
        <div key={props.id} className="prduct-card h-32 w-64 border-2 border-accent rounded">
            <div key={props.id} className="grid grid-cols-5 grid-rows-5">
                <div className="col-span-2 row-span-3 ml-2 max-w-fit h-32 flex items-center ">
                    <img src={`http://localhost:8800/product_pics/${props.picture}`} alt='product picture' className='w-16 h-16 object-scale-down rounded-full'/>
                </div>
                <div className="col-span-2 col-start-3 ">{props.name}</div>
                <div className="col-start-5 flex justify-end ">
                    <Button id={props.id} variant='ghost' className='w-10 h-10 mr-1 mt-1 hover:bg-primary rounded-full' onClick={HandleRemoveFromCart}>
                        <Cross1Icon/>
                    </Button>
                </div>
                <div className="col-span-3 col-start-3 row-start-2">Bögre színe</div>
                <div className="col-span-3 col-start-3 row-start-3">{props.price} Ft</div>
            </div>
        </div>
    )

}
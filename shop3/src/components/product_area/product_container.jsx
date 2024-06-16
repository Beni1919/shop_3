import axios from "axios"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import ProductCard from "./sub_components/product_card/product_card"

export default function ProductsContainer() {
    const {category} = useParams()
    const [products, setProducts] = useState([])

    useEffect(()=>{
        const fetchProducts = async () => {
            try{
                const response = await axios.post("http://localhost:8800" ,{
                    /*product_type: category,*/
                    product_type: category,
                })
                //console.log(response.data)
                setProducts(response.data)
            }catch(err){
                console.log(err)
            }
        }
        fetchProducts()
    },[category])

    return(
        <div className="products-container flex flex-wrap gap-3 col-span-11 ml-5">
            {products.map((item)=>
                <ProductCard key={item.product_id}
                             id={item.product_id}
                             name={item.product_name}
                             price={item.product_price}
                             picture={item.picture}/>
            )}
        </div>
    )
}
import axios from "axios"
import { useState, useEffect, useContext } from "react"
import { Link, NavLink } from "react-router-dom"
import { CategorContext } from "@/App"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "@/components/ui/collapsible"

import { ChevronDownIcon } from '@radix-ui/react-icons'
import { Button } from "@/components/ui/button"

  export default function Sidebar() {

    //Kategóriák lekérése:
    const [categoryList, setCategoryList] = useState([])
    const [category, setCategory] = useContext(CategorContext)

    useEffect(()=>{
        const fetchCategories = async () => {
            try{
                const response = await axios.get("http://localhost:8800/categories")
                /*console.log(response.data)*/
                setCategoryList(response.data)
            }catch(err){
                console.log(err)
            }
        }
        fetchCategories()
    },[])

    function CategorySetter(event) {
        setCategory(event.target.textContent)
        /*console.log(category)*/
    }

    return (
        <div className="sidebar-container w-40 h-full mr-5">
            {categoryList.map((item)=>
            <Collapsible key={item.category_id} className="flex flex-col">
                <Link to={'/'+item.category_name}>
                <CollapsibleTrigger className="w-full">
                    <Button  variant="ghost" className="w-full justify-start hover:bg-primary" onClick={CategorySetter}>
                        {item.category_name}<ChevronDownIcon/>
                    </Button>
                </CollapsibleTrigger>
                </Link>
                <CollapsibleContent>
                    <Button variant="ghost" className="w-full justify-start font-normal">Ballagás</Button>
                </CollapsibleContent>
                <CollapsibleContent>
                    <Button variant="ghost" className="w-full justify-start font-normal">Születésnap</Button>
                </CollapsibleContent>
                <CollapsibleContent>
                    <Button variant="ghost" className="w-full justify-start font-normal">Diploma</Button>
            </CollapsibleContent>
        </Collapsible>
        )}
        </div>
    )
  }
import axios from "axios"
import { useState, useEffect, useContext } from "react"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import { Button } from "@/components/ui/button"
  import { Input } from "@/components/ui/input"
  import { ArrowUpDown, Frown } from 'lucide-react';
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import UpdateProductForm from "./update_product"
  import AdminSearchBar from "./admin_searchbar"
  import { DbUpdatedContext } from "@/App"
  import DeleteProductForm from "./delete_product"
  

export default function EditProducts() {

    const [products, setProducts] = useState([])
    let sorting=''
    const [searchWord, setSearchword] = useState('')
    const [edited, setEdited] = useState(false)
    const [dbUpdated, setDbUpdated] = useContext(DbUpdatedContext)

    async function fetchProducts() {
      try{
        const response = await axios.post("http://localhost:8800/adminproducts",{
          sorting: sorting,
          searchWord: searchWord
          })
          //console.log(response.data)
          setProducts([...response.data])
          setDbUpdated(false)
      }catch(err){
          console.log(err)
      }
    }

    useEffect(() => {
      fetchProducts()
    },[edited,searchWord,dbUpdated])
    
    //Sorting logics
    function SortingProducts(event) {

        sorting=(event.target.id)

        if(sorting==='id-asc'){
          let sorted = products.sort((a,b)=> a.product_id - b.product_id)
          //console.log(sorted)
          setProducts([...sorted])
        }else if(sorting==='id-desc') {
          let sorted = products.sort((a,b)=> b.product_id - a.product_id)
          //console.log(sorted)
          setProducts([...sorted])
        }else if(sorting==='name-asc'){
          let sorted = products.sort((a,b)=> {
            const nameA = a.product_name.toLowerCase()
            const nameB = b.product_name.toLowerCase()
            if(nameA < nameB) {return -1}
            if(nameA < nameB) {return 1}
            return 0
          })
          setProducts([...sorted])
        }else if(sorting==='name-desc'){
          let sorted = products.sort((b,a)=> {
            const nameA = a.product_name.toLowerCase()
            const nameB = b.product_name.toLowerCase()
            if(nameA < nameB) {return -1}
            if(nameA < nameB) {return 1}
            return 0
          })
          setProducts([...sorted])
        }else if(sorting==='active-asc'){
          let sorted = products.sort((a,b)=> a.active - b.active)
          //console.log(sorted)
          setProducts([...sorted])
        }else if(sorting==='active-desc') {
          let sorted = products.sort((a,b)=> b.active - a.active)
          //console.log(sorted)
          setProducts([...sorted])
        }else if(sorting==='focus-asc'){
          let sorted = products.sort((a,b)=> a.focus - b.focus)
          //console.log(sorted)
          setProducts([...sorted])
        }else if(sorting==='focus-desc') {
          let sorted = products.sort((a,b)=> b.active - a.focus)
          //console.log(sorted)
          setProducts([...sorted])
        }else if(sorting==='type-asc'){
          let sorted = products.sort((a,b)=> {
            const typeA = a.product_type.toLowerCase()
            const typeB = b.product_type.toLowerCase()
            if(typeA < typeB) {return -1}
            if(typeA < typeB) {return 1}
            return 0
          })
          setProducts([...sorted])
        }else if(sorting==='category-asc'){
          let sorted = products.sort((a,b)=> {
            const categoryA = a.product_category.toLowerCase()
            const categoryB = b.product_category.toLowerCase()
            if(categoryA < categoryB) {return -1}
            if(categoryA < categoryB) {return 1}
            return 0
          })
          setProducts([...sorted])
        }else if(sorting==='category-desc'){
          let sorted = products.sort((b,a)=> {
            const categoryA = a.product_category.toLowerCase()
            const categoryB = b.product_category.toLowerCase()
            if(categoryA < categoryB) {return -1}
            if(categoryA < categoryB) {return 1}
            return 0
          })
          setProducts([...sorted])
        }else if(sorting==='price-asc'){
          let sorted = products.sort((a,b)=> a.product_price - b.product_price)
          //console.log(sorted)
          setProducts([...sorted])
        }else if(sorting==='price-desc') {
          let sorted = products.sort((a,b)=> b.product_price - a.product_price)
          //console.log(sorted)
          setProducts([...sorted])
        }else if(sorting==='date-asc'){
          let sorted = products.sort((a,b)=> a.date_added - b.date_added)
          //console.log(sorted)
          setProducts([...sorted])
        }else if(sorting==='date-desc') {
          let sorted = products.sort((a,b)=> b.date_added - a.date_added)
          //console.log(sorted)
          setProducts([...sorted])
        }
        
    }

    return(

        <div className="products-table-container w-max">
          <AdminSearchBar changeSearchWord={searchWord => setSearchword(searchWord)}/>
        <Table>
  <TableHeader>
    <TableRow>
      <TableHead className="">Termék ID
      <DropdownMenu>
        <DropdownMenuTrigger><ArrowUpDown className="w-4 h-4 inline ml-1 hover:cursor-pointer"/></DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuLabel>Rendezés</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem id='id-asc' onClick={SortingProducts}>Növekvő sorrend</DropdownMenuItem>
            <DropdownMenuItem id='id-desc' onClick={SortingProducts}>Csökkenő sorrend</DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
      </TableHead>
      <TableHead className=''>Termék neve
      <DropdownMenu>
        <DropdownMenuTrigger><ArrowUpDown className="w-4 h-4 inline ml-1 hover:cursor-pointer"/></DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuLabel>Rendezés</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem id='name-asc' onClick={SortingProducts}>Növekvő sorrend</DropdownMenuItem>
            <DropdownMenuItem id='name-desc' onClick={SortingProducts}>Csökkenő sorrend</DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
      </TableHead>
      <TableHead className="">Aktív
      <DropdownMenu>
        <DropdownMenuTrigger><ArrowUpDown className="w-4 h-4 inline ml-1 hover:cursor-pointer"/></DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuLabel>Rendezés</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem id='active-asc' onClick={SortingProducts}>Növekvő sorrend</DropdownMenuItem>
            <DropdownMenuItem id='active-desc' onClick={SortingProducts}>Csökkenő sorrend</DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
      </TableHead>
      <TableHead className="">Kiemelt
      <DropdownMenu>
        <DropdownMenuTrigger><ArrowUpDown className="w-4 h-4 inline ml-1 hover:cursor-pointer"/></DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuLabel>Rendezés</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem id='focus-asc' onClick={SortingProducts}>Növekvő sorrend</DropdownMenuItem>
            <DropdownMenuItem id='focus-desc' onClick={SortingProducts}>Csökkenő sorrend</DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
      </TableHead>
      <TableHead className="">Típus
      <DropdownMenu>
        <DropdownMenuTrigger><ArrowUpDown className="w-4 h-4 inline ml-1 hover:cursor-pointer"/></DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuLabel>Rendezés</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem id='type-asc' onClick={SortingProducts}>Növekvő sorrend</DropdownMenuItem>
            <DropdownMenuItem id='type-desc' onClick={SortingProducts}>Csökkenő sorrend</DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
      </TableHead>
      <TableHead className="">Alkategória
      <DropdownMenu>
        <DropdownMenuTrigger><ArrowUpDown className="w-4 h-4 inline ml-1 hover:cursor-pointer"/></DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuLabel>Rendezés</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem id='category-asc' onClick={SortingProducts}>Növekvő sorrend</DropdownMenuItem>
            <DropdownMenuItem id='category-desc' onClick={SortingProducts}>Csökkenő sorrend</DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
      </TableHead>
      <TableHead className="">Termék ára
      <DropdownMenu>
        <DropdownMenuTrigger><ArrowUpDown className="w-4 h-4 inline ml-1 hover:cursor-pointer"/></DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuLabel>Rendezés</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem id='price-asc' onClick={SortingProducts}>Növekvő sorrend</DropdownMenuItem>
            <DropdownMenuItem id='price-desc' onClick={SortingProducts}>Csökkenő sorrend</DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
      </TableHead>
      <TableHead className="">Termék kép</TableHead>
      <TableHead className="">Termék leírás</TableHead>
      <TableHead className="">Módosítva
      <DropdownMenu>
        <DropdownMenuTrigger><ArrowUpDown className="w-4 h-4 inline ml-1 hover:cursor-pointer"/></DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuLabel>Rendezés</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem id='date-asc' onClick={SortingProducts}>Növekvő sorrend</DropdownMenuItem>
            <DropdownMenuItem id='date-desc' onClick={SortingProducts}>Csökkenő sorrend</DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
      </TableHead>
      <TableHead className="">Műveletek</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {products.map((item)=>
    <TableRow key={item.product_id}>
        <TableCell className=''>{item.product_id}</TableCell>
        <TableCell>{item.product_name}</TableCell>
        <TableCell>{item.active===1?'aktív':'nem aktív'}</TableCell>
        <TableCell>{item.focus===1?'kiemelt':'nem kiemelt'}</TableCell>
        <TableCell className=''>{item.product_type}</TableCell>
        <TableCell className=''>{item.product_category}</TableCell>
        <TableCell>{item.product_price} Ft</TableCell>
        <TableCell className=''><img src={`http://localhost:8800/product_pics/${item.picture}`} alt='product picture' className='w-12 h-12 object-scale-down rounded-full'/></TableCell>
        <TableCell className=''>{item.description}</TableCell>
        <TableCell className=''>{(item.date_added).slice(0,10)}</TableCell>
    
        <TableCell className=''>
          

            <UpdateProductForm 
            product_id={item.product_id}
            product_name={item.product_name}
            active={item.active}
            focus={item.focus}
            product_type={item.product_type}
            product_category={item.product_category}
            product_price={item.product_price}
            description={item.description}
            picture={item.picture}
            />
            <DeleteProductForm
            product_id={item.product_id}
            product_name={item.product_name}
            picture={item.picture}
            />
        </TableCell>
    </TableRow>
)}
  </TableBody>
</Table>   

        </div>
    )
}
import LoadindgIcon from "./loading_icon"
import { useState, useContext, useEffect } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
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
import { Textarea } from "@/components/ui/textarea"
import { DbUpdatedContext } from "@/App"
  

export default function UpdateProductForm(props) {

    const [categories, setCategories] = useState([])
    const [subCategories, setSubCategories] = useState([])
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [newProductPicture, setNewProductPicture] = useState(null)
    const [dbUpdated, setDbUpdated] = useContext(DbUpdatedContext)

    useEffect(()=>{
        async function getCategories() {
            try{
                const response = await axios.get("http://localhost:8800/categories")
                  console.log(response.data)
                  setCategories([...response.data])
              }catch(err){
                  console.log(err)
              }
        }
        getCategories()

        async function getSubCategories() {
            try{
                const response = await axios.get("http://localhost:8800/subcategories")
                  console.log(response.data)
                  setSubCategories([...response.data])
              }catch(err){
                  console.log(err)
              }
        }
        getSubCategories()
    },[])

    async function SubmitForm(event){
        event.preventDefault()
        setLoading(true)

        if(newProductPicture!=null) {
            const formData = new FormData()
            formData.append('image',newProductPicture)

            await axios.post("http://localhost:8800/upload", formData)
              .then(function (response) {
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              });
            }

        try{
            const formData = new FormData(event.target)
            const formObject = Object.fromEntries(formData)
            console.log(formObject)

             await axios.post("http://localhost:8800/updateproduct", {  
                id: formObject.id,
                product_name: formObject.product_name,
                product_type: formObject.category,
                product_category: formObject.subcategory,
                product_price: formObject.product_price,
                active: formObject.active==='Aktív'?1:0,
                focus: formObject.focus==='Kiemelt'?1:0,
                picture: formObject.image.name,
                description: formObject.description
                }
            )
            setLoading(false)
            setOpen(false)
            setDbUpdated(true)
            }catch(err){
                console.log(err)
                setOpen(true)
            }        
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger><Button variant='outline'>Szerkeszt</Button></AlertDialogTrigger>
                <AlertDialogContent>
                    <form onSubmit={SubmitForm} encType="multipart/form-data">
                    <input name="id" value={props.product_id} hidden></input>
                    <AlertDialogHeader>
                    <AlertDialogTitle className='mb-2'>Termék szerkesztése</AlertDialogTitle>
                        <Label htmlFor='product_name'>Termék neve</Label>
                        <Input name='product_name'  type='text' defaultValue={props.product_name}></Input>
                        <Label htmlFor='category'>Termék kategória</Label>
                        <Select name='category' defaultValue={props.product_type}>
                            <SelectTrigger>
                                <SelectValue/>
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((item)=>
                                    <SelectItem value={item.category_name}>{item.category_name}</SelectItem>
                                )}
                            </SelectContent>
                        </Select>
                        <Label htmlFor='subcategory'>Termék alkategória</Label>
                        <Select name='subcategory' defaultValue={props.product_category}>
                            <SelectTrigger className="">
                                <SelectValue/>
                            </SelectTrigger>
                            <SelectContent>
                                {subCategories.map((item)=>
                                    <SelectItem value={item.subcategory_name}>{item.subcategory_name}</SelectItem>
                                )}
                            </SelectContent>
                        </Select>
                        <Label htmlFor='active'>Termék megjelenik-e?</Label>
                        <Select name='active' defaultValue={props.active===1?'Aktív':'Nem aktív'}>
                            <SelectTrigger className="">
                                <SelectValue/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value='Aktív'>Aktív</SelectItem>
                                <SelectItem value='Nem aktív'>Nem aktív</SelectItem>
                            </SelectContent>
                        </Select>
                        <Label htmlFor='focus'>Termék kiemelt-e?</Label>
                        <Select name='focus' defaultValue={props.focus===1?'Kiemelt':'Nem kiemelt'}>
                            <SelectTrigger className="">
                                <SelectValue/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value='Kiemelt'>Kiemelt</SelectItem>
                                <SelectItem value='Nem kiemelt'>Nem kiemelt</SelectItem>
                            </SelectContent>
                        </Select>
                        <Label htmlFor='product_price'>Eladási ár</Label>
                        <Input name='product_price' type='number' defaultValue={props.product_price}></Input>
                        <Label htmlFor='description' >Termék leírás</Label>
                        <Textarea name='description' defaultValue={props.description}/>
                        <Label htmlFor='product_picture'>Jelenlegi termék kép</Label>
                        <img id='product_picture' src={`http://localhost:8800/product_pics/${props.picture}`} alt='product picture' className='w-16 h-16 object-scale-down rounded-full'/>
                        <Label htmlFor='picture'>Új termék kép feltöltése</Label>
                        <Input name='image' type="file" onChange={(event)=> setNewProductPicture(event.target.files[0])}/>
                    </AlertDialogHeader>
                    <AlertDialogFooter className='mt-2'>
                    <AlertDialogCancel className='mt-2'>Mégsem</AlertDialogCancel>
                    <Button type='submit' className='text-black'>{loading===true?<LoadindgIcon/>:'Mentés'}</Button>
                    </AlertDialogFooter>
                    </form>
                </AlertDialogContent>
            </AlertDialog>
      )
}
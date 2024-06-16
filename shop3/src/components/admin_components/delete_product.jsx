import LoadindgIcon from "./loading_icon"
import { useState, useContext } from "react"
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
import { DbUpdatedContext } from "@/App"
  

export default function DeleteProductForm(props) {

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [newProductPicture, setNewProductPicture] = useState(null)
    const [dbUpdated, setDbUpdated] = useContext(DbUpdatedContext)

    async function SubmitForm(event){
        event.preventDefault()
        setLoading(true)

        try{
            const formData = new FormData(event.target)
            const formObject = Object.fromEntries(formData)
            console.log(formObject)

             await axios.post("http://localhost:8800/deleteproduct",{
                id: formObject.id
             })
            
            setLoading(false)
            setOpen(false)
            setDbUpdated(true)
            }catch(err){
                console.log(err)
                setOpen(true)
            }}  
    
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger><Button variant='outline'>Töröl</Button></AlertDialogTrigger>
                <AlertDialogContent>
                    <form onSubmit={SubmitForm} encType="multipart/form-data">
                    <input name="id" value={props.product_id} hidden></input>
                    <AlertDialogHeader>
                    <AlertDialogTitle className='mb-2'>Termék törlése</AlertDialogTitle>
                    </AlertDialogHeader>
                    <span name='product_name'>{props.product_name}</span>
                    <img id='product_picture' src={`http://localhost:8800/product_pics/${props.picture}`} alt='product picture' className=' mt-2 w-16 h-16 object-scale-down rounded-full'/>
                    <AlertDialogFooter className='mt-2'>
                    <AlertDialogCancel className='mt-2'>Mégsem</AlertDialogCancel>
                    <Button type='submit' className='text-black'>{loading===true?<LoadindgIcon/>:'Töröl'}</Button>
                    </AlertDialogFooter>
                    </form>
                </AlertDialogContent>
            </AlertDialog>
      )
    }
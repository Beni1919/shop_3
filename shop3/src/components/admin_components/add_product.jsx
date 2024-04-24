import React from "react";
import { useState, useEffect } from 'react'
import axios from 'axios'

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  


export default function AddProductForm(){

    //Form mezők state-ei:
    const [product_name, setProduct_name] = useState('')
    const [product_type, setProduct_type] = useState('')
    const [product_category, setProduct_category] = useState('')
    const [categoryList, setCategoryList] = useState([])
    const [product_price, setProduct_price] = useState(0)
    const [active, setActive] = useState(0)
    const [focus, setFocus] = useState(0)
    const [picture, setPicture] = useState('')
    const [description, setDescription] = useState('')
    const [stock, setStock] = useState(0)
    const [pictureToUpload, setPictureToUpload] = useState(null)



    //Kategóriák lekéreése szerver oldalról:
    useEffect(()=>{
        const fetchCategories = async () => {
            try{
                const response = await axios.get("http://localhost:8800/categories")
                console.log(response.data)
                setCategoryList(response.data)
            }catch(err){
                console.log(err)
            }
        }
        fetchCategories()
    },[])


    //Checkbox inputok kezelése:
    function handleCheckbox(){
        // Active checkbox működése:
        let activeCheckBox = document.getElementById('active')

        if (activeCheckBox.checked === true) {
            setActive(1)
        } else {
            setActive(0)
        }
        // Focus checkbox működése:
        let focusCheckBox = document.getElementById('focus')

        if (focusCheckBox.checked === true) {
            setFocus(1)
        } else {
            setFocus(0)
        }
        
        }

    //Kép hozzáadása input kezelése:
    function HandleAddPicture(event) {

        setPicture(event.target.files[0].name)
        setPictureToUpload(event.target.files[0])
        console.log(picture)
    }

    // Új termék objektum beküldése az adatbázisba:
    async function handleSubmit(event){

        event.preventDefault()

        const formData = new FormData()
        formData.append('image', pictureToUpload)

        try{
            await axios.post("http://localhost:8800/newproduct", {
                product_name: product_name,
                product_type: product_type,
                product_category: product_category,
                product_price: product_price,
                active: active,
                focus: focus,
                picture: picture,
                description: description,
                stock: stock
            })
            alert(product_name + 'hozzáadva az adatbázishoz')

        }catch(err){
            console.log(err)
        }

        try{
            await axios.post("http://localhost:8800/upload", formData)
            alert('kép feltöltve')

            //Sikeres feltöltések után mezők vissszaállítása üresre:
            setProduct_name('')
            setProduct_price(0)
            setDescription('')
        }catch(err){
            console.log(err)
        }
        
    }


    return(
        <div className="admin-form-container">

            <label className='admin-label' for="active">Termék neve:</label>
            <Input type="text" id="product-name" className="admin-text-input border-accent" value={product_name} name='product_name' onChange={(event) => setProduct_name(event.target.value)}></Input>

            <label className='admin-label' for="product-type">Termék típusa:</label>
            <Select id="product-type" className="admin-select-input" name='product_type' onChange={(event) => setProduct_type(event.target.value)}>
                <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Típusok" />
                </SelectTrigger>
                <SelectContent>
                    {categoryList.map((item) => <SelectItem key={item.categoy_id} value={item.category_name}>{item.category_name}</SelectItem>)}
                </SelectContent>
            </Select>

            <label className='admin-label' for="product-category">Termék kategória:</label>
            <Select id="product-category" className="admin-select-input" name='product_category' onChange={(event) => setProduct_category(event.target.value)}>
                <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Kategóriák" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value={'karácsony'}>Karácsony</SelectItem>
                    <SelectItem value={'ballagás'}>Ballagás</SelectItem>
                    <SelectItem value={'sport'}>Sport</SelectItem>
                    <SelectItem value={'névnap'}>Névnap</SelectItem>
                </SelectContent>
                
            </Select>

            <label className='admin-label' for="product-category">Termék ára:</label>
            <Input id="product-price" type="number" className="admin-num-input border-accent" value={product_price} name='product_price' onChange={(event) => setProduct_price(event.target.value)}></Input>
            
            <input type='file' className='admin-file-input' id='productimage' name='image' onChange={HandleAddPicture}></input>

            <div className='admin-checkbox-container'>
                <label for="active">Aktív</label>
                <input type="checkbox" id="active" className="admin-checkbox-input"  name='active' onChange={handleCheckbox}></input>
                <label for="focus">Kiemelt</label>
                <input type="checkbox" id="focus" className="admin-checkbox-input" name='focus' onChange={handleCheckbox}></input>
            </div>
            
            <label className='admin-label' for="description">Termék leírása:</label>
            <textarea id="description" className="admin-textarea-input" value={description} name='description' onChange={(event) => setDescription(event.target.value)}></textarea>
            
            <label className='admin-label' for="stock">Termék készlet:</label>
            <Input type="number" id="stock" className="admin-num-input" name='stock' disabled onChange={(event) => setStock(event.target.value)}></Input>

            <Button onClick={handleSubmit}>Mentés</Button>
        </div>
    )
}
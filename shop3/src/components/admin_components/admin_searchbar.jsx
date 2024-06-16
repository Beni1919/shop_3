import { useState } from "react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react';
import { X } from 'lucide-react';


export default function AdminSearchBar(props){
        const [inputWord,setInputWord] = useState()

        function ClearSearchField() {
            let searchField = document.getElementById('search-field')
            searchField.value=''
        }

    return(
        <div className="flex mt-2">
        <Input id='search-field' type='text' onKeyUp={(event)=> setInputWord(event.target.value)} className='w-52 mb-2 mr-2 inline'></Input>
            <Button variant='outline' className='mr-1' onClick={()=> props.changeSearchWord(inputWord)}>
                <Search className="text-slate-500"></Search>
            </Button>
            <Button variant='outline'>
                <X className="text-slate-500" onClick={()=> {props.changeSearchWord('');ClearSearchField()}}></X>
            </Button>
        </div>
        
    )
}
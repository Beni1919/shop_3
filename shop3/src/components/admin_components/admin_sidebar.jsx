import { Link, NavLink } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
  } from "@/components/ui/command"
  import { PenLine } from 'lucide-react';
  import { PencilRuler } from 'lucide-react';
  import { Drill } from 'lucide-react';
  import { Plus } from 'lucide-react';
  import AddProductForm from './add_product';




export default function AdminSidebar(){
    return (

        <div className="admin-sidebar-container flex flex-col w-64 h-screen col-span-2">
            <span className='mb-2 ml-4 mt-2'>Admin műveletek</span>
            <Command>
                <CommandList>
                    <CommandGroup>
                        <AddProductForm/>
                        <NavLink to={'/admin'}>
                        <CommandItem className="data-[disabled]:opacity-1">
                            <PencilRuler className="mr-2 h-4 w-4" />
                            <span className="admin-sidebar-item text-base">Termékek szerkesztése</span>
                        </CommandItem>
                        </NavLink>
                        <CommandItem className="data-[disabled]:opacity-1">
                            <Drill className="mr-2 h-4 w-4" />
                            <span className="admin-sidebar-item text-base">Termék típusok szerkesztése</span>
                        </CommandItem>
                        <CommandItem className="data-[disabled]:opacity-1">
                            <PenLine className="mr-2 h-4 w-4" />
                            <span className="admin-sidebar-item text-base">Termék kategóriák szerkesztése</span>
                        </CommandItem>
                    </CommandGroup>
                    <CommandSeparator />
                    <span className='mb-2 ml-2 mt-2'>Megrendelések kezelése</span>
                </CommandList>
            </Command>
            
        </div>
    )
}
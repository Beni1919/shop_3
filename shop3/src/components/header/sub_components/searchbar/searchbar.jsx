import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'


export default function SearchBar() {
    return(
        <div className="searchbar-container flex flex-row">
            <Input className="h-7 w-23 ml-1 mr-1 border-accent mt-2"/>
            <Button variant="ghost" className="hover:bg-primary">
               <MagnifyingGlassIcon className="w-6 h-6"/> 
            </Button>
        </div>
    )
}
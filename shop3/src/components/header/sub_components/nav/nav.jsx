import { Button } from "@/components/ui/button"

export default function Nav() {

    return (
    <div className="header-nav flex flex-row w-5/6">
        <Button variant="ghost" className="hover:bg-primary">Egyedi termékek</Button>
        <Button variant="ghost" className="hover:bg-primary">Szállítás</Button>
        <Button variant="ghost" className="hover:bg-primary">Kapcsolat</Button>
     </div>
    )
}
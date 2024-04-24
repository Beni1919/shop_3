import AdminSidebar from "./admin_sidebar"

export default function Admin(){
    return (
        <div className="flex">
            <AdminSidebar/>
            <div>A baloldali menüben a termékeket és termék kategóriákat
                 lehet szerkeszteni és újakat hozzáadni</div>
        </div>
    )
}
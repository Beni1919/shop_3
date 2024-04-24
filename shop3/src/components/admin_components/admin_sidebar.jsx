import { Link } from 'react-router-dom'

export default function AdminSidebar(){
    return (
        <div className="admin-sidebar-container justify-self-start">
            <Link to={'/admin/addproduct'} className="admin-sidebar-item">Új termék hozzáadaása</Link>
            <div className="admin-sidebar-item">Termékek szerkesztése</div>
            <div className="admin-sidebar-item">Termék típusok szerkesztése</div>
            <div className="admin-sidebar-item">Termék kategóriák szerkesztése</div>
        </div>
    )
}
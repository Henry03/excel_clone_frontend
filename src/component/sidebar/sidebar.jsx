import { MdSpaceDashboard } from 'react-icons/md';
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie';

const Sidebar = ({children}) => {
    const token = Cookies.get('token');

    return (
        <div className="drawer md:drawer-open bg-base-200 min-h-max static">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content h-[calc(100vh-3rem)] overflow-scroll p-3">
                { children }
            </div> 
            {
                token &&
                <div className="drawer-side md:h-auto " style={{zIndex: '2'}}>
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label> 
                    
                    <ul className="menu p-4 w-80 min-h-full bg-base-100 text-base-content">
                        <div className="btn btn-ghost text-xl md:hidden">daisyUI</div>
                        {/* <li className='mb-5 lg:mb-0'><a className="lg:hidden"><img src={Logo} alt="Logo" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain'}}/></a></li> */}
                        <li><Link to="/admin"><MdSpaceDashboard size="20"/>Dashboard</Link></li>
                        
                    </ul>
                
                </div>
            }
        </div>
    )
};

export default Sidebar;
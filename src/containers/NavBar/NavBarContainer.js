import React, { useContext } from "react";
import './NavBarContainer.scss';
import loginlogo from '../../assets/img/login.png';
import logoutlogo from '../../assets/img/logout.png';
import settings from '../../assets/img/setting.png'
import CartWidget from '../../components/NavBar/CartWidget'
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import ModalLogin from '../../components/ModalLogin/ModalLogin';

export default function NavBarContainer() {

    const navigate = useNavigate();
    const { logged, logout } = useContext(UserContext);

    return (
        <header>
            <nav className="menu">
                <div className="barra-menu">
                    <div className="marca">
                        <button className="link-logo" onClick={ () => navigate('/') }><h1 className="logo">SUMMERVIBES</h1></button>
                    </div>
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">Modelos</button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li><button className="dropdown-item" onClick={ () => navigate('/') } >Todos</button></li>
                            <li><button className="dropdown-item" onClick={ () => navigate('/model/enteriza') } >Enterizas</button></li>
                            <li><button className="dropdown-item" onClick={ () => navigate('/model/bikini') } >Bikinis</button></li>
                            <li><button className="dropdown-item" onClick={ () => navigate('/model/infantil') } >Infantiles</button></li>
                        </ul>
                    </div>
                    <button className="btn-carrito">
                        <CartWidget handlePush={ () => navigate('/cart') }/>
                    </button>
                    {
                        logged ?
                        <>
                            <button className='btn-logout' onClick={ logout } >
                                <img src={ logoutlogo } alt='icono de logout'/>
                            </button>
                            <Link className='btn-setting' to='/admin/stock'>
                                <img src={ settings } alt='icono de herramientas' />
                            </Link>
                        </> 
                        :
                        <>
                            <button className='btn-login' data-bs-toggle='modal' data-bs-target='#modalLogin'>
                                <img src={ loginlogo } alt='icono de login' />
                            </button>
                        </>
                    }
                </div>
            {
                logged &&
                <div className='barra-admin'>
                    <div className='container'>
                        <button className='btn-stock' onClick={ () => navigate('/admin/stock') }>CARGAR STOCK</button>
                        <button className='btn-precio' onClick={ () => navigate('/admin/precio') }>MODIFICAR PRECIO</button>
                        <button className='btn-producto' onClick={ () => navigate('/admin/producto') }>AGREGAR PRODUCTO</button>
                        <button className='btn-eliminar' onClick={ () => navigate('/admin/eliminar') }>ELIMINAR PRODUCTO</button>
                    </div>
                </div>
            }
            </nav>
            <ModalLogin />
        </header>
    )
}

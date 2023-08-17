import NavBarContainer from './containers/NavBar/NavBarContainer';
import ItemListContainer from './containers/ItemList/ItemListContainer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ItemDetailContainer from './containers/ItemDetail/ItemDetailContainer';
import CartView from './components/cart-view/CartView';
import CartContextProvider from './context/CartContext';
import Checkout from './components/Checkout/Checkout';
import { UserContextProvider } from './context/UserContext';
import RestrictedRoute from './components/administrador/RestrictedRoute';
import AdminiStock from './components/administrador/AdminStock';
import AdminPrecio from './components/administrador/AdminPrecio';
import AdminProducto from './components/administrador/AdminProducto';
import Error from './components/ErrorPath/Error';
import AdminEliminar from './components/administrador/AdminEliminar';

function App() {

  return (
    <UserContextProvider>
      <CartContextProvider>
        <Router>
          <NavBarContainer />

          <Routes>
            <Route path='/' element={<ItemListContainer/>}/>
            <Route path='/model/:modelId' element={<ItemListContainer/>}/>
            <Route path='/prod/:prodId' element={<ItemDetailContainer/>}/>
            <Route path='/cart' element={<CartView/>}/>
            <Route path='/checkout' element={<Checkout/>}/>
            <Route path='/admin/stock' element={<RestrictedRoute>
                                                  <AdminiStock/>
                                                </RestrictedRoute>}/>
            <Route path='/admin/precio' element={<RestrictedRoute>
                                                  <AdminPrecio/>
                                                </RestrictedRoute>}/>  
            <Route path='/admin/producto' element={<RestrictedRoute>
                                                    <AdminProducto/>
                                                  </RestrictedRoute>}/>  
            <Route path='/admin/eliminar' element={<RestrictedRoute>
                                                    <AdminEliminar/>
                                                  </RestrictedRoute>}/>                                                                              
            <Route path = "*" element={<Error />}/>                          
          </Routes>
        </Router>
      </CartContextProvider>
    </UserContextProvider>
  );
}

export default App;


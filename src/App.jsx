import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.scss';
import ProductDetail from './pages/browse/components/Products/ProductDetail/ProductDetail';
import Products from './pages/browse/components/Products/ProductList';
import Home from './pages/browse/Home';
import Owner from './pages/owner/Owner';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} exact />
        <Route path='/shop'>
          <Route index element={<Products />}/>
          <Route path=':name/:id' element={<ProductDetail />} />
        </Route>
        <Route path='/owner' element={<Owner />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

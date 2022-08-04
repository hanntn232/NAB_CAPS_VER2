import logo from './logo.svg';
import './App.css';
import { Owner } from './pages/owner';
import { ProductInputForm } from './pages/owner/InputForm';
import AppRoutes from './routes';

function App() {
  // return <Owner></Owner>
  return (
    <div>
      <AppRoutes />
    </div>
  )
}

export default App;

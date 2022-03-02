import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { Container } from 'semantic-ui-react'

import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import MenuBar from './components/menu'
import './App.css'


function App() {
  return (
    <Router>
      <Container>
        <MenuBar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route exact path="/register" element={<Register/>}/>
        </Routes>
      </Container>
    </Router>
  );
}

export default App;

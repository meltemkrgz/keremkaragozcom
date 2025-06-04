import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Anasayfa from './pages/Anasayfa/Anasayfa';
import Hakkimda from './pages/Hakkimda/Hakkimda';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Anasayfa/>}></Route>
        <Route path='/hakkimda' element={<Hakkimda/>}></Route>
      </Routes>
    </Router>
  )
}

export default App

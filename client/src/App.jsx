import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Anasayfa from './pages/Anasayfa/Anasayfa';
import Hakkimda from './pages/Hakkimda/Hakkimda';
import Hizmetlerim from './pages/Hizmetlerim/Hizmetlerim';
import Iletisim from './pages/Iletisim/Iletisim';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Anasayfa/>}></Route>
        <Route path='/hakkimda' element={<Hakkimda/>}></Route>
        <Route path='/hizmetlerim' element={<Hizmetlerim/>}></Route>
        <Route path='/iletisim' element={<Iletisim/>}></Route>
      </Routes>
    </Router>
  )
}

export default App

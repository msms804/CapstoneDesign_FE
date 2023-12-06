import { Routes, Route, useNavigate } from 'react-router-dom'
import { Nav, Navbar, Container } from "react-bootstrap";
import Map from "./components/Map";
import Searchmodal from "./components/Searchmodal";
import Card from "./components/Card";
import MyPage from './pages/MyPage';
import Login from './pages/Login';
import Upload from './pages/Upload';
import Review from './pages/review';
import { NavermapsProvider } from 'react-naver-maps';
import Detail from './pages/detail';
import Register from './pages/Register';
import MainPage from './pages/MainPage';

function App() {
  let navigate = useNavigate();
  return (
    <NavermapsProvider ncpCliendid='hbv3q9pafa'>

      <div className="App">

        <Navbar bg="light" data-bs-theme="light" >
          <Container>
            <Navbar.Brand style={{ fontSize: '20px', fontStyle: 'italic' }} onClick={() => { navigate('/main') }}>ReviewSnap</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link onClick={() => { navigate('/upload') }}>업로드</Nav.Link>
              <Nav.Link onClick={() => { navigate('/mypage') }}>마이페이지</Nav.Link>
            </Nav>
            <Nav className="justify-content-end">
              <Nav.Link onClick={() => { navigate('/login') }} className="btn btn-primary rounded-pill">로그인</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        <Routes>
          <Route path='/upload' element={<Upload />} />
          <Route path='/login' element={<Login />} />
          <Route path='/mypage' element={<MyPage />} />
          <Route path='/review' element={<Review />} />
          <Route path='/detail' element={<Detail />} />
          <Route path='/register' element={<Register />} />
          <Route path='/card' element={<Card />} />
          <Route path='/main' element={<MainPage />} />
        </Routes>

      </div>
    </NavermapsProvider>

  );
}

export default App;

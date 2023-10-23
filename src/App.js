import { Routes, Route, useNavigate } from 'react-router-dom'
import { Nav, Navbar, Container } from "react-bootstrap";
import Map from "./components/Map";
import Searchmodal from "./components/Searchmodal";
import MyPage from './pages/MyPage';
import Login from './pages/Login';
import Upload from './pages/Upload';
import Review from './pages/review';
import { NavermapsProvider } from 'react-naver-maps';
function App() {
  let navigate = useNavigate();
  return (
    <NavermapsProvider ncpCliendid='hbv3q9pafa'>

      <div className="App">

        <Navbar bg="light" data-bs-theme="light">
          <Container>
            <Navbar.Brand onClick={() => { navigate('/') }}>로고</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link onClick={() => { navigate('/upload') }}>업로드</Nav.Link>
              <Nav.Link onClick={() => { navigate('/mypage') }}>마이페이지</Nav.Link>
              <Nav.Link onClick={() => { navigate('/login') }}>로그인</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        <Routes>
          <Route path='/upload' element={<Upload />} />
          <Route path='/login' element={<Login />} />
          <Route path='/mypage' element={<MyPage />} />
        </Routes>
        <Searchmodal />
        <Review />
        <Map />

      </div>
    </NavermapsProvider>

  );
}

export default App;

/**
 * 참고
 * https://12716.tistory.com/entry/ReactJS-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%ED%8E%98%EC%9D%B4%EC%A7%80-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0
 */
import axios from "axios";
import { useState } from 'react';
//**숙제 : 중복아이디 가입방지 & 로그인한 사람만 글작성가능

function Login() {
    const [loginData, setLoginData] = useState({
        username: null,//이걸 빈문자열" "로하면 에러가남
        password: null,
    })
    const handleChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    }
    const checkLogin = async (e) => {//로그인버튼누름
        try {
            await axios.post('http://localhost:8080/login', loginData, { withCredentials: true })
        } catch (err) {
            console.log(err)
        }
    }//name은 username , password는 passport라이브러리쓰기때문에 이렇게해야한다고
    return (<>
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '100vh'
        }}>
            <form style={{ display: 'flex', flexDirection: 'column' }}>
                <label>아이디</label>
                <input name="username" value={loginData.username} onChange={handleChange} />
                <br />
                <label>패스워드</label>
                <input name="password" type="password" value={loginData.password} onChange={handleChange} />
                <br />
                <button type="submit" onClick={checkLogin}>login</button>
                <button type="submit">log out</button>
            </form>

        </div>
    </>)
}
export default Login;
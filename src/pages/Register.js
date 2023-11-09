import axios from "axios";
import { useState } from "react";
//**숙제 : 중복아이디 가입방지 & 로그인한 사람만 글작성가능
function Register() {
    const [registerData, setRegisterData] = useState({
        username: null,
        password: null,
    })
    const handleChange = (e) => {
        setRegisterData({ ...registerData, [e.target.name]: e.target.value });
    }
    const doRegister = async (e) => {
        try {
            await axios.post('http://localhost:8080/register', registerData, { withCredentials: true })
        } catch (err) {
            console.log(err)
        }
    }


    return (<>
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '100vh'
        }}>
            <form>
                <h4>회원가입</h4>
                <label>아이디</label>
                <input name="username" value={registerData.username} onChange={handleChange} />
                <br />
                <label>패스워드</label>
                <input name="password" type="password" value={registerData.password} onChange={handleChange} />
                <br />
                <button type="submit" onClick={doRegister}>register</button>
            </form>
        </div>
    </>)
}
export default Register;


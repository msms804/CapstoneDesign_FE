/**
 * 참고
 * https://12716.tistory.com/entry/ReactJS-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%ED%8E%98%EC%9D%B4%EC%A7%80-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0
 */
import axios from "axios";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
//**숙제 : 중복아이디 가입방지 & 로그인한 사람만 글작성가능

function Login() {
    const navigate = useNavigate();
    const goToHome = () => {
        navigate('/');
    }
    const [loginData, setLoginData] = useState({
        username: null,//이걸 빈문자열" "로하면 에러가남
        password: null,
    })
    const handleChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    }
    const checkLogin = async (e) => {//로그인버튼누름
        e.preventDefault(); // 폼 제출 방지
        try {
            await axios.post('http://localhost:8080/login', loginData, { withCredentials: true })
            goToHome();
        } catch (err) {
            console.log(err)
        }
    }//name은 username , password는 passport라이브러리쓰기때문에 이렇게해야한다고
    return (<>
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '100vh'
        }}>
            <form style={{
                display: 'flex', flexDirection: 'column',
                width: '300px', // 폼의 너비를 조절
            }}>
                <h2>Login</h2>
                <div style={{
                    position: 'relative',
                    margin: '10px 0',
                }}>
                    <input
                        id="username"
                        type="text"
                        name="username"
                        value={loginData.username}
                        onChange={handleChange}

                        style={{
                            background: 'transparent',
                            border: 'none',
                            borderBottom: 'solid 1px #ccc',
                            padding: '20px 0px 5px 0px',
                            fontSize: '14pt',
                            width: '100%',
                        }}
                    />
                    <label
                        htmlFor="username"
                        style={{
                            color: '#8aa1a1',
                            fontSize: '10pt',
                            pointerEvents: 'none',
                            position: 'absolute',
                            left: '0px',
                            top: '0px',
                            transition: 'all 0.2s ease',
                            WebkitTransition: 'all 0.2s ease',
                            MozTransition: 'all 0.2s ease',
                            OTransition: 'all 0.2s ease',
                        }}>
                        아이디
                    </label>
                </div>

                <div style={{
                    position: 'relative',
                    margin: '10px 0',
                }}>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={loginData.password}
                        onChange={handleChange}

                        style={{
                            background: 'transparent',
                            border: 'none',
                            borderBottom: 'solid 1px #ccc',
                            padding: '20px 0px 5px 0px',
                            fontSize: '14pt',
                            width: '100%',
                        }}
                    />
                    <label
                        htmlFor="password"
                        style={{
                            color: '#8aa1a1',
                            fontSize: '10pt',
                            pointerEvents: 'none',
                            position: 'absolute',
                            left: '0px',
                            top: '0px',
                            transition: 'all 0.2s ease',
                            WebkitTransition: 'all 0.2s ease',
                            MozTransition: 'all 0.2s ease',
                            OTransition: 'all 0.2s ease',
                        }}>
                        비밀번호
                    </label>
                </div>

                <div
                    id="noRegister"
                    onClick={() => { navigate('/register') }}
                    style={{
                        fontSize: '12px',
                        textAlign: 'right',
                        color: '#888',
                        margin: '5px 0',
                    }}>
                    회원이 아니신가요?
                </div>
                <button
                    className="submitBut"
                    type="submit"
                    onClick={checkLogin}
                    style={{
                        backgroundColor: '#3498db',
                        border: 'none',
                        color: 'white',
                        padding: '10px 32px',
                        textAlign: 'center',
                        textDecoration: 'none',
                        display: 'inline-block',
                        fontSize: '16px',
                        margin: '4px 2px',
                        cursor: 'pointer',
                        borderRadius: '0px',
                        width: '100%',
                    }}>
                    login
                </button>
            </form>
        </div>
    </>)
}
export default Login;
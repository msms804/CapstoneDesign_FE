import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
//**숙제 : 중복아이디 가입방지 & 로그인한 사람만 글작성가능
function Register() {
    const navigate = useNavigate();
    const [registerData, setRegisterData] = useState({
        username: null,
        password: null,
    })
    const goToHome = () => {
        navigate('/')
    }
    const handleChange = (e) => {
        setRegisterData({ ...registerData, [e.target.name]: e.target.value });
    }
    const doRegister = async (e) => {
        e.preventDefault(); // 폼 제출 방지
        try {
            await axios.post('http://localhost:8080/register', registerData, { withCredentials: true })
            goToHome();
        } catch (err) {
            console.log(err)
        }
    }


    return (<>
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '100vh'
        }}>
            <form style={{
                display: 'flex', flexDirection: 'column',
                width: '300px', // Adjust the width of the form
            }} onSubmit={doRegister}>
                <h4 style={{ marginBottom: '20px' }}>회원가입</h4>
                <div style={{
                    position: 'relative',
                    margin: '10px 0',
                }}>
                    <input
                        id="username"
                        type="text"
                        name="username"
                        value={registerData.username}
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
                        value={registerData.password}
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
                        }}>
                        패스워드
                    </label>
                </div>

                <button type="submit"
                    style={{
                        backgroundColor: '#ff0000',
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
                    register
                </button>
            </form>
        </div>
    </>)
}
export default Register;


/**
 * 참고
 * https://12716.tistory.com/entry/ReactJS-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%ED%8E%98%EC%9D%B4%EC%A7%80-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0
 */
function Login() {
    return (<>
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '100vh'
        }}>
            <form style={{ display: 'flex', flexDirection: 'column' }}>
                <label>아이디</label>
                <input type="id" />
                <br />
                <label>패스워드</label>
                <input type="password" />
                <br />
                <button formAction="">login</button>
            </form>

        </div>
    </>)
}
export default Login;
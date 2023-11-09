//마이페이지(프로필)
import axios from "axios";
import { useEffect, useState } from "react";

function MyPage() {
    const [name, setName] = useState('로그인하세요');
    axios.get('http://localhost:8080/mypage', { withCredentials: true })
        .then((response) => {
            console.log('로그인된 사용자 데이터:', response.data);
            setName(response.data.username)
        }).catch(error => {
            console.error('사용자 데이터를 가져오는 중 오류 발생:', error);
        });
    return (<>
        마이페이지
        <div>아이디 : {name}</div>
    </>)
}
export default MyPage;
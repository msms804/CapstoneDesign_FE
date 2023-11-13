//마이페이지(프로필)
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
function MyPage() {
    const navigate = useNavigate();
    const [name, setName] = useState('로그인하세요');
    const [reviews, setReviews] = useState([]);

    //useEffect안하면 어케되누? gpt는 하라는디
    useEffect(() => {
        axios.get('http://localhost:8080/mypage', { withCredentials: true })
            .then((response) => {
                console.log('로그인된 사용자 데이터:', response.data);
                setName(response.data.username)
                //리뷰 데이터 가져오기
                fetchReview();
            }).catch(error => {
                console.error('사용자 데이터를 가져오는 중 오류 발생:', error);
            });
    }, []);

    const fetchReview = async () => {
        try {
            const response = await axios.get('http://localhost:8080/card')
            setReviews(response.data);
            console.log("tlqkf", reviews);

        } catch (err) {
            console.log(err);
        }
    }
    return (<>
        <div>프로필이미지</div>
        <div>아이디 : {name}</div>
        <div>내 리뷰 수</div>
        <button onClick={() => { navigate('/upload') }}>영수증추가</button>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {reviews.map((review) => (//아하.. 12345를 넘겨주네;;
                <Card key={review._id} review={review} />
            ))}
        </div>
    </>)
}
export default MyPage;
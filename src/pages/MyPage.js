//마이페이지(프로필)
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
function MyPage() {
    const navigate = useNavigate();
    const [name, setName] = useState('로그인하세요');
    const [reviews, setReviews] = useState([]);
    const [myreview, setMyreview] = useState([]);

    //useEffect안하면 어케되누? gpt는 하라는디
    useEffect(() => {
        axios.get('http://localhost:8080/mypage', { withCredentials: true })
            .then((response) => {
                console.log('로그인된 사용자 데이터:', response.data);
                setName(response.data.username)
                //리뷰 데이터 가져오기
                fetchReview();
                //fetchMyReview();//내리뷰가져옴
            }).catch(error => {
                console.error('사용자 데이터를 가져오는 중 오류 발생:', error);
            });
    }, []);

    const fetchReview = async () => {
        try {
            const response = await axios.get('http://localhost:8080/card')
            setReviews(response.data);
        } catch (err) {
            console.log(err);
        }
    }
    const fetchMyReview = async () => {
        try {
            const response = await axios.get('http://localhost:8080/myReviews')
            console.log('내 리뷰 데이터:', response.data);
            setMyreview(response.data)
        } catch (error) {
            console.error('내 리뷰를 가져오는 중 오류 발생:', error);
        }
    }
    return (<>
        <div style={{ textAlign: "center" }}>
            <br />
            <br />
            <img
                src={process.env.PUBLIC_URL + "/profileImg.jpg"}
                alt="Profile Image"
                style={{ width: "100px", height: "100px", borderRadius: "50%" }}
            />
            <div style={{ marginTop: "10px" }}>{name} 님</div>
            <div>내 리뷰 수: {reviews.length}</div>
            <button
                onClick={() => { navigate('/upload') }}
                style={{
                    backgroundColor: "#0000FF",
                    border: "none",
                    color: "white",
                    padding: "10px 20px",
                    textAlign: "center",
                    textDecoration: "none",
                    display: "inline-block",
                    fontSize: "16px",
                    borderRadius: "30px", // 버튼을 동그랗게 만듭니다.
                    cursor: "pointer",
                    marginTop: "20px",
                }}>영수증추가</button>
        </div>
        <br />
        <br />
        <br /><br />
        <br />
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {
                reviews.map((review) => (
                    <Card key={review._id} review={review} />
                ))}
            {/*myreview.map((review) => (
                <Card key={review._id} review={review} />
            ))*/}
        </div>
    </>)
}
export default MyPage;
//review의 모든글 가져와서 뿌려주면됨
//카드컴포넌트를 뿌려주면됨
import axios from "axios";
import Card from "../components/Card";
import { useEffect, useState } from "react";

function Community() {
    const [reviews, setReviews] = useState([])
    const fetchReview = async () => {
        try {
            const response = await axios.get('http://localhost:8080/card')
            setReviews(response.data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchReview();
        //console.log(reviews);
    }, [])

    return (<>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {reviews && reviews.map((review) => (
                <Card key={review._id} review={review} />
            ))}
        </div>
    </>)
}
export default Community;
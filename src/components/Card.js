import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Card({ review }) {//useEffect 안하면 문제있나?
    const navigate = useNavigate();

    if (!review) {
        return <p>Loading...</p>; // 또는 다른 로딩 중 표시 방법을 사용
    }
    const handleClick = () => {
        navigate('/detail', { state: { title: review.title, img: review.img } });
    }
    //이제 여기서 detail 컴포넌트로 넘어가게 하면될듯 ^^ 그냥 props로 넘겨주면 되겟는데
    return (<>
        <div style={{ width: '25%', padding: '16px', boxSizing: 'border-box' }}
            onClick={handleClick}>
            <h3>{review.title}</h3>
            <img src={review.img} alt="Review Image" style={{ width: '100%' }} />
        </div>
    </>)
}
export default Card;
import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Card({ review }) {//useEffect 안하면 문제있나?
    const navigate = useNavigate();

    if (!review) {
        return <p>Loading...</p>; // 또는 다른 로딩 중 표시 방법을 사용
    }
    const handleClick = () => {
        navigate('/detail', { state: { title: review.title, content: review.content, img: review.img, cid: review._id } });
        // navigate(`/products/:id`)
    }
    //이제 여기서 detail 컴포넌트로 넘어가게 하면될듯 ^^ 그냥 props로 넘겨주면 되겟는데
    return (
        <>
            <div style={{
                width: '25%',
                padding: '16px',
                boxSizing: 'border-box',
                border: "1px solid gainsboro",
                background: "white",
                borderRadius: "10px",
                padding: "10px",
                margin: "10px",
                height: '300px', // 전체 높이 설정
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
            }}
                onClick={handleClick}
            >
                <div style={{ height: '90%', position: 'relative' }}>
                    <img src={review.img} alt="Review Image" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: "20px" }} />
                </div>
                <div style={{ textAlign: 'right', position: 'relative' }}>
                    <div style={{ position: 'absolute', bottom: '0', right: '0', fontWeight: 'bold', fontStyle: 'italic', fontFamily: 'Arial, sans-serif', fontSize: '18px' }}>
                        {review.title}
                    </div>
                </div>
            </div>
        </>
    )
}
export default Card;
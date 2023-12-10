import axios from "axios";
import React, { useState, useEffect } from 'react';
//작성한 사람도 써야함, 시간 넣을 수 있나?, ui를 댓글처럼, 댓글이없다면 --> 댓글작성해보세요

function Comments({ reviewId }) {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        //서버에서 댓글 가져오기
        axios.get(`http://localhost:8080/comments/${reviewId}`)
            .then(res => {
                setComments(res.data);
            })
            .catch(error => {
                console.error('댓글을 불러오는 중 오류 발생:', error);
            })
    }, [reviewId])

    const cardStyle = {
        border: "1px solid gainsboro",
        borderRadius: "10px",
        padding: "10px",
        margin: "10px",
        width: "800px", // 카드 너비 조정
        textAlign: "center",
        margin: 'auto',
    };

    return (<>
        <div>
            <h2>댓글 리스트</h2>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {comments.map(comment => (
                    <li key={comment._id} style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                        <img
                            src={process.env.PUBLIC_URL + "/user.png"}
                            alt="Profile Image"
                            style={{ width: "30px", height: "30px", borderRadius: "50%", marginRight: "10px" }}
                        />
                        <div>
                            <p style={{ fontWeight: 'bold', marginBottom: '5px' }}>{comment.username}</p>
                            <p style={{ marginBottom: '0' }}>{comment.comment}</p>
                        </div>
                        <hr style={{ margin: '5px 0', border: 'none', borderBottom: '1px solid #ccc' }} />
                    </li>
                ))}
            </ul>
        </div>
    </>)
}
export default Comments;
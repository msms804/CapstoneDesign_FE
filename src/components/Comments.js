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
    return (<>
        <h2>댓글 리스트</h2>
        <ul>

            {comments.map(comment => (
                <li key={comment._id}>
                    {comment.comment}
                </li>
                // 필요한 댓글 정보에 따라 UI 구성
            ))}
        </ul>
    </>)
}
export default Comments;
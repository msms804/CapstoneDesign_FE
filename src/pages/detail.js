//지도위에 있는거 눌렀을때 들어가지는 상세페이지
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Comments from "../components/Comments";
import axios from "axios";
function Detail() {
    const { state } = useLocation();
    const [comment, setComment] = useState('');
    const [name, setName] = useState('');
    const [reviewId, setReviewId] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8080/mypage', { withCredentials: true })
            .then((response) => {
                console.log('로그인된 사용자:', response.data.username)
                setName(response.data.username)
            }).catch(error => {
                console.error('사용자 데이터를 가져오는 중 오류 발생:', error);
            })
    })
    useEffect(() => {
        if (state) {
            console.log(state.title, state.img, state.cid);
            // 여기에서 상태 활용
            setReviewId(state.cid);
        }
    }, [state]);
    const cardStyle = {
        border: "1px solid gainsboro",
        borderRadius: "10px",
        padding: "10px",
        margin: "10px",
        width: "800px", // 카드 너비 조정
        textAlign: "center",
        margin: 'auto',
    };

    const imgStyle = {
        width: "600px",
        height: "600px",
        objectFit: "cover",
        borderRadius: "0",
        border: "2px solid lightgray", // 이미지에 외부 테두리 추가
        marginBottom: "10px",
    };

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    }
    const handleSubmitComment = () => {//comment, id, 현재 로그인한 사람의 유저네임
        console.log('제출된 댓글 :', comment);
        const { cid } = state || {};
        console.log('게시글id:', cid);

        axios.post('http://localhost:8080/comment', { comment, cid, name })
            .then(response => {
                console.log('댓글이 서버에 전송되었습니다.');
                setComment('');
            })
            .catch(error => {
                console.log('댓글을 전송하는 도중 오류 발생')
            })
    }
    return (
        <>
            <div style={cardStyle}>
                <img
                    src={state.img}
                    alt="Review Image"
                    style={imgStyle}
                />

                <h3
                    style={{
                        fontWeight: 'bold',
                        fontStyle: 'italic',
                        fontFamily: 'Arial, sans-serif',
                        fontSize: '18px',
                        margin: '0',
                    }}
                >
                    <br />
                    {state.title
                    }

                </h3>
                <br />
                <div style={{ fontSize: '14px' }}>
                    {state.content
                    }

                </div>
            </div>
            {/* 댓글 입력 폼 */}
            <div>
                <textarea
                    value={comment}
                    onChange={handleCommentChange}
                    placeholder="댓글 입력하세요" />
                <button onClick={handleSubmitComment}>댓글 작성</button>
            </div>
            {/* 댓글 리스트 , 해당 게시글 id에 해당하는 리스트들 가져옴*/}
            <Comments reviewId={reviewId} />
        </>
    );
}

export default Detail;
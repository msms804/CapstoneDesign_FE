import "../css/Review.css";
import { useState } from "react";
import axios from 'axios';

function Review() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (event) => {//여기서 redirect하는코드 짤수잇나?
        event.preventDefault();

        axios.post('http://localhost:8080/add', { title, content })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (<>
        <div className="review">
            <form onSubmit={handleSubmit}>
                <h4>글쓰기</h4>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                <input type="text" value={content} onChange={(e) => setContent(e.target.value)} />
                <button type="submit">전송</button>
            </form>
        </div>
    </>)
}
export default Review;
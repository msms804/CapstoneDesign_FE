import "../css/Review.css";
import { useState } from "react";
import axios from 'axios';
import EditorComponent from "../components/Editor";

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

            <h2>리뷰작성</h2>
            <br />
            <input type="file" name="img1" accept="image/*" />
            <EditorComponent />
        </div>
    </>)
}
export default Review;
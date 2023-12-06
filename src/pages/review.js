import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import EditorComponent from "../components/Editor";
import { useSelector } from "react-redux"

function Review() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [img1, setImg1] = useState(null);
    const [imgPreview, setImgPreview] = useState(null);
    const [username, setUsername] = useState(null);
    const navigate = useNavigate();

    axios.get('http://localhost:8080/add', { withCredentials: true })
        .then((response) => {
            console.log('로그인된 사용자 데이터:', response.data);
            setUsername(response.data.username)
        }).catch(error => {
            console.error('사용자 데이터를 가져오는 중 오류 발생:', error);
        });

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];

        if (selectedFile) {
            setImg1(event.target.files[0]);

            //이미지 미리보기 생성
            const reader = new FileReader();
            reader.onloadend = () => {
                setImgPreview(reader.result);
            }
            reader.readAsDataURL(selectedFile);
        }
    }

    const handleSubmit = async (event) => {//여기서 redirect하는코드 짤수잇나?
        //event.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('img1', img1);
        formData.append('username', username);

        try {
            const response = await axios.post('http://localhost:8080/add', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response);
        } catch (err) {
            console.log(err);
        }


    };
    //css
    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
    };

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        width: '300px',
    };

    const labelStyle = {
        display: 'block',
        fontSize: '14px',
        marginBottom: '5px',
    };

    const inputStyle = {
        width: '100%',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '3px',
        boxSizing: 'border-box',
        marginBottom: '10px',
    };

    const buttonStyle = {
        backgroundColor: '#3498db',
        color: 'white',
        padding: '10px',
        border: 'none',
        borderRadius: '3px',
        cursor: 'pointer',
        width: '100%',
    };
    return (<div style={containerStyle}>
        <form style={formStyle} encType="multipart/form-data" onSubmit={handleSubmit}>
            <h2>리뷰작성</h2>

            <div style={{ margin: '10px 0' }}>
                <label htmlFor="title" style={labelStyle}>가게명</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={title}
                    onChange={(e) => { setTitle(e.target.value) }}
                    style={inputStyle}
                />
            </div>

            <div style={{ margin: '10px 0' }}>
                <label htmlFor="content" style={labelStyle}>내용</label>
                <input
                    type="text"
                    id="content"
                    name="content"
                    value={content}
                    onChange={(e) => { setContent(e.target.value) }}
                    style={inputStyle}
                />
            </div>

            <div style={{ margin: '10px 0' }}>
                <label htmlFor="img1" style={labelStyle}>이미지 업로드</label>
                <input
                    type="file"
                    id="img1"
                    name="img1"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={inputStyle}
                />
            </div>

            {/* 이미지 미리보기 */}
            {imgPreview && (
                <img src={imgPreview} alt="이미지 미리보기" style={{ maxWidth: '100%', marginTop: '10px' }} />
            )}

            <br />
            <button type="submit" style={buttonStyle} >리뷰 작성</button>
        </form>
    </div>)
}
export default Review;
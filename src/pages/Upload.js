//영수증 등록 후 ocr
/**
 * 이미지 업로드 : https://as-you-say.tistory.com/381
 * 분석 버튼누르면 Loading -> Review 컴포넌트로 넘어가야
 * npm install --save @google-cloud/vision 이거 install해야
 * 디아블로 : https://4sii.tistory.com/604
 */
import { useEffect, useState } from "react";
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";

function Upload() {
    const navigate = useNavigate();
    //밑의 imageUrl 변수와 합칠수있을듯
    const [uploadImg, setUploadImg] = useState(null);
    //ocr전용변수
    const [imageUrl, setImageUrl] = useState('');
    //address는 리덕스로 관리해야할듯, 일단 props로 해보자..
    const [address, setAddress] = useState('');
    const [error, setError] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);//gpt

    useEffect(() => {
        console.log("서버에서 받아온 도로명주소:" + address);
    }, [address])

    //ocr처리함수
    const ocrImage = async () => {
        try {
            const response = await axios.post('http://localhost:8080/detectText', { imageUrl });
            if (response.data.address) {//address가 뭐지..
                setAddress(response.data.address)
                setError('');
            } else {
                setAddress('');
                setError('주소를 찾을 수 없습니다.');
                console.log("서버에서 받은것 없음");
            }
        } catch (e) {
            console.log('Error detecting text:', e);
            setError("서버오류발생");
        }
    }

    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];

        //파일업로드 로직 여기구현
        // 업로드된 파일을 상태로 설정하거나 다른 처리를 수행할 수 있습니다.
        //setUploadImg(file);
        setSelectedImage(file);
    }
    const handleDragOver = (event) => {
        event.preventDefault();
    }//input태그에서 value가 뭐지
    //gpt
    const handleUpload = async () => {
        try {
            const formData = new FormData();
            formData.append('image', selectedImage);

            const response = await axios.post('http://localhost:8080/detectText', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Server response', response.data);
        } catch (err) {
            console.error('Error uploading image:', err);
        }
        navigate('/review');
    }
    return (<>
        <br />
        <br />
        <br />
        <br />


        <h4 style={{ textAlign: 'center', margin: '2rem auto' }}>영수증 업로드</h4>
        <br />
        <br />

        <div style={{ display: "flex", flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
            onDrop={handleDrop}
            onDragOver={handleDragOver}>

            <div style={{
                width: '300px', height: '200px', border: '1px solid lightgray',
                display: 'flex', // 부모 요소에 대해 flex 속성을 추가합니다.
                alignItems: 'center', justifyContent: 'center'
            }}><h4>+</h4></div>
            {selectedImage && <p>업로드된 파일: {selectedImage.name}</p>}
            <br />
            <br />
            <br />
            {/**이미지 업로드 버튼 */}
            <button
                onClick={handleUpload}
                style={{
                    backgroundColor: '#0000FF', /* Green */
                    border: 'none',
                    color: 'white',
                    padding: '5px 10px',
                    textAlign: 'center',
                    textDecoration: 'none',
                    display: 'inline-block',
                    fontSize: '16px',
                    margin: '4px 2px',
                    cursor: 'pointer',
                    borderRadius: '5px',

                }}>이미지 업로드</button>
        </div>

    </>)
}
export default Upload;
//./ocrTestPic.jpg
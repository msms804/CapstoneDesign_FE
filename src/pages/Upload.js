//영수증 등록 후 ocr
/**
 * 이미지 업로드 : https://as-you-say.tistory.com/381
 * 분석 버튼누르면 Loading -> Review 컴포넌트로 넘어가야
 * npm install --save @google-cloud/vision 이거 install해야
 * 디아블로 : https://4sii.tistory.com/604
 */
import { useEffect, useState } from "react";
import axios from 'axios';

function Upload() {
    //밑의 imageUrl 변수와 합칠수있을듯
    const [uploadImg, setUploadImg] = useState(null);
    //ocr전용변수
    const [imageUrl, setImageUrl] = useState('');
    //address는 리덕스로 관리해야할듯, 일단 props로 해보자..
    const [address, setAddress] = useState('');
    const [error, setError] = useState('');

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
        setUploadImg(file);
    }
    const handleDragOver = (event) => {
        event.preventDefault();
    }//input태그에서 value가 뭐지
    return (<>
        영수증 등록하세요
        <br />
        <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}>
            <p>이곳에 파일을 끌어다 놓으세요</p>
            {uploadImg && <p>업로드된 파일: {uploadImg.name}</p>}
        </div>
        <br />
        <button>choose img</button>
        <hr />
        <input
            type="text"
            placeholder="Image URL"
            value={imageUrl}
            onChange={(e) => { setImageUrl(e.target.value) }} />
        <button onClick={ocrImage}>Analyze img</button>
        {address && <p>추출된주소 : {address}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
    </>)
}
export default Upload;
//./ocrTestPic.jpg
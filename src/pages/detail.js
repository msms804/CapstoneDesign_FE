//지도위에 있는거 눌렀을때 들어가지는 상세페이지
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
function Detail() {
    const { state } = useLocation();

    useEffect(() => {
        if (state) {
            console.log(state.title, state.img);
            // 여기에서 상태 활용
        }
    }, [state]);

    // 나머지 상세 페이지 컴포넌트 내용...

    return (<>
        <h4>상세페이지</h4>
        <h1>{state.title}</h1>
        <img src={state.img} alt="Review Image" style={{ maxWidth: '100px' }} />
    </>)
}
export default Detail;
import "../css/Review.css";
function Review() {
    return (<>
        <div className="review">
            <form>
                <h2>제목 입력하세요</h2>
                <textarea rows={1} cols={25}>제목입력하는곳</textarea>
                <br />
                사진업로드
                <h4>내용입력</h4>
                <textarea rows={7} cols={25}>내용입력하는곳</textarea>
                <br />
                <button>업로드</button>
            </form>
        </div>
    </>)
}
export default Review;
import '../css/Searchmodal.css';
function Searchmodal() {

    return (
        <>
            <div className="modal2" style={{ backgroundColor: '#4169E1', textAlign: 'center', padding: '10px' }}>
                <input type='search' />
                <button type='searchButton'>검색</button>
                <br /><br />
                <button style={{ backgroundColor: 'white', border: '1px solid white', borderRadius: '5px', padding: '1px 15px', marginRight: '10px' }}>내기록</button>
                <button style={{ backgroundColor: 'white', border: '1px solid white', borderRadius: '5px', padding: '1px 15px' }}>추천</button>            </div>
        </>
    )
}
export default Searchmodal;
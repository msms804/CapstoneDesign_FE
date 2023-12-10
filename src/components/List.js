//모달창으로 구현?
import React from "react";
function List({ searchResult }) {

    return (<>
        <ul style={{
            backgroundColor: 'white',
            padding: '10px',
            borderRadius: '5px',
            boxShadow: ' 0 0 10px rgba(0, 0, 0, 0.1)',
        }}>
            {searchResult && searchResult.map((item, index) => (
                <li key={index} style={{ borderBottom: '1px solid #ccc', marginBottom: '10px', paddingBottom: '10px', display: 'flex', alignItems: 'center' }}>
                    <div style={{ marginRight: '10px' }}>
                        <img src={item.img} alt="Review Image" style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '20px' }} />
                    </div>
                    <div>
                        {item.title}
                    </div>
                </li>
            ))}
        </ul>
    </>)
}
export default List;
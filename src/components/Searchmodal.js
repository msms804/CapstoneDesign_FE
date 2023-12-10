import React, { useEffect, useState } from 'react';
import axios from 'axios';
import List from './List';
import '../css/Searchmodal.css';
function Searchmodal() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResult, setSearchResult] = useState();
    const [modalOpen, setModalOpen] = useState(false);

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    }
    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/search?title=${searchTerm}`);
            const data = response.data;
            setSearchResult(data);
            setModalOpen(true);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    }

    const closeModal = () => {
        setModalOpen(false);
    }

    return (
        <>
            <div className="modal2" style={{ backgroundColor: ' #00FFC6 ', textAlign: 'center', padding: '10px', border: 'none' }}>
                <input type='search' onChange={handleInputChange} />
                <button
                    style={{ backgroundColor: 'white', border: '1px solid white', borderRadius: '5px', margin: '5px', padding: '1px 10px' }}
                    type='searchButton' onClick={handleSearch}>검색</button>
                <br /><br />
                <button style={{ backgroundColor: 'white', border: '1px solid white', borderRadius: '5px', padding: '1px 15px', marginRight: '10px' }}>내기록</button>
                <button style={{ backgroundColor: 'white', border: '1px solid white', borderRadius: '5px', padding: '1px 15px' }}>추천</button>
            </div>
            {/*모달영역 */}
            {modalOpen &&
                <div>
                    <span className='close' onClick={closeModal}>&times;</span>
                    <List searchResult={searchResult} />
                </div>
            }
        </>
    )
}
export default Searchmodal;
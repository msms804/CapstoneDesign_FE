/**
 * 리액트에서 네이버지도 링크
 * https://velog.io/@haute/React%EC%97%90%EC%84%9C-Naver-map-%EC%82%AC%EC%9A%A9%ED%95%B4%EB%B3%B4%EA%B8%B0
예제 : https://navermaps.github.io/maps.js.ncp/docs/tutorial-digest.example.html 
요거보고함
https://4sii.tistory.com/424
주소검색
https://bcdragonfly.tistory.com/56
리액트 주소검색
https://mingmeng030.tistory.com/221
리액트 네이버지도 api 문서
https://zeakd.github.io/react-naver-maps/
useState즉시반영 안됨
https://gyyeom.tistory.com/87
*/
import { Container as MapDiv, NaverMap, useNavermaps, InfoWindow, Marker, RenderAfterNavermapsLoaded, NavermapsProvider } from 'react-naver-maps';
import { useState, useEffect, useRef } from "react";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { updateCoordinates } from '../store';

function Map() {
    const { naver } = window;
    const dispatch = useDispatch();
    //주소검색함수에 넘겨줄 address 상태관리
    const [address, setAddress] = useState("");
    const [roadAddress, setRoadAddress] = useState("");
    // 클릭된 마커 정보를 저장하는 state
    const [clickedMarker, setClickedMarker] = useState(null);


    //변경가능성이 있는 위도, 경도, zoom을 useState 훅으로 상태관리
    const [lat, setLat] = useState(37.61);
    const [lng, setLng] = useState(127.01);
    const [zoom, setZoom] = useState(12);
    const [mapCenter, setMapCenter] = useState({ lat: 37.61, lng: 127.01 });

    //서버에서 주소 목록 가져오는 변수
    const [addresses, setAdresses] = useState([]);
    const [resArray, setResArray] = useState([]);
    const [coordinates, setCoordinates] = useState([]);

    function handleMarkerClick(marker) {
        setClickedMarker(marker); // 클릭된 마커 정보 설정
    }

    function closeInfoWindow() {
        setClickedMarker(null); // InfoWindow를 닫을 때 clickedMarker state 초기화
    }

    //서버에서 가져오는 함수

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://localhost:8080/address/map'); // 서버의 API 엔드포인트에 요청
                setAdresses(response.data); // 가져온 데이터를 상태에 설정

            } catch (error) {
                console.error('Error fetching address list:', error);
            }
        }
        fetchData();
    }, [])

    useEffect(() => {//잘되는것 확인
        console.log("서버에서 받아온 주소목록~:", addresses);
        const result = addresses.map(item => item.address);
        console.log(result); // result 변수에 주소 정보만 담긴 배열 출력
        setResArray(result);
    }, [addresses]);


    function searchAddressToCoordinate2(address) {
        // geocode에 입력받은 address를 query로써 전달
        naver.maps.Service.geocode({ query: address },
            function (status, response) {
                // 문제 발생 경우
                if (status !== naver.maps.Service.Status.OK) {
                    alert("Something Wrong!");
                } else {
                    // 제대로 된 쿼리가 들어가 response가 return된 경우
                    var result = response.v2,
                        items = result.addresses;
                    //console.log(result, items)
                    if (items.length > 0) {
                        let x = parseFloat(items[0].x); // 경도
                        let y = parseFloat(items[0].y); // 위도

                        // 새로운 좌표를 dispatch하여 리덕스 스토어에 전달합니다.
                        setCoordinates(prevCoordinates => {
                            const updatedCoordinates = [
                                ...prevCoordinates,
                                { latitude: y, longitude: x }
                            ];

                            // 여기서 업데이트된 좌표를 리덕스 스토어로 보냅니다.
                            console.log("디스패치로 액션을 전달하는 중입니다:", updatedCoordinates);
                            dispatch(updateCoordinates(updatedCoordinates));

                            return updatedCoordinates;
                        });
                        console.log("변환된 좌표출력", { latitude: y, longitude: x });
                    } else {
                        console.error("No coordinates found for the given address");
                    }
                }
            });
    }

    function mapAddress() {
        resArray.forEach((address) => {
            const trimmedAddress = address.replace(/['"]+/g, ''); // 따옴표를 정규식을 사용하여 제거한 후에 전달합니다.
            searchAddressToCoordinate2(trimmedAddress);
        });
    }
    useEffect(() => {
        if (resArray.length > 0) {
            mapAddress();
        }
    }, [resArray])
    useEffect(() => {
        if (coordinates.length > 0) {
            // 새로운 좌표가 추가될 때마다 맵의 중심을 해당 좌표로 변경
            const latestCoordinate = coordinates[coordinates.length - 1];
            setMapCenter({ lat: latestCoordinate.latitude, lng: latestCoordinate.longitude });
        }
    }, [coordinates]);
    useEffect(() => { console.log("좌표 값 변경:", coordinates); }, [coordinates]);


    return (<>
        <NavermapsProvider
            ncpClientId="hbv3q9pafa"
            submodules={["geocoder"]}>
            <MapDiv style={{
                width: '100%',
                height: '600px',
            }}>

                <NaverMap
                    mapDivId={"maps-getting-started-uncontrolled"}
                    center={mapCenter}
                    defaultZoom={12}
                    zoom={zoom}
                    minZoom={1}
                    enableWheelZoom={true}
                >
                    {coordinates.map((coord, index) => (
                        <Marker
                            key={`${coord.latitude}-${coord.longitude}-${index}`} // 좌표와 index를 조합해 고유한 key 생성
                            position={new naver.maps.LatLng(coord.latitude, coord.longitude)}
                            onClick={() => { handleMarkerClick(coord) }}
                        />
                    ))}

                    {/* 클릭된 마커에 대한 InfoWindow */}
                    {clickedMarker && (
                        <InfoWindow
                            position={new naver.maps.LatLng(clickedMarker.latitude, clickedMarker.longitude)}
                            onCloseClick={closeInfoWindow} // InfoWindow를 닫는 이벤트 처리
                        >
                            <div>
                                <h3>도로명 주소: {clickedMarker.roadAddress}</h3>
                                <p>위도: {clickedMarker.latitude}</p>
                                <p>경도: {clickedMarker.longitude}</p>
                                {/* 기타 원하는 정보 표시 */}
                            </div>
                        </InfoWindow>
                    )}
                </NaverMap >
            </MapDiv>
        </NavermapsProvider>
    </>)
}

export default Map;
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
import { UseSelector, useSelector } from 'react-redux';


function Map() {
    const { naver } = window;
    //주소검색함수에 넘겨줄 address 상태관리
    const [address, setAddress] = useState("");
    const [roadAddress, setRoadAddress] = useState("");

    //변경가능성이 있는 위도, 경도, zoom을 useState 훅으로 상태관리
    const [lat, setLat] = useState(37.61);
    const [lng, setLng] = useState(127.01);
    const [zoom, setZoom] = useState(12);

    //리덕스에서 꺼내쓰는 변수 --> 리덕스가아니라 그냥 db에저장해두고 뿌리는게 낫겠는데..
    let adrs = useSelector((state) => { return state.adrs })
    console.log(adrs);//for test

    //주소 검색 시, 주소창의 change event 감지
    const handleChange = (e) => {
        const { address, value } = e.target;//이게 객체형태인가봐? 확인해보자
        const newAddress = { address: value };
        setAddress(newAddress);
    }
    //검색버튼 누르면 동작함수
    function searchAddressToCoordinate(address) {
        //geocode에 입력받은 address를 query로써 전달
        naver.maps.Service.geocode({ query: address },
            function (status, response) {
                //문제발생경우
                if (status != naver.maps.Service.Status.OK) return alert("Something Wrong!");

                //제대로 된 쿼리가 들어가 response 가 return 되는 경우
                var result = response.v2, items = result.addresses;

                let x = parseFloat(items[0].x);//경도
                let y = parseFloat(items[0].y);//위도

                setLat(y);//상태변경
                setLng(x);
                setZoom(15);
                setRoadAddress(items[0].roadAddress);//도로명주소

                console.log(x, y);//여기까지 뽑아냄
                console.log(lat, lng);//왜 안바뀜..? --> state비동기때문임 공부해봐
                console.log(zoom);      //왜 안바뀜..?
            });
    }
    return (<>
        <form>
            <input id="address" type="text" placeholder="검색할 주소" onChange={handleChange} />
            <input id="submit" type="button" value="주소검색" onClick={() => { searchAddressToCoordinate(address.address) }} />
        </form>
        <NavermapsProvider
            ncpClientId="hbv3q9pafa"
            submodules={["geocoder"]}>
            <MapDiv style={{
                width: '100%',
                height: '600px',
            }}>

                <NaverMap
                    mapDivId={"maps-getting-started-uncontrolled"}
                    center={{ lat: lat, lng: lng }}
                    defaultZoom={12}
                    zoom={zoom}
                    minZoom={12}
                    enableWheelZoom={false}
                >
                    {(zoom == 15) && < Marker
                        position={{ lat: lat, lng: lng }}
                        title={roadAddress}
                        clickable={true}
                    />}
                </NaverMap >
            </MapDiv>
        </NavermapsProvider>
    </>)
}

export default Map;
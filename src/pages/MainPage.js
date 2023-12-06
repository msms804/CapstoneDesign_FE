import Searchmodal from '../components/Searchmodal';
import Map from '../components/Map';

function MainPage() {
    return (<>
        <div style={{ height: "100%" }}>
            <div style={{ position: 'absolute', zIndex: '1' }}>
                <Searchmodal />
            </div>
            <div style={{ zIndex: '0', width: '100%', height: "100%" }}>
                <Map />
            </div>
        </div>
    </>)
}
export default MainPage;

import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { FC } from 'react';
import { useLeafletFix } from './map-icon';

export interface MapProps {
    className?: string;
    position: [number, number];
    mapChangeHandler?: (x: number, y: number) => void;
}


const Map: FC<MapProps> = ({ className, position, mapChangeHandler }) => {
    // const markerRef = useRef<Leaflet.Marker>(null);
    useLeafletFix();

    return (
        <MapContainer
            preferCanvas={true}
            className={`${className && className} relative z-50 h-[250px] rounded-2xl lg:w-full`}
            center={position}
            zoom={10}
            scrollWheelZoom={true}
        >
            <TileLayer
                attribution={
                    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker /* ref={markerRef} */ position={position}></Marker>
            {/* {mapChangeHandler && <MarkerInCenter />} */}
        </MapContainer>
    );
};
export default Map;
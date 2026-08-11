import L from 'leaflet';
import { useEffect } from 'react';
import { Marker } from 'react-leaflet'; 

export const useLeafletFix = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl;

      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl:
          'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl:
          'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      });
    }
  }, []);
};

interface CustomMarkerProps {
  position: [number, number];
  iconSize?: [number, number];
  customIconUrl?: string;
}

export const CustomMarker: React.FC<CustomMarkerProps> = ({
  position,
  iconSize = [50, 59],
  customIconUrl,
}) => {
  const iconUrl: string =
    customIconUrl || ('' as unknown as { src: string }).src;

  const customIcon = L.icon({
    iconUrl,
    iconSize,
    iconAnchor: [iconSize[0] / 2, iconSize[1]],
    popupAnchor: [0, -iconSize[1]],
    shadowUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    shadowSize: [41, 41],
    shadowAnchor: [12, 41],
  });

  return <Marker position={position} icon={customIcon} />;
};

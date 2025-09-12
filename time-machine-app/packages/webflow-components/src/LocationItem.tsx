import "./LocationItem.css";
import { selectedLocationId } from "./store";

export type LocationItemProps = {
  name: string;
  address: string;
  distance?: number;
  locationId: string;
};

export default function LocationItem({
  name,
  address,
  distance,
  locationId,
}: LocationItemProps) {
  return (
    <div
      className="location-item"
      onClick={() => selectedLocationId.set(locationId)}
    >
      <h3>{name}</h3>
      <p>{address}</p>
      {distance !== undefined && (
        <p>
          <strong>Distance:</strong> {distance.toFixed(2)} km
        </p>
      )}
    </div>
  );
}

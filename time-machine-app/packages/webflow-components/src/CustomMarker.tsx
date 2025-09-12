import "./CustomMarker.css";

type CustomMarkerProps = {
  selected: boolean;
};

export default function CustomMarker({ selected }: CustomMarkerProps) {
  const className = selected ? "custom-marker selected" : "custom-marker";
  return <div className={className} />;
}

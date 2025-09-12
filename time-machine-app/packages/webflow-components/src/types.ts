export type Location = {
  id: string; // Webflow item IDs are strings
  name: string;
  address: string;
  lat: number;
  lng: number;
  phone: string;
  distance?: number;
};

export type WebflowItem = {
  id: string;
  fieldData: {
    name: string;
    address: string;
    latitude: number;
    longitude: number;
    "phone-number": string;
  };
};

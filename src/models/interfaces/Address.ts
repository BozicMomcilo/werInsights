export interface Address {
    id: string;
    city: string;
    country: string;
    coordinates?: string; // Format: "latitude,longitude"
    postal_code: string;
    street_name: string;
    street_number: string;
} 
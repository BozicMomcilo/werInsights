export interface LocalizedString {
    id: string;
    localizedValue: {
        [key: string]: string; // Format: 'en', 'de', 'fr', etc.
    };
} 
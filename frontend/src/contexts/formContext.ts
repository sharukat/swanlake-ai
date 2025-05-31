import { createContext } from 'react';

interface ContextType {
    image: string;
    setImage: (image: string) => void;
    userLocation: {
        latitude: number;
        longitude: number;
    } | null
    setUserLocation: (location: { latitude: number; longitude: number } | null) => void;
}
const Context = createContext<ContextType>({
    image: "",
    setImage: () => { },
    userLocation: null,
    setUserLocation: () => { },

});

export default Context;
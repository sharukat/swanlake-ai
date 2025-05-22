import { createContext } from 'react';

interface ContextType {
    image: string;
    setImage: (image: string) => void;
}
const Context = createContext<ContextType>({
    image: "",
    setImage: () => {}
});

export default Context;
// contexts/chat-context.tsx
import {createContext} from 'react';

interface ContextType {
    names: string[];
    images: string[];
    setImages: (images: string[]) => void;
    response: string[];
    setResponse: (response: string[]) => void;
    fetchNames: (collection_name: string) => Promise<void>;
    generate: (collection_name: string, name: string) => Promise<void>;
    name: string;
    setName: (name: string) => void;
    status: boolean;
    setStatus: (status: boolean) => void;
}

const Context = createContext<ContextType>({
        names: [],
        images: [],
        setImages: () => Promise.resolve(),
        response: [],
        setResponse: () => Promise.resolve(),
        fetchNames: () => Promise.resolve(),
        generate: () => Promise.resolve(),
        name: "",
        setName: () => {},
        status: false,
        setStatus: () => {}
    }
);

export default Context;

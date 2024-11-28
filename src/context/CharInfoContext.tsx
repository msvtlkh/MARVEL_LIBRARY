import React, { createContext, useState } from "react";

interface charStateInterface {
    charId: number
    loading: boolean
}

interface CharInfoContextInterface {
    charState: charStateInterface
    setCharState: React.Dispatch<React.SetStateAction<charStateInterface>>
}

export const CharInfoContext = createContext<CharInfoContextInterface | null>(null)

const CharInfoProvider = ({ children } : {children: React.ReactNode}) => {
    const [ charState, setCharState ] = useState<charStateInterface>(
        {
            charId: 0,
            loading: false,
        }
    )

    return (
        <CharInfoContext.Provider value={{ charState, setCharState }}>
            { children }
        </CharInfoContext.Provider>
    )
}

export default CharInfoProvider
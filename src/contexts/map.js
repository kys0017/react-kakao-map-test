import React, { useState } from 'react';

export const MapContext = React.createContext({
    state: {
        center: {
            x: '127.062835',
            y: '37.50802',
        },
        level: 3,
    },
    actions: {
        setCenter: () => {},
        setLevel: () => {},
    },
});

export const MapProvider = ({ children }) => {
    const [center, setCenter] = useState({});
    const [level, setLevel] = useState(3);

    const value = {
        state: { center, level },
        actions: { setCenter, setLevel },
    };

    return <MapContext.Provider value={value}>{children}</MapContext.Provider>;
};

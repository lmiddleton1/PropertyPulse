'use client';

import { createContext, useContext, useState, useEffect } from 'react';

import { useSession } from 'next-auth/react';

import getUnreadMessegeCount from '@/app/actions/getUnreadMessageCount';

// Create Context

const GlobalContext = createContext();

// Create Provider

export function GlobalProvider({ children }) {
    const [unreadCount, setUnreadCount] =useState(0);

    const { data: session } = useSession();

    useEffect(() => {
        if (session && session.user) {
            getUnreadMessegeCount().then((res) => {
                if(res.count) setUnreadCount(res.count)
            })

        
        }
    }, [getUnreadMessegeCount, session]);

    return (
        <GlobalContext.Provider value={{
            unreadCount,
            setUnreadCount
        }}>
            { children }

            </GlobalContext.Provider>
    );
}


export function useGlobalContext() {
    return useContext(GlobalContext);
}

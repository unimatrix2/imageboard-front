import { Context } from '../context/Context';
import { useEffect, useContext } from 'react';

export default function useDisplay() {

    const { dispatch } = useContext(Context);

    const displayProvider = () => {
        dispatch({
            type: 'PROVIDE-WINDOW',
            payload: {
                width: window.innerWidth,
                height: window.innerHeight,
                breakpoint: window.innerWidth <= 599 ? 'xs'
                : window.innerWidth <= 959 ? 'sm'
                : window.innerWidth <= 1279 ? 'md'
                : window.innerWidth <= 1919 ? 'lg'
                : 'xl'
            }
        });
    }

    useEffect(() => {
		displayProvider();
		window.addEventListener("resize", displayProvider);
        return () => window.removeEventListener("resize", displayProvider);
    }, []);
}
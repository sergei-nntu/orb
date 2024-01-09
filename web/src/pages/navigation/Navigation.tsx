import React, { useEffect } from 'react';

import useHttp from '../../hooks/Http/Http';

export default function Navigation() {
    // FIXME: only for testing
    const { request } = useHttp();
    useEffect(() => {
        request('/get_joint_trajectory').then((r) => {
            console.log(r);
        });
    }, []);

    return <h1>Navigation</h1>;
}

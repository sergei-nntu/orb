import React, {ReactElement} from 'react';

type LayoutProps = { children: ReactElement; };

export default function Layout(props: LayoutProps) {
    return (
        <>
            {props.children}
        </>
    );
}
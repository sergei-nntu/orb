import React, {ReactElement} from 'react';
import MenuAppBar from "../../components/AppBar/AppBar";

type LayoutProps = { children: ReactElement; };

export default function Layout(props: LayoutProps) {
    return (
        <>
            <MenuAppBar/>
            {props.children}
        </>
    );
}
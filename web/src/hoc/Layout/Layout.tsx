import React, {ReactElement} from 'react';
// import MenuAppBar from "../../components/AppBar/AppBar";

type LayoutProps = { children: ReactElement; };

// FIXME: likely we don't need it
export default function Layout(props: LayoutProps) {
    return (
        <>
            {/*<MenuAppBar />*/}
            {props.children}
        </>
    );
}
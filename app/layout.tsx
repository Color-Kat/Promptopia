import {FC, PropsWithChildren} from "react";
import "@styles/globals.scss";

const Layout: FC<PropsWithChildren> = ({children}) => {


    return (
        <html lang="eng">
        <body>

        <div className="main">
            <div className="gradient" />
        </div>

        <main className="app">
            {children}
        </main>

        </body>
        </html>
    );
};

export default Layout;
import {FC, PropsWithChildren} from "react";
import "@styles/globals.scss";
import {Nav} from "@components/Nav";
import {Provider} from "@components/Provider";

export const metadata = {
    title: "Promptopia",
    description: "Discover & Share AI Prompts",
}

const RootLayout: FC<PropsWithChildren> = ({children}) => {
    return (
        <html lang="eng">
        <body>

        <Provider>

            <div className="main">
                <div className="gradient"/>
            </div>

            <main className="app">
                <Nav/>
                {children}
            </main>

        </Provider>

        </body>
        </html>
    );
};

export default RootLayout;
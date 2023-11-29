import {NextPage} from 'next';
import {Feed} from "@components/Feed";
import {Suspense} from "react";

const Home: NextPage = ({}) => {

    return (
        <section className="w-full flex-center flex-col">
            <h1 className="head_text text-center">
                Discover & Share
                <br className="max-md:hidden"/>
                <span className="text-center orange_gradient"> AI-powered Prompts</span>
            </h1>

            <p className="desc text-center">
                Promptopia is an open-source AI prompting tool for modern world to discover, create and share creative prompts
            </p>

            <Suspense fallback={<>Загрузка...</>}>
                <Feed />
            </Suspense>
        </section>
    );
};

export default Home
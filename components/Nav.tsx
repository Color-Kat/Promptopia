'use client';

import React, {memo, FC, useState, useEffect} from 'react';
import {signIn, signOut, useSession, getProviders} from 'next-auth/react';
import Link from "next/link";
import Image from "next/image";
import {Provider, ProviderType} from "@node_modules/next-auth/providers";

interface NavProps {

}

export const Nav: FC<NavProps> = memo(({}) => {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(true);

    const [providers, setProviders] = useState<null | Provider[]>(null);
    const [toggleDropdown, setToggleDropdown] = useState(false);

    useEffect(() => {
        const initProviders = async () => {
            const response = await getProviders();
            setProviders(response as any);
        }

        initProviders();
    }, []);

    return (
        <nav className="flex-between w-full mb-16 pt-3">
            <Link href="/" className="flex gap-2 flex-center">
                <Image
                    src="/assets/images/logo.svg"
                    alt="Promptopia logo"
                    width={30}
                    height={30}
                    className="object-contain"
                />

                <p className="logo_text">Promptopia </p>
            </Link>

            {/*  Desktop Navigation  */}
            <div className="sm:flex hidden">
                {isUserLoggedIn ? (
                    <div className="flex gap-3 md:gap-5">
                        <Link
                            href="/create-prompt"
                            className="black_btn"
                        >
                            Create Post
                        </Link>

                        <button
                            type="button"
                            onClick={() => signOut()}
                            className="outline_btn"
                        >
                            Sign Out
                        </button>

                        <Link href="/profile">
                            <Image
                                src="/assets/images/logo.svg"
                                width={37}
                                height={37}
                                alt="profile"
                                className="rounded-full"
                            />
                        </Link>
                    </div>
                ) : (
                    <>
                        {providers &&
                            Object.values(providers).map((provider) => (
                                <button
                                    key={provider.name}
                                    onClick={() => signIn(provider.id)}
                                    className="black_btn"
                                >
                                    Sign In
                                </button>
                            ))

                        }
                    </>
                )}
            </div>

            {/*  Mobile Navigation  */}
            <div className="sm:hidden flex relative">
                {isUserLoggedIn ? (
                    <div className="flex">
                        <Image
                            src="/assets/images/logo.svg"
                            width={37}
                            height={37}
                            alt="profile"
                            className="rounded-full"
                            onClick={() => setToggleDropdown(prev => !prev)}
                        />

                        {toggleDropdown && (
                            <div className="dropdown">
                                {/* My Profile*/}
                                <Link
                                    href="/profile"
                                    className="dropdown_link"
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    My Profile
                                </Link>

                                <Link
                                    href="/create-prompt"
                                    className="dropdown_link"
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    Create Prompt
                                </Link>

                                <button
                                    type="button"
                                    className="mt-5 w-full black_btn"
                                    onClick={() => {
                                        setToggleDropdown(false);
                                        signOut();
                                    }}
                                >
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        {providers &&
                            Object.values(providers).map((provider) => (
                                <button
                                    key={provider.name}
                                    onClick={() => signIn(provider.id)}
                                    className="black_btn"
                                >
                                    Sign In
                                </button>
                            ))
                        }
                    </>
                )}
            </div>
        </nav>
    );
});
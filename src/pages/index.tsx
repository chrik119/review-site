import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "../utils/api";
import { useState } from "react";

const Home: NextPage = () => {
  const [dropDownActive, setDropDownActive] = useState(false);
  return (
    <>
      <Head>
        <title>IMO Reviews</title>
        <meta name="description" content="Latest Review" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex max-h-screen min-h-screen min-w-full flex-col items-start justify-start bg-gradient-to-b from-[#089ee9] to-[#6406f0] p-2 text-center">
        <nav className="flex max-h-14 min-w-full justify-between rounded-lg bg-slate-50 py-3 pl-3">
          <div className="text-2xl">IMO Reviews</div>
          <ul className="hidden justify-between space-x-3 pr-3 sm:flex">
            <li>Favorites</li>
            <li>Categories</li>
            <li>Sign In</li>
          </ul>
          <div className="flex justify-between space-x-3 sm:hidden">
            <div className="text-right">
              <div className="bg-slate-50 pr-3">
                <button
                  onClick={() => {
                    setDropDownActive(!dropDownActive);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </svg>
                </button>
              </div>
              {dropDownActive && (
                <div className="">
                  <div className="rounded-tl-lg bg-slate-100 px-3">
                    Favorites
                  </div>
                  <div className="bg-slate-200 px-3">Categories</div>
                  <div className="rounded-b-lg bg-slate-300 px-3">Sign In</div>
                </div>
              )}
            </div>
          </div>
        </nav>
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};

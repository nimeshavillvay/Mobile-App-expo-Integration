import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Not Found",
};

const NotFound = () => {
  return (
    <div className="grid size-full place-items-center">
      <div className="mb-32 mt-28 text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="96"
          height="96"
          fill="none"
          viewBox="0 0 96 96"
          className="mx-auto mb-[42px]"
        >
          <path
            fill="#BDBDBD"
            d="M82.38 4.5H13.62c-4.97 0-9 4.031-9 9v68.88c0 4.969 4.03 9 9 9h68.76c4.968 0 9-4.031 9-9V13.62a8.997 8.997 0 00-2.595-6.442A8.997 8.997 0 0082.38 4.5zm-68.76 3h68.76a6.001 6.001 0 016 6v9H7.5v-9a6.003 6.003 0 016.12-6zm68.76 81H13.62c-3.315 0-6-2.685-6-6v-57h81v57a6.007 6.007 0 01-1.842 4.331A6.007 6.007 0 0182.38 88.5z"
          />
          <path
            fill="#BDBDBD"
            d="M81 15c0 4.001-6 4.001-6 0s6-4.001 6 0zM69 15c0 4.001-6 4.001-6 0s6-4.001 6 0zM57 15c0 4.001-6 4.001-6 0s6-4.001 6 0zM54 43.5H42a1.5 1.5 0 00-1.5 1.5v21a1.502 1.502 0 001.5 1.5h12a1.502 1.502 0 001.5-1.5V45a1.501 1.501 0 00-1.5-1.5zm-1.5 21h-8.91v-18h8.82l.09 18zM33.99 43.5a1.5 1.5 0 00-1.5 1.5v9.96h-8.82V45a1.501 1.501 0 10-3 0v11.46a1.53 1.53 0 001.5 1.5h10.32V66a1.502 1.502 0 002.561 1.061c.282-.281.439-.664.439-1.061V45a1.502 1.502 0 00-1.5-1.5zM73.83 43.5a1.5 1.5 0 00-1.5 1.5v9.96h-8.82V45a1.501 1.501 0 10-3 0v11.46a1.53 1.53 0 001.5 1.5h10.32V66a1.502 1.502 0 001.5 1.5 1.502 1.502 0 001.5-1.5V45a1.502 1.502 0 00-1.5-1.5z"
          />
        </svg>

        <h1 className="font-title text-2xl font-bold capitalize leading-7 text-wurth-gray-800">
          Page not found
        </h1>

        <h2 className="text-sm uppercase leading-4 text-wurth-gray-400">
          404 error
        </h2>

        <p className="mx-auto mb-6 mt-9 max-w-96 text-base leading-5 text-wurth-gray-500">
          The link you clicked may be broken or the page may have been removed.
        </p>

        <Link
          href="/"
          className="btnAction mx-auto block max-w-fit rounded-sm bg-wurth-blue-450 p-2 px-3.5 py-2 font-extrabold uppercase text-white"
          data-btn-action="Not FoundGo To Home Page"
        >
          Go to homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

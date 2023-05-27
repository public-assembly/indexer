import Link from "next/link";

export const Header = () => {
    return (
        <div className="  flex flex-row justify-start ml-[16px] sm:justify-start fixed flex-wrap text-[15px] top-[20px] w-full space-x-4 z-10">
            <div className="tracking-[0px] flex flex-row justify-start flex-wrap">
                <Link className="hover:underline" href="/">baby-indexer</Link>
            </div>
            <div className="tracking-[0px] flex flex-row justify-start flex-wrap">
                <Link className="hover:underline" href="/create">create</Link>
            </div>            
        </div>
    );
};
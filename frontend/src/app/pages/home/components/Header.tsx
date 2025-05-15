import { Link } from "react-router-dom";
import TopBar from "./TopBar";

export default function Header() {
  return (
    <header className=" relative w-full px-6 py-4 shadow-md flex items-center justify-start bg-white">
      <div className="text-2xl font-bold text-primary tracking-tight z-10">
        <Link to={'/home'} >
          <span className="text-blue-600">Shop</span>
          <span className="text-gray-800">Tudo</span>
        </Link>
      </div>
      <div className="z-1 absolute right-0">
        <TopBar />
      </div>
    </header>
  );
}

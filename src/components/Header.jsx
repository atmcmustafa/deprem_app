import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { IoMoonSharp } from "react-icons/io5";
import { MdWbSunny } from "react-icons/md";

const Header = ({ onClick, filter }) => {
  const { toggleTheme, theme } = useContext(ThemeContext);
  return (
    <div className="">
      <header className="flex duration-300 justify-between items-center max-w-6xl mx-auto py-4 dark:text-zinc-100">
        <h1>Son Depremler</h1>
        <div className="flex gap-8 md:gap-4 items-center">
          <button
            className="rounded-lg h-8 w-16 text-sm bg-slate-700 flex items-center justify-center text-zinc-100 "
            onClick={onClick}
          >
            Yenile
          </button>
          <button
            className="rounded-lg h-8 w-16 text-sm bg-slate-700 flex items-center justify-center text-zinc-100 "
            onClick={filter}
          >
            Filtrele
          </button>

          <span className="cursor-pointer" onClick={toggleTheme}>
            {theme === "light" ? (
              <IoMoonSharp size={24} />
            ) : (
              <MdWbSunny size={24} />
            )}
          </span>
        </div>
      </header>
    </div>
  );
};

export default Header;

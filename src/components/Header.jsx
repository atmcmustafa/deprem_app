import { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { IoMoonSharp } from "react-icons/io5";
import { MdWbSunny } from "react-icons/md";

const Header = ({ onClick, filter, value, onChange }) => {
  const { toggleTheme, theme } = useContext(ThemeContext);

  const [visible, setVisible] = useState(false);

  return (
    <div className="">
      <header className="flex duration-300 justify-between items-center max-w-6xl mx-auto py-4 dark:text-zinc-100">
        <h1>Son Depremler</h1>
        <div className="flex gap-4 items-center relative">
          <button
            className="rounded-lg h-8 w-16 text-sm bg-slate-700 flex items-center justify-center text-zinc-100 "
            onClick={onClick}
          >
            Yenile
          </button>
          <div className="">
            <button
              onClick={() => setVisible(!visible)}
              className={`rounded-lg h-8 w-16 text-sm bg-slate-700 flex items-center justify-center text-zinc-100 `}
            >
              Filtrele
            </button>
            <div
              className={`flex bg-slate-600 text-white md:text-black dark:text-white rounded md:bg-transparent items-center gap-2 px-1 mt-3 z-20 absolute -left-10 transition-all duration-300 ${
                visible === true ? " opacity-100 " : "opacity-0 invisible"
              }`}
            >
              <span>{value}</span>
              <input
                min={1}
                max={10}
                type="range"
                value={value}
                onChange={onChange}
              />
              <button
                className="rounded-lg h-8 w-16 text-sm bg-slate-700 flex items-center justify-center text-zinc-100 "
                onClick={filter}
              >
                Ara
              </button>
            </div>
          </div>
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

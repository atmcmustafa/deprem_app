import Header from "./components/Header";
import Card from "./components/Card";
import { useEffect } from "react";
import { useState } from "react";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";
import { Link, useParams } from "react-router-dom";

const App = () => {
  const [result, setResult] = useState();
  const [filteredResult, setFilteredResult] = useState([]);
  const [filteredMag, setFilteredMag] = useState([]);
  const [value, setValue] = useState(1);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isButtonVisible = scrollY > 20;

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const getApi = async () => {
    const url = "https://api.orhanaydogdu.com.tr/deprem/kandilli/live";
    try {
      const res = await fetch(url);
      const data = await res.json();
      setResult(data);
      console.log(result);
    } catch (error) {
      console.log("error");
      toast.error(error);
    }
  };

  const filterMag = async () => {
    const url = "https://api.orhanaydogdu.com.tr/deprem/kandilli/live";

    try {
      const res = await fetch(url);
      const data = await res.json();
      setFilteredResult(data.result);

      const filteredMagResults = data.result.filter(
        (filtered) => filtered.mag > value
      );
      setFilteredMag(filteredMagResults);

      if (filteredMagResults.length === 0) {
        toast.error(`${value} büyüklüğü üstünde deprem bulunamadı!`);
      } else {
        toast.success(
          `${value} büyüklüğü üstünde ${filteredMagResults.length} deprem bulundu!`
        );
      }
    } catch (error) {
      console.log("error");
      toast.error(error);
    }
  };

  useEffect(() => {
    getApi();
  }, []);

  const refreshPage = () => {
    setResult("");
    getApi();
    setFilteredMag([]);
    setFilteredResult([]);
  };

  return (
    <div className="dark:bg-gray-800 duration-300 px-4 md:px-0 relative">
      <div>
        <Toaster />
      </div>
      {isButtonVisible && (
        <button
          className="btn h-8 w-8 duration-300 rounded bottom-6 right-6 fixed dark:bg-slate-100/50 bg-zinc-600/50  flex items-center justify-center z-50"
          onClick={scrollToTop}
        >
          <MdOutlineKeyboardArrowUp size={24} />
        </button>
      )}

      <div className="container mx-auto">
        <Header
          value={value}
          onChange={(e) => setValue(e.target.value)}
          filter={() => filterMag()}
          onClick={() => refreshPage()}
        />
        <h2 className="text-center mb-4 dark:text-zinc-100 duration-300">
          {result
            ? "Son 24 saatte " + result.metadata.total + " deprem tespit edildi"
            : ""}
        </h2>

        <div className="max-w-6xl mx-auto">
          {filteredMag.length > 0 ? (
            <div className="relative">
              {filteredMag ? (
                filteredMag.map((data, index) => {
                  const nowTime = new Date();
                  const time = new Date(data.date);

                  const elapsed = nowTime.getTime() - time.getTime();
                  const secondAgo = Math.floor(elapsed / 1000);
                  const minutesAgo = Math.floor(secondAgo / 60);
                  const hourAgo = Math.floor(minutesAgo / 60);

                  return (
                    <Link key={index} to={`/details/${data.earthquake_id}`}>
                      <Card
                        date={data.date}
                        depth={data.depth}
                        elapsed_time={
                          hourAgo < 24
                            ? hourAgo === 0
                              ? `• ${minutesAgo} dakika önce`
                              : `• ${hourAgo} saat önce`
                            : ""
                        }
                        mag={data.mag}
                        title={data.title}
                        key={index}
                      />
                    </Link>
                  );
                })
              ) : (
                <span className="loader"></span>
              )}
            </div>
          ) : (
            <div>
              {result ? (
                result.result.map((data, index) => {
                  const nowTime = new Date();
                  const time = new Date(data.date);

                  const elapsed = nowTime.getTime() - time.getTime();
                  const secondAgo = Math.floor(elapsed / 1000);
                  const minutesAgo = Math.floor(secondAgo / 60);
                  const hourAgo = Math.floor(minutesAgo / 60);

                  return (
                    <Link key={index} to={`/details/${data.earthquake_id}`}>
                      <Card
                        date={data.date}
                        depth={data.depth}
                        elapsed_time={
                          hourAgo < 24
                            ? hourAgo === 0
                              ? `• ${minutesAgo} dakika önce`
                              : `• ${hourAgo} saat önce`
                            : ""
                        }
                        mag={data.mag}
                        title={data.title}
                      />
                    </Link>
                  );
                })
              ) : (
                <span className="loader"></span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;

import Header from "./components/Header";
import Card from "./components/Card";
import { useEffect } from "react";
import { useState } from "react";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";

const App = () => {
  const [result, setResult] = useState();
  const [filteredResult, setFilteredResult] = useState([]);
  const [filteredMag, setFilteredMag] = useState([]);
  let btn = document.getElementById("btn");

  // When the user scrolls down 20px from the top of the document, show the button
  window.onscroll = function () {
    scrollFunction();
  };

  function scrollFunction() {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      btn.style.display = "flex";
    } else {
      btn.style.display = "none";
    }
  }

  // When the user clicks on the button, scroll to the top of the document
  function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  const getApi = async () => {
    const url = "https://api.orhanaydogdu.com.tr/deprem/kandilli/live";
    try {
      const res = await fetch(url);
      const data = await res.json();
      setResult(data);
      console.log(data);
    } catch (error) {
      console.log("error");
    }
  };

  useEffect(() => {
    getApi();
  }, []);

  const refreshPage = () => {
    setResult("");
    getApi();
    setFilteredMag([]);
  };

  const filterMag = async () => {
    const url = "https://api.orhanaydogdu.com.tr/deprem/kandilli/live";

    try {
      const res = await fetch(url);
      const data = await res.json();
      setFilteredResult(data.result);
    } catch (error) {
      console.log("error");
    }
    setFilteredMag(filteredResult.filter((filtered) => filtered.mag > 2.5));

    console.log(filteredMag);
  };

  useEffect(() => {
    filterMag();
  }, []);

  return (
    <div className="dark:bg-gray-800 duration-300 px-4 md:px-0 relative">
      <div
        onClick={topFunction}
        id="btn"
        className="btn h-8 w-8 duration-300 rounded bottom-6 right-6 fixed dark:bg-slate-100/50 bg-zinc-600/50  flex items-center justify-center"
      >
        <MdOutlineKeyboardArrowUp size={24} />
      </div>
      <div className="container mx-auto">
        <Header filter={() => filterMag()} onClick={() => refreshPage()} />
        <h2 className="text-center mb-4 dark:text-zinc-100 duration-300">
          {result
            ? "Son 24 saatte " + result.metadata.total + " deprem tespit edildi"
            : ""}
        </h2>

        <div>
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

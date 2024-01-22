import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { IoMoonSharp } from "react-icons/io5";
import { MdWbSunny } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const EarthquakeDetails = () => {
  const { id } = useParams();
  const [currentQuake, setCurrentQuake] = useState([]);
  const { toggleTheme, theme } = useContext(ThemeContext);
  console.log(id);
  const navigate = useNavigate();

  const goDetails = async () => {
    const url = `https://api.orhanaydogdu.com.tr/deprem/data/get?earthquake_id=${id}`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      setCurrentQuake(data);
      console.log(currentQuake);
    } catch (error) {
      console.log("error");
    }
  };

  useEffect(() => {
    goDetails();
  }, [id]);

  const handleGoBack = () => {
    // Geri butonuna tıklandığında bir önceki sayfaya git
    navigate(-1);
  };
  return (
    <div className="mx-4 md:mx-0">
      {/*header  */}
      <div>
        <header className="flex duration-300 justify-between items-center max-w-6xl mx-auto py-4 dark:text-zinc-100">
          <button
            className="h-10 w-10 bg-slate-700 hover:bg-slate-600 text-zinc-100 flex items-center justify-center rounded"
            onClick={handleGoBack}
          >
            <FaArrowLeft size={16} />
          </button>

          <div className="flex gap-4 items-center relative">
            <div className=""></div>
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
      {/*header end  */}

      <div className="rounded-lg p-4 bg-zinc-100 max-w-6xl mx-auto flex flex-col md:flex-row gap-5  mt-4 duration-300 dark:bg-slate-900">
        <span
          className={`rounded-lg bg-zinc-300 h-10 w-10 flex items-center justify-center font-bold text-lg ${
            currentQuake?.mag >= 4.5 ? "!bg-red-500 text-zinc-100 " : ""
          }`}
        >
          {currentQuake?.result?.mag}
        </span>
        <div>
          <h1 className="text-lg font-bold dark:text-zinc-100">
            {currentQuake?.result?.title}
          </h1>
          <div className="flex items-center gap-4">
            <span className=" text-gray-500 ">
              {currentQuake?.result?.depth} km
            </span>
            <span className=" text-gray-500 ">
              {currentQuake?.result?.date}
            </span>
          </div>
        </div>
        <div className="flex gap-8 flex-col md:flex-row">
          <div>
            <h2 className="text-base font-bold dark:text-zinc-100">
              Yakındaki Şehirler
            </h2>
            {currentQuake?.result?.location_properties?.closestCities?.map(
              (data, index) => (
                <div className="dark:text-gray-300 text-gray-500 " key={index}>
                  • {data.name}
                </div>
              )
            )}
          </div>
          <div>
            <h2 className="text-base font-bold dark:text-zinc-100">
              Yakındaki Havalimanları
            </h2>
            {currentQuake?.result?.location_properties?.airports?.map(
              (data, index) => (
                <div className="dark:text-gray-300 text-gray-500" key={index}>
                  • {data.name}
                </div>
              )
            )}
          </div>
        </div>
      </div>
      <div className="container mx-auto max-w-6xl">
        {currentQuake && currentQuake.result && currentQuake.result.geojson && (
          <MapContainer
            center={currentQuake.result.geojson.coordinates.reverse()} // [latitude, longitude] sırasını düzeltiyoruz
            zoom={10}
            style={{ height: "400px", width: "100%", marginTop: "20px" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={currentQuake.result.geojson.coordinates}>
              <Popup>{currentQuake.result.title}</Popup>
            </Marker>
          </MapContainer>
        )}
      </div>
    </div>
  );
};

export default EarthquakeDetails;

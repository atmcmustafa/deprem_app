const Card = ({ mag, title, depth, date, elapsed_time, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="rounded-lg p-4 bg-zinc-100 max-w-6xl mx-auto flex gap-5 items-center mt-4 duration-300 dark:bg-slate-900"
    >
      <span
        className={`rounded-lg bg-zinc-300 h-10 w-10 flex items-center justify-center font-bold text-lg ${
          mag >= 4.5 ? "!bg-red-500 text-zinc-100 " : ""
        }`}
      >
        {mag}
      </span>
      <div>
        <h1 className="text-lg font-bold dark:text-zinc-100">{title}</h1>
        <div className="flex items-center gap-4">
          <span className=" text-gray-500">{depth} km</span>
          <span className=" text-gray-500">{date}</span>
          <span className=" text-gray-500">{elapsed_time}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;

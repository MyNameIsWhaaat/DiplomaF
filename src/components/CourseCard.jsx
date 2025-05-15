import "../pages/pages.css"

const CourseCard = ({
  title,
  subtitle,
  imageUrl,
  onClick,
  hasProgress,
  xpEarned = 0,
  xpReward = 100,
}) => {
  const safeReward = xpReward > 0 ? xpReward : 1;
  const progressPercent = Math.min(100, Math.round((xpEarned / safeReward) * 100));

  let progressColor = "#EF4444";
  if (progressPercent >= 80) progressColor = "#8278F6";
  else if (progressPercent >= 50) progressColor = "#FACC15";
  else if (progressPercent >= 20) progressColor = "#34D399";

  return (
    <div
  className="bg-white rounded-2xl shadow-md p-6 w-[290px] h-[345px] flex flex-col items-center justify-between 
             transition-transform transform hover:-translate-y-2 hover:shadow-xl cursor-pointer"
  onClick={onClick}
>
      <img
        src={imageUrl || "/CourseIcon.png"}
        alt="Course"
        className="w-40 mb-4"
      />
      <h3 className="MontserratBold text-lg text-center mb-2 line-clamp-3 flex-grow">{title}</h3>

      {!hasProgress && (
        <p className="MonstReg text-center text-gray-600 mb-2 line-clamp-3 flex-grow">
    {subtitle}
  </p>
      )}

      {hasProgress && (
        <div className="mt-2">
          <div className="h-3 w-60 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full transition-all duration-500"
              style={{ width: `${progressPercent}%`, backgroundColor: progressColor }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-1 text-right">
            {progressPercent}% ({xpEarned}/{xpReward} XP)
          </p>
        </div>
      )}

      <button
        onClick={onClick}
        className="bg-[#8278F6] hover:bg-[#6f68e0] text-white font-semibold text-sm px-4 py-2 rounded-md mt-4 w-60"
      >
        {hasProgress ? "Продолжить" : "Подробнее"}
      </button>
    </div>
  );
};

export default CourseCard;
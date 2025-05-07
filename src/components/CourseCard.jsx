const CourseCard = ({ title, subtitle, imageUrl, onClick, hasProgress }) => {
    return (
        <div className="bg-white rounded-2xl shadow-md  p-6 w-[280px] h-[315px] flex flex-col items-center justify-between">
  <img
    src={imageUrl || "/CourseIcon.png"}
    alt="Course"
    className="w-40 mb-4"
  />
  <h3 className="font-bold text-center text-lg mb-2">{title}</h3>
  <p className="text-sm text-gray-600 text-center mb-4 line-clamp-2">{subtitle}</p>

  <button
    onClick={onClick}
    className="bg-[#8278F6] hover:bg-[#6f68e0] text-white font-semibold text-sm px-4 py-2 rounded-full mt-auto"
  >
    {hasProgress ? "Продолжить" : "Подробнее"}
  </button>
</div>
    );
};

export default CourseCard;
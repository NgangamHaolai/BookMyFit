export default function StatsCard({ title, value, icon }) {
  return (
    <div className="group rounded-lg bg-white p-6 shadow-lg transition-colors duration-300 hover:bg-red hover:text-white">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="mt-1 text-2xl font-bold">{value}</p>
        </div>
        <div className="text-3xl text-red transition-colors duration-300 group-hover:text-white">
          {icon}
        </div>
      </div>
    </div>
  );
}
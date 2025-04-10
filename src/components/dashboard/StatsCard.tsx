interface StatsCardProps {
  icon: string;
  title: string;
  value: string;
  description: string;
}

export default function StatsCard({
  icon,
  title,
  value,
  description,
}: StatsCardProps) {
  return (
    <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-lg font-semibold mb-3 flex items-center">
        <span className="mr-2">{icon}</span> {title}
      </h3>
      <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
        {value}
      </div>
      <div className="text-sm text-gray-500 dark:text-gray-400">
        {description}
      </div>
    </div>
  );
}

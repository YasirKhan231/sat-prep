interface ActionCardProps {
  icon: string;
  title: string;
  description: string;
  onClick: () => void;
  borderColor: string;
}

export default function ActionCard({
  icon,
  title,
  description,
  onClick,
  borderColor,
}: ActionCardProps) {
  return (
    <div
      onClick={onClick}
      className={`bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 border-l-4 ${borderColor} hover:shadow-lg transition-shadow cursor-pointer hover:scale-105 transition-all`}
    >
      <div
        className={`${borderColor.replace("border-", "text-")} text-3xl mb-4`}
      >
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
}

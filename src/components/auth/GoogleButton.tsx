import Image from "next/image";

interface GoogleButtonProps {
  onClick: () => void;
  text: string;
}

export default function GoogleButton({ onClick, text }: GoogleButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 w-full"
    >
      <Image
        src="https://cdn.cdnlogo.com/logos/g/35/google-icon.svg"
        alt="Google"
        width={20}
        height={20}
        className="mr-2"
      />
      <span>{text}</span>
    </button>
  );
}

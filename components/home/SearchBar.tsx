type SearchBarProps = {
  searchTerm: string;
  onChange: (value: string) => void;
};

export default function SearchBar({
  searchTerm,
  onChange,
}: SearchBarProps) {
  return (
    <input
      type="text"
      placeholder="Search products..."
      value={searchTerm}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-green-500 md:w-96"
    />
  );
}
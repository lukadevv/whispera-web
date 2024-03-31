import { Search } from "lucide-react";

type SearchInputProps = {
  placeholder: string;
};

export default function SearchInput({ placeholder }: SearchInputProps) {
  return (
    <div className="max-w-md mx-auto w-full mt-1">
      <div className="relative flex items-center w-full h-9 rounded-lg focus-within:shadow-lg bg-white overflow-hidden border-solid border-2 border-gray-600">
        <div className="bg-slate-900 grid place-items-center h-full w-12 text-slate-600">
          <Search />
        </div>

        <input
          className="bg-slate-900 peer h-full w-full outline-none text-sm text-gray-700 pr-2"
          type="text"
          id="search"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}

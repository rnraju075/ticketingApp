type Props = {
  type?: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
};

export default function AuthInput({
  type = "text",
  placeholder,
  value,
  onChange,
  onBlur,
  error,
}: Props) {
  return (
    <div className="flex flex-col gap-1">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onBlur={onBlur}
        onChange={(e) => onChange(e.target.value)}
        className="border border-gray-300 p-3 rounded-lg outline-none"
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
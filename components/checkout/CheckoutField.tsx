export default function CheckoutField({
  label,
  required = false,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span
        className="
          mb-2
          block
          text-[9px]
          font-semibold
          text-[var(--foreground)]/65
        "
      >
        {label}

        {required && (
          <span className="ml-1 text-[var(--accent)]">
            *
          </span>
        )}
      </span>

      {children}
    </label>
  );
}
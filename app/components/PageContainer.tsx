export function PageContainer({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mx-auto flex w-full max-w-6xl flex-col px-6 md:px-10 lg:px-16 ${className}`}
    >
      {children}
    </div>
  );
}

export default function Step({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <li className="px-4 py-8 w-full border border-dark-background rounded-lg">
      <input type="checkbox" id={title} className={`mr-2 peer`} />
      <label
        htmlFor={title}
        className={`text-lg text-foreground/90 peer-checked:line-through font-medium hover:cursor-pointer relative top-0.5`}
      >
        {title}
      </label>
      <div
        className={`mx-6 mt-4 text-foreground/80 text-sm peer-checked:line-through`}
      >
        {children}
      </div>
    </li>
  );
}

interface CardProps {
  title: string;
  information: string;
}

export function Card({ title, information }: CardProps) {
  return (
    <article className="bg-[hsl(243,27%,20%)] rounded-xl w-40 p-4 h-25 text-white">
      <div className="flex flex-col justify-between h-full">
        <h6 className="text-[hsl(240,6%,70%)] font-dm">{title}</h6>
        <p className="text-white font-dm font-light text-3xl">{information}</p>
      </div>
    </article>
  );
}

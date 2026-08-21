import { useNavigate } from "react-router-dom";
import type { Diploma } from "../types/diploma";

interface DiplomaCardProps {
  diploma: Diploma;
}

export default function DiplomaCard({ diploma }: DiplomaCardProps) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/dashboard/diplomas/${diploma.id}`)}
      className="group relative h-[450px] overflow-hidden cursor-pointer"
    >
      <img
        src={diploma.image}
        alt={diploma.title}
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />

      <div className="absolute bottom-0 left-0 right-0 bg-blue-600/95 p-4">
        <h2 className="font-semibold text-white font-mono">{diploma.title}</h2>
        <p className="mt-1 line-clamp-2 text-sm text-white/90">
          {diploma.description}
        </p>
      </div>
    </div>
  );
}

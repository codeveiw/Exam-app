import type { Diploma } from "../types/diploma";
import { Link } from "react-router-dom";

export default function DiplomaGrid({ diplomas }: { diplomas: Diploma[] }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {diplomas.map((diploma) => (
                <Link
                    to={`/dashboard/diplomas/${diploma.id}`}
                    key={diploma.id}
                    className="border rounded-lg bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                    <img
                        src={diploma.image}
                        alt={diploma.title}
                        className="w-full h-48 object-cover"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://placehold.co/400x300?text=No+Image';
                        }}
                    />
                    <div className="p-4">
                        <h3 className="font-semibold text-lg mb-2">{diploma.title}</h3>
                        <p className="text-sm text-gray-600 line-clamp-3">{diploma.description}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
}

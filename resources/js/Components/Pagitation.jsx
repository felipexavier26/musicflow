import { Link } from "@inertiajs/react";

export default function Pagination({ links, currentPage }) {
    if (!Array.isArray(links)) {
        return null;
    }

    return (
        <div className="flex justify-center mt-6 mb-6 space-x-2">
            {links
                .filter((link) => {
                    const isPrevious = link.label.includes("Previous");
                    const isNext = link.label.includes("Next");
                    const isCurrent = link.active;

                    return isPrevious || isNext || isCurrent || link.url;
                })
                .map((link, index) => (
                    <Link
                        key={index}
                        href={link.url || "#"} 
                        as="button"
                        className={`px-4 py-1 border rounded-md transition-colors duration-300 ${
                            link.active
                                ? 'bg-blue-600 text-white border-blue-600 cursor-default'
                                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100 hover:text-blue-600'
                        } ${!link.url ? 'cursor-not-allowed opacity-50' : ''}`}
                        onClick={(e) => !link.url && e.preventDefault()}
                    >
                        {link.label.includes("Previous") ? (
                            "< Anterior"
                        ) : link.label.includes("Next") ? (
                            "Próximo >"
                        ) : (
                            link.label
                        )}
                    </Link>
                ))}
        </div>
    );
}

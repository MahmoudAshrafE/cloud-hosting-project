import { Link } from '@/i18n/navigation';
import { GrNext, GrPrevious } from "react-icons/gr"

interface PaginationProps {
  pages: number,
  pageNumber: number,
  route: string,
}

const Pagination = ({ pages, pageNumber, route }: PaginationProps) => {
  const getVisiblePages = () => {
    const totalVisible = 5;
    const pagesArray: (number | string)[] = [];

    if (pages <= totalVisible) {
      for (let i = 1; i <= pages; i++) pagesArray.push(i);
    } else {
      // Always show first page
      pagesArray.push(1);

      if (pageNumber > 3) {
        pagesArray.push('...');
      }

      // Show pages around current page
      const start = Math.max(2, pageNumber - 1);
      const end = Math.min(pages - 1, pageNumber + 1);

      for (let i = start; i <= end; i++) {
        if (!pagesArray.includes(i)) pagesArray.push(i);
      }

      if (pageNumber < pages - 2) {
        pagesArray.push('...');
      }

      // Always show last page
      if (!pagesArray.includes(pages)) pagesArray.push(pages);
    }
    return pagesArray;
  };

  const visiblePages = getVisiblePages();
  const prev = pageNumber - 1;
  const next = pageNumber + 1;

  return (
    <div className="flex flex-wrap items-center justify-center mt-8 mb-12 w-full gap-1 sm:gap-2">
      {pageNumber > 1 && (
        <Link
          href={`${route}?pageNumber=${prev}`}
          className="border border-gray-300 dark:border-slate-700 text-gray-700 dark:text-gray-300 p-2 sm:p-2.5 rounded-xl font-bold text-lg sm:text-xl cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-800 transition shadow-sm bg-white dark:bg-slate-900"
        >
          <GrPrevious className="rtl:rotate-180" />
        </Link>
      )}

      {visiblePages.map((page, index) => {
        if (page === "...") {
          return (
            <span key={`dots-${index}`} className="px-1 sm:px-2 text-gray-400 dark:text-slate-600 font-black">
              ...
            </span>
          );
        }

        return (
          <Link
            href={`${route}?pageNumber=${page as number}`}
            className={`border min-w-[40px] sm:min-w-[50px] h-10 sm:h-12 flex items-center justify-center rounded-xl font-bold text-base sm:text-xl cursor-pointer transition shadow-sm ${pageNumber === page
                ? "bg-blue-600 dark:bg-blue-700 border-blue-600 dark:border-blue-700 text-white"
                : "border-gray-300 dark:border-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 bg-white dark:bg-slate-900"
              }`}
            key={page}
          >
            {page}
          </Link>
        );
      })}

      {pageNumber < pages && (
        <Link
          href={`${route}?pageNumber=${next}`}
          className="border border-gray-300 dark:border-slate-700 text-gray-700 dark:text-gray-300 p-2 sm:p-2.5 rounded-xl font-bold text-lg sm:text-xl cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-800 transition shadow-sm bg-white dark:bg-slate-900"
        >
          <GrNext className="rtl:rotate-180" />
        </Link>
      )}
    </div>
  );
};

export default Pagination
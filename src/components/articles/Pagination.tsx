import { Link } from '@/i18n/navigation';
import { GrNext, GrPrevious } from "react-icons/gr"

interface PaginationProps {
  pages: number,
  pageNumber: number,
  route: string,
}

const Pagination = ({ pages, pageNumber, route }: PaginationProps) => {
  const pagesArray: number[] = [];
  for (let i = 1; i <= pages; i++) {
    pagesArray.push(i)
  }
  const prev = pageNumber - 1
  const next = pageNumber + 1
  return (
    <div className="flex items-center justify-center mt-8 mb-12 w-full gap-2">
      {
        (pageNumber > 1) &&
        <Link href={`${route}?pageNumber=${prev}`} className="border-2 border-gray-300 dark:border-slate-700 text-gray-700 dark:text-gray-300 p-2.5 rounded-lg font-bold text-xl cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-800 transition shadow-sm" >
          <GrPrevious className="rtl:rotate-180" />
        </Link>
      }
      {pagesArray.map(page => (
        <Link
          href={`${route}?pageNumber=${page}`}
          className={`border-2 py-2 px-4 rounded-lg font-bold text-xl cursor-pointer transition shadow-sm ${pageNumber === page ? "bg-blue-600 dark:bg-blue-700 border-blue-600 dark:border-blue-700 text-white" : "border-gray-300 dark:border-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800"}`}
          key={page}
        >
          {page}
        </Link>
      ))}
      {
        (pageNumber < pages) &&
        <Link href={`${route}?pageNumber=${next}`} className="border-2 border-gray-300 dark:border-slate-700 text-gray-700 dark:text-gray-300 p-2.5 rounded-lg font-bold text-xl cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-800 transition shadow-sm" >
          <GrNext className="rtl:rotate-180" />
        </Link>
      }
    </div>
  )
}

export default Pagination
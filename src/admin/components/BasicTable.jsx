import {  useMemo } from "react";
import { usePagination, useSortBy, useTable } from "react-table"
import { AiOutlineSortAscending, AiOutlineSortDescending } from "react-icons/ai";
const BasicTable = ({ dataByProp, fillColor = false, columns, pageSize = 5 }) => {
    const data = useMemo(() => dataByProp, [dataByProp]);
    const column = useMemo(() => columns, [])


    const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow, pageCount, state: { pageIndex }, nextPage, previousPage, canNextPage, canPreviousPage } = useTable({
        columns: column, data, initialState: { pageSize }
    }, useSortBy, usePagination)
    return (
        <>
            <table {...getTableProps()} className="w-full">
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {
                                headerGroup.headers.map(column => <th {...column.getHeaderProps(column.getSortByToggleProps())} className="w-20 border-2 ">
                                    {column.render("Header")}
                                    {
                                        column.isSorted && <span> {column.isSortedDesc ? <AiOutlineSortDescending /> : <AiOutlineSortAscending />}</span>
                                    }
                                </th>)
                            }
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()} >
                    {page.map(row => {
                        prepareRow(row)
                        return <tr {...row.getRowProps()}  >
                            {
                                row.cells.map(cell => <td {...cell.getCellProps()} className={`p-2 w-20 border-2 text-center ${fillColor?`last:text-blue-500 last:underline l`:""}  `}>
                            {cell.render("Cell")}
                        </td>)
                    }
                </tr>
                    })}
            </tbody>

        </table >
            { pageCount > 1 && <div className="mt-4 border-2 flex justify-evenly items-center">
                <button className="transition-all  border-2 border-blue-500 rounded-md py-2 px-4 text-blue-500 cursor-pointer hover:bg-blue-500 hover:text-white" disabled={!canPreviousPage} onClick={previousPage} >Previous</button>
                <p><span className="text-blue-400 text-md font-medium">{`${pageIndex + 1}`}</span>
                    <span className="text-blue-400 font-semibold"> out of </span>
                    <span className="text-lg text-blue-500 font-bold">{`${pageCount}`}</span></p>
                <button className="transition-all  border-2 border-blue-500 rounded-md py-2 px-4 text-blue-500 cursor-pointer hover:bg-blue-500 hover:text-white" disabled={!canNextPage} onClick={nextPage} >Next</button>
            </div>
}
        </>
    )

}
export default BasicTable;
"use client"

import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getPaginationRowModel
} from "@tanstack/react-table"
import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
        ColumnFiltersState,
        getFilteredRowModel,
} from "@tanstack/react-table"
import { Input } from "@/components/ui/input"
// import { Link } from "lucide-react";
import Link from "next/link";
import { PlusCircle } from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({

  columns,
  data,
}: DataTableProps<TData, TValue>) {
        const [sorting, setSorting] = React.useState<SortingState>([])
        const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
                []
              )
        const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {sorting, columnFilters},
})

  return (
        <div>
                <div className="flex items-center py-4 justify-center">
                        <Input
                        placeholder="Filter courses"
                        value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                        table.getColumn("title")?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm"
                        />


                        <Link href="/mentor/create">
                                <Button className="">
                                        <PlusCircle className="mr-4"/>
                                        Add a new course
                                </Button>
                        </Link>
                </div>


                <div className="rounded-md border">
                        <Table>
                                <TableHeader>
                                {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                        return (
                                        <TableHead key={header.id}>
                                        {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                                )}
                                        </TableHead>
                                        )
                                })}
                                </TableRow>
                                ))}
                                </TableHeader>
                                <TableBody>
                                {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                >
                                        {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                        ))}
                                </TableRow>
                                ))
                                ) : (
                                <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                        No results.
                                </TableCell>
                                </TableRow>
                                )}
                                </TableBody>
                        </Table>
                </div>
                <div className="flex items-center justify-end space-x-2 py-4">
                        <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        >
                        Previous
                        </Button>
                        <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        >
                        Next
                </Button>
      </div>

    </div>
  )
}

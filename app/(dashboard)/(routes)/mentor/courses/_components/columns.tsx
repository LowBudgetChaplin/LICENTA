"use client"

import { Button } from "@/components/ui/button"
import { Course } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { access } from "fs"
import { ArrowUpDown, Badge, Bold, MoreHorizontal } from "lucide-react"
import React from "react"
import { DropdownMenu } from "@/components/ui/dropdown-menu"
import { DropdownMenuContent } from "@/components/ui/dropdown-menu"
import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import Chip from '@mui/material/Chip';
import { green, red } from '@mui/material/colors';
import { Button as MuiButton } from '@mui/material';

// import { DataTable } from "./_components/data-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
// export type Payment = {
//   id: string
//   amount: number
//   status: "pending" | "processing" | "success" | "failed"
//   email: string
// }

export const columns: ColumnDef<Course>[] = [
  {
    accessorKey: "title",
    header: ({column})=>{
        return(
                <Button onClick={()=>column.toggleSorting(column.getIsSorted() === "asc")}>
                        Title
                        <ArrowUpDown className="ml-4 h-6 w-6"/>
                </Button>
        )
    },
  },{
  accessorKey : "price",
  header: ({column})=>{
        return(
                <Button onClick={()=>column.toggleSorting(column.getIsSorted() === "asc")}>
                        Price
                        <ArrowUpDown className="ml-4 h-6 w-6"/>
                </Button>
        )
    },
    cell:({row})=>{
        const price = parseFloat(row.getValue("price") || "0.00");
        const formated = new Intl.NumberFormat("ro-RO", {style: "currency", currency: "RON"}).format(price)
        return(
               <div>{formated}</div>
        )
    }
  },
  {
    accessorKey: "isPublished",
    header: ({column})=>{
        return(
                <Button onClick={()=>column.toggleSorting(column.getIsSorted() === "asc")}>
                        Published
                        <ArrowUpDown className="ml-4 h-6 w-6"/>
                </Button>
        )
    },
    cell : ({row})=>{
        const isPublished = row.getValue("isPublished") || false;
        return(
                <Chip
                sx={{
                  backgroundColor: isPublished ? green[800] : red[800],
                  color: 'white',
                }}
                label={isPublished ? "Published" : "Unpublished"}
              />     
        )
    }
  },{
        id: "actions",
        cell: ({row}) =>{
                const {id} = row.original;
                return (
                        <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                        <Button className="h-8 w-8 p-0">
                                                <MoreHorizontal/>
                                        </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                        <Link href={`/mentor/courses/${id}`}>
                                                <DropdownMenuItem>
                                                        Edit
                                                </DropdownMenuItem>
                                        </Link>
                                </DropdownMenuContent>
                        </DropdownMenu>
                )
        }
  }
]

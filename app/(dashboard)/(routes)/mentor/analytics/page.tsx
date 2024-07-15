import { getAnalytics } from "@/scripts/actions/get-analytics";
import { useEffect, useState } from "react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Chart } from "./_components/chart";
import { DataCard } from "./_components/data-card";
// import { DataCard } from "./_components/data-card";
// import { Chart } from "./_components/chart";


const AnalyticsPage = async () => {
        const {userId} = auth();
        if(userId === null){
                return redirect("/")
        }

        const { data, totalRevenue, totalSales} = await getAnalytics(userId);




        return ( 
                <div className="p-8">
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                       <DataCard
                        label="Total revenue"
                        value={totalRevenue}
                        shouldFormat
                        />
                        <DataCard
                        label="Total sales"
                        value={totalSales}
                         />
                       </div>
                       <Chart
                        data={data}
                        />
                </div>
         );
}
 
export default AnalyticsPage;
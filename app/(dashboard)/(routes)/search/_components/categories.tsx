"use client"
import {
        FcBiohazard,
        FcCircuit,
        FcCurrencyExchange,
        FcEngineering,
        FcFilmReel,
        FcGlobe,
        FcGraduationCap,
        FcMultipleDevices,
        FcMusic,
        FcOldTimeCamera,
        FcSalesPerformance,
        FcSportsMode,
        // FcStethoscope,
        FcCalculator,
        // FcPhysics,
        FcLibrary,
        FcCollaboration,
        FcTimeline,
      } from "react-icons/fc";
import { GiStethoscope } from "react-icons/gi";
import { FaAppleAlt } from "react-icons/fa";
import {GiFruitBowl} from "react-icons/gi"
import { Category } from "@prisma/client";
import { IconType } from "react-icons/lib";
import { CategoryItem } from "./category-item";

interface CategoriesProps {
        items: Category[];
      }

      
const iconMap: Record<Category["name"], IconType> = {
        "Computer Science": FcMultipleDevices,
        "Engineering": FcEngineering,
        "Mathematics": FcCalculator,
        "Physics": FaAppleAlt,
        "Biology & Agronomy": FcBiohazard,
        "Economy": FcCurrencyExchange,
        "Languages": FcLibrary,
        "Medicine & Pharmacy": GiStethoscope,
        "History": FcTimeline,
        "Geography": FcGlobe,
        "Social Sciences": FcCollaboration,
        "Graphics & Design": FcCircuit,
        "Film": FcFilmReel,
      };

      

export const Categories = ({
        items,
}: CategoriesProps)=>{
        return (
                <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
                {items.map((item) => (
                  <CategoryItem
                    key={item.id}
                    label={item.name}
                    icon={iconMap[item.name]}
                    value={item.id}
                  />
                ))}
              </div>
        )
}
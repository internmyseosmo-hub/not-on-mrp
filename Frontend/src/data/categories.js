import { LayoutGrid } from "lucide-react";

import catHomeImg from "../assets/categories/cat_home_1785923105826.png";
import catKitchenImg from "../assets/categories/cat_kitchen_1785923114681.png";
import catCleaningImg from "../assets/categories/cat_cleaning_1785923124157.png";
import catStationeryImg from "../assets/categories/cat_stationery_1785923134931.png";
import catPersonalImg from "../assets/categories/cat_personal_1785923145384.png";
import catToysImg from "../assets/categories/cat_toys_1785923165623.png";
import catElectricalsImg from "../assets/categories/cat_electricals_1785923176438.png";
import catHardwareImg from "../assets/categories/cat_hardware_1785923186238.png";
import catCarImg from "../assets/categories/cat_car_1785923197091.png";
import catGardenImg from "../assets/categories/cat_garden_1785923206358.png";

export const categories = [
  { name: "Home & Living", image: catHomeImg },
  { name: "Kitchen & Dining", image: catKitchenImg },
  { name: "Cleaning Essentials", image: catCleaningImg },
  { name: "Stationery & Office", image: catStationeryImg },
  { name: "Personal Care", image: catPersonalImg },
  { name: "Toys & Games", image: catToysImg },
  { name: "Electricals", image: catElectricalsImg },
  { name: "Hardware & Tools", image: catHardwareImg },
  { name: "Car & Bike", image: catCarImg },
  { name: "Garden & Outdoor", image: catGardenImg },
  { name: "View All", icon: LayoutGrid, isViewAll: true },
];

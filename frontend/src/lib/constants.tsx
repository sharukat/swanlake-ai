import { Category, NatureGroup } from "@/app/models/database-records";
import {
  IconBrandTabler,
  IconDrone,
  IconDropletHalf2Filled,
} from "@tabler/icons-react";
import { SKELTON } from "@/components/server/bento-skelton";
import DashboardItemSkelton from "@/components/server/dashboard-item-skelton";

export const CATEGORIES: Category[] = [
  { key: "plants", label: "Plants" },
  { key: "birds", label: "Birds" },
  { key: "animals", label: "Animals" },
];



export const NATURE_GROUPS: NatureGroup = {
  birds: [
    { key: "insectivores", label: "Aerial Insectivores" },
    { key: "forest", label: "Forest Birds" },
    { key: "migrant", label: "Long Distance Migrant" },
  ],
  plants: [], // Add plant categories when available
  animals: [], // Add animal categories when available
};



export const ADMIN_LINKS = [
  {
    label: "Add Data",
    href: "/admin",
    icon: (
      <IconBrandTabler className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
  },
  {
    label: "Water Quality Data",
    href: "#",
    icon: (
      <IconDropletHalf2Filled className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
  },
  {
    label: "Drone Footages",
    href: "/admin/drones",
    icon: (
      <IconDrone className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
  },
];



// Bento grid items for landing page
export const BENTOGRID_ITEMS = [
  {
    title: "Explore Swan Lake",
    description: "Discover the rich wildlife of Swan Lake Park with Artificial Intelligence (AI) – from vibrant birds and unique plants to fascinating animals, there’s so much to explore and learn in this natural haven.",
    header: <SKELTON path="/bg-1.jpg" />,
    className: "md:col-span-2",
    href: "/dashboard/birds",
  },
  {
    title: "Swan Lake Arial Footages",
    description: "Examine the drone footages, which features thermal maps, diverse habitats, and visuals of wildlife.",
    header: <SKELTON path="/bento-drone.jpg" />,
    className: "md:col-span-1",
    href: "/dashboard/notfound",
  },
  {
    title: "Virtual Reality for Swan Lake",
    description: "Experience Swan Lake Park with our virtual reality tour, showcasing the park’s landscapes and wildlife.",
    header: <SKELTON path="/bento-vr.jpg"/>,
    className: "md:col-span-1",
    href: "/dashboard/notfound",
  },
  {
    title: "Swan Lake Water Quality",
    description:
      "Dive into the water quality data from Swan Lake Park—uncover key insights into temperature trends, pH balance, and turbidity levels that reveal the health of this vital ecosystem.",
    header: <SKELTON path="/bg-2.jpg" />,
    className: "md:col-span-2",
    href: "/dashboard/notfound",
  },
];



export const DASHBOARD_MENU = [
  {
    name: "Return to Home",
    href: "/",
  },
  {
    name: "AI Assistant",
    href: "/dashboard/birds",
  },
  {
    name: "Drone Data",
    href: "/dashboard/notfound",
  },
  {
    name: "Virtual Reality",
    href: "/dashboard/notfound",
  },
  {
    name: "Water Quality",
    href: "/dashboard/notfound",
  },
];


export const DASHBOARD_CONTENT = [
  {
    title: "Explore Swan Lake",
    description:
      "Discover the rich wildlife of Swan Lake Park with Artificial Intelligence (AI) – from vibrant birds and unique plants to fascinating animals, there’s so much to explore and learn in this natural haven.",
    content: (<DashboardItemSkelton path="/bg-1.jpg" />),
  },
  {
    title: "Swan Lake Arial Footages",
    description:
      "Examine the drone footages, which features thermal maps, diverse habitats, and visuals of wildlife. Examine the drone footages, which features thermal maps, diverse habitats, and visuals of wildlife. Examine the drone footages, which features thermal maps, diverse habitats, and visuals of wildlife.",
    content: (<DashboardItemSkelton path="/bento-drone.jpg" />),
  },
  {
    title: "Virtual Reality for Swan Lake",
    description:
      "Experience Swan Lake Park with our virtual reality tour, showcasing the park’s landscapes and wildlife. Experience Swan Lake Park with our virtual reality tour, showcasing the park’s landscapes and wildlife. Experience Swan Lake Park with our virtual reality tour, showcasing the park’s landscapes and wildlife.",
    content: (<DashboardItemSkelton path="/bento-vr.jpg" />),
  },
  {
    title: "Swan Lake Water Quality",
    description:
      "Dive into the water quality data from Swan Lake Park—uncover key insights into temperature trends, pH balance, and turbidity levels that reveal the health of this vital ecosystem. Dive into the water quality data from Swan Lake Park—uncover key insights into temperature trends, pH balance, and turbidity levels that reveal the health of this vital ecosystem.",
    content: (<DashboardItemSkelton path="/bg-2.jpg" />),
  },
];
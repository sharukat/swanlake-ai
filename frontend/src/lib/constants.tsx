import { Category, NatureGroup } from "@/app/models/database-records";
import { ListItem } from "@/app/models/utility";
import {
  IconBrandTabler,
  IconDrone,
  IconDropletHalf2Filled,
} from "@tabler/icons-react";
import {
  BrainCircuit,
  Home,
  Video,
  RectangleGoggles,
  Droplet,
  LayoutDashboard,
} from "lucide-react";
import { SKELTON } from "@/components/server/bento-skelton";
import DashboardItemSkelton from "@/components/server/dashboard-item-skelton";

export const CATEGORIES: Category[] = [
  { key: "plants", label: "Plants" },
  { key: "birds", label: "Birds" },
  { key: "animals", label: "Animals" },
];

export const DAYS: Category[] = [
  { key: "monday", label: "Monday" },
  { key: "tuesday", label: "Tuesday" },
  { key: "wednesday", label: "Wednesday" },
  { key: "thursday", label: "Thursday" },
  { key: "friday", label: "Friday" },
  { key: "saturday", label: "Saturday" },
  { key: "sunday", label: "Sunday" },
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
    label: "Biodiversity Data",
    href: "/admin",
    icon: (
      <IconBrandTabler />
    ),
    body: "Contribute to conservation efforts by uploading biodiversity data on birds, trees, and plants found at Markham Swan Lake Park.",
  },
  {
    label: "Water Quality Data",
    href: "/admin/water",
    icon: (
      <IconDropletHalf2Filled/>
    ),
    body: "Stay informed by updating Swan Lake’s water quality data to monitor changes and ensure timely insights into environmental conditions.",
  },
  {
    label: "Drone Footages",
    href: "/admin/notfound",
    icon: (
      <IconDrone />
    ),
    body: "Support environmental monitoring by uploading drone footage which will help track changes and enhance conservation efforts.",
  },
];

// Bento grid items for landing page
export const BENTOGRID_ITEMS = [
  {
    title: "Explore Swan Lake",
    description:
      "Discover the rich wildlife of Swan Lake Park with Artificial Intelligence (AI) – from vibrant birds and unique plants to fascinating animals, there’s so much to explore and learn in this natural haven.",
    header: <SKELTON path="/bg-1.jpg" />,
    className: "md:col-span-2",
    href: "/dashboard/birds",
  },
  {
    title: "Swan Lake Arial Footages",
    description:
      "Examine the drone footages, which features thermal maps, diverse habitats, and visuals of wildlife.",
    header: <SKELTON path="/bento-drone.jpg" />,
    className: "md:col-span-1",
    href: "/dashboard/notfound",
  },
  {
    title: "Virtual Reality for Swan Lake",
    description:
      "Experience Swan Lake Park with our virtual reality tour, showcasing the park’s landscapes and wildlife.",
    header: <SKELTON path="/bento-vr.jpg" />,
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
    label: "Return to Home",
    href: "/",
    icon: <Home />,
  },
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    label: "AI Assistant",
    href: "/dashboard/birds",
    icon: <BrainCircuit />,
  },
  {
    label: "Drone Data",
    href: "/dashboard/notfound",
    icon: <Video />,
  },
  {
    label: "Virtual Reality",
    href: "/dashboard/notfound",
    icon: <RectangleGoggles />,
  },
  {
    label: "Water Quality",
    href: "/dashboard/notfound",
    icon: <Droplet />,
  },
];

export const DASHBOARD_CONTENT = [
  {
    title: "Explore Swan Lake",
    description:
      "Discover the rich wildlife of Swan Lake Park with Artificial Intelligence (AI) – from vibrant birds and unique plants to fascinating animals, there’s so much to explore and learn in this natural haven.",
    content: <DashboardItemSkelton path="/bg-1.jpg" />,
  },
  {
    title: "Swan Lake Arial Footages",
    description:
      "Examine the drone footages, which features thermal maps, diverse habitats, and visuals of wildlife. Examine the drone footages, which features thermal maps, diverse habitats, and visuals of wildlife. Examine the drone footages, which features thermal maps, diverse habitats, and visuals of wildlife.",
    content: <DashboardItemSkelton path="/bento-drone.jpg" />,
  },
  {
    title: "Virtual Reality for Swan Lake",
    description:
      "Experience Swan Lake Park with our virtual reality tour, showcasing the park’s landscapes and wildlife. Experience Swan Lake Park with our virtual reality tour, showcasing the park’s landscapes and wildlife. Experience Swan Lake Park with our virtual reality tour, showcasing the park’s landscapes and wildlife.",
    content: <DashboardItemSkelton path="/bento-vr.jpg" />,
  },
  {
    title: "Swan Lake Water Quality",
    description:
      "Dive into the water quality data from Swan Lake Park—uncover key insights into temperature trends, pH balance, and turbidity levels that reveal the health of this vital ecosystem. Dive into the water quality data from Swan Lake Park—uncover key insights into temperature trends, pH balance, and turbidity levels that reveal the health of this vital ecosystem.",
    content: <DashboardItemSkelton path="/bg-2.jpg" />,
  },
];

export const PLANT_TYPES: ListItem[] = [
  {
    key: "seed",
    label: "Seed / Dormant",
    description: "Seed is present but not yet germinated.",
  },
  {
    key: "germination",
    label: "Germination",
    description: "The seed begins to sprout; radicle (root) and shoot emerge.",
  },
  {
    key: "seedling",
    label: "Seedling",
    description:
      "Young plant with initial leaves (cotyledons or early true leaves).",
  },
  {
    key: "vegetative",
    label: "Vegetative",
    description: "Active leaf, stem, and root growth; no flowering yet.",
  },
  {
    key: "budding",
    label: "Budding / Pre-Flowering",
    description: "Formation of flower buds but not yet open.",
  },
  {
    key: "flowering",
    label: "Flowering / Blooming",
    description: "Flowers are open and reproductive structures are visible.",
  },
  {
    key: "fruiting",
    label: "Fruiting / Seeding",
    description: "Fruits or seeds are developing or mature.",
  },
  {
    key: "senescence",
    label: "Senescence / Dormancy",
    description:
      "Plant is aging, drying, or returning to a resting state (common in perennials or seasonal plants).",
  },
];

export const TREE_CONDITIONS: ListItem[] = [
  {
    key: "healthy",
    label: "Healthy",
    description: "Full canopy, strong growth, no visible issues.",
  },
  {
    key: "fair",
    label: "Fair",
    description:
      "Minor stress signs like small dead branches or discoloration.",
  },
  {
    key: "poor",
    label: "Poor",
    description: "Sparse foliage or visible damage, declining health.",
  },
  {
    key: "declining",
    label: "Dying / Declining",
    description: "Severe stress or disease, likely not recovering.",
  },
  {
    key: "dead",
    label: "Dead",
    description: "No leaves or growth; dry, brittle, possibly decaying.",
  },
  {
    key: "damaged",
    label: "Damaged",
    description: "Physically harmed by weather, human activity, or animals.",
  },
  {
    key: "new",
    label: "Recently Planted",
    description: "Newly planted; not fully established.",
  },
  {
    key: "unknown",
    label: "Unknown",
    description: "Condition unclear or hard to determine.",
  },
] as const;

export const TREE_TYPES: ListItem[] = [
  {
    key: "deciduous",
    label: "Deciduous",
    description:
      "Trees that shed their leaves annually, common in temperate climates. Examples: Maple, Oak, Birch.",
  },
  {
    key: "coniferous",
    label: "Coniferous",
    description:
      "Evergreen trees with needle-like leaves and cones. Examples: Pine, Spruce, Fir.",
  },
  {
    key: "evergreen_broadleaf",
    label: "Evergreen (Broadleaf)",
    description:
      "Trees with broad leaves that stay green year-round. Common in warmer climates. Examples: Magnolia, Live Oak.",
  },
  {
    key: "palm",
    label: "Palm",
    description:
      "Tropical and subtropical trees with tall, unbranched trunks and fan or feather-like leaves. Examples: Coconut Palm, Date Palm.",
  },
  {
    key: "fruit_bearing",
    label: "Fruit-bearing",
    description:
      "Trees that produce edible fruits, either cultivated or growing wild. Examples: Apple, Mango, Pear.",
  },
  {
    key: "flowering",
    label: "Flowering (Ornamental)",
    description:
      "Trees planted for their blossoms and visual appeal. Often bloom seasonally. Examples: Cherry Blossom, Dogwood.",
  },
  {
    key: "shrub_like",
    label: "Shrub-like Trees",
    description:
      "Shorter trees that may resemble large shrubs; often used in landscaping. Examples: Serviceberry, Sumac.",
  },
  {
    key: "wetland",
    label: "Wetland Trees",
    description:
      "Trees that grow in or near waterlogged soils or marshy areas. Examples: Willow, Bald Cypress.",
  },
  {
    key: "unknown",
    label: "Unknown / Not Sure",
    description:
      "For when you're unsure of the tree type or don't recognize the tree.",
  },
] as const;

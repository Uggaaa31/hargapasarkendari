import Dashboard from "views/Dashboard/Dashboard";
import Harga from "views/Dashboard/Harga";
import Manifest from "views/Dashboard/Manifest";
import Profile from "views/Dashboard/Profile";
import Pengawasan from "views/Dashboard/Pengawasan";
import Pengaduan from "views/Dashboard/Pengaduan";

import {
  HomeIcon,
  StatsIcon,
  CreditIcon,
  PersonIcon,
  DocumentIcon,
  SupportIcon,
  HelpIcon,
} from "components/Icons/Icons";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <HomeIcon color="inherit" />,
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/harga-barang-pokok",
    name: "Data Harga Barang Pokok",
    icon: <StatsIcon color="inherit" />,
    component: Harga,
    layout: "/admin",
  },
  {
    path: "/manifest-tol-laut",
    name: "Data Manifest Tol Laut",
    icon: <CreditIcon color="inherit" />,
    component: Manifest,
    layout: "/admin",
  },
  {
    path: "/pengawasan",
    name: "Pengawasan Barang",
    icon: <SupportIcon color="inherit" />,
    component: Pengawasan,
    layout: "/admin",
    //private: true,
  },
  {
    path: "/pengaduan",
    name: "Pengaduan Consumen",
    icon: <HelpIcon color="inherit" />,
    component: Pengaduan,
    layout: "/admin",
  },
  {
    name: "COMPANY ABOUT",
    category: "account",
    state: "pageCollapse",
    views: [
      {
        path: "/profile",
        name: "Profile",
        icon: <PersonIcon color="inherit" />,
        secondaryNavbar: true,
        component: Profile,
        layout: "/admin",
      },
    ],
  },
];

export default dashRoutes;
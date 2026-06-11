import { Outlet, type Route, type SearchPredicate } from "react-location";
import type { LocationGenerics } from "./location";
import HomePage from "@/pages/home";
import { ABOUT, CONTACT, SERVICES, COLLECTION_POINTS } from "@/constants/page-path";
import AboutPage from "@/pages/about";
import ContactPage from "@/pages/contact";
import ServicePage from "@/pages/services";
import CollectionPointsPage from "@/pages/collection-points";


export type RouteProps = Omit<Route, "children"> & {
  navigation?: boolean;
  sidebar?: { label: string; icon: any };
  children?: RouteProps[];
  search?: SearchPredicate<LocationGenerics>;
};

const routes: RouteProps[] = [
  {
    path: "/",
    element: <HomePage />,
    meta: {
      layout: "Unauth",
    },
  },
  {
    path: ABOUT,
    element: <AboutPage />,
    meta: {
      layout: "Unauth",
    },
  },
  {
    path: CONTACT,
    element: <ContactPage />,
    meta: {
      layout: "Unauth",
    },
  },
  {
    path: SERVICES,
    element: <ServicePage />,
    meta: {
      layout: "Unauth",
    },
  },
  {
    path: COLLECTION_POINTS,
    element: <CollectionPointsPage />,
    meta: {
      layout: "Unauth",
    },
  },
 
  // {
  //   path: OBJECTIVES,
  //   element: <Outlet />,
  //   meta: {
  //     layout: "App",
  //   },
  //   children: [
  //     {
  //       path: "/",
  //       element: <ObjectivesPage />,
  //       meta: {
  //         layout: "App",
  //       },
  //     },
      
  //   ],
  // },
  
 
  
];

export default routes;

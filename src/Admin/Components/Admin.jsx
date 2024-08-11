import * as React from "react";
import {Box,Avatar} from "@mui/material";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import { ThemeProvider } from "@emotion/react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import ListItemIcon from "@mui/material/ListItemIcon";
import { customTheme } from "./Theme";
// import AdminNavbar from "./Navigation/AdminNavbar";
// import Dashboard from "./Views/Admin";
import { Route, Routes, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getUser, logout } from "../../user/redux/Auth/Action";
import { useEffect } from "react";
import { deepPurple } from "@mui/material/colors";
import Dashboard from "./Dashboard";
import CreateProductForm from "./CreateProductForm";
import UpdateProductForm from "./UpdateProductForm";
import ProductsTable from "./ProductsTable";
import OrdersTable from "./OrdersTable";
import Customers from "./Customers";
import DemoAdmin from "./DemoAdmin";
import MonthlyOverview from "../Tables/MonthlyOverView"
import ManageHerosection from "./ManageHerosection";
import OrderDetails from "../../user/components/Order/OrderDetails";
import AdminOrderDetails from "./AdminOrderDetails";
import ManageGallery from "./ManageGallery";
import Contact from "./Contact";
import ManageOurBestSellerProduct from "./ManageOurBestSellerProduct";
import ManageOurProduct from "./ManageOurProduct";
import ManageFeaturedProduct from "./ManageFeaturedProduct";

const drawerWidth = 240;

const menu = [
  {name:"Dashboard",path:"/admin"},
  {name:"Products",path:"/admin/product"},
  {name:"Orders",path:"/admin/orders"},
  {name:"Add Product",path:"/admin/products"},
  {name: "Manage Herosection", path:"/admin/manageHeroSection"},
  {name: "Gallery", path:"/admin/gallery"},
  {name: "Manage Best Seller Product", path:"/admin/ourBestSeller"},
  {name: "Manage Our Product Top - Featured - MaxDiscount", path:"/admin/ourProduct"},
  {name: "Manage Raw materials", path:"/admin/ourFeaturedProduct"},




];

export default function AdminPannel() {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const [sideBarVisible, setSideBarVisible] = React.useState(false);
  const navigate=useNavigate();
  const dispatch=useDispatch()
  const {auth}=useSelector(store=>store);

  const handleLogout = () => {
   
    dispatch(logout());
    navigate("/")

  };

  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [jwt]);


  const drawer = (
    <Box
      sx={{
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {isLargeScreen}
      <List>
        {menu.map((item, index) => (
          <ListItem key={item.name} disablePadding onClick={()=>navigate(item.path)}>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <List sx={{ position: "absolute", bottom: 0, width: "100%" }}>
        <Divider />
       
        <ListItem 
        // onClick={handleLogout} 
         disablePadding >
            <ListItemButton>
            <Avatar
                        className="text-white"
                        // onClick={handleLogout}
                       
                        sx={{
                          bgcolor: deepPurple[500],
                          color: "white",
                          cursor: "pointer",
                        }}
                      >
                        {auth.user?.firstName[0].toUpperCase()}
                      </Avatar>
              <ListItemText className="ml-5" primary={"Logout"} />
            </ListItemButton>
          </ListItem>
        
      </List>
    </Box>
  );

  // const handleSideBarViewInMobile = () => {
  //   setSideBarVisible(true);
  // };

  const handleCloseSideBar = () => {
    setSideBarVisible(false);
  };

  const drawerVariant = isLargeScreen ? "permanent" : "temporary";

  return (
 
    <ThemeProvider  theme={customTheme}>
      <Box sx={{ display: `${isLargeScreen ? "flex" : "block"}` }}>
        <CssBaseline />
       {/* <AdminNavbar handleSideBarViewInMobile={handleSideBarViewInMobile} />  */}

        <Drawer
          variant={drawerVariant}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
              ...(drawerVariant === "temporary" && {
                top: 0,
                [`& .MuiPaper-root.MuiDrawer-paperAnchorTop.MuiDrawer-paperTemporary`]:
                  {
                    position: "fixed",
                    left: 0,
                    right: 0,
                    height: "100%",
                    zIndex: (theme) => theme.zIndex.drawer + 2,
                  },
              }),
            },
          }}
          open={isLargeScreen || sideBarVisible}
          onClose={handleCloseSideBar}
        >
          {drawer}
        </Drawer>
        <Box className="adminContainer" component="main" sx={{ flexGrow: 1 }}>
        
          <Routes>
            <Route path="/" element={ <Dashboard />}></Route>
            <Route path="/products" element={<CreateProductForm/>}></Route>
            <Route path="/product/update/:productId" element={<UpdateProductForm/>}></Route>
            <Route path="/contact" element={<Contact/>}></Route>
            <Route path="/product" element={<ProductsTable/>}></Route>
            <Route path="/orders" element={<OrdersTable/>}></Route>
            <Route path="/manageHeroSection" element={<ManageHerosection/>}></Route>
            <Route path="/demo" element={<DemoAdmin />}></Route>
            {/* <Route path="/monthlOverview" element={<MonthlyOverview />}></Route> */}
            <Route path="/product/update/:productId" element={<UpdateProductForm/>}></Route>
            <Route path="/orders/:orderId" element={<AdminOrderDetails/>}></Route>
            <Route path="/gallery" element={<ManageGallery/>}></Route>
            <Route path="/ourBestSeller" element={<ManageOurBestSellerProduct/>}></Route>
            <Route path="/ourProduct" element={<ManageOurProduct/>}></Route>
            <Route path="/ourFeaturedProduct" element={<ManageFeaturedProduct/>}></Route>

        </Routes>
         
      </Box>
      </Box>
    </ThemeProvider>
  );
}

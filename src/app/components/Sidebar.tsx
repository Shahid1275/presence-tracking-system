
// // "use client";
// // import { useState, useEffect, useRef } from "react";
// // import Image from "next/image";
// // import Link from "next/link";
// // import { usePathname } from "next/navigation";
// // import { useRouter } from "next/navigation";
// // import {
// //   Box,
// //   Drawer,
// //   List,
// //   ListItem,
// //   ListItemButton,
// //   ListItemIcon,
// //   ListItemText,
// //   Divider,
// //   TextField,
// //   IconButton,
// //   Typography,
// //   Toolbar,
// //   useTheme,
// // } from "@mui/material";
// // import styled from "@emotion/styled";

// // // Import MUI Icons
// // import {
// //   People as PeopleIcon,
// //   CalendarToday as CalendarIcon,
// //   LocalCafe as CoffeeIcon,
// //   LocationCity as CityIcon,
// //   School as GraduationCapIcon,
// //   Laptop as LaptopIcon,
// //   Fingerprint as FingerprintIcon,
// //   BeachAccess as UmbrellaBeachIcon,
// //   Description as FileAltIcon,
// //   Folder as FolderIcon,
// //   CheckCircle as CheckCircleIcon,
// //   AccessTime as ClockIcon,
// //   Room as MapMarkerAltIcon,
// //   Work as BusinessTimeIcon,
// //   Lock as LockIcon,
// //   AccountTree as ProjectDiagramIcon,
// //   Map as MapIcon,
// //   LocalOffer as UserTagIcon,
// //   School as UserGraduateIcon,
// //   HowToReg as UserCheckIcon,
// //   Person as UserIcon,
// //   ExitToApp as SignOutAltIcon,
// //   ChevronRight as ChevronRightIcon,
// //   ChevronLeft as ChevronLeftIcon,
// //   Search as SearchIcon,
// // } from "@mui/icons-material";

// // const modules = [
// //   { name: "Attendances", icon: <PeopleIcon />, path: "/attendances" },
// //   { name: "Batch", icon: <CalendarIcon />, path: "/batch" },
// //   { name: "BreakType", icon: <CoffeeIcon />, path: "/breaktype" },
// //   { name: "Cities", icon: <CityIcon />, path: "/cities" },
// //   { name: "DegreeProgram", icon: <GraduationCapIcon />, path: "/degreeprogram" },
// //   { name: "Device", icon: <LaptopIcon />, path: "/device" },
// //   { name: "FingerPrint", icon: <FingerprintIcon />, path: "/fingerprint" },
// //   { name: "Holiday", icon: <UmbrellaBeachIcon />, path: "/holidays" },
// //   { name: "Leave", icon: <FileAltIcon />, path: "/leave" },
// //   { name: "LeaveCategory", icon: <FolderIcon />, path: "/leavecategory" },
// //   { name: "LeaveStatus", icon: <CheckCircleIcon />, path: "/leavestatus" },
// //   { name: "LeaveType", icon: <ClockIcon />, path: "/leavetype" },
// //   { name: "Location", icon: <MapMarkerAltIcon />, path: "/location" },
// //   { name: "OfficeTime", icon: <BusinessTimeIcon />, path: "/officetime" },
// //   { name: "Permissions", icon: <LockIcon />, path: "/permissions" },
// //   { name: "Project", icon: <ProjectDiagramIcon />, path: "/project" },
// //   { name: "Province", icon: <MapIcon />, path: "/provinces" },
// //   { name: "Roles", icon: <UserTagIcon />, path: "/roles" },
// //   { name: "Student", icon: <UserGraduateIcon />, path: "/student" },
// //   { name: "StudentStatus", icon: <UserCheckIcon />, path: "/studentstatus" },
// //   { name: "User", icon: <UserIcon />, path: "/user" },
// //   { name: "Logout", icon: <SignOutAltIcon />, isLogout: true },
// // ];

// // const ScrollableDiv = styled.div`
// //   overflow-y: auto;
// //   flex-grow: 1;
// //   overflow-x: hidden;
// //   scrollbar-width: none; /* Firefox */
// //   -ms-overflow-style: none; /* IE/Edge */

// //   &::-webkit-scrollbar {
// //     display: none; /* Chrome/Safari */
// //   }
// // `;

// // export default function Sidebar() {
// //   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
// //   const [searchQuery, setSearchQuery] = useState("");
// //   const router = useRouter();
// //   const pathname = usePathname();
// //   const sidebarRef = useRef<HTMLDivElement>(null);
// //   const theme = useTheme();

// //   // Save scroll position before navigation
// //   const saveScrollPosition = () => {
// //     if (sidebarRef.current) {
// //       localStorage.setItem("sidebarScrollPosition", sidebarRef.current.scrollTop.toString());
// //     }
// //   };

// //   // Restore scroll position after navigation
// //   const restoreScrollPosition = () => {
// //     if (sidebarRef.current) {
// //       const savedPosition = localStorage.getItem("sidebarScrollPosition");
// //       if (savedPosition) {
// //         sidebarRef.current.scrollTop = parseInt(savedPosition, 10);
// //       }
// //     }
// //   };

// //   // Restore scroll position on component mount
// //   useEffect(() => {
// //     if (sidebarRef.current) {
// //       sidebarRef.current.scrollTop = 0; // Reset scroll position to top
// //     }
// //     restoreScrollPosition();
// //   }, []);

// //   const toggleSidebar = () => {
// //     setIsSidebarOpen(!isSidebarOpen);
// //   };

// //   const handleSearch = (e: React.FormEvent) => {
// //     e.preventDefault();
// //   };

// //   const filteredModules = modules.filter((module) =>
// //     module.name.toLowerCase().includes(searchQuery.toLowerCase())
// //   );

// //   const handleLogout = () => {
// //     localStorage.removeItem("token");
// //     router.push("/");
// //   };

// //   return (
// //     <Drawer
// //       variant="permanent"
// //       open={isSidebarOpen}
// //       sx={{
// //         width: isSidebarOpen ? 240 : 64,
// //         flexShrink: 0,
// //         "& .MuiDrawer-paper": {
// //           width: isSidebarOpen ? 240 : 64,
// //           boxSizing: "border-box",
// //           backgroundColor: theme.palette.background.paper,
// //           transition: theme.transitions.create("width", {
// //             easing: theme.transitions.easing.sharp,
// //             duration: theme.transitions.duration.enteringScreen,
// //           }),
// //           overflowX: "hidden", // Prevent horizontal scrolling
// //         },
// //       }}
// //     >
// //       <Toolbar>
// //         <Box
// //           sx={{
// //             display: "flex",
// //             alignItems: "center",
// //             justifyContent: "space-between",
// //             width: "100%",
// //           }}
// //         >
// //           <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
// //             <Image
// //               src="/VUlogo.png"
// //               alt="VU Logo"
// //               width={32}
// //               height={32}
// //               className="object-contain"
// //             />
// //             {isSidebarOpen && (
// //               <Typography variant="body2" noWrap>
// //                 Virtual University
// //               </Typography>
// //             )}
// //           </Box>
// //           <IconButton onClick={toggleSidebar} sx={{ padding: "4px", minWidth: "auto" }}>
// //             {isSidebarOpen ? <ChevronLeftIcon fontSize="small" /> : <ChevronRightIcon fontSize="small" />}
// //           </IconButton>
// //         </Box>
// //       </Toolbar>
// //       <Divider />
// //       {isSidebarOpen && (
// //         <>
// //           <Box sx={{ p: 2 }}>
// //             <Divider>
// //               <Typography variant="subtitle2" sx={{ color: theme.palette.text.secondary, mb: 1 }}>
// //                 Attendance Management
// //               </Typography>
// //             </Divider>
// //             <TextField
// //               fullWidth
// //               placeholder="Search..."
// //               value={searchQuery}
// //               onChange={(e) => setSearchQuery(e.target.value)}
// //               InputProps={{
// //                 startAdornment: <SearchIcon style={{ marginRight: 8, color: theme.palette.text.secondary }} />,
// //               }}
// //               sx={{ mb: 2 }}
// //             />
// //           </Box>
// //           <Divider />
// //         </>
// //       )}
// //       <ScrollableDiv ref={sidebarRef}>
// //         <List>
// //           {filteredModules.map((module) => (
// //             <ListItem key={module.name} disablePadding>
// //               <ListItemButton
// //                 component={module.isLogout ? "button" : Link}
// //                 href={module.isLogout ? undefined : module.path}
// //                 selected={pathname === module.path}
// //                 onClick={() => {
// //                   if (module.isLogout) {
// //                     handleLogout();
// //                   } else {
// //                     saveScrollPosition();
// //                   }
// //                 }}
// //                 sx={{
// //                   "&.Mui-selected": {
// //                     backgroundColor: theme.palette.action.selected,
// //                   },
// //                   "&:hover": {
// //                     backgroundColor: theme.palette.action.hover,
// //                   },
// //                 }}
// //               >
// //                 <ListItemIcon sx={{ minWidth: 40 }}>
// //                   {module.icon}
// //                 </ListItemIcon>
// //                 {isSidebarOpen && (
// //                   <ListItemText primary={module.name} />
// //                 )}
// //               </ListItemButton>
// //             </ListItem>
// //           ))}
// //         </List>
// //       </ScrollableDiv>
// //     </Drawer>
// //   );
// // }

// "use client";
// import { useState, useEffect, useRef } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useRouter } from "next/navigation";
// import {
//   Box,
//   Drawer,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   Divider,
//   TextField,
//   IconButton,
//   Typography,
//   Toolbar,
//   useTheme,
// } from "@mui/material";
// import styled from "@emotion/styled";
// import {
//   People as PeopleIcon,
//   CalendarToday as CalendarIcon,
//   LocalCafe as CoffeeIcon,
//   LocationCity as CityIcon,
//   School as GraduationCapIcon,
//   Laptop as LaptopIcon,
//   Fingerprint as FingerprintIcon,
//   BeachAccess as UmbrellaBeachIcon,
//   Description as FileAltIcon,
//   Folder as FolderIcon,
//   CheckCircle as CheckCircleIcon,
//   AccessTime as ClockIcon,
//   Room as MapMarkerAltIcon,
//   Work as BusinessTimeIcon,
//   Lock as LockIcon,
//   AccountTree as ProjectDiagramIcon,
//   Map as MapIcon,
//   LocalOffer as UserTagIcon,
//   School as UserGraduateIcon,
//   HowToReg as UserCheckIcon,
//   Person as UserIcon,
//   ExitToApp as SignOutAltIcon,
//   ChevronRight as ChevronRightIcon,
//   ChevronLeft as ChevronLeftIcon,
//   Search as SearchIcon,
// } from "@mui/icons-material";

// const modules = [
//   { name: "Attendances", icon: <PeopleIcon />, path: "/attendances" },
//   { name: "Batch", icon: <CalendarIcon />, path: "/batch" },
//   { name: "BreakType", icon: <CoffeeIcon />, path: "/breaktype" },
//   { name: "Cities", icon: <CityIcon />, path: "/cities" },
//   { name: "DegreeProgram", icon: <GraduationCapIcon />, path: "/degreeprogram" },
//   { name: "Device", icon: <LaptopIcon />, path: "/device" },
//   { name: "FingerPrint", icon: <FingerprintIcon />, path: "/fingerprint" },
//   { name: "Holiday", icon: <UmbrellaBeachIcon />, path: "/holidays" },
//   { name: "Leave", icon: <FileAltIcon />, path: "/leave" },
//   { name: "LeaveCategory", icon: <FolderIcon />, path: "/leavecategory" },
//   { name: "LeaveStatus", icon: <CheckCircleIcon />, path: "/leavestatus" },
//   { name: "LeaveType", icon: <ClockIcon />, path: "/leavetype" },
//   { name: "Location", icon: <MapMarkerAltIcon />, path: "/location" },
//   { name: "OfficeTime", icon: <BusinessTimeIcon />, path: "/officetime" },
//   { name: "Permissions", icon: <LockIcon />, path: "/permissions" },
//   { name: "Project", icon: <ProjectDiagramIcon />, path: "/project" },
//   { name: "Province", icon: <MapIcon />, path: "/provinces" },
//   { name: "Roles", icon: <UserTagIcon />, path: "/roles" },
//   { name: "Student", icon: <UserGraduateIcon />, path: "/student" },
//   { name: "StudentStatus", icon: <UserCheckIcon />, path: "/studentstatus" },
//   { name: "User", icon: <UserIcon />, path: "/user" },
//   { name: "Logout", icon: <SignOutAltIcon />, isLogout: true },
// ];

// const ScrollableDiv = styled.div`
//   overflow-y: auto;
//   flex-grow: 1;
//   overflow-x: hidden;
//   scrollbar-width: none; /* Firefox */
//   -ms-overflow-style: none; /* IE/Edge */
//   &::-webkit-scrollbar {
//     display: none; /* Chrome/Safari */
//   }
// `;

// export default function Sidebar() {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");
//   const router = useRouter();
//   const pathname = usePathname();
//   const sidebarRef = useRef<HTMLDivElement>(null);
//   const theme = useTheme();

//   // Save scroll position before navigation
//   const saveScrollPosition = () => {
//     if (sidebarRef.current) {
//       localStorage.setItem("sidebarScrollPosition", sidebarRef.current.scrollTop.toString());
//     }
//   };

//   // Restore scroll position after navigation
//   const restoreScrollPosition = () => {
//     if (sidebarRef.current) {
//       const savedPosition = localStorage.getItem("sidebarScrollPosition");
//       if (savedPosition) {
//         sidebarRef.current.scrollTop = parseInt(savedPosition, 10);
//       }
//     }
//   };

//   useEffect(() => {
//     if (sidebarRef.current) {
//       sidebarRef.current.scrollTop = 0; // Reset scroll position to top
//     }
//     restoreScrollPosition();
//   }, []);

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault();
//   };

//   const filteredModules = modules.filter((module) =>
//     module.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     router.push("/");
//   };

//   return (
//     <Drawer
//       variant="permanent"
//       open={isSidebarOpen}
//       sx={{
//         width: isSidebarOpen ? 240 : 64,
//         flexShrink: 0,
//         "& .MuiDrawer-paper": {
//           width: isSidebarOpen ? 240 : 64,
//           boxSizing: "border-box",
//           backgroundColor: theme.palette.grey[900], // Dark background for professional look
//           color: theme.palette.common.white, // White text for contrast
//           boxShadow: "2px 0 8px rgba(0, 0, 0, 0.2)", // Subtle shadow for depth
//           transition: theme.transitions.create("width", {
//             easing: theme.transitions.easing.sharp,
//             duration: theme.transitions.duration.enteringScreen,
//           }),
//           overflowX: "hidden",
//         },
//       }}
//     >
//       {/* Header Section */}
//       <Toolbar sx={{ backgroundColor: theme.palette.grey[800], py: 1 }}>
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//             width: "100%",
//           }}
//         >
//           <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//             <Image
//               src="/VUlogo.png"
//               alt="VU Logo"
//               width={32}
//               height={32}
//               className="object-contain"
//             />
//             {isSidebarOpen && (
//               <Typography variant="body2" noWrap sx={{ color: "white" }}>
//                 Virtual University
//               </Typography>
//             )}
//           </Box>
//           <IconButton
//             onClick={toggleSidebar}
//             sx={{ padding: "4px", minWidth: "auto", color: "white" }}
//           >
//             {isSidebarOpen ? <ChevronLeftIcon fontSize="small" /> : <ChevronRightIcon fontSize="small" />}
//           </IconButton>
//         </Box>
//       </Toolbar>
//       <Divider sx={{ borderColor: theme.palette.grey[700] }} />

//       {/* Search Section */}
//       {isSidebarOpen && (
//         <>
//           <Box sx={{ p: 2, backgroundColor: theme.palette.grey[800] }}>
//             <Divider sx={{ borderColor: theme.palette.grey[700], mb: 1 }}>
//               <Typography
//                 variant="subtitle2"
//                 sx={{ color: theme.palette.grey[400], py: 0.5 }}
//               >
//                 Attendance Management
//               </Typography>
//             </Divider>
//             <TextField
//               fullWidth
//               placeholder="Search..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               InputProps={{
//                 startAdornment: (
//                   <SearchIcon sx={{ mr: 1, color: theme.palette.grey[400] }} />
//                 ),
//               }}
//               sx={{
//                 "& .MuiInputBase-root": {
//                   backgroundColor: theme.palette.grey[700],
//                   color: "white",
//                   borderRadius: 1,
//                 },
//                 "& .MuiOutlinedInput-notchedOutline": {
//                   borderColor: theme.palette.grey[600],
//                 },
//                 "&:hover .MuiOutlinedInput-notchedOutline": {
//                   borderColor: theme.palette.grey[500],
//                 },
//               }}
//             />
//           </Box>
//           <Divider sx={{ borderColor: theme.palette.grey[700] }} />
//         </>
//       )}

//       {/* Modules List */}
//       <ScrollableDiv ref={sidebarRef}>
//         <List>
//           {filteredModules.map((module) => (
//             <ListItem key={module.name} disablePadding>
//               <ListItemButton
//                 component={module.isLogout ? "button" : Link}
//                 href={module.isLogout ? undefined : module.path}
//                 selected={pathname === module.path}
//                 onClick={() => {
//                   if (module.isLogout) {
//                     handleLogout();
//                   } else {
//                     saveScrollPosition();
//                   }
//                 }}
//                 sx={{
//                   py: 1.5,
//                   "&.Mui-selected": {
//                     backgroundColor: theme.palette.grey[800],
//                     color: theme.palette.primary.main,
//                     "& .MuiListItemIcon-root": {
//                       color: theme.palette.primary.main,
//                     },
//                   },
//                   "&:hover": {
//                     backgroundColor: theme.palette.grey[700],
//                   },
//                   "& .MuiListItemIcon-root": {
//                     color: theme.palette.grey[300],
//                   },
//                 }}
//               >
//                 <ListItemIcon sx={{ minWidth: 40 }}>
//                   {module.icon}
//                 </ListItemIcon>
//                 {isSidebarOpen && (
//                   <ListItemText
//                     primary={module.name}
//                     primaryTypographyProps={{ variant: "body2" }}
//                   />
//                 )}
//               </ListItemButton>
//             </ListItem>
//           ))}
//         </List>
//       </ScrollableDiv>
//     </Drawer>
//   );
// }
"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  TextField,
  IconButton,
  Typography,
  Toolbar,
  useTheme,
} from "@mui/material";
import styled from "@emotion/styled";
import {
  People as PeopleIcon,
  CalendarToday as CalendarIcon,
  LocalCafe as CoffeeIcon,
  LocationCity as CityIcon,
  School as GraduationCapIcon,
  Laptop as LaptopIcon,
  Fingerprint as FingerprintIcon,
  BeachAccess as UmbrellaBeachIcon,
  Description as FileAltIcon,
  Folder as FolderIcon,
  CheckCircle as CheckCircleIcon,
  AccessTime as ClockIcon,
  Room as MapMarkerAltIcon,
  Work as BusinessTimeIcon,
  Lock as LockIcon,
  AccountTree as ProjectDiagramIcon,
  Map as MapIcon,
  LocalOffer as UserTagIcon,
  School as UserGraduateIcon,
  HowToReg as UserCheckIcon,
  Person as UserIcon,
  ExitToApp as SignOutAltIcon,
  ChevronRight as ChevronRightIcon,
  ChevronLeft as ChevronLeftIcon,
  Search as SearchIcon,
} from "@mui/icons-material";

const modules = [
  { name: "Attendances", icon: <PeopleIcon />, path: "/attendances" },
  { name: "Batch", icon: <CalendarIcon />, path: "/batch" },
  { name: "BreakType", icon: <CoffeeIcon />, path: "/breaktype" },
  { name: "Cities", icon: <CityIcon />, path: "/cities" },
  { name: "DegreeProgram", icon: <GraduationCapIcon />, path: "/degreeprogram" },
  { name: "Device", icon: <LaptopIcon />, path: "/device" },
  { name: "FingerPrint", icon: <FingerprintIcon />, path: "/fingerprint" },
  { name: "Holiday", icon: <UmbrellaBeachIcon />, path: "/holidays" },
  { name: "Leave", icon: <FileAltIcon />, path: "/leave" },
  { name: "LeaveCategory", icon: <FolderIcon />, path: "/leavecategory" },
  { name: "LeaveStatus", icon: <CheckCircleIcon />, path: "/leavestatus" },
  { name: "LeaveType", icon: <ClockIcon />, path: "/leavetype" },
  { name: "Location", icon: <MapMarkerAltIcon />, path: "/location" },
  { name: "OfficeTime", icon: <BusinessTimeIcon />, path: "/officetime" },
  { name: "Permissions", icon: <LockIcon />, path: "/permissions" },
  { name: "Project", icon: <ProjectDiagramIcon />, path: "/project" },
  { name: "Province", icon: <MapIcon />, path: "/provinces" },
  { name: "Roles", icon: <UserTagIcon />, path: "/roles" },
  { name: "Student", icon: <UserGraduateIcon />, path: "/student" },
  { name: "StudentStatus", icon: <UserCheckIcon />, path: "/studentstatus" },
  { name: "User", icon: <UserIcon />, path: "/user" },
  { name: "Logout", icon: <SignOutAltIcon />, isLogout: true },
];

const ScrollableDiv = styled.div`
  overflow-y: auto;
  flex-grow: 1;
  overflow-x: hidden;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge */

  &::-webkit-scrollbar {
    display: none; /* Chrome/Safari */
  }
`;

export default function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();

  // Save scroll position before navigation
  const saveScrollPosition = () => {
    if (sidebarRef.current) {
      localStorage.setItem("sidebarScrollPosition", sidebarRef.current.scrollTop.toString());
    }
  };

  // Restore scroll position after navigation
  const restoreScrollPosition = () => {
    if (sidebarRef.current) {
      const savedPosition = localStorage.getItem("sidebarScrollPosition");
      if (savedPosition) {
        sidebarRef.current.scrollTop = parseInt(savedPosition, 10);
      }
    }
  };

  useEffect(() => {
    if (sidebarRef.current) {
      sidebarRef.current.scrollTop = 0; // Reset scroll position to top
    }
    restoreScrollPosition();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const filteredModules = modules.filter((module) =>
    module.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <Drawer
      variant="permanent"
      open={isSidebarOpen}
      sx={{
        width: isSidebarOpen ? 240 : 64,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: isSidebarOpen ? 240 : 64,
          boxSizing: "border-box",
          backgroundColor: "#1F2A44", // Dark grayish-black from image
          color: "#FFFFFF", // White text
          boxShadow: "2px 0 8px rgba(0, 0, 0, 0.2)",
          transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          overflowX: "hidden",
        },
      }}
    >
      {/* Header Section */}
      <Toolbar sx={{ backgroundColor: "#263238", py: 1 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Image
              src="/VUlogo.png"
              alt="VU Logo"
              width={32}
              height={32}
              className="object-contain"
            />
            {isSidebarOpen && (
              <Typography variant="body2" noWrap sx={{ color: "#FFFFFF" }}>
                Virtual University
              </Typography>
            )}
          </Box>
          <IconButton
            onClick={toggleSidebar}
            sx={{ padding: "4px", minWidth: "auto", color: "#FFFFFF" }}
          >
            {isSidebarOpen ? <ChevronLeftIcon fontSize="small" /> : <ChevronRightIcon fontSize="small" />}
          </IconButton>
        </Box>
      </Toolbar>
      <Divider sx={{ borderColor: "#90A4AE" }} />

      {/* Search Section */}
      {isSidebarOpen && (
        <>
          <Box sx={{ p: 2, backgroundColor: "#263238" }}>
            <Divider sx={{ borderColor: "#90A4AE", mb: 1 }}>
              <Typography
                variant="subtitle2"
                sx={{ color: "#90A4AE", py: 0.5 }}
              >
                Attendance Management
              </Typography>
            </Divider>
            <TextField
              fullWidth
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <SearchIcon sx={{ mr: 1, color: "#90A4AE" }} />
                ),
              }}
              sx={{
                "& .MuiInputBase-root": {
                  backgroundColor: "#2C3E50",
                  color: "#FFFFFF",
                  borderRadius: 1,
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#90A4AE",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#B0BEC5",
                },
              }}
            />
          </Box>
          <Divider sx={{ borderColor: "#90A4AE" }} />
        </>
      )}

      {/* Modules List */}
      <ScrollableDiv ref={sidebarRef}>
        <List>
          {filteredModules.map((module) => (
            <ListItem key={module.name} disablePadding>
              <ListItemButton
                component={module.isLogout ? "button" : Link}
                href={module.isLogout ? undefined : module.path}
                selected={pathname === module.path}
                onClick={() => {
                  if (module.isLogout) {
                    handleLogout();
                  } else {
                    saveScrollPosition();
                  }
                }}
                sx={{
                  py: 1.5,
                  "&.Mui-selected": {
                    backgroundColor: "#1E88E5",
                    color: "#FFFFFF",
                    "& .MuiListItemIcon-root": {
                      color: "#FFFFFF",
                    },
                  },
                  "&:hover": {
                    backgroundColor: "#202121",
                  },
                  "& .MuiListItemIcon-root": {
                    color: "#D3D8E0",
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  {module.icon}
                </ListItemIcon>
                {isSidebarOpen && (
                  <ListItemText
                    primary={module.name}
                    primaryTypographyProps={{ variant: "body2" }}
                  />
                )}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </ScrollableDiv>
    </Drawer>
  );
}
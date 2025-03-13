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

// Import MUI Icons
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
  { name: "City", icon: <CityIcon />, path: "/city" },
  { name: "DegreeProgram", icon: <GraduationCapIcon />, path: "/degreeprogram" },
  { name: "Device", icon: <LaptopIcon />, path: "/device" },
  { name: "FingerPrint", icon: <FingerprintIcon />, path: "/fingerprint" },
  { name: "Holiday", icon: <UmbrellaBeachIcon />, path: "/holiday" },
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

  // Restore scroll position on component mount
  useEffect(() => {
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
          backgroundColor: theme.palette.background.paper,
          transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          overflowX: "hidden", // Prevent horizontal scrolling
        },
      }}
    >
      <Toolbar>
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
              <Typography variant="body2" noWrap>
                Virtual University
              </Typography>
            )}
          </Box>
          <IconButton onClick={toggleSidebar} sx={{ padding: "4px", minWidth: "auto" }}>
            {isSidebarOpen ? <ChevronLeftIcon fontSize="small" /> : <ChevronRightIcon fontSize="small" />}
          </IconButton>
        </Box>
      </Toolbar>
      <Divider />
      {isSidebarOpen && (
        <>
          <Box sx={{ p: 2 }}>
            <Divider>
              <Typography variant="subtitle2" sx={{ color: theme.palette.text.secondary, mb: 1 }}>
                Attendance Management
              </Typography>
            </Divider>
            <TextField
              fullWidth
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon style={{ marginRight: 8, color: theme.palette.text.secondary }} />,
              }}
              sx={{ mb: 2 }}
            />
          </Box>
          <Divider />
        </>
      )}
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
                  "&.Mui-selected": {
                    backgroundColor: theme.palette.action.selected,
                  },
                  "&:hover": {
                    backgroundColor: theme.palette.action.hover,
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  {module.icon}
                </ListItemIcon>
                {isSidebarOpen && (
                  <ListItemText primary={module.name} />
                )}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </ScrollableDiv>
    </Drawer>
  );
}
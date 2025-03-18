// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { fetchData, deleteProvince } from "../utils/api";
// import Layout from "../components/Layout";
// import Link from "next/link";
// import {
//   Container,
//   Typography,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   CircularProgress,
//   Alert,
//   Paper,
//   Box,
//   Stack,
//   Tooltip,
//   IconButton,
// } from "@mui/material";
// import AddIcon from "@mui/icons-material/Add";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import { blue, green, red } from "@mui/material/colors";

// interface Province {
//   id: number;
//   name: string;
// }

// interface ApiResponse {
//   current_page: number;
//   data: Province[];
//   first_page_url: string;
//   from: number;
//   last_page: number;
//   last_page_url: string;
//   links: { url: string | null; label: string; active: boolean }[];
//   next_page_url: string | null;
//   path: string;
//   per_page: number;
//   prev_page_url: string | null;
//   to: number;
//   total: number;
// }

// const ProvincesPage = () => {
//   const [provinces, setProvinces] = useState<Province[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchProvinces = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) {
//           router.push("/login");
//           return;
//         }

//         const response = await fetchData<ApiResponse>("/provinces", {
//           headers: {
//             Accept: "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         setProvinces(response.data);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : "An error occurred");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProvinces();
//   }, [router]);

//   const handleView = (id: number) => {
//     router.push(`/provinces/${id}`);
//   };

//   const handleEdit = (id: number) => {
//     router.push(`/provinces/${id}/edit`);
//   };

//   const handleDelete = async (id: number) => {
//     if (confirm(`Are you sure you want to delete province with ID ${id}?`)) {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) {
//           router.push("/login");
//           return;
//         }

//         await deleteProvince(id, token);
//         setProvinces(provinces.filter((province) => province.id !== id));
//         console.log(`Province with ID ${id} deleted successfully.`);
//       } catch (err) {
//         if (err instanceof Error) {
//           setError(`Failed to delete province: ${err.message}`);
//         } else {
//           setError("An unknown error occurred while deleting the province.");
//         }
//         console.error("Delete Error:", err);
//       }
//     }
//   };

//   return (
//     <Layout>
//       <Container maxWidth="lg" sx={{ py: 4 }}>
//         {/* Header Section */}
//         <Stack
//           direction="row"
//           justifyContent="space-between"
//           alignItems="center"
//           sx={{ mb: 4 }}
//         >
//           <Typography
//             variant="h4"
//             component="h1"
//             sx={{ fontWeight: "bold", color: "text.primary" }}
//           >
//             Provinces
//           </Typography>
//           <Button
//             variant="contained"
//             color="primary"
//             startIcon={<AddIcon />}
//             component={Link}
//             href="/provinces/create"
//             sx={{
//               borderRadius: 2,
//               textTransform: "none",
//               px: 3,
//               py: 1,
//               boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
//               "&:hover": {
//                 boxShadow: "0 6px 16px rgba(0, 0, 0, 0.2)",
//               },
//             }}
//           >
//             Create New Province
//           </Button>
//         </Stack>

//         {/* Loading State */}
//         {loading && (
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               minHeight: "200px",
//             }}
//           >
//             <CircularProgress size={48} color="primary" />
//           </Box>
//         )}

//         {/* Error State */}
//         {error && (
//           <Alert
//             severity="error"
//             sx={{
//               mb: 3,
//               borderRadius: 2,
//               boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
//             }}
//           >
//             {error}
//           </Alert>
//         )}

//         {/* Provinces Table */}
//         {!loading && !error && (
//           <TableContainer
//             component={Paper}
//             sx={{
//               borderRadius: 2,
//               boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
//               overflowX: "auto",
//             }}
//           >
//             <Table sx={{ minWidth: 650 }}>
//               <TableHead>
//                 <TableRow
//                   sx={{
//                     backgroundColor: "primary.main",
//                     "& th": {
//                       fontWeight: "bold",
//                       color: "common.white",
//                       py: 2,
//                     },
//                   }}
//                 >
//                   <TableCell>ID</TableCell>
//                   <TableCell>Name</TableCell>
//                   <TableCell align="right">Actions</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {provinces.length === 0 ? (
//                   <TableRow>
//                     <TableCell colSpan={3} align="center">
//                       <Typography variant="body1" color="text.secondary" sx={{ py: 3 }}>
//                         No provinces found.
//                       </Typography>
//                     </TableCell>
//                   </TableRow>
//                 ) : (
//                   provinces.map((province) => (
//                     <TableRow
//                       key={province.id}
//                       sx={{
//                         "&:hover": {
//                           backgroundColor: "grey.50",
//                           transition: "background-color 0.2s ease-in-out",
//                         },
//                       }}
//                     >
//                       <TableCell>{province.id}</TableCell>
//                       <TableCell>{province.name}</TableCell>
//                       <TableCell align="right">
//                         <Stack direction="row" spacing={1} justifyContent="flex-end">
//                           <Tooltip title="View">
//                             <IconButton
//                               onClick={() => handleView(province.id)}
//                               sx={{
//                                 color: blue[600],
//                                 "&:hover": {
//                                   backgroundColor: blue[50],
//                                 },
//                               }}
//                             >
//                               <VisibilityIcon />
//                             </IconButton>
//                           </Tooltip>
//                           <Tooltip title="Edit">
//                             <IconButton
//                               onClick={() => handleEdit(province.id)}
//                               sx={{
//                                 color: green[600],
//                                 "&:hover": {
//                                   backgroundColor: green[50],
//                                 },
//                               }}
//                             >
//                               <EditIcon />
//                             </IconButton>
//                           </Tooltip>
//                           <Tooltip title="Delete">
//                             <IconButton
//                               onClick={() => handleDelete(province.id)}
//                               sx={{
//                                 color: red[600],
//                                 "&:hover": {
//                                   backgroundColor: red[50],
//                                 },
//                               }}
//                             >
//                               <DeleteIcon />
//                             </IconButton>
//                           </Tooltip>
//                         </Stack>
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         )}
//       </Container>
//     </Layout>
//   );
// };

// export default ProvincesPage;

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchData, deleteProvince } from "../utils/api";
import Layout from "../components/Layout";
import Link from "next/link";
import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Alert,
  Paper,
  Box,
  Stack,
  Tooltip,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { blue, green, red } from "@mui/material/colors";

interface Province {
  id: number;
  name: string;
}

interface ApiResponse {
  current_page: number;
  data: Province[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: { url: string | null; label: string; active: boolean }[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

const ProvincesPage = () => {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/login");
          return;
        }

        const response = await fetchData<ApiResponse>("/provinces", {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        setProvinces(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchProvinces();
  }, [router]);

  const handleView = (id: number) => {
    router.push(`/provinces/${id}`);
  };

  const handleEdit = (id: number) => {
    router.push(`/provinces/${id}/edit`);
  };

  const handleDelete = async (id: number) => {
    if (confirm(`Are you sure you want to delete province with ID ${id}?`)) {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/login");
          return;
        }
  
        await deleteProvince(id, token);
        setProvinces(provinces.filter((province) => province.id !== id));
        console.log(`Province with ID ${id} deleted successfully.`);
      } catch (err) {
        if (err instanceof Error) {
          if (err.message.includes("There are some Cities of this Province")) {
            // Redirect to the delete error page
            router.push(`/provinces/${id}/delete-error`);
          } else {
            setError(`Failed to delete province: ${err.message}`);
          }
        } else {
          setError("An unknown error occurred while deleting the province.");
        }
        // console.error("Delete Error:", err);
      }
    }
  };
  return (
    <Layout>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Header Section */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 4 }}
        >
          <Typography
            variant="h4"
            component="h1"
            sx={{ fontWeight: "bold", color: "text.primary" }}
          >
            Provinces
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            component={Link}
            href="/provinces/create"
            sx={{
              borderRadius: 2,
              textTransform: "none",
              px: 3,
              py: 1,
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              "&:hover": {
                boxShadow: "0 6px 16px rgba(0, 0, 0, 0.2)",
              },
            }}
          >
            Create New Province
          </Button>
        </Stack>

        {/* Loading State */}
        {loading && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "200px",
            }}
          >
            <CircularProgress size={48} color="primary" />
          </Box>
        )}

        {/* Error State */}
        {error && (
          <Alert
            severity="error"
            sx={{
              mb: 3,
              borderRadius: 2,
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            {error}
          </Alert>
        )}

        {/* Provinces Table */}
        {!loading && !error && (
          <TableContainer
            component={Paper}
            sx={{
              borderRadius: 2,
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
              overflowX: "auto",
            }}
          >
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow
                  sx={{
                    backgroundColor: "primary.main",
                    "& th": {
                      fontWeight: "bold",
                      color: "common.white",
                      py: 2,
                    },
                  }}
                >
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {provinces.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      <Typography variant="body1" color="text.secondary" sx={{ py: 3 }}>
                        No provinces found.
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  provinces.map((province) => (
                    <TableRow
                      key={province.id}
                      sx={{
                        "&:hover": {
                          backgroundColor: "grey.50",
                          transition: "background-color 0.2s ease-in-out",
                        },
                      }}
                    >
                      <TableCell>{province.id}</TableCell>
                      <TableCell>{province.name}</TableCell>
                      <TableCell align="right">
                        <Stack direction="row" spacing={1} justifyContent="flex-end">
                          <Tooltip title="View">
                            <IconButton
                              onClick={() => handleView(province.id)}
                              sx={{
                                color: blue[600],
                                "&:hover": {
                                  backgroundColor: blue[50],
                                },
                              }}
                            >
                              <VisibilityIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Edit">
                            <IconButton
                              onClick={() => handleEdit(province.id)}
                              sx={{
                                color: green[600],
                                "&:hover": {
                                  backgroundColor: green[50],
                                },
                              }}
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton
                              onClick={() => handleDelete(province.id)}
                              sx={{
                                color: red[600],
                                "&:hover": {
                                  backgroundColor: red[50],
                                },
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>
    </Layout>
  );
};

export default ProvincesPage;
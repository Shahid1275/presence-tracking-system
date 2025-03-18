// // "use client";

// // import { useRouter } from "next/navigation";
// // import { Container, Typography, Button, Box, Alert } from "@mui/material";
// // import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// // import React from "react";
// // import Layout from "@/app/layout";

// // const DeleteErrorPage = ({ params }: { params: Promise<{ id: string }> }) => {
// //   const router = useRouter();

// //   // Unwrap the params object using React.use()
// //   const { id } = React.use(params);

// //   return (

// //     <Container maxWidth="lg" sx={{ py: 4 }}>
// //       <Box sx={{ mb: 4 }}>
// //         <Button
// //           startIcon={<ArrowBackIcon />}
// //           onClick={() => router.push("/provinces")}
// //           sx={{ mb: 2 }}
// //         >
// //           Back to Provinces
// //         </Button>
// //         <Alert
// //           severity="error"
// //           sx={{
// //             borderRadius: 2,
// //             boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
// //           }}
// //         >
// //           <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
// //             Cannot Delete Province
// //           </Typography>
// //           <Typography variant="body1" sx={{ mt: 1 }}>
// //             You cannot delete province with ID {id} because there are cities associated with it.
// //           </Typography>
// //         </Alert>
// //       </Box>
// //     </Container>
// //   );
// // };

// // export default DeleteErrorPage;
// "use client";
// import { useRouter } from "next/navigation";
// import { Container, Typography, Button, Box, Alert } from "@mui/material";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import React from "react";
// import Layout from "@/app/layout";

// const DeleteErrorPage = ({ params }: { params: Promise<{ id: string }> }) => {
//   const router = useRouter();

//   // Unwrap the params object using React.use()
//   const { id } = React.use(params);

//   return (
//       <Container maxWidth="lg" sx={{ py: 4 }}>
//         <Box sx={{ mb: 4 }}>
//           <Button
//             startIcon={<ArrowBackIcon />}
//             onClick={() => router.push("/provinces")}
//             sx={{ mb: 2 }}
//           >
//             Back to Provinces
//           </Button>
//           <Alert
//             severity="error"
//             sx={{
//               borderRadius: 2,
//               boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
//             }}
//           >
//             <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
//               Cannot Delete Province
//             </Typography>
//             <Typography variant="body1" sx={{ mt: 1 }}>
//               You cannot delete province with ID {id} because there are cities associated with it.
//             </Typography>
//           </Alert>
//         </Box>
//       </Container>
//   );
// };

// export default DeleteErrorPage;
import RootLayout from "../../../RootLayout";
import DeleteErrorPage from "../../../components/DeleteErrorPage";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <RootLayout>
      <DeleteErrorPage params={Promise.resolve(params)} />
    </RootLayout>
  );
}
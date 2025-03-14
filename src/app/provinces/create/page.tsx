// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { createProvince } from "../../utils/api";
// import Layout from "@/app/components/Layout";

// const CreateProvincePage = () => {
//   const [name, setName] = useState("");
//   const [error, setError] = useState<string | null>(null);
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await createProvince({ name });
//       router.push("/provinces");
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "An error occurred");
//     }
//   };

//   return (
//     <Layout>

// <div>
//       <h1>Create Province</h1>
//       {error && <div>Error: {error}</div>}
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           placeholder="Province Name"
//         />
//         <button type="submit">Create</button>
//       </form>
//     </div>
//     </Layout>
//   );
// };

// export default CreateProvincePage;
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Layout from "../../components/Layout";
import { Button, TextField, Typography, Alert, Paper } from "@mui/material";

const CreateProvincePage = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found. Please log in.");
      }

      const response = await fetch(
        "http://192.168.50.218/laravel-project/attendance-system/public/api/provinces/create",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Province created:", data);

      router.push("/provinces");
    } catch (err) {
      console.error("Error creating province:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Paper sx={{ p: 4, maxWidth: 600, mx: "auto", mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create Province
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Province Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create"}
          </Button>
        </form>
      </Paper>
    </Layout>
  );
};

export default CreateProvincePage;
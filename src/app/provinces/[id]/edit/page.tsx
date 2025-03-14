
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getProvince, updateProvince } from "../../../utils/api";
import Layout from "../../../components/Layout";
import {
  Typography,
  Alert,
  Paper,
  Button,
  TextField,
  CircularProgress,
  Stack,
  Snackbar,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const EditProvincePage = () => {
  const { id } = useParams();
  const [name, setName] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchProvince = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/login");
          return;
        }
        if (!id || isNaN(Number(id))) {
          throw new Error("Invalid province ID");
        }

        const data = await getProvince(Number(id), token);
        console.log("Fetched Province:", data);
        setName(typeof data.name === "string" ? data.name : "");
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      }
    };

    fetchProvince();
  }, [id, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }
      await updateProvince(Number(id), { name }, token);
      setSuccess(true);
      setTimeout(() => router.push(`/provinces`), 1000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Paper sx={{ p: 4, maxWidth: 600, mx: "auto", mt: 4 }}>
        <Button startIcon={<ArrowBackIcon />} onClick={() => router.back()} sx={{ mb: 2 }}>
          Back
        </Button>
        <Typography variant="h4" gutterBottom>
          Edit Province
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <Snackbar
          open={success}
          autoHideDuration={3000}
          onClose={() => setSuccess(false)}
          message="Province updated successfully!"
        />
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Province Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
            required
            disabled={loading}
          />
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              disabled={loading || !name.trim()}
            >
              {loading ? <CircularProgress size={24} /> : "Update"}
            </Button>
            <Button
              variant="outlined"
              onClick={() => router.back()}
              disabled={loading}
            >
              Cancel
            </Button>
          </Stack>
        </form>
      </Paper>
    </Layout>
  );
};

export default EditProvincePage;

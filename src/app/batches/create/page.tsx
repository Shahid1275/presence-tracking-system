"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Layout from "../../components/Layout";
import {
  Button,
  TextField,
  Typography,
  Alert,
  Paper,
  Stack,
} from "@mui/material";

interface Batch {
  id: number;
  title: string;
  session: string;
  leaves_allowed: number;
  start_date: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
}

const CreateBatchPage = () => {
  const [title, setTitle] = useState<string>("");
  const [titleError, setTitleError] = useState<string>("");
  const [session, setSession] = useState<string>("");
  const [sessionError, setSessionError] = useState<string>("");
  const [leavesAllowed, setLeavesAllowed] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  // Get the current date in YYYY-MM-DD format for the min attribute
  const currentDate = new Date().toISOString().split("T")[0];

  // Real-time validation for title
  const handleTitleChange = (value: string) => {
    setTitle(value);
    const titleRegex = /^batch-\d*$/;
    if (!titleRegex.test(value) && value !== "") {
      setTitleError("Must be in the format 'batch-14'");
    } else {
      setTitleError("");
    }
  };

  // Real-time validation for session
  const handleSessionChange = (value: string) => {
    setSession(value);
    const sessionRegex = /^[a-zA-Z]*\d{0,4}\s*-\s*[a-zA-Z]*\d{0,4}$/;
    if (!sessionRegex.test(value) && value !== "") {
      setSessionError("Must be in the format 'fall2022 - spring2023'");
    } else {
      setSessionError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found. Please log in.");
      }

      // Basic required field checks
      if (!title.trim()) {
        throw new Error("Batch title is required.");
      }

      if (!session.trim()) {
        throw new Error("Session is required.");
      }

      const leavesAllowedNum = Number(leavesAllowed);
      if (isNaN(leavesAllowedNum) || leavesAllowedNum < 0) {
        throw new Error("Leaves Allowed must be a valid non-negative number.");
      }
      if (leavesAllowedNum > 100) {
        throw new Error("Leaves Allowed must not exceed 100.");
      }

      if (!startDate) {
        throw new Error("Start Date is required.");
      }

      const parsedStartDate = new Date(startDate);
      if (isNaN(parsedStartDate.getTime())) {
        throw new Error("Start Date must be a valid date.");
      }

      // Validate that the start_date is not less than the current date
      const currentDateObj = new Date();
      currentDateObj.setHours(0, 0, 0, 0);
      parsedStartDate.setHours(0, 0, 0, 0);
      if (parsedStartDate < currentDateObj) {
        throw new Error("Start Date cannot be earlier than the current date.");
      }

      const batchData = {
        title,
        session,
        leaves_allowed: leavesAllowedNum,
        start_date: startDate,
      };

      const response = await fetch("/api/batches/create", {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(batchData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Batch created:", data);

      router.push("/batches");
    } catch (err) {
      console.error("Error creating batch:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Paper sx={{ p: 4, maxWidth: 600, mx: "auto", mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create Batch
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Batch Title"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            margin="normal"
            required
            disabled={loading}
            error={!!titleError}
            helperText={titleError || "Format: batch-14"}
          />
          <TextField
            fullWidth
            label="Session"
            value={session}
            onChange={(e) => handleSessionChange(e.target.value)}
            margin="normal"
            required
            disabled={loading}
            error={!!sessionError}
            helperText={sessionError || "Format: fall2022 - spring2023"}
          />
          <TextField
            fullWidth
            label="Leaves Allowed"
            type="number"
            value={leavesAllowed}
            onChange={(e) => setLeavesAllowed(e.target.value)}
            margin="normal"
            required
            disabled={loading}
          />
          <TextField
            fullWidth
            label="Start Date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            margin="normal"
            required
            disabled={loading}
            InputLabelProps={{ shrink: true }}
            inputProps={{ min: currentDate }}
            helperText={`Must be on or after ${currentDate}`}
          />
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading || !!titleError || !!sessionError}
            >
              {loading ? "Creating..." : "Create"}
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => router.push("/batches")}
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

export default CreateBatchPage;
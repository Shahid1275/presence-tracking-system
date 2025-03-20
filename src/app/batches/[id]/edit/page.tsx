"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getBatch, updateBatch } from "../../../utils/api";
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
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface Batch {
  id: number;
  title: string;
  start_date: string;
  end_date: string | null;
  session: string;
  leaves_allowed: number;
  working_days: number;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
}

const EditBatchPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const batchId = id ? Number(id) : NaN;

  const [title, setTitle] = useState<string>("");
  const [titleError, setTitleError] = useState<string>("");
  const [session, setSession] = useState<string>("");
  const [sessionError, setSessionError] = useState<string>("");
  const [leavesAllowed, setLeavesAllowed] = useState<string>("");
  const [workingDays, setWorkingDays] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  const currentDate = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const fetchBatchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/login");
          return;
        }
        if (isNaN(batchId)) {
          throw new Error("Invalid batch ID");
        }

        const batchResponse = await getBatch(batchId, token);
        console.log("Batch Response:", batchResponse);

        if (batchResponse.data) {
          const batch = batchResponse.data;
          setTitle(batch.title || "");
          setSession(batch.session || "");
          setLeavesAllowed(batch.leaves_allowed?.toString() || "");
          setWorkingDays(batch.working_days?.toString() || "");
          setStartDate(batch.start_date || "");
          setEndDate(batch.end_date || "");
        } else {
          throw new Error("Batch not found.");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchBatchData();
  }, [batchId, router]);

  const handleTitleChange = (value: string) => {
    setTitle(value);
    const titleRegex = /^batch-\d*$/;
    if (!titleRegex.test(value) && value !== "") {
      setTitleError("Must be in the format 'batch-14'");
    } else {
      setTitleError("");
    }
  };

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
        router.push("/login");
        return;
      }

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

      const workingDaysNum = Number(workingDays);
      if (isNaN(workingDaysNum) || workingDaysNum <= 0) {
        throw new Error("Working Days must be a valid positive number.");
      }

      if (!startDate) {
        throw new Error("Start Date is required.");
      }

      const parsedStartDate = new Date(startDate);
      if (isNaN(parsedStartDate.getTime())) {
        throw new Error("Start Date must be a valid date.");
      }

      const currentDateObj = new Date();
      currentDateObj.setHours(0, 0, 0, 0);
      parsedStartDate.setHours(0, 0, 0, 0);
      if (parsedStartDate < currentDateObj) {
        throw new Error("Start Date cannot be earlier than the current date.");
      }

      let parsedEndDate: Date | null = null;
      if (endDate) {
        parsedEndDate = new Date(endDate);
        if (isNaN(parsedEndDate.getTime())) {
          throw new Error("End Date must be a valid date.");
        }

        if (parsedEndDate < currentDateObj) {
          throw new Error("End Date cannot be earlier than the current date.");
        }

        if (parsedEndDate <= parsedStartDate) {
          throw new Error("End Date must be after the Start Date.");
        }
      }

      const batchData = {
        title,
        session,
        leaves_allowed: leavesAllowedNum,
        working_days: workingDaysNum,
        start_date: startDate,
        end_date: endDate || null,
      };

      await updateBatch(batchId, batchData, token);

      setSuccess(true);
      setTimeout(() => router.push(`/batches`), 1000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Paper sx={{ p: 4, maxWidth: 600, mx: "auto", mt: 4, borderRadius: 2, boxShadow: 3 }}>
        <Button startIcon={<ArrowBackIcon />} onClick={() => router.back()} sx={{ mb: 2 }}>
          Back
        </Button>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
          Edit Batch:{" "}
          <span style={{ color: "#1976d2" }}>
            {loading ? <CircularProgress size={20} /> : title || "Not Found"}
          </span>
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {loading ? (
          <CircularProgress />
        ) : (
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Batch Title"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              margin="normal"
              required
              error={!!titleError}
              helperText={titleError || "Format: batch-14"}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Session"
              value={session}
              onChange={(e) => handleSessionChange(e.target.value)}
              margin="normal"
              required
              error={!!sessionError}
              helperText={sessionError || "Format: fall2022 - spring2023"}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Leaves Allowed"
              type="number"
              value={leavesAllowed}
              onChange={(e) => setLeavesAllowed(e.target.value)}
              margin="normal"
              required
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Working Days"
              type="number"
              value={workingDays}
              onChange={(e) => setWorkingDays(e.target.value)}
              margin="normal"
              required
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Start Date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              margin="normal"
              required
              InputLabelProps={{ shrink: true }}
              inputProps={{ min: currentDate }}
              helperText={`Must be on or after ${currentDate}`}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="End Date"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              margin="normal"
              InputLabelProps={{ shrink: true }}
              inputProps={{
                min: startDate || currentDate,
              }}
              helperText={
                startDate
                  ? `Must be after ${startDate}`
                  : `Must be on or after ${currentDate}`
              }
              sx={{ mb: 2 }}
            />
            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
              <Button
                type="submit"
                variant="contained"
                disabled={
                  loading ||
                  !!titleError ||
                  !!sessionError ||
                  !title.trim() ||
                  !session.trim() ||
                  !startDate
                }
              >
                Update
              </Button>
              <Button variant="outlined" onClick={() => router.back()}>
                Cancel
              </Button>
            </Stack>
          </form>
        )}
        <Snackbar
          open={success}
          autoHideDuration={3000}
          onClose={() => setSuccess(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert severity="success" icon={<CheckCircleIcon fontSize="inherit" />}>
            Batch updated successfully!
          </Alert>
        </Snackbar>
      </Paper>
    </Layout>
  );
};

export default EditBatchPage;
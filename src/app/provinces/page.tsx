"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchData } from "../utils/fetchData";
import Layout from "../components/Layout";
import Link from "next/link";
import {
  Container,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Alert,
  Paper,
  ListItemButton, // Use ListItemButton for clickable list items
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

interface Province {
  id: number;
  name: string;
}

interface ApiResponse {
  data: Province[];
}

// Custom MUI theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5", // A modern blue
    },
    secondary: {
      main: "#f50057", // A modern pink
    },
    background: {
      default: "#1F2937", // Dark background
      paper: "#374151", // Slightly lighter for paper components
    },
    text: {
      primary: "#ffffff", // White text
      secondary: "#b0b0b0", // Light gray for secondary text
    },
  },
  typography: {
    fontFamily: "'Inter', sans-serif", // Modern font
    h4: {
      fontWeight: 700, // Bold heading
    },
  },
});

const ProvincesPage = () => {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await fetchData<ApiResponse>(
          "http://192.168.50.218/laravel-project/attendance-system/public/api/provinces"
        );
        setProvinces(response.data); // Access the `data` property
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchProvinces();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Container
          maxWidth="lg"
          sx={{
            minHeight: "100vh",
            py: 8,
            backgroundColor: "background.default",
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            align="center"
            gutterBottom
            sx={{ color: "text.primary", fontWeight: "bold", mb: 4 }}
          >
            Provinces
          </Typography>

          {loading && (
            <div style={{ textAlign: "center", marginTop: "2rem" }}>
              <CircularProgress color="primary" />
            </div>
          )}

          {error && (
            <Alert severity="error" sx={{ mb: 4 }}>
              {error}
            </Alert>
          )}

          <Button
            variant="contained"
            color="primary"
            component={Link}
            href="/provinces/create"
            sx={{ mb: 4 }}
          >
            Create New Province
          </Button>

          <Paper
            elevation={3}
            sx={{
              backgroundColor: "background.paper",
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <List>
              {provinces.map((province) => (
                <ListItem
                  key={province.id}
                  disablePadding // Remove padding to make ListItemButton fill the space
                >
                  <ListItemButton
                    component={Link}
                    href={`/provinces/${province.id}`}
                    sx={{
                      "&:hover": {
                        backgroundColor: "action.hover",
                      },
                    }}
                  >
                    <ListItemText
                      primary={
                        <Typography variant="h6" sx={{ color: "text.primary" }}>
                          {province.name}
                        </Typography>
                      }
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Container>
      </Layout>
    </ThemeProvider>
  );
};

export default ProvincesPage;
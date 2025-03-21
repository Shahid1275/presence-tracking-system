import type { Metadata } from "next";
import Layout from "./components/Layout"; // Import the client-side Layout component

export const metadata: Metadata = {
  title: "Attendance Management System",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Layout>{children}</Layout>;
}
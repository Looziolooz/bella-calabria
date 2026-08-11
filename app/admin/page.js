import AdminDashboard from "@/components/AdminDashboard";

export const metadata = {
  title: "Admin · Calabria Escapes",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return <AdminDashboard />;
}

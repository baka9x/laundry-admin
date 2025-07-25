import "./globals.css";
import { User } from "@/types/user";
import { getUserProfile } from "@/services/user";
import Header from "@/components/layout/Header";
import { Toaster } from "react-hot-toast";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Admin Panel | Giặt Sấy Thiên Nhi',
  description: 'Trang quản lý Giặt Sấy Thiên Nhi',
  robots: "noindex",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let user: User = {} as User;
  try {
    user = await getUserProfile(true);
  } catch {
    //console.log("User not logged in or error:", error);
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="text-gray-900">
        <Header data={user} />
        {children}
        <Toaster position="top-center" reverseOrder={false} />
      </body>
    </html>
  );
}

import "./globals.css";
import { User } from "@/types/user";
import { getUserProfile } from "@/services/user";
import Header from "@/components/layout/Header";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let user: User = {} as User;
  try {
    user = await getUserProfile(true);
  } catch (error) {
    console.log("User not logged in or error:", error);
  }
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gray-100 text-gray-900">
        <Header data={user} />
        {children}
      </body>
    </html>
  );
}

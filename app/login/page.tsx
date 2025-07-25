import LoginForm from "@/components/user/Login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Đăng Nhập',
  description: "Đăng nhập vào Trang quản lý",
  robots: "noindex"
}

export default function LoginPage() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100 text-gray-500 z-50">
      <LoginForm />
    </div>
  );
}

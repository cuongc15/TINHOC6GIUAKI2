"use client";
import { useState } from "react";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState("student"); // Mặc định là học sinh

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">
          {isLogin ? "Đăng Nhập" : "Đăng Ký Tài Khoản"}
        </h2>
        
        <form className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium mb-1">Bạn là:</label>
              <select 
                className="w-full border p-2 rounded"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="student">Học sinh</option>
                <option value="teacher">Giáo viên</option>
              </select>
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input type="email" placeholder="Nhập email..." className="w-full border p-2 rounded" />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Mật khẩu</label>
            <input type="password" placeholder="Nhập mật khẩu..." className="w-full border p-2 rounded" />
          </div>

          <button className="w-full bg-blue-600 text-white p-2 rounded font-bold hover:bg-blue-700">
            {isLogin ? "Đăng Nhập" : "Đăng Ký"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          {isLogin ? "Chưa có tài khoản? " : "Đã có tài khoản? "}
          <span 
            className="text-blue-600 cursor-pointer font-semibold"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Đăng ký ngay" : "Đăng nhập"}
          </span>
        </p>
      </div>
    </div>
  );
}

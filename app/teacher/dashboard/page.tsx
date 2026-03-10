"use client";
import { useState } from "react";

export default function TeacherDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Tạo Đề Cương Mới</h1>
        
        {/* Cài đặt chung */}
        <div className="grid grid-cols-2 gap-4 mb-6 border-b pb-6">
          <div>
            <label className="block font-medium mb-1">Tên đề thi</label>
            <input type="text" placeholder="VD: Đề Cương Giữa Kỳ II - Tin Học 6" className="w-full border p-2 rounded" />
          </div>
          <div>
            <label className="block font-medium mb-1">Điểm cần đạt (để xem đáp án)</label>
            <input type="number" placeholder="VD: 5" className="w-full border p-2 rounded" />
          </div>
        </div>

        {/* Khung nhập Trắc nghiệm */}
        <div className="mb-8 border p-4 rounded bg-blue-50">
          <h2 className="text-xl font-bold mb-4">Phần I: Thêm Câu Trắc Nghiệm</h2>
          <textarea placeholder="Nội dung câu hỏi (VD: Nút lệnh nào dùng để căn lề trái?)" className="w-full border p-2 rounded mb-2 h-20"></textarea>
          <input type="file" accept="image/*" className="mb-4 block text-sm" title="Tải ảnh câu hỏi (nếu có)" />
          
          <div className="grid grid-cols-2 gap-2">
            {['A', 'B', 'C', 'D'].map((opt) => (
              <div key={opt} className="flex items-center gap-2">
                <input type="radio" name="correct" title={`Đáp án ${opt} đúng`} />
                <input type="text" placeholder={`Đáp án ${opt}`} className="w-full border p-2 rounded text-sm" />
              </div>
            ))}
          </div>
          <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded text-sm">+ Thêm câu trắc nghiệm</button>
        </div>

        {/* Khung nhập Tự luận */}
        <div className="mb-8 border p-4 rounded bg-green-50">
          <h2 className="text-xl font-bold mb-4">Phần II: Thêm Câu Tự Luận</h2>
          <textarea placeholder="Nội dung câu tự luận (VD: Vẽ sơ đồ tư duy...)" className="w-full border p-2 rounded mb-2 h-20"></textarea>
          
          <h3 className="font-semibold mt-4 mb-2">Hướng dẫn chấm & Đáp án:</h3>
          <textarea placeholder="Nhập text hướng dẫn chấm..." className="w-full border p-2 rounded mb-2 h-24"></textarea>
          <label className="block text-sm mb-1">Tải ảnh đáp án (Ví dụ: Ảnh sơ đồ tư duy):</label>
          <input type="file" accept="image/*" className="mb-4 block text-sm" />
          
          <button className="mt-2 bg-green-600 text-white px-4 py-2 rounded text-sm">+ Thêm câu tự luận</button>
        </div>

        <button className="w-full bg-red-600 text-white p-3 rounded-lg font-bold text-lg hover:bg-red-700">
          LƯU VÀ XUẤT BẢN ĐỀ THI LÊN DATABASE
        </button>
      </div>
    </div>
  );
}

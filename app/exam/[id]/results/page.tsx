"use client";

export default function ExamResultsPage({ params }: { params: { id: string } }) {
  // Giả lập dữ liệu fetch từ Supabase
  const studentScore = 7; 
  const passingScore = 5; 
  const isPassed = studentScore >= passingScore;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Banner Điểm số */}
      <div className={`p-6 rounded-lg text-center text-white mb-8 shadow-lg ${isPassed ? "bg-green-600" : "bg-red-500"}`}>
        <h1 className="text-3xl font-bold mb-2">ĐIỂM CỦA BẠN: {studentScore}/10</h1>
        {isPassed ? (
          <p className="text-lg">Chúc mừng! Bạn đã đạt yêu cầu. Dưới đây là đáp án chi tiết.</p>
        ) : (
          <p className="text-lg">Bạn cần đạt tối thiểu {passingScore} điểm để xem đáp án. Hãy ôn tập và làm lại nhé!</p>
        )}
      </div>

      {/* Hiển thị đáp án NẾU ĐẠT */}
      {isPassed && (
        <div className="bg-white p-6 rounded shadow border">
          <h2 className="text-2xl font-bold border-b pb-2 mb-6">ĐÁP ÁN & HƯỚNG DẪN CHẤM</h2>
          
          {/* Mẫu hiển thị đáp án Trắc nghiệm */}
          <div className="mb-8">
            <h3 className="font-bold text-lg mb-4">I. Trắc nghiệm</h3>
            <div className="p-4 bg-gray-50 rounded mb-4">
              <p className="font-semibold mb-2">Câu 1. Để đặt hướng trang cho văn bản, trong thẻ Page Layout em chọn nhóm lệnh nào?</p>
              <ul className="space-y-1">
                <li className="text-gray-500 line-through">A. Page Background</li>
                <li className="text-gray-500 line-through">B. Paragraph</li>
                <li className="text-green-600 font-bold bg-green-100 p-1 rounded inline-block">C. Page Setup (Đáp án đúng)</li>
                <li className="text-gray-500 line-through">D. Editing</li>
              </ul>
            </div>
          </div>

          {/* Mẫu hiển thị đáp án Tự luận có Hình ảnh sơ đồ */}
          <div>
            <h3 className="font-bold text-lg mb-4">II. Tự luận</h3>
            <div className="p-4 bg-gray-50 border-l-4 border-green-500 mb-4">
              <p className="font-bold mb-2">Câu 32. Vẽ sơ đồ tư duy cho bài 11.</p>
              <p className="font-semibold text-gray-700">Hướng dẫn chấm:</p>
              <ul className="list-disc ml-5 mb-4 text-gray-600">
                <li>Vẽ được chủ đề chính.</li>
                <li>Vẽ được từng chủ đề nhánh các ý theo chủ đề nhánh.</li>
              </ul>
              <p className="font-semibold text-gray-700 mb-2">Hình ảnh đáp án tham khảo:</p>
              {/* Giả lập hiển thị ảnh sơ đồ tư duy từ Supabase Storage */}
              <div className="w-full h-64 bg-gray-200 rounded flex items-center justify-center border-2 border-dashed border-gray-400">
                 <span className="text-gray-500">[ Ảnh sơ đồ tư duy được load từ URL của Supabase Storage ]</span>
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}

"use client";
import { useRouter } from "next/navigation";

// Dữ liệu giả lập (Sau này lấy từ Supabase qua params.id)
const mockExam = {
  title: "ĐỀ CƯƠNG GIỮA KỲ II - MÔN TIN HỌC 6",
  questions:[
    { id: 1, text: "Câu 1. Để đặt hướng trang cho văn bản, trong thẻ Page Layout em chọn nhóm lệnh nào?", options: ["A. Page Background", "B. Paragraph", "C. Page Setup", "D. Editing"] },
    { id: 4, text: "Câu 4. Muốn căn thẳng lề trái cho đoạn văn bản, em sử dụng nút lệnh nào?", options:["A. Justify", "B. Center", "C. Align Right", "D. Align Left"] }
  ],
  essays:[
    { id: 30, text: "Câu 30. Em hãy nêu các chức năng cơ bản của phần mềm soạn thảo văn bản?" }
  ]
};

export default function ExamTakingPage({ params }: { params: { id: string } }) {
  const router = useRouter();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Logic lưu bài vào database ở đây
    alert("Nộp bài thành công!");
    router.push(`/exam/${params.id}/results`);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-8">{mockExam.title}</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-8">
          <h2 className="text-xl font-bold border-b pb-2 mb-4">I. TRẮC NGHIỆM</h2>
          {mockExam.questions.map((q) => (
            <div key={q.id} className="mb-6">
              <p className="font-semibold mb-2">{q.text}</p>
              <div className="grid grid-cols-2 gap-2">
                {q.options.map((opt, idx) => (
                  <label key={idx} className="flex items-center gap-2 p-2 border rounded cursor-pointer hover:bg-gray-50">
                    <input type="radio" name={`question-${q.id}`} value={opt} />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold border-b pb-2 mb-4">II. TỰ LUẬN</h2>
          {mockExam.essays.map((e) => (
            <div key={e.id} className="mb-6">
              <p className="font-semibold mb-2">{e.text}</p>
              <textarea placeholder="Gõ câu trả lời của em vào đây..." className="w-full border p-3 rounded h-32"></textarea>
            </div>
          ))}
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-blue-700">
          NỘP BÀI
        </button>
      </form>
    </div>
  );
}

"use client";
import { useState } from "react";
import * as mammoth from "mammoth"; // Import thư viện đọc file Word

export default function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState("import"); // Mặc định mở tab import
  const [isExtracting, setIsExtracting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const[mcqQuestions, setMcqQuestions] = useState<any[]>([]);
  const [essayQuestions, setEssayQuestions] = useState<any[]>([]);

  // Bắt sự kiện chọn file
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // THUẬT TOÁN ĐỌC FILE VÀ BÓC TÁCH THỰC TẾ
  const handleExtractData = async () => {
    if (!selectedFile) return alert("Vui lòng chọn file .docx trước!");
    if (!selectedFile.name.endsWith(".docx")) return alert("Hệ thống hiện tại chỉ hỗ trợ định dạng Word (.docx)");

    setIsExtracting(true);

    try {
      // 1. Chuyển file thành ArrayBuffer để mammoth đọc
      const arrayBuffer = await selectedFile.arrayBuffer();
      
      // 2. mammoth trích xuất toàn bộ text (bỏ qua định dạng rườm rà)
      const result = await mammoth.extractRawText({ arrayBuffer });
      const text = result.value;

      // 3. THUẬT TOÁN REGEX BÓC TÁCH (Dựa theo format chuẩn Việt Nam)
      // Chia văn bản thành các khối, mỗi khối bắt đầu bằng chữ "Câu "
      const blocks = text.split(/(?=Câu\s+\d+[\.\:])/i).filter(b => b.trim().length > 0);
      
      const extractedMcqs: any[] =[];
      const extractedEssays: any[] =[];

      blocks.forEach((block, index) => {
        // Tìm vị trí của đáp án A (để phân ranh giới giữa nội dung hỏi và các đáp án)
        const optionAIndex = block.search(/A[\.\:]\s/i);
        
        if (optionAIndex !== -1) {
          // --- XỬ LÝ TRẮC NGHIỆM ---
          const content = block.substring(0, optionAIndex).trim(); // Nội dung câu hỏi
          const optionsText = block.substring(optionAIndex); // Cụm đáp án ABCD
          
          // Dùng Regex nhặt ra cụm text đứng sau A., B., C., D.
          const optMatch = optionsText.match(/A[\.\:]([\s\S]*?)B[\.\:]([\s\S]*?)C[\.\:]([\s\S]*?)D[\.\:]([\s\S]*)/i);
          
          if (optMatch) {
            extractedMcqs.push({
              id: Date.now() + index,
              content: content,
              options: [
                "A. " + optMatch[1].trim(),
                "B. " + optMatch[2].trim(),
                "C. " + optMatch[3].trim(),
                "D. " + optMatch[4].trim()
              ],
              correct: 0 // Tạm thời set đáp án A là đúng, giáo viên sẽ tự check lại trên Form
            });
          }
        } else {
          // --- XỬ LÝ TỰ LUẬN (Vì không có ABCD) ---
          // Chỉ lấy những đoạn text dài và có chữ "Câu", bỏ qua rác (tiêu đề đề thi, v.v.)
          if (block.toLowerCase().startsWith("câu")) {
            extractedEssays.push({
              id: Date.now() + index,
              content: block.trim(),
              guide: "Nhập hướng dẫn chấm vào đây..."
            });
          }
        }
      });

      // 4. Đổ dữ liệu thật ra màn hình
      setMcqQuestions(extractedMcqs);
      setEssayQuestions(extractedEssays);
      
      alert(`Đã trích xuất thành công ${extractedMcqs.length} câu trắc nghiệm và ${extractedEssays.length} câu tự luận!`);
      setActiveTab("manual"); // Nhảy sang tab form để giáo viên nhìn thấy thành quả

    } catch (error) {
      console.error(error);
      alert("Lỗi khi đọc file Word. File có thể bị hỏng hoặc bị khóa mật khẩu.");
    } finally {
      setIsExtracting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Tạo Đề Cương Từ File Thực Tế</h1>
        
        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button 
            className={`px-4 py-2 rounded font-semibold ${activeTab === 'import' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setActiveTab('import')}
          >
            📄 1. Tải lên File Word
          </button>
          <button 
            className={`px-4 py-2 rounded font-semibold ${activeTab === 'manual' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setActiveTab('manual')}
          >
            ✍️ 2. Kiểm tra & Chỉnh sửa
          </button>
        </div>

        {/* KHU VỰC 1: IMPORT FILE DOCX THỰC TẾ */}
        {activeTab === 'import' && (
          <div className="mb-8 border-2 border-dashed border-blue-400 p-8 rounded bg-blue-50 text-center flex flex-col items-center justify-center">
            <h2 className="text-xl font-bold mb-2">Tải file Đề thi (.docx)</h2>
            <p className="text-gray-600 mb-4">Hệ thống sẽ dùng thư viện Mammoth.js đọc và bóc tách tự động.</p>
            
            <input 
              type="file" 
              accept=".docx" 
              onChange={handleFileChange}
              className="mb-4 block w-full max-w-sm text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
            />

            <button 
              onClick={handleExtractData}
              disabled={isExtracting}
              className="bg-blue-600 text-white px-6 py-2 rounded font-bold hover:bg-blue-700 disabled:bg-gray-400 flex items-center gap-2"
            >
              {isExtracting ? "⏳ Đang bóc tách dữ liệu..." : "⚡ Bắt đầu trích xuất"}
            </button>
          </div>
        )}

        {/* KHU VỰC 2: RENDER DỮ LIỆU ĐÃ BÓC TÁCH */}
        {activeTab === 'manual' && (
          <div>
            <div className="mb-8 border p-4 rounded bg-gray-50">
              <h2 className="text-xl font-bold mb-4 text-blue-800">Phần I: Câu hỏi Trắc nghiệm ({mcqQuestions.length} câu)</h2>
              {mcqQuestions.map((q, qIndex) => (
                <div key={q.id} className="mb-6 bg-white p-4 border rounded shadow-sm relative">
                  <textarea defaultValue={q.content} className="w-full border p-2 rounded mb-2 font-semibold"></textarea>
                  <div className="grid grid-cols-2 gap-2">
                    {q.options.map((opt: string, optIndex: number) => (
                      <div key={optIndex} className="flex items-center gap-2">
                        <input type="radio" name={`correct-${q.id}`} defaultChecked={q.correct === optIndex} title="Chọn nếu đây là đáp án đúng" />
                        <input type="text" defaultValue={opt} className="w-full border p-2 rounded text-sm" />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mb-8 border p-4 rounded bg-green-50">
              <h2 className="text-xl font-bold mb-4 text-green-800">Phần II: Câu hỏi Tự luận ({essayQuestions.length} câu)</h2>
              {essayQuestions.map((eq) => (
                 <div key={eq.id} className="mb-6 bg-white p-4 border rounded shadow-sm relative">
                   <textarea defaultValue={eq.content} className="w-full border p-2 rounded mb-2 font-semibold h-16"></textarea>
                   <textarea defaultValue={eq.guide} placeholder="Nhập đáp án hoặc hướng dẫn chấm..." className="w-full border p-2 rounded mb-2 h-16 text-sm"></textarea>
                 </div>
              ))}
            </div>
            
            <button className="w-full bg-red-600 text-white p-4 rounded-lg font-bold text-lg hover:bg-red-700 shadow-lg">
               LƯU VÀ XUẤT BẢN ĐỀ THI VÀO DATABASE
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

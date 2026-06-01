import React, { useState } from 'react';

export default function Generator() {
  const [jsonInput, setJsonInput] = useState('{\n  "username": "admin",\n  "role": "Administrator",\n  "exp": 1718021600\n}');
  const [generatedLink, setGeneratedLink] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    try {
      // Kiểm tra cú pháp JSON hợp lệ
      const parsedJson = JSON.parse(jsonInput);
      
      // Mã hóa chuỗi JSON sang chuỗi an toàn cho URL (Base64)
      const stringified = JSON.stringify(parsedJson);
      const encodedToken = btoa(unescape(encodeURIComponent(stringified)));
      
      // Tạo link hoàn chỉnh dựa trên domain hiện tại
      const baseUrl = window.location.origin;
      const finalLink = `${baseUrl}/auth/login?data=${encodedToken}`;
      
      setGeneratedLink(finalLink);
      setError('');
      setCopied(false);
    } catch (e) {
      setError('Mã JSON không hợp lệ! Vui lòng kiểm tra dấu ngoặc hoặc dấu phẩy.');
      setGeneratedLink('');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <h1 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
        🔗 JSON Login Link Generator
      </h1>
      <p className="text-sm text-gray-500 mb-6">Nhập cấu hình JSON của bạn để tạo đường dẫn đăng nhập tự động nhanh chóng.</p>
      
      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 mb-2">Mã cấu hình JSON:</label>
        <textarea
          className="w-full h-44 p-4 border border-gray-200 rounded-xl font-mono text-xs focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-900 text-green-400 leading-relaxed"
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
        />
      </div>

      <button
        onClick={handleGenerate}
        className="w-full py-3 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition duration-200 shadow-lg shadow-indigo-600/20"
      >
        Tạo Link Đăng Nhập
      </button>

      {error && <p className="text-red-500 mt-3 text-sm font-medium">⚠️ {error}</p>}

      {generatedLink && (
        <div className="mt-6 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
          <p className="font-semibold text-sm text-indigo-900 mb-2">Đường dẫn đã được tạo thành công:</p>
          <div className="flex gap-2 items-center">
            <input 
              type="text" 
              readOnly 
              value={generatedLink} 
              className="w-full bg-white border border-gray-200 text-xs p-2.5 rounded-lg text-gray-600 font-mono focus:outline-none"
            />
            <button 
              onClick={copyToClipboard}
              className={`px-4 py-2 text-xs font-semibold rounded-lg text-white transition whitespace-nowrap ${copied ? 'bg-green-600' : 'bg-gray-800 hover:bg-gray-900'}`}
            >
              {copied ? 'Đã Copy!' : 'Copy Link'}
            </button>
          </div>
          <div className="mt-3 text-right">
            <a href={generatedLink} target="_blank" rel="noreferrer" className="text-xs text-indigo-600 hover:underline font-medium">
              Thử truy cập link ngay →
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
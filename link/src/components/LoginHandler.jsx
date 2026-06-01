import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';

export default function LoginHandler() {
  const [searchParams] = useSearchParams();
  const [userData, setUserData] = useState(null);
  const [status, setStatus] = useState('processing'); // processing | success | error

  useEffect(() => {
    const token = searchParams.get('data');
    if (!token) {
      setStatus('error');
      return;
    }

    try {
      // Giải mã chuỗi Base64 quay ngược lại thành chuỗi JSON gốc
      const decodedString = decodeURIComponent(escape(atob(token)));
      const json = JSON.parse(decodedString);
      
      setUserData(json);
      setStatus('success');
    } catch (e) {
      setStatus('error');
    }
  }, [searchParams]);

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-100 text-center">
      {status === 'processing' && (
        <div>
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Đang xác thực thông tin đăng nhập...</p>
        </div>
      )}

      {status === 'error' && (
        <div>
          <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">❌</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Đăng Nhập Thất Bại</h2>
          <p className="text-sm text-gray-500 mb-6">Mã Token trong đường dẫn không hợp lệ hoặc đã bị thay đổi cấu trúc.</p>
          <Link to="/" className="inline-block px-5 py-2.5 bg-gray-800 text-white text-sm font-medium rounded-lg hover:bg-gray-900 transition">
            Quay lại trang tạo mã
          </Link>
        </div>
      )}

      {status === 'success' && (
        <div>
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">🎉</div>
          <h2 className="text-xl font-bold text-gray-800 mb-1">Đăng Nhập Thành Công!</h2>
          <p className="text-xs text-gray-400 mb-6">Hệ thống đã nhận diện và giải mã thành công thông tin.</p>
          
          <div className="bg-gray-50 rounded-xl p-4 text-left font-mono text-xs mb-6 border border-gray-100">
            <p className="text-indigo-600 font-bold mb-2">// User Profile Data:</p>
            <pre className="text-gray-700 whitespace-pre-wrap">{JSON.stringify(userData, null, 2)}</pre>
          </div>

          <Link to="/" className="text-sm text-indigo-600 hover:underline font-medium">
            ← Tạo một link đăng nhập khác
          </Link>
        </div>
      )}
    </div>
  );
}
import React from 'react';
import { useText } from '../utils/textDb';

export default function Footer() {
  const { t } = useText();

  const navigateTo = (e, path) => {
    e.preventDefault();
    window.history.pushState({}, '', path);
    window.dispatchEvent(new Event('popstate'));
  };

  return (
    <footer className="w-full bg-[#fdfcf0] py-12 px-6 sm:px-12 md:px-24">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-6 mb-12">

          {/* Brand Info */}
          <div className="md:col-span-6 space-y-4 pr-0 md:pr-12">
            <h2 className="text-2xl font-serif text-[#c55d31] font-bold">
              {t('common.brandName')}
            </h2>
            <p className="text-sm font-semibold text-gray-600">
              Bản Đồ Năng Lượng & Cung Hoàng Đạo - Cá Nhân Hóa Tuyệt Đối
            </p>
            <p className="text-sm text-gray-500 leading-relaxed text-justify">
              Chúng tôi chuyên sâu về Thần Số Học và Chiêm Tinh Học kết hợp với tâm lý học ứng dụng để đưa ra những phân tích đa chiều. Mỗi bài luận giải không phải là lời tiên tri giam hãm, mà là một tấm bản đồ giá trị giúp bạn thấu hiểu bản thân và khai mở tiềm năng trọn vẹn.
            </p>

            <div className="flex items-center gap-4 pt-4">
              <div className="flex gap-3 text-gray-600">
                <a href="#" className="hover:text-[#c55d31] transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.597 0 0 .597 0 1.325v21.351C0 23.403.597 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.597 1.323-1.324V1.325C24 .597 23.403 0 22.675 0z" /></svg>
                </a>
                <a href="#" className="hover:text-[#c55d31] transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.34 2.88 2.88 0 0 1 2.31-4.53 2.66 2.66 0 0 1 1.68.53c.19.14.39.1.39-.14V9.45c0-.23-.22-.38-.43-.33a6.29 6.29 0 0 0-3.95 2.15 6.37 6.37 0 0 0 1.66 9.8 6.38 6.38 0 0 0 8.04-1.7 6.42 6.42 0 0 0 1.48-4.24v-5.2a8.62 8.62 0 0 0 4.6 1.42v-3.41a4.93 4.93 0 0 1-3.36-1.25z" /></svg>
                </a>
                <a href="#" className="hover:text-[#c55d31] transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M21.582 6.186a2.686 2.686 0 0 0-1.884-1.897C18.038 3.84 12 3.84 12 3.84s-6.038 0-7.698.449a2.686 2.686 0 0 0-1.884 1.897C2 7.846 2 12 2 12s0 4.154.418 5.814a2.686 2.686 0 0 0 1.884 1.897C5.962 20.16 12 20.16 12 20.16s6.038 0 7.698-.449a2.686 2.686 0 0 0 1.884-1.897C22 16.154 22 12 22 12s0-4.154-.418-5.814zM9.912 15.47V8.53L15.934 12l-6.022 3.47z" /></svg>
                </a>
              </div>
            </div>
          </div>

          {/* Core Areas */}
          <div className="md:col-span-3 space-y-4">
            <h3 className="text-base font-serif font-bold text-gray-700 mb-4">Lĩnh Vực Trọng Tâm</h3>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><a href="/" onClick={(e) => navigateTo(e, '/')} className="hover:text-[#c55d31] transition-colors">Giải Mã Thần Số Học</a></li>
              <li><a href="/" onClick={(e) => navigateTo(e, '/')} className="hover:text-[#c55d31] transition-colors">Giải Mã Cung Hoàng Đạo</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="md:col-span-3 space-y-4">
            <h3 className="text-base font-serif font-bold text-gray-700 mb-4">Hỗ Trợ</h3>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><a href="/about" onClick={(e) => navigateTo(e, '/about')} className="hover:text-[#c55d31] transition-colors">Giới Thiệu</a></li>
              <li><a href="/terms" onClick={(e) => navigateTo(e, '/terms')} className="hover:text-[#c55d31] transition-colors">Điều khoản Sử Dụng</a></li>
              <li><a href="/privacy" onClick={(e) => navigateTo(e, '/privacy')} className="hover:text-[#c55d31] transition-colors">Chính Sách Bảo Mật</a></li>
              <li><a href="/tos" onClick={(e) => navigateTo(e, '/tos')} className="hover:text-[#c55d31] transition-colors">Điều Khoản Dịch Vụ</a></li>
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="border-t border-gray-300 pt-6 text-center">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} {t('common.brandName')}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

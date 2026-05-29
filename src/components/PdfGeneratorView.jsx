import React, { useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';

// ─────────────────────────────────────────────────────────────
// PDF GENERATOR VIEW — Admin Internal Tool
// ─────────────────────────────────────────────────────────────
export default function PdfGeneratorView({ handleClose }) {
  const [customerName, setCustomerName] = useState('');
  const [customerDob, setCustomerDob] = useState('');
  const [markdownContent, setMarkdownContent] = useState('');
  const [isExporting, setIsExporting] = useState(false);
  const contentRef = useRef(null);

  const exportPdf = async () => {
    if (!customerName || !markdownContent) {
      alert('Vui lòng nhập tên khách hàng và nội dung báo cáo.');
      return;
    }

    setIsExporting(true);

    try {
      // Dynamic import to avoid loading html2pdf on initial page load
      const html2pdf = (await import('html2pdf.js')).default;
      const element = document.getElementById('pdf-export-content');

      const opt = {
        margin:      [10, 0, 15, 0],
        filename:    `Bao-Cao-Nang-Luong-${customerName.replace(/\s+/g, '-')}.pdf`,
        image:       { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, letterRendering: true },
        jsPDF:       { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak:   { mode: ['avoid-all', 'css', 'legacy'] }
      };

      await html2pdf().set(opt).from(element).save();
    } catch (err) {
      console.error('PDF Export Error:', err);
      alert('Lỗi khi xuất PDF. Xem console để biết chi tiết.');
    } finally {
      setIsExporting(false);
    }
  };

  // Custom components for ReactMarkdown — uses INLINE STYLES only
  // (html2canvas cannot parse Tailwind v4's oklab() color functions)
  const markdownComponents = {
    h1: ({ children }) => (
      <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '24px', color: '#292524', letterSpacing: '0.05em', marginTop: '40px', marginBottom: '16px', paddingBottom: '8px', borderBottom: '1px solid #d6d3d1' }}>
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '20px', color: '#292524', letterSpacing: '0.05em', marginTop: '32px', marginBottom: '12px' }}>
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px', color: '#44403c', letterSpacing: '0.05em', marginTop: '24px', marginBottom: '8px', fontStyle: 'italic' }}>
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p style={{ color: '#44403c', lineHeight: '2', marginBottom: '20px', textAlign: 'justify', fontSize: '14px', fontFamily: 'Playfair Display, serif' }}>
        {children}
      </p>
    ),
    ul: ({ children }) => (
      <ul style={{ listStyleType: 'disc', paddingLeft: '24px', marginBottom: '20px', color: '#44403c', fontSize: '14px', fontFamily: 'Playfair Display, serif', lineHeight: '1.75' }}>
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol style={{ listStyleType: 'decimal', paddingLeft: '24px', marginBottom: '20px', color: '#44403c', fontSize: '14px', fontFamily: 'Playfair Display, serif', lineHeight: '1.75' }}>
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li style={{ lineHeight: '1.75', marginBottom: '8px' }}>{children}</li>
    ),
    strong: ({ children }) => (
      <strong style={{ fontWeight: '600', color: '#292524' }}>{children}</strong>
    ),
    em: ({ children }) => (
      <em style={{ fontStyle: 'italic', color: '#57534e' }}>{children}</em>
    ),
    blockquote: ({ children }) => (
      <blockquote style={{ borderLeft: '2px solid #d6d3d1', paddingLeft: '20px', margin: '24px 0', fontStyle: 'italic', color: '#78716c', fontFamily: 'Playfair Display, serif' }}>
        {children}
      </blockquote>
    ),
    hr: () => (
      <div style={{ margin: '32px 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ height: '1px', width: '64px', background: '#d6d3d1' }}></div>
        <span style={{ margin: '0 16px', color: '#d6d3d1', fontSize: '12px' }}>✦</span>
        <div style={{ height: '1px', width: '64px', background: '#d6d3d1' }}></div>
      </div>
    ),
  };

  return (
    <div className="min-h-screen bg-stone-100 text-stone-800 font-sans">
      {/* Top Bar */}
      <div className="sticky top-0 z-50 bg-stone-100/90 backdrop-blur-md border-b border-stone-200 px-6 py-3 flex justify-between items-center">
        <button
          onClick={handleClose}
          className="text-[10px] font-semibold uppercase tracking-widest text-stone-400 hover:text-stone-800 transition-colors"
        >
          ← Trở Về
        </button>
        <div className="flex items-center space-x-2">
          <span className="text-amber-600 text-xs">🔒</span>
          <span className="text-[10px] font-semibold uppercase tracking-widest text-stone-400">
            Admin — PDF Generator
          </span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-49px)]">
        {/* ── LEFT: Input Dashboard ── */}
        <div className="w-full lg:w-[380px] lg:min-w-[380px] bg-stone-50 border-r border-stone-200 p-6 space-y-5 overflow-y-auto">
          <div>
            <h2 className="text-sm font-semibold text-stone-700 uppercase tracking-wider mb-1">
              Thông Tin Khách Hàng
            </h2>
            <p className="text-[10px] text-stone-400 font-serif italic">
              Điền thông tin và dán nội dung markdown từ AI
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-semibold text-stone-500 uppercase tracking-wider">
                Tên Khách Hàng
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Nguyễn Văn A"
                className="w-full px-3 py-2.5 bg-white border border-stone-200 focus:outline-none focus:border-stone-400 focus:ring-1 focus:ring-stone-400 transition-all text-sm text-stone-800 rounded-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-semibold text-stone-500 uppercase tracking-wider">
                Ngày Sinh
              </label>
              <input
                type="text"
                value={customerDob}
                onChange={(e) => setCustomerDob(e.target.value)}
                placeholder="29-04-1996"
                className="w-full px-3 py-2.5 bg-white border border-stone-200 focus:outline-none focus:border-stone-400 focus:ring-1 focus:ring-stone-400 transition-all text-sm text-stone-800 rounded-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-semibold text-stone-500 uppercase tracking-wider">
                Nội Dung Báo Cáo (Markdown)
              </label>
              <textarea
                value={markdownContent}
                onChange={(e) => setMarkdownContent(e.target.value)}
                placeholder="Dán nội dung Markdown từ AI vào đây..."
                rows={15}
                className="w-full px-3 py-2.5 bg-white border border-stone-200 focus:outline-none focus:border-stone-400 focus:ring-1 focus:ring-stone-400 transition-all text-sm text-stone-800 rounded-sm font-mono resize-y leading-relaxed"
              />
            </div>
          </div>

          <button
            onClick={exportPdf}
            disabled={isExporting}
            className="w-full bg-stone-800 text-stone-50 hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors rounded-sm shadow-md flex items-center justify-center"
          >
            {isExporting ? (
              <span className="flex items-center space-x-2">
                <span className="w-3 h-3 border border-stone-300 border-t-white rounded-full animate-spin"></span>
                <span>Đang xuất PDF...</span>
              </span>
            ) : (
              'Xuất File PDF'
            )}
          </button>

          <p className="text-[9px] text-stone-400 text-center italic">
            PDF sẽ được tải xuống tự động sau khi render.
          </p>
        </div>

        {/* ── RIGHT: Live A4 Preview ── */}
        <div className="flex-1 bg-stone-200/50 p-6 lg:p-10 overflow-y-auto flex justify-center">
          <div className="w-full max-w-[210mm]">
            {/* A4 Paper — ALL INLINE STYLES for html2canvas compatibility */}
            <div
              id="pdf-export-content"
              ref={contentRef}
              style={{
                width: '210mm',
                minHeight: '297mm',
                padding: '20mm 18mm',
                backgroundColor: '#DFD9CE',
                color: '#292524',
                fontFamily: 'Inter, sans-serif',
                boxShadow: '0 4px 30px rgba(0,0,0,0.08)',
                margin: '0 auto',
              }}
            >
              {/* ── Cover Section ── */}
              <div style={{ border: '1px solid #d6d3d166', padding: '40px 56px', marginBottom: '0', minHeight: '230mm', pageBreakAfter: 'always' }}>
                {/* Top ornament */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '64px' }}>
                  <div style={{ height: '1px', width: '48px', background: '#d6d3d1' }}></div>
                  <span style={{ margin: '0 16px', color: '#d6d3d1', fontSize: '8px' }}>✦</span>
                  <div style={{ height: '1px', width: '48px', background: '#d6d3d1' }}></div>
                </div>

                {/* Brand */}
                <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                  <p style={{ fontSize: '10px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5em', color: '#a8a29e' }}>
                    Q U I E T N U M B E R S
                  </p>
                </div>

                {/* Main Title */}
                <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                  <h1 style={{ fontSize: '36px', fontFamily: 'Playfair Display, serif', color: '#292524', lineHeight: '1.2', letterSpacing: '0.05em', marginBottom: '24px' }}>
                    Bản Đồ Năng Lượng
                    <br />
                    Độc Bản
                  </h1>
                  <div style={{ height: '1px', width: '64px', background: '#78716c', margin: '0 auto' }}></div>
                </div>

                {/* Customer Info */}
                <div style={{ textAlign: 'center', marginTop: '64px' }}>
                  <p style={{ fontSize: '20px', fontFamily: 'Playfair Display, serif', color: '#44403c' }}>
                    {customerName || 'Tên Khách Hàng'}
                  </p>
                  <p style={{ fontSize: '12px', color: '#a8a29e', textTransform: 'uppercase', letterSpacing: '0.3em', marginTop: '12px' }}>
                    Ngày sinh: {customerDob || 'DD-MM-YYYY'}
                  </p>
                </div>

                {/* Bottom ornament */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '80px' }}>
                  <div style={{ height: '1px', width: '32px', background: '#d6d3d1' }}></div>
                  <span style={{ margin: '0 12px', color: '#d6d3d1', fontSize: '8px' }}>✦</span>
                  <div style={{ height: '1px', width: '32px', background: '#d6d3d1' }}></div>
                </div>

                {/* Tagline */}
                <div style={{ textAlign: 'center', marginTop: '40px' }}>
                  <p style={{ fontSize: '9px', color: '#a8a29e', fontStyle: 'italic', fontFamily: 'Playfair Display, serif' }}>
                    "Mỗi linh hồn là một bản đồ năng lượng duy nhất — không ai giống ai."
                  </p>
                </div>
              </div>

              {/* ── Report Body ── */}
              <div style={{ paddingTop: '32px' }}>
                {markdownContent ? (
                  <ReactMarkdown components={markdownComponents}>
                    {markdownContent}
                  </ReactMarkdown>
                ) : (
                  <div style={{ textAlign: 'center', padding: '80px 0', color: '#d6d3d1' }}>
                    <p style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', fontSize: '14px' }}>
                      Nội dung báo cáo sẽ hiển thị ở đây...
                    </p>
                    <p style={{ fontSize: '10px', marginTop: '8px', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
                      Dán Markdown ở bên trái
                    </p>
                  </div>
                )}
              </div>

              {/* ── Footer ── */}
              <div style={{ marginTop: '64px', paddingTop: '24px', borderTop: '1px solid #d6d3d1', textAlign: 'center' }}>
                <p style={{ fontSize: '9px', color: '#a8a29e', textTransform: 'uppercase', letterSpacing: '0.3em' }}>
                  Q U I E T N U M B E R S
                </p>
                <p style={{ fontSize: '8px', color: '#d6d3d1', fontStyle: 'italic', fontFamily: 'Playfair Display, serif', marginTop: '8px' }}>
                  Bản báo cáo này được tạo riêng cho {customerName || '...'} và không nên được chia sẻ công khai.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


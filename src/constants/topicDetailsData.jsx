import React from 'react';

// Common CSS classes for tables inside the data
const tableClasses = "w-full text-sm sm:text-base text-left text-luxury-charcoal/80 border-collapse";
const thClasses = "px-4 py-3 bg-luxury-charcoal/5 font-semibold uppercase tracking-widest text-xs border border-luxury-charcoal/10";
const tdClasses = "px-4 py-3 border border-luxury-charcoal/10 align-top";

export const topicDetailsData = {
  lifePath: {
    id: "lifePath",
    title: "Con Số Chủ Đạo",
    subtitle: "Mật mã của định mệnh",
    icon: "🌟",
    content: (
      <>
        <div className="space-y-6">
          <p>
            Trong Thần Số Học, <strong>Con Số Chủ Đạo (Life Path Number)</strong> là chỉ số quan trọng nhất, đóng vai trò như một bản thiết kế tổng thể cho toàn bộ cuộc đời bạn. Nó được tính toán dựa trên ngày, tháng, năm sinh dương lịch của bạn—thời khắc đầu tiên bạn hít thở không khí và tiếp nhận tần số rung động của vũ trụ.
          </p>
          <p>
            Con số này tiết lộ bản chất tự nhiên, những tài năng thiên bẩm, cũng như những thử thách cốt lõi mà bạn buộc phải vượt qua để linh hồn tiến hóa. Việc hiểu rõ Con Số Chủ Đạo giúp bạn ngừng đi ngược chiều gió, thay vào đó, bạn sẽ biết cách giương buồm để tận dụng tối đa luồng năng lượng vũ trụ dành riêng cho mình.
          </p>
        </div>

        <div className="my-12 p-8 bg-white/40 border border-luxury-charcoal/10 rounded-2xl shadow-sm">
          <h3 className="text-xl font-serif mb-4">Công Thức Tính Toán</h3>
          <p className="mb-4 text-sm leading-relaxed">
            Để tính Con Số Chủ Đạo, hãy cộng rút gọn từng phần của ngày sinh (ngày, tháng, năm) cho đến khi chúng trở thành một chữ số duy nhất (hoặc giữ nguyên nếu là các số Master 11, 22, 33). Sau đó cộng 3 số rút gọn đó lại với nhau.
          </p>
          <div className="p-4 bg-luxury-charcoal/5 rounded-xl font-mono text-sm">
            Ví dụ: Bạn sinh ngày 25/08/1995 <br/>
            - Ngày: 2 + 5 = 7 <br/>
            - Tháng: 0 + 8 = 8 <br/>
            - Năm: 1 + 9 + 9 + 5 = 24 {'->'} 2 + 4 = 6 <br/>
            - Tổng: 7 + 8 + 6 = 21 {'->'} 2 + 1 = <strong>3</strong>
          </div>
        </div>

        <h3 className="text-2xl font-serif mt-12 mb-6">Bảng Tra Cứu Ý Nghĩa Các Con Số</h3>
        <div className="overflow-x-auto rounded-xl border border-luxury-charcoal/10 shadow-sm bg-white/50">
          <table className={tableClasses}>
            <thead>
              <tr>
                <th className={thClasses + " w-24 text-center"}>Con Số</th>
                <th className={thClasses}>Năng Lượng Cốt Lõi</th>
                <th className={thClasses}>Bài Học Trọng Tâm</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={tdClasses + " text-center font-serif text-xl font-bold"}>1</td>
                <td className={tdClasses}>Tiên phong, Độc lập, Lãnh đạo, Tự chủ.</td>
                <td className={tdClasses}>Học cách dẫn dắt bằng trái tim thay vì cái tôi độc đoán.</td>
              </tr>
              <tr>
                <td className={tdClasses + " text-center font-serif text-xl font-bold bg-luxury-charcoal/5"}>2</td>
                <td className={tdClasses + " bg-luxury-charcoal/5"}>Hòa bình, Kết nối, Thấu cảm, Ngoại giao.</td>
                <td className={tdClasses + " bg-luxury-charcoal/5"}>Vượt qua sự nhạy cảm quá mức, học cách nói "Không".</td>
              </tr>
              <tr>
                <td className={tdClasses + " text-center font-serif text-xl font-bold"}>3</td>
                <td className={tdClasses}>Sáng tạo, Truyền cảm hứng, Ngôn từ, Vui vẻ.</td>
                <td className={tdClasses}>Sự tập trung kỷ luật, tránh phân tán năng lượng bề mặt.</td>
              </tr>
              <tr>
                <td className={tdClasses + " text-center font-serif text-xl font-bold bg-luxury-charcoal/5"}>4</td>
                <td className={tdClasses + " bg-luxury-charcoal/5"}>Kỷ luật, Xây dựng, An toàn, Nền tảng vững chắc.</td>
                <td className={tdClasses + " bg-luxury-charcoal/5"}>Cởi mở với sự thay đổi, thoát khỏi khuôn mẫu cứng nhắc.</td>
              </tr>
              <tr>
                <td className={tdClasses + " text-center font-serif text-xl font-bold"}>5</td>
                <td className={tdClasses}>Tự do, Phiêu lưu, Thích nghi, Đột phá.</td>
                <td className={tdClasses}>Tìm kiếm sự tự do đích thực thông qua sự cam kết và kỷ luật.</td>
              </tr>
              <tr>
                <td className={tdClasses + " text-center font-serif text-xl font-bold bg-luxury-charcoal/5"}>6</td>
                <td className={tdClasses + " bg-luxury-charcoal/5"}>Gia đình, Nuôi dưỡng, Trách nhiệm, Cái đẹp.</td>
                <td className={tdClasses + " bg-luxury-charcoal/5"}>Yêu thương bản thân trước, ngừng hy sinh mù quáng vì người khác.</td>
              </tr>
              <tr>
                <td className={tdClasses + " text-center font-serif text-xl font-bold"}>7</td>
                <td className={tdClasses}>Triết lý, Độc lập, Tâm linh, Phân tích chuyên sâu.</td>
                <td className={tdClasses}>Mở rộng trái tim, tin tưởng con người thay vì hoàn toàn cô lập.</td>
              </tr>
              <tr>
                <td className={tdClasses + " text-center font-serif text-xl font-bold bg-luxury-charcoal/5"}>8</td>
                <td className={tdClasses + " bg-luxury-charcoal/5"}>Quyền lực, Vật chất, Tham vọng, Thực thi.</td>
                <td className={tdClasses + " bg-luxury-charcoal/5"}>Cân bằng giữa tham vọng vật chất và đạo đức tâm linh.</td>
              </tr>
              <tr>
                <td className={tdClasses + " text-center font-serif text-xl font-bold"}>9</td>
                <td className={tdClasses}>Nhân đạo, Bao dung, Hoàn thiện, Phụng sự.</td>
                <td className={tdClasses}>Học cách buông bỏ quá khứ, tha thứ cho những tổn thương cũ.</td>
              </tr>
              <tr>
                <td className={tdClasses + " text-center font-serif text-xl font-bold text-[#b89562]"}>11</td>
                <td className={tdClasses}>Trực giác siêu phàm, Tâm linh, Nguồn sáng (Master).</td>
                <td className={tdClasses}>Giữ vững hệ thần kinh ổn định trước sóng năng lượng cường độ cao.</td>
              </tr>
              <tr>
                <td className={tdClasses + " text-center font-serif text-xl font-bold text-[#b89562]"}>22</td>
                <td className={tdClasses}>Bậc thầy kiến tạo, Biến ước mơ thành hiện thực vật chất (Master).</td>
                <td className={tdClasses}>Vượt qua nỗi sợ thất bại, dám nghĩ lớn vì lợi ích toàn nhân loại.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    )
  },
  destiny: {
    id: "destiny",
    title: "Chỉ Số Sứ Mệnh",
    subtitle: "Mục đích sâu thẳm của linh hồn",
    icon: "🎯",
    content: (
      <>
        <div className="space-y-6">
          <p>
            Nếu Con Số Chủ Đạo là "con đường" bạn phải đi, thì <strong>Chỉ Số Sứ Mệnh (Destiny/Expression Number)</strong> chính là "điểm đến" và cách thức bạn thể hiện bản thân với thế giới. Nó ẩn chứa trong cái tên đầy đủ của bạn trên giấy khai sinh. 
          </p>
          <p>
            Mỗi chữ cái trong tên bạn phát ra một tần số âm thanh nhất định. Khi các rung động này kết hợp lại, chúng tạo ra một năng lượng mô tả chính xác những gì linh hồn bạn khao khát đạt được trong kiếp sống này, năng lực tiềm ẩn của bạn, và cách người khác nhìn nhận bạn.
          </p>
        </div>

        <div className="my-12 p-8 bg-white/40 border border-luxury-charcoal/10 rounded-2xl shadow-sm">
          <h3 className="text-xl font-serif mb-4">Hệ Thống Số Pythagoras</h3>
          <p className="mb-4 text-sm leading-relaxed">
            Để tính Chỉ Số Sứ Mệnh, chúng ta sử dụng hệ thống bảng chữ cái Pythagoras để quy đổi từng chữ cái trong HỌ và TÊN thành một con số từ 1 đến 9. 
          </p>
          
          <div className="overflow-x-auto mt-6 rounded-xl border border-luxury-charcoal/10 shadow-sm bg-white/50">
            <table className={tableClasses + " text-center"}>
              <thead>
                <tr>
                  <th className={thClasses}>1</th>
                  <th className={thClasses}>2</th>
                  <th className={thClasses}>3</th>
                  <th className={thClasses}>4</th>
                  <th className={thClasses}>5</th>
                  <th className={thClasses}>6</th>
                  <th className={thClasses}>7</th>
                  <th className={thClasses}>8</th>
                  <th className={thClasses}>9</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={tdClasses + " font-bold text-lg"}>A</td>
                  <td className={tdClasses + " font-bold text-lg bg-luxury-charcoal/5"}>B</td>
                  <td className={tdClasses + " font-bold text-lg"}>C</td>
                  <td className={tdClasses + " font-bold text-lg bg-luxury-charcoal/5"}>D</td>
                  <td className={tdClasses + " font-bold text-lg"}>E</td>
                  <td className={tdClasses + " font-bold text-lg bg-luxury-charcoal/5"}>F</td>
                  <td className={tdClasses + " font-bold text-lg"}>G</td>
                  <td className={tdClasses + " font-bold text-lg bg-luxury-charcoal/5"}>H</td>
                  <td className={tdClasses + " font-bold text-lg"}>I</td>
                </tr>
                <tr>
                  <td className={tdClasses + " font-bold text-lg"}>J</td>
                  <td className={tdClasses + " font-bold text-lg bg-luxury-charcoal/5"}>K</td>
                  <td className={tdClasses + " font-bold text-lg"}>L</td>
                  <td className={tdClasses + " font-bold text-lg bg-luxury-charcoal/5"}>M</td>
                  <td className={tdClasses + " font-bold text-lg"}>N</td>
                  <td className={tdClasses + " font-bold text-lg bg-luxury-charcoal/5"}>O</td>
                  <td className={tdClasses + " font-bold text-lg"}>P</td>
                  <td className={tdClasses + " font-bold text-lg bg-luxury-charcoal/5"}>Q</td>
                  <td className={tdClasses + " font-bold text-lg"}>R</td>
                </tr>
                <tr>
                  <td className={tdClasses + " font-bold text-lg"}>S</td>
                  <td className={tdClasses + " font-bold text-lg bg-luxury-charcoal/5"}>T</td>
                  <td className={tdClasses + " font-bold text-lg"}>U</td>
                  <td className={tdClasses + " font-bold text-lg bg-luxury-charcoal/5"}>V</td>
                  <td className={tdClasses + " font-bold text-lg"}>W</td>
                  <td className={tdClasses + " font-bold text-lg bg-luxury-charcoal/5"}>X</td>
                  <td className={tdClasses + " font-bold text-lg"}>Y</td>
                  <td className={tdClasses + " font-bold text-lg bg-luxury-charcoal/5"}>Z</td>
                  <td className={tdClasses}></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-2xl font-serif">Sự Hòa Quyện Năng Lượng</h3>
          <p>
            Điều thú vị nhất trong Thần Số Học không phải là việc phân tích các con số một cách độc lập, mà là xem xét sự tương tác giữa Con Số Chủ Đạo và Chỉ Số Sứ Mệnh. 
          </p>
          <ul className="list-disc pl-5 space-y-3">
            <li><strong>Khi hai số đồng điệu:</strong> (Ví dụ: Chủ đạo 1 và Sứ mệnh 8). Năng lượng của bạn được cộng hưởng và nhân lên. Bạn dễ dàng tập trung và đạt được mục tiêu một cách nhanh chóng.</li>
            <li><strong>Khi hai số đối lập:</strong> (Ví dụ: Chủ đạo 4 thích an toàn, Sứ mệnh 5 thích phiêu lưu). Bạn sẽ thường xuyên trải qua những mâu thuẫn nội tâm sâu sắc. Tuy nhiên, nếu biết cách dung hòa, đây chính là cơ hội để linh hồn bạn tiến hóa vượt bậc và đạt được sự cân bằng hoàn hảo nhất.</li>
          </ul>
        </div>
      </>
    )
  },
  elements: {
    id: "elements",
    title: "Sự Cân Bằng Năng Lượng",
    subtitle: "Luật Ngũ Hành Bát Tự (Bazi)",
    icon: "☯️",
    content: (
      <>
        <div className="space-y-6">
          <p>
            Vũ trụ và cơ thể con người đều được cấu tạo từ 5 dạng năng lượng cơ bản: <strong>Kim, Mộc, Thủy, Hỏa, Thổ</strong>. Sự phân bổ của các nguyên tố này tại thời khắc bạn sinh ra tạo nên Bản đồ Năng lượng (Bát Tự). 
          </p>
          <p>
            Rất hiếm người sinh ra với tỷ lệ ngũ hành cân bằng tuyệt đối (20% cho mỗi nguyên tố). Phần lớn chúng ta đều dư thừa một hoặc hai năng lượng (gây ra sự thái quá) và thiếu hụt các năng lượng khác (gây ra sự mất cân bằng). Mục tiêu lớn nhất của việc giải mã Ngũ Hành không phải là để lo lắng về sự khuyết thiếu, mà là để tìm ra giải pháp Cân Bằng (Dụng Thần).
          </p>
        </div>

        <h3 className="text-2xl font-serif mt-12 mb-6">Đặc Tính Các Nguyên Tố</h3>
        <div className="overflow-x-auto rounded-xl border border-luxury-charcoal/10 shadow-sm bg-white/50">
          <table className={tableClasses}>
            <thead>
              <tr>
                <th className={thClasses + " w-24 text-center"}>Ngũ Hành</th>
                <th className={thClasses}>Tích Cực (Cân bằng)</th>
                <th className={thClasses}>Tiêu Cực (Mất cân bằng)</th>
                <th className={thClasses}>Giải pháp Bổ Khuyết</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={tdClasses + " text-center font-bold text-[#ffd700]"}>KIM</td>
                <td className={tdClasses}>Quyết đoán, Nghĩa khí, Rõ ràng, Có cấu trúc, Kỷ luật.</td>
                <td className={tdClasses}>Cứng nhắc, Sát khí, Tàn nhẫn, Mắc bệnh đường hô hấp.</td>
                <td className={tdClasses}>Sử dụng trang sức kim loại, mặc màu Trắng/Ghi. Tập tính bao dung.</td>
              </tr>
              <tr>
                <td className={tdClasses + " text-center font-bold text-[#4ade80] bg-luxury-charcoal/5"}>MỘC</td>
                <td className={tdClasses + " bg-luxury-charcoal/5"}>Lòng nhân ái, Phát triển liên tục, Sáng tạo, Trắc ẩn.</td>
                <td className={tdClasses + " bg-luxury-charcoal/5"}>Cố chấp, Nóng giận bộc phát, Quá tải công việc, Bệnh về gan.</td>
                <td className={tdClasses + " bg-luxury-charcoal/5"}>Trồng cây xanh, dùng đồ gỗ, mặc màu Xanh lá. Học cách kiên nhẫn.</td>
              </tr>
              <tr>
                <td className={tdClasses + " text-center font-bold text-[#60a5fa]"}>THỦY</td>
                <td className={tdClasses}>Trí tuệ thấu suốt, Giao tiếp giỏi, Mềm mỏng, Linh hoạt.</td>
                <td className={tdClasses}>Gian xảo, Trầm cảm, Hay lo sợ vô cớ, Suy giảm chức năng thận.</td>
                <td className={tdClasses}>Uống đủ nước, đi bơi, mặc màu Đen/Xanh dương. Luyện tập sự kiên định.</td>
              </tr>
              <tr>
                <td className={tdClasses + " text-center font-bold text-[#f87171] bg-luxury-charcoal/5"}>HỎA</td>
                <td className={tdClasses + " bg-luxury-charcoal/5"}>Nhiệt huyết, Lễ độ, Tỏa sáng, Mang lại hơi ấm và niềm vui.</td>
                <td className={tdClasses + " bg-luxury-charcoal/5"}>Nóng vội, Cả thèm chóng chán, Vô lễ, Bệnh về tim mạch.</td>
                <td className={tdClasses + " bg-luxury-charcoal/5"}>Hoạt động dưới nắng sáng, dùng ánh sáng ấm, mặc màu Đỏ/Hồng. Học cách tĩnh tâm.</td>
              </tr>
              <tr>
                <td className={tdClasses + " text-center font-bold text-[#b45309]"}>THỔ</td>
                <td className={tdClasses}>Chữ Tín, Vững chãi, Nuôi dưỡng, Bao dung, Đáng tin cậy.</td>
                <td className={tdClasses}>Chậm chạp, Ích kỷ, Suy nghĩ quá nhiều, Vấn đề về dạ dày.</td>
                <td className={tdClasses}>Đi bộ chân trần (Earthing), dùng gốm sứ đá, mặc màu Nâu/Vàng. Học cách vận động linh hoạt.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-12 p-8 bg-luxury-charcoal text-luxury-alabaster rounded-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 text-[120px] opacity-[0.05] font-serif -mt-8 -mr-4 select-none">☯️</div>
          <h3 className="text-xl font-serif mb-4 relative z-10">Luật Tương Sinh Tương Khắc</h3>
          <p className="text-luxury-alabaster/80 text-sm leading-relaxed relative z-10 mb-4">
            Sự sống tồn tại nhờ vào luật tương sinh (nuôi dưỡng) và tương khắc (kiểm soát) của tự nhiên:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-luxury-alabaster/80 relative z-10">
            <li><strong>Tương sinh:</strong> Mộc sinh Hỏa, Hỏa sinh Thổ, Thổ sinh Kim, Kim sinh Thủy, Thủy sinh Mộc.</li>
            <li><strong>Tương khắc:</strong> Mộc khắc Thổ, Thổ khắc Thủy, Thủy khắc Hỏa, Hỏa khắc Kim, Kim khắc Mộc.</li>
          </ul>
          <p className="text-luxury-alabaster/80 text-sm leading-relaxed relative z-10 mt-4 italic">
            Khi thiếu hụt một hành, bạn không chỉ cần nạp chính nó, mà còn có thể nạp hành "Sinh" ra nó để được nuôi dưỡng. Ví dụ: Thiếu Thủy, hãy bổ sung thêm Kim (vì Kim sinh Thủy).
          </p>
        </div>
      </>
    )
  }
};

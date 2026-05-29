import { Solar } from 'lunar-javascript';

/**
 * Tính toán Ngũ Hành dựa trên Bát Tự (Bazi / Four Pillars)
 * Sử dụng Tam Trụ (Year, Month, Day) vì không thu thập giờ sinh.
 *
 * @param {string} dobString - Ngày sinh dạng "dd-mm-yyyy" hoặc "yyyy-mm-dd"
 * @returns {Object} - { Kim, Mộc, Thủy, Hỏa, Thổ } với giá trị phần trăm
 */
export const calculateFiveElements = (dobString) => {
  try {
    if (!dobString) throw new Error("No date provided");

    let year, month, day;

    // Support both "dd-mm-yyyy" (from custom DatePicker) and "yyyy-mm-dd" formats
    const parts = dobString.split('-').map(Number);
    if (parts[0] > 31) {
      [year, month, day] = parts;
    } else {
      [day, month, year] = parts;
    }

    const solar = Solar.fromYmd(year, month, day);
    const lunar = solar.getLunar();
    const bazi = lunar.getEightChar();

    // Get WuXing strings (returns Chinese characters by default, e.g., "金水")
    const wuXingString = bazi.getYearWuXing() + bazi.getMonthWuXing() + bazi.getDayWuXing();
    
    // Log for debugging
    console.log("Chuỗi Ngũ Hành gốc:", wuXingString);

    let counts = { Kim: 0, Mộc: 0, Thủy: 0, Hỏa: 0, Thổ: 0 };

    // Parse the 6 characters
    for (let i = 0; i < wuXingString.length; i++) {
      const char = wuXingString[i];
      // Support both Chinese chars (library default) and Vietnamese keywords just in case
      if (char === '金' || char === 'K') counts.Kim += 1;
      if (char === '木' || char === 'M') counts.Mộc += 1;
      if (char === '水' || char === 'T') counts.Thủy += 1;
      if (char === '火' || char === 'H') counts.Hỏa += 1;
      if (char === '土') counts.Thổ += 1;
    }
    
    // Special check if localized to Vietnamese (Kim, Mộc, Thủy, Hỏa, Thổ)
    if (wuXingString.includes('Kim')) counts.Kim = (wuXingString.match(/Kim/g) || []).length;
    if (wuXingString.includes('Mộc')) counts.Mộc = (wuXingString.match(/Mộc/g) || []).length;
    if (wuXingString.includes('Thủy')) counts.Thủy = (wuXingString.match(/Thủy/g) || []).length;
    if (wuXingString.includes('Hỏa')) counts.Hỏa = (wuXingString.match(/Hỏa/g) || []).length;
    if (wuXingString.includes('Thổ')) counts.Thổ = (wuXingString.match(/Thổ/g) || []).length;

    const total = 6; // 3 Pillars (Year, Month, Day) * 2 (Gan, Zhi) = 6 elements
    
    // Calculate exact percentages
    return {
      Kim: Math.round((counts.Kim / total) * 100),
      Mộc: Math.round((counts.Mộc / total) * 100),
      Thủy: Math.round((counts.Thủy / total) * 100),
      Hỏa: Math.round((counts.Hỏa / total) * 100),
      Thổ: Math.round((counts.Thổ / total) * 100),
    };
  } catch (error) {
    console.error("Lỗi tính toán Bát Tự Ngũ Hành:", error);
    return { Kim: 20, Mộc: 20, Thủy: 20, Hỏa: 20, Thổ: 20 };
  }
};

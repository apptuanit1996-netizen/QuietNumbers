export const getZodiacSign = (dobStr) => {
  if (!dobStr) return null;

  // Assume dobStr is in format YYYY-MM-DD
  const parts = dobStr.split('-');
  if (parts.length !== 3) return null;

  const month = parseInt(parts[1], 10);
  const day = parseInt(parts[2], 10);

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'aries';
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'taurus';
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'gemini';
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'cancer';
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'leo';
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'virgo';
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'libra';
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'scorpio';
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'sagittarius';
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'capricorn';
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'aquarius';
  if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return 'pisces';

  return null;
};

export const generateAstroNumSynergy = (zodiacSign, lifePathNumber) => {
  if (!zodiacSign || !lifePathNumber) return null;

  const synergyMap = {
    fire: "Năng lượng Lửa của Cung Hoàng Đạo kết hợp với Con Số Chủ Đạo tạo ra một lực đẩy khổng lồ. Bạn sinh ra để dẫn đầu, truyền cảm hứng và không ngừng tiến về phía trước.",
    earth: "Năng lượng Đất của Cung Hoàng Đạo hòa quyện cùng Con Số Chủ Đạo mang lại một sự vững chãi tuyệt đối. Bạn là người kiến tạo những nền tảng vật chất và tinh thần bền vững cho xã hội.",
    air: "Khí của Cung Hoàng Đạo kết hợp với Con Số Chủ Đạo tạo ra một tần số trí tuệ và sự kết nối vượt bậc. Bạn mang sứ mệnh lan tỏa ý tưởng, kết nối con người và bứt phá những giới hạn tư duy cũ.",
    water: "Dòng chảy Thủy của Cung Hoàng Đạo hòa quyện cùng Con Số Chủ Đạo tạo nên một năng lượng chữa lành và thấu cảm sâu sắc. Hành trình của bạn là chạm đến tầng sâu nhất của tâm hồn nhân loại."
  };

  const elementMap = {
    aries: 'fire', leo: 'fire', sagittarius: 'fire',
    taurus: 'earth', virgo: 'earth', capricorn: 'earth',
    gemini: 'air', libra: 'air', aquarius: 'air',
    cancer: 'water', scorpio: 'water', pisces: 'water'
  };

  const element = elementMap[zodiacSign];

  let lifePathDesc = "";
  switch(lifePathNumber) {
    case 1: lifePathDesc = "Bản năng Tiên Phong của Số 1 ép bạn phải đứng lên dẫn đầu, kết hợp với năng lượng bản mệnh khiến bạn không thể sống một cuộc đời vô hình."; break;
    case 2: lifePathDesc = "Sự thấu cảm của Số 2 bổ sung một tầng năng lượng hòa giải và gắn kết, biến bạn thành người bảo vệ sự bình yên trong mọi môi trường."; break;
    case 3: lifePathDesc = "Tần số Sáng Tạo rực rỡ của Số 3 kết hợp với bản mệnh của bạn sinh ra một nghệ sĩ thực thụ, người dùng sự biểu đạt để thay đổi thế giới."; break;
    case 4: lifePathDesc = "Sự kỷ luật của Số 4 giúp đóng khung và thực tế hóa năng lượng bản mệnh của bạn, biến những giấc mơ viển vông nhất thành các công trình có thật."; break;
    case 5: lifePathDesc = "Sự Tự Do mãnh liệt của Số 5 nhân đôi khát khao phá vỡ ranh giới trong bạn. Cuộc đời bạn là một chuỗi những cuộc phiêu lưu bất tận."; break;
    case 6: lifePathDesc = "Trái tim Yêu Thương của Số 6 hướng toàn bộ sức mạnh của bạn vào việc chăm sóc, nuôi dưỡng và bảo vệ những người yếu thế."; break;
    case 7: lifePathDesc = "Chiều sâu Tâm Linh của Số 7 buộc bạn phải nhìn xuyên qua lớp vỏ bọc vật chất để tìm kiếm chân lý tối thượng của vũ trụ."; break;
    case 8: lifePathDesc = "Năng lượng Vật Chất của Số 8 khuếch đại tham vọng của bạn, trao cho bạn quyền lực để xoay chuyển dòng tiền và kiến tạo những đế chế lớn."; break;
    case 9: lifePathDesc = "Tần số Nhân Đạo của Số 9 thanh tẩy cái tôi của bạn, hướng bạn đến một cuộc đời phụng sự vĩ đại và chữa lành cho số đông."; break;
    case 11: lifePathDesc = "Năng lượng Tâm Linh Bậc Cao của Số 11 biến bạn thành một kênh dẫn năng lượng thiêng liêng, người thắp đuốc soi đường trong bóng tối."; break;
    case 22: lifePathDesc = "Bậc thầy Kiến Tạo Số 22 trao cho bạn năng lực hiện thực hóa những lý tưởng vĩ đại nhất để để lại di sản trường tồn cho nhân loại."; break;
    case 33: lifePathDesc = "Tình yêu Vô Điều Kiện của Số 33 nâng tần số của bạn lên mức cao nhất—sứ mệnh của một người thầy chữa lành thực thụ."; break;
    default: lifePathDesc = "Sự rung động độc đáo của con số chủ đạo hòa quyện hoàn hảo với bản mệnh tinh tú của bạn.";
  }

  return `${synergyMap[element]} ${lifePathDesc}`;
};

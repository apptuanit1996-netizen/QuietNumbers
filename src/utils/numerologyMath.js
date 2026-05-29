/**
 * Tính Con Số Chủ Đạo (Life Path Number)
 * @param {string} dobStr - Ngày tháng năm sinh dạng YYYY-MM-DD
 * @returns {number} - Con Số Chủ Đạo (2-9, 11, 22, 33)
 */
export const calculateLifePathNumber = (dobStr) => {
  if (!dobStr) return null;

  const digits = dobStr.replace(/\D/g, '').split('').map(Number);
  let total = digits.reduce((sum, current) => sum + current, 0);

  const masterNumbers = [11, 22, 33];

  while (total > 9 && !masterNumbers.includes(total)) {
    total = total.toString().split('').map(Number).reduce((sum, current) => sum + current, 0);
  }

  return total;
};

/**
 * Tính Chỉ Số Sứ Mệnh (Destiny Number) từ Họ và Tên
 * @param {string} fullName - Họ và tên đầy đủ
 * @returns {number} - Chỉ Số Sứ Mệnh (1-9, 11, 22, 33)
 */
export const calculateDestinyNumber = (fullName) => {
  if (!fullName) return null;

  // Xóa dấu tiếng Việt và các ký tự không phải chữ cái
  const cleanName = fullName
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Bỏ dấu
    .replace(/đ/g, 'd').replace(/Đ/g, 'D') // Xử lý chữ Đ
    .replace(/[^a-zA-Z]/g, '') // Chỉ giữ lại chữ cái A-Z
    .toUpperCase();

  // Bảng chữ cái theo Pythagorean
  const letterValues = {
    'A': 1, 'J': 1, 'S': 1,
    'B': 2, 'K': 2, 'T': 2,
    'C': 3, 'L': 3, 'U': 3,
    'D': 4, 'M': 4, 'V': 4,
    'E': 5, 'N': 5, 'W': 5,
    'F': 6, 'O': 6, 'X': 6,
    'G': 7, 'P': 7, 'Y': 7,
    'H': 8, 'Q': 8, 'Z': 8,
    'I': 9, 'R': 9
  };

  // Ánh xạ chữ cái thành số và tính tổng
  let total = 0;
  for (let i = 0; i < cleanName.length; i++) {
    const char = cleanName[i];
    if (letterValues[char]) {
      total += letterValues[char];
    }
  }

  // Rút gọn thành 1 chữ số hoặc số Master (11, 22, 33)
  const masterNumbers = [11, 22, 33];
  while (total > 9 && !masterNumbers.includes(total)) {
    total = total.toString().split('').map(Number).reduce((sum, current) => sum + current, 0);
  }

  return total;
};

/**
 * Simple seeded pseudo-random number generator (mulberry32)
 * Produces deterministic output for the same seed.
 */
const seededRandom = (seed) => {
  let t = seed + 0x6D2B79F5;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

/**
 * Tính tỷ lệ Cân Bằng Ngũ Hành dựa trên Biểu đồ Tên và Ngày Sinh (Authentic Numerology)
 * Thay vì dùng random seed, ta đếm tần suất các con số trong Tên và Ngày sinh
 * Hệ quy chiếu: Thủy (1), Thổ (2,5,8), Mộc (3,4), Kim (6,7), Hỏa (9)
 * @param {string} name - Họ và tên
 * @param {string} dob - Ngày tháng năm sinh
 * @returns {Object} - Object chứa phần trăm Kim, Mộc, Thủy, Hỏa, Thổ
 */
export const generateFiveElements = (name, dob) => {
  // 1. Lấy các con số từ ngày sinh (bỏ số 0)
  const dobDigits = dob ? dob.replace(/\D/g, '').split('').map(Number).filter(n => n !== 0) : [];

  // 2. Lấy các con số từ Tên (quy đổi theo Pythagorean)
  const cleanName = name ? name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd').replace(/Đ/g, 'D')
    .replace(/[^a-zA-Z]/g, '')
    .toUpperCase() : '';

  const letterValues = {
    'A': 1, 'J': 1, 'S': 1,
    'B': 2, 'K': 2, 'T': 2,
    'C': 3, 'L': 3, 'U': 3,
    'D': 4, 'M': 4, 'V': 4,
    'E': 5, 'N': 5, 'W': 5,
    'F': 6, 'O': 6, 'X': 6,
    'G': 7, 'P': 7, 'Y': 7,
    'H': 8, 'Q': 8, 'Z': 8,
    'I': 9, 'R': 9
  };

  const nameDigits = cleanName.split('').map(char => letterValues[char]).filter(Boolean);
  
  // 3. Gộp tất cả các con số
  const allDigits = [...dobDigits, ...nameDigits];

  // 4. Phân bổ vào Ngũ Hành
  const elementCounts = {
    'Kim': 0,  // 6, 7
    'Mộc': 0,  // 3, 4
    'Thủy': 0, // 1
    'Hỏa': 0,  // 9
    'Thổ': 0   // 2, 5, 8
  };

  allDigits.forEach(digit => {
    if (digit === 6 || digit === 7) elementCounts['Kim'] += 1;
    else if (digit === 3 || digit === 4) elementCounts['Mộc'] += 1;
    else if (digit === 1) elementCounts['Thủy'] += 1;
    else if (digit === 9) elementCounts['Hỏa'] += 1;
    else if (digit === 2 || digit === 5 || digit === 8) elementCounts['Thổ'] += 1;
  });

  // Cộng thêm 1 điểm cơ bản cho mỗi hành để biểu đồ không bao giờ có hành nào 0% (mọi người đều có đủ ngũ hành, chỉ là ít hay nhiều)
  Object.keys(elementCounts).forEach(key => elementCounts[key] += 1);

  // 5. Tính phần trăm
  const total = Object.values(elementCounts).reduce((acc, curr) => acc + curr, 0);
  const percentages = {};
  let currentSum = 0;
  
  const keys = Object.keys(elementCounts);
  keys.forEach((key, index) => {
    if (index === keys.length - 1) {
      percentages[key] = 100 - currentSum; // Đảm bảo tổng tròn 100%
    } else {
      const p = Math.round((elementCounts[key] / total) * 100);
      percentages[key] = p;
      currentSum += p;
    }
  });

  return percentages;
};

/**
 * Archetype definitions for each number (used in synthesis generation)
 */
const numberArchetypes = {
  1:  { role: 'Nhà Tiên Phong',         energy: 'Lửa khởi đầu',        element: 'fire',  quality: 'độc lập và dũng cảm' },
  2:  { role: 'Sứ Giả Hòa Bình',        energy: 'Nước êm đềm',          element: 'water', quality: 'nhạy cảm và thấu cảm' },
  3:  { role: 'Ngọn Lửa Sáng Tạo',      energy: 'Ánh sáng biểu đạt',    element: 'fire',  quality: 'sáng tạo và lạc quan' },
  4:  { role: 'Nền Tảng Đất',            energy: 'Đất vững chãi',         element: 'earth', quality: 'kỷ luật và đáng tin cậy' },
  5:  { role: 'Linh Hồn Tự Do',          energy: 'Khí chuyển hóa',       element: 'air',   quality: 'tự do và phiêu lưu' },
  6:  { role: 'Trái Tim Yêu Thương',     energy: 'Tình thương vũ trụ',   element: 'earth', quality: 'dịu dàng và chăm sóc' },
  7:  { role: 'Nhà Thông Thái',          energy: 'Nước tĩnh lặng',       element: 'water', quality: 'trí tuệ và huyền bí' },
  8:  { role: 'Bậc Thầy Vật Chất',       energy: 'Lửa quyền lực',        element: 'fire',  quality: 'quyết đoán và kiên cường' },
  9:  { role: 'Người Nhân Đạo',          energy: 'Nguồn hoàn kết',       element: 'water', quality: 'vị tha và khôn ngoan' },
  11: { role: 'Sứ Giả Ánh Sáng',        energy: 'Tia sáng tâm linh',    element: 'air',   quality: 'trực giác và khai sáng' },
  22: { role: 'Kiến Trúc Sư Vũ Trụ',    energy: 'Lực kiến tạo lớn',     element: 'earth', quality: 'tầm nhìn và thực thi' },
  33: { role: 'Bậc Thầy Tình Thương',   energy: 'Tình yêu vô điều kiện', element: 'water', quality: 'chữa lành và giảng dạy' },
};

/**
 * Predefined synthesis for key number combinations
 */
const synthesisMap = {
  '1-1': 'Sự kết hợp thuần khiết của hai dòng năng lượng Số 1 tạo ra một tần số tiên phong có cường độ gấp đôi. Hành trình của bạn gần như được viết sẵn để làm những điều chưa ai làm—Con Số Chủ Đạo lẫn Chỉ Số Sứ Mệnh đều cùng một lời kêu gọi. Thách thức lớn nhất: học cách cân bằng giữa ý chí cá nhân và sự cộng tác, để sức mạnh tiên phong không trở thành sự cô độc.',
  '1-9': 'Bạn mang trong mình một nghịch lý đầy vẻ đẹp: Con Số Chủ Đạo 1 thúc đẩy bạn dẫn đầu và khẳng định bản thân, trong khi Chỉ Số Sứ Mệnh 9 kéo bạn về phía việc phụng sự và buông bỏ cái tôi. Đây là sự kết hợp của người lãnh đạo vĩ nhân—người biết dùng sức mạnh cá nhân để phục vụ mục đích cao cả hơn bản thân.',
  '9-1': 'Linh hồn Số 9 của bạn mang trí tuệ và lòng nhân đạo sâu sắc, nhưng Chỉ Số Sứ Mệnh 1 đang thúc đẩy bạn biểu hiện sự dẫn dắt ấy ra bên ngoài thế giới. Sự kết hợp này sinh ra những nhà lãnh đạo nhân đạo—những người không tranh giành quyền lực mà được thế giới trao quyền vì tầm nhìn và trái tim của họ.',
  '2-8': 'Năng lượng nước dịu dàng của Số 2 kết hợp với sức mạnh vật chất của Số 8 tạo ra một sự cân bằng hoàn hảo hiếm có. Bạn có khả năng xây dựng quyền lực mà không đánh mất sự thấu cảm—một tổ hợp của nhà lãnh đạo biết lắng nghe và doanh nhân biết quan tâm. Đây là công thức của sự thành công bền vững.',
  '8-2': 'Sức mạnh kinh doanh của Con Số Chủ Đạo 8 được Chỉ Số Sứ Mệnh 2 bổ trợ bằng khả năng ngoại giao và thấu cảm. Đây là sự kết hợp của vị lãnh đạo tài ba biết dùng sự mềm mỏng đúng lúc—người thương thuyết giỏi nhất là người hiểu được cảm xúc của đối phương.',
  '3-7': 'Ngọn lửa biểu đạt của Số 3 gặp chiều sâu tâm linh của Số 7—đây là tổ hợp của những nhà thơ triết học, những nghệ sĩ tâm linh, những người biến chiều sâu nội tâm thành tác phẩm nghệ thuật lay động lòng người. Hành trình của bạn là học cách đưa trí tuệ xuống mặt đất bằng ngôn ngữ của trái tim.',
  '7-3': 'Trí tuệ thâm sâu của Con Số Chủ Đạo 7 tìm thấy tiếng nói qua Chỉ Số Sứ Mệnh 3—sứ mệnh của bạn là biến sự minh triết ẩn mình thành biểu đạt sáng tạo có thể chạm đến đại chúng. Bạn được sinh ra để là cầu nối giữa chân lý sâu sắc và ngôn ngữ của cuộc sống đời thường.',
  '4-6': 'Nền tảng vững chắc của Số 4 hòa quyện với trái tim yêu thương của Số 6 tạo ra người xây dựng gia đình hoàn hảo nhất—người vừa đặt nền móng vật chất bền chắc vừa lấp đầy ngôi nhà bằng tình thương ấm áp. Sứ mệnh của bạn là tạo ra những cộng đồng an toàn nơi mọi người được thịnh vượng và được yêu.',
  '6-4': 'Trái tim chăm sóc của Số 6 kết hợp với kỷ luật thực thi của Số 4 tạo ra người kiến tạo hệ thống nuôi dưỡng—người có thể xây dựng những tổ chức, trường học, hay những ngôi nhà đích thực mà người ta muốn trở về. Đây là sự kết hợp của tình thương có cấu trúc.',
  '5-5': 'Năng lượng tự do nhân đôi của bạn tạo ra một làn sóng thay đổi không thể ngăn cản. Bạn sinh ra để phá vỡ mọi giới hạn và mở ra những con đường chưa ai đặt chân. Thách thức: học cách định hướng tất cả sức mạnh phiêu lưu đó vào một mục tiêu đủ lớn để giữ bạn lại.',
  '11-4': 'Trực giác tâm linh siêu việt của Số 11 gặp tính thực tế và kỷ luật của Số 4—đây là tổ hợp lý tưởng để biến tầm nhìn thiêng liêng thành hiện thực vật chất. Bạn có khả năng xây dựng những hệ thống tâm linh thực dụng—những ngôi đền không phải bằng đá mà bằng những thay đổi thực sự trong cuộc sống người khác.',
  '22-9': 'Sức mạnh kiến tạo của Số 22 kết hợp với lòng nhân đạo sâu sắc của Số 9—đây là tổ hợp hiếm có của người xây dựng di sản nhân văn vĩ đại. Bạn không chỉ xây dựng những thứ to lớn; bạn xây dựng những thứ có ý nghĩa—những tổ chức, phong trào, hệ thống phục vụ nhân loại qua nhiều thế hệ.',
  '33-7': 'Tình yêu chữa lành của Số 33 kết hợp với trí tuệ tâm linh của Số 7—đây là sự kết hợp của vị đạo sư triết học, người không chỉ mang lại sự an ủi mà còn mang lại sự giác ngộ thực sự. Hành trình của bạn là chuyển hóa trí tuệ thành tình thương và tình thương thành trí tuệ.',
};

/**
 * Generates a dynamic synthesis paragraph based on the interaction
 * between Life Path Number and Destiny Number.
 * @param {number} lifePathNumber - Con Số Chủ Đạo
 * @param {number} destinyNumber  - Chỉ Số Sứ Mệnh
 * @returns {string} - Personalized synthesis paragraph
 */
export const generateSynthesis = (lifePathNumber, destinyNumber) => {
  const key = `${lifePathNumber}-${destinyNumber}`;
  if (synthesisMap[key]) return synthesisMap[key];

  // Same numbers — double vibration
  if (lifePathNumber === destinyNumber) {
    const a = numberArchetypes[lifePathNumber] || numberArchetypes[9];
    return `Một sự hội tụ hiếm có: cả Con Số Chủ Đạo lẫn Chỉ Số Sứ Mệnh của bạn đều rung động ở cùng tần số Số ${lifePathNumber}—${a.role}. Điều này tạo ra một luồng năng lượng tập trung phi thường, một con đường sống không có sự mâu thuẫn nội tâm. Bạn được vũ trụ trao cho một sứ mệnh duy nhất: làm chủ và biểu hiện hoàn toàn phẩm chất ${a.quality} ở mức độ sâu sắc nhất có thể.`;
  }

  // Master number elevates the whole chart
  const isMaster = (n) => [11, 22, 33].includes(n);
  if (isMaster(lifePathNumber) || isMaster(destinyNumber)) {
    const masterNum  = isMaster(lifePathNumber) ? lifePathNumber : destinyNumber;
    const otherNum   = isMaster(lifePathNumber) ? destinyNumber : lifePathNumber;
    const ma = numberArchetypes[masterNum];
    const oa = numberArchetypes[otherNum] || numberArchetypes[9];
    return `Sự hiện diện của con số Master Số ${masterNum} trong biểu đồ của bạn nâng toàn bộ bản đồ linh hồn lên một tầng vận hành cao hơn. Năng lượng ${ma.energy} của Số ${masterNum} kết hợp với phẩm chất ${oa.quality} của Số ${otherNum} tạo ra một con người không chỉ sống cho bản thân, mà còn mang trong mình sứ mệnh nâng đỡ tần số rung động của cộng đồng xung quanh. Gánh nặng này lớn, nhưng ân điển đi kèm cũng vô cùng rực rỡ.`;
  }

  const lpa = numberArchetypes[lifePathNumber] || numberArchetypes[9];
  const dna = numberArchetypes[destinyNumber]  || numberArchetypes[9];
  const tensionPairs = { fire: 'water', water: 'fire', earth: 'air', air: 'earth' };
  const harmonious = lpa.element === dna.element;
  const inTension  = tensionPairs[lpa.element] === dna.element;

  if (harmonious) {
    return `Con Số Chủ Đạo ${lifePathNumber} (${lpa.role}) và Chỉ Số Sứ Mệnh ${destinyNumber} (${dna.role}) của bạn cùng chia sẻ yếu tố nguyên tố giống nhau, tạo ra một sự hòa hợp tự nhiên sâu sắc. Năng lượng ${lpa.energy} cộng hưởng với ${dna.energy}, mang lại cho bạn một sự nhất quán nội tâm hiếm có. Hành trình của bạn là phóng đại phẩm chất ${lpa.quality} và ${dna.quality} đến mức tối đa để tạo ra tác động không thể bị bỏ qua.`;
  }

  if (inTension) {
    return `Sự kết hợp giữa Con Số Chủ Đạo ${lifePathNumber} (${lpa.role}) và Chỉ Số Sứ Mệnh ${destinyNumber} (${dna.role}) tạo ra một năng lượng căng thẳng sáng tạo—nơi hai tần số đối lập liên tục rèn giũa bạn. Đây không phải là bất hạnh; đây chính là nơi sự vĩ đại được tôi luyện. Bài học tối thượng: học cách khiêu vũ giữa sức mạnh ${lpa.quality} và ${dna.quality} thay vì để chúng xung đột nhau.`;
  }

  return `Con Số Chủ Đạo ${lifePathNumber} (${lpa.role}) định hình cách bạn trải nghiệm thế giới từ bên trong—bản sắc cốt lõi và tài năng thiên phú của bạn. Chỉ Số Sứ Mệnh ${destinyNumber} (${dna.role}) định hình cách bạn đóng góp giá trị độc đáo của mình ra thế giới. Sự kết hợp của phẩm chất ${lpa.quality} và ${dna.quality} trong bạn tạo ra một bản sắc linh hồn duy nhất không ai có thể sao chép.`;
};

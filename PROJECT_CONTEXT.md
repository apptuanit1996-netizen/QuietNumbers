# Project Context: QuietNumbers (Công cụ Thần Số Học & Bát Tự)

## Architecture Constraints
- **100% Client-side**: There is NO Backend and NO Database.
- **Framework**: React (Vite) + Tailwind CSS + Vanilla JavaScript for logic.
- **Language**: All UI text MUST be in Vietnamese.
- **Design Philosophy**: Simple, elegant SPA funnel for the Asian/Vietnamese metaphysical market. Quiet Luxury style.

## Logic Rules

### 1. Life Path Number Calculator (Con Số Chủ Đạo)
- **Input**: Date string in `YYYY-MM-DD` format.
- **Process**:
  1. Extract all digits from the input.
  2. Sum them up.
  3. If the total > 9 AND is NOT a Master Number (11, 22, 33), sum the digits of the total again until you get a single digit (2-9) or a Master Number.
- **Example**: `2002-09-14` -> `2+0+0+2+0+9+1+4 = 18` -> `1+8 = 9`. Result is `9`.

### 2. Five Elements Mock (Cân Bằng Ngũ Hành)
- **Output**: A dummy object returning a random percentage array for the 5 elements: Kim (Metal), Mộc (Wood), Thủy (Water), Hỏa (Fire), Thổ (Earth) totaling 100%.

### 3. Meanings Dictionary (Từ điển ý nghĩa)
- A dictionary object holds a short 2-sentence description IN VIETNAMESE for each Life Path Number. Calm, spiritual, and elegant tone.

## Application State (`App.jsx`)
- `userData`: `{ name: string, dob: string }`
- `appStep`: `number` (1 = Input Form, 2 = Results Page)
- `results`: `{ lifePathNumber: number | null, elements: object | null }`

## Monetization Placeholders
- **Google AdSense (Native)**: Placed immediately after the numerology description.
- **Affiliate Products**: Placed at the bottom as a horizontal row of gray boxes (e.g., Vòng phong thủy, Nến thơm, Đá thanh tẩy).

/**
 * 서울대학교 자연계열 정시 6개년(2021~2026학년도) 입결 및 2026학년도 대학정보포털 어디가 공식 상세 데이터셋
 */

const ADMISSIONS_DATA = {
  years: ['2021', '2022', '2023', '2024', '2025', '2026'],
  
  // 계열 카테고리 정의
  categories: {
    MED: { name: '의약학계열', color: '#7D8F62' },
    BASIC: { name: '기초자연과학', color: '#5A8A96' },
    ENG: { name: '공학계열', color: '#8A7B5A' },
    BIO_AGRIC: { name: '농생대/생명계열', color: '#6B8E55' },
    EDU: { name: '사범계열', color: '#96635A' },
    ETC: { name: '생활/간호/융합계열', color: '#7B6E8A' }
  },

  // 6개년 학과별 순위 및 어디가 2026 정밀 입결 수치
  departments: [
    { 
      id: 'med', name: '의예과', category: 'MED', 
      ranks: { 2021: 1, 2022: 1, 2023: 1, 2024: 1, 2025: 1, 2026: 1 },
      adiga2026: {
        general: { capacity: 29, competition: 3.31, additionalPassed: 0, score50: 426.4, score70: 425.7, kor70: 99, math70: 100, tam170: 100, tam270: 100, avg70: 100 },
        regional: { capacity: 10, competition: 2.40, additionalPassed: 0, score50: 423.4, score70: 423.2, kor70: 100, math70: 100, tam170: 98, tam270: 99, avg70: 100 }
      }
    },
    { 
      id: 'dent', name: '치의학과', category: 'MED', 
      ranks: { 2021: 2, 2022: 2, 2023: 2, 2024: 2, 2025: 2, 2026: 2 },
      adiga2026: {
        general: { capacity: 12, competition: 3.67, additionalPassed: 6, score50: 419.3, score70: 417.0, kor70: 99, math70: 100, tam170: 91, tam270: 92, avg70: 97 },
        regional: { capacity: 10, competition: 1.70, additionalPassed: 1, score50: 417.6, score70: 416.3, kor70: 100, math70: 100, tam170: 95, tam270: 98, avg70: 99 }
      }
    },
    { 
      id: 'pharm', name: '약학과', category: 'MED', 
      ranks: { 2021: null, 2022: 9, 2023: 6, 2024: 4, 2025: 5, 2026: 7 },
      adiga2026: {
        general: { capacity: 14, competition: 2.57, additionalPassed: 7, score50: 410.2, score70: 408.2, kor70: 99, math70: 71, tam170: 99, tam270: 99, avg70: 95 },
        regional: { capacity: 10, competition: 1.90, additionalPassed: 3, score50: 410.2, score70: 409.7, kor70: 100, math70: 100, tam170: 90, tam270: 80, avg70: 95 }
      }
    },
    { 
      id: 'vet', name: '수의예과', category: 'MED', 
      ranks: { 2021: 13, 2022: 6, 2023: 10, 2024: 6, 2025: 8, 2026: 6 },
      adiga2026: {
        general: { capacity: 15, competition: 3.60, additionalPassed: 1, score50: 410.5, score70: 408.7, kor70: 99, math70: 99, tam170: 95, tam270: 91, avg70: 97 },
        regional: { capacity: 4, competition: 4.75, additionalPassed: 1, score50: 400.9, score70: 400.9, kor70: 98, math70: 97, tam170: 93, tam270: 91, avg70: 96 }
      }
    },
    
    { 
      id: 'math', name: '수리과학부', category: 'BASIC', 
      ranks: { 2021: 25, 2022: 3, 2023: 5, 2024: 3, 2025: 3, 2026: 3 },
      adiga2026: {
        general: { capacity: 9, competition: 3.89, additionalPassed: 5, score50: 417.2, score70: 413.0, kor70: 96, math70: 100, tam170: 93, tam270: 98, avg70: 97 },
        regional: null
      }
    },
    { 
      id: 'stat', name: '통계학과', category: 'BASIC', 
      ranks: { 2021: null, 2022: 15, 2023: 7, 2024: 8, 2025: 7, 2026: 4 },
      adiga2026: {
        general: { capacity: 7, competition: 6.71, additionalPassed: 0, score50: 414.5, score70: 412.2, kor70: 99, math70: 96, tam170: 96, tam270: 100, avg70: 99 },
        regional: null
      }
    },
    { 
      id: 'physics', name: '물리학과', category: 'BASIC', 
      ranks: { 2021: 6, 2022: 8, 2023: 22, 2024: 10, 2025: null, 2026: 8 },
      adiga2026: {
        general: { capacity: 12, competition: 5.50, additionalPassed: 6, score50: 409.5, score70: 407.5, kor70: 97, math70: 100, tam170: 89, tam270: 95, avg70: 96 },
        regional: null
      }
    },
    { 
      id: 'chem', name: '화학부', category: 'BASIC', 
      ranks: { 2021: 15, 2022: 13, 2023: 19, 2024: 18, 2025: 15, 2026: 16 },
      adiga2026: {
        general: { capacity: 14, competition: 3.50, additionalPassed: 2, score50: 403.9, score70: 403.3, kor70: 98, math70: 94, tam170: 100, tam270: 93, avg70: 96 },
        regional: null
      }
    },
    { 
      id: 'astro', name: '천문학과', category: 'BASIC', 
      ranks: { 2021: 32, 2022: 26, 2023: 11, 2024: 14, 2025: 13, 2026: 13 },
      adiga2026: {
        general: { capacity: 5, competition: 7.60, additionalPassed: 1, score50: 404.6, score70: 404.3, kor70: 88, math70: 100, tam170: 91, tam270: 98, avg70: 94 },
        regional: null
      }
    },
    { 
      id: 'bio', name: '생명과학부', category: 'BASIC', 
      ranks: { 2021: 14, 2022: 18, 2023: 14, 2024: 13, 2025: 12, 2026: 19 },
      adiga2026: {
        general: { capacity: 22, competition: 3.32, additionalPassed: 4, score50: 403.6, score70: 402.4, kor70: 99, math70: 97, tam170: 95, tam270: 95, avg70: 97 },
        regional: null
      }
    },
    { 
      id: 'dess', name: '지구환경과학부', category: 'BASIC', 
      ranks: { 2021: 18, 2022: 21, 2023: 27, 2024: 26, 2025: 22, 2026: 27 },
      adiga2026: {
        general: { capacity: 9, competition: 4.44, additionalPassed: 2, score50: 401.5, score70: 400.2, kor70: 97, math70: 100, tam170: 90, tam270: 91, avg70: 96 },
        regional: null
      }
    },

    { 
      id: 'cs', name: '컴퓨터공학부', category: 'ENG', 
      ranks: { 2021: 3, 2022: 5, 2023: 3, 2024: 7, 2025: 4, 2026: 14 },
      adiga2026: {
        general: { capacity: 38, competition: 3.76, additionalPassed: 10, score50: 406.9, score70: 403.9, kor70: 99, math70: 99, tam170: 95, tam270: 74, avg70: 94 },
        regional: null
      }
    },
    { 
      id: 'ece', name: '전기정보공학부', category: 'ENG', 
      ranks: { 2021: 4, 2022: 4, 2023: 4, 2024: 5, 2025: 6, 2026: 5 },
      adiga2026: {
        general: { capacity: 53, competition: 3.06, additionalPassed: 15, score50: 411.6, score70: 410.3, kor70: 99, math70: 99, tam170: 99, tam270: 88, avg70: 97 },
        regional: null
      }
    },
    { 
      id: 'ie', name: '산업공학과', category: 'ENG', 
      ranks: { 2021: 7, 2022: 7, 2023: 8, 2024: 9, 2025: 9, 2026: 9 },
      adiga2026: {
        general: { capacity: 16, competition: 4.00, additionalPassed: 1, score50: 406.8, score70: 406.0, kor70: 99, math70: 97, tam170: 95, tam270: 88, avg70: 96 },
        regional: null
      }
    },
    { 
      id: 'me', name: '기계공학부', category: 'ENG', 
      ranks: { 2021: 5, 2022: 11, 2023: 13, 2024: 12, 2025: 23, 2026: 10 },
      adiga2026: {
        general: { capacity: 33, competition: 3.18, additionalPassed: 6, score50: 406.5, score70: 405.7, kor70: 98, math70: 99, tam170: 99, tam270: 88, avg70: 97 },
        regional: null
      }
    },
    { 
      id: 'cbe', name: '화학생물공학부', category: 'ENG', 
      ranks: { 2021: 11, 2022: 12, 2023: 9, 2024: 11, 2025: 10, 2026: 18 },
      adiga2026: {
        general: { capacity: 30, competition: 3.60, additionalPassed: 8, score50: 406.1, score70: 402.9, kor70: 97, math70: 100, tam170: 95, tam270: 68, avg70: 93 },
        regional: null
      }
    },
    { 
      id: 'mse', name: '재료공학부', category: 'ENG', 
      ranks: { 2021: 12, 2022: 10, 2023: 15, 2024: 17, 2025: 16, 2026: 12 },
      adiga2026: {
        general: { capacity: 31, competition: 3.39, additionalPassed: 7, score50: 405.1, score70: 404.5, kor70: 97, math70: 100, tam170: 91, tam270: 81, avg70: 94 },
        regional: null
      }
    },
    { 
      id: 'nuclear', name: '원자핵공학과', category: 'ENG', 
      ranks: { 2021: 9, 2022: 25, 2023: 12, 2024: 16, 2025: 18, 2026: 11 },
      adiga2026: {
        general: { capacity: 6, competition: 5.33, additionalPassed: 2, score50: 404.7, score70: 404.7, kor70: 97, math70: 100, tam170: 93, tam270: 92, avg70: 97 },
        regional: null
      }
    },
    { 
      id: 'aero', name: '항공우주공학과', category: 'ENG', 
      ranks: { 2021: 10, 2022: 17, 2023: 16, 2024: 20, 2025: 14, 2026: 15 },
      adiga2026: {
        general: { capacity: 12, competition: 3.42, additionalPassed: 2, score50: 404.1, score70: 403.6, kor70: 97, math70: 99, tam170: 100, tam270: 91, avg70: 97 },
        regional: null
      }
    },
    { 
      id: 'arch', name: '건축학과', category: 'ENG', 
      ranks: { 2021: 17, 2022: 14, 2023: 18, 2024: 23, 2025: 21, 2026: 22 },
      adiga2026: {
        general: { capacity: 15, competition: 3.13, additionalPassed: 7, score50: 402.5, score70: 401.4, kor70: 97, math70: 97, tam170: 99, tam270: 93, avg70: 97 },
        regional: null
      }
    },
    { 
      id: 'cee', name: '건설환경공학부', category: 'ENG', 
      ranks: { 2021: 16, 2022: 16, 2023: 33, 2024: 21, 2025: 19, 2026: 24 },
      adiga2026: {
        general: { capacity: 19, competition: 3.63, additionalPassed: 8, score50: 402.0, score70: 401.3, kor70: 99, math70: 97, tam170: 96, tam270: 95, avg70: 97 },
        regional: null
      }
    },
    { 
      id: 'nae', name: '조선해양공학과', category: 'ENG', 
      ranks: { 2021: 23, 2022: 22, 2023: 24, 2024: 22, 2025: 20, 2026: 21 },
      adiga2026: {
        general: { capacity: 17, competition: 4.35, additionalPassed: 2, score50: 402.3, score70: 402.2, kor70: 94, math70: 100, tam170: 100, tam270: 95, avg70: 97 },
        regional: null
      }
    },
    { 
      id: 'ere', name: '에너지자원공학과', category: 'ENG', 
      ranks: { 2021: null, 2022: null, 2023: 17, 2024: 27, 2025: 36, 2026: 20 },
      adiga2026: {
        general: { capacity: 5, competition: 8.20, additionalPassed: 0, score50: 406.8, score70: 402.3, kor70: 97, math70: 100, tam170: 90, tam270: 83, avg70: 95 },
        regional: null
      }
    },
    
    { 
      id: 'calbs', name: '바이오시스템소재학부', category: 'BIO_AGRIC', 
      ranks: { 2021: 19, 2022: 19, 2023: 20, 2024: 19, 2025: 17, 2026: 23 },
      adiga2026: {
        general: { capacity: 14, competition: 4.57, additionalPassed: 1, score50: 401.5, score70: 401.4, kor70: 97, math70: 99, tam170: 100, tam270: 93, avg70: 98 },
        regional: null
      }
    },
    { 
      id: 'abc', name: '응용생물화학부', category: 'BIO_AGRIC', 
      ranks: { 2021: 20, 2022: 20, 2023: 35, 2024: 24, 2025: 29, 2026: 25 },
      adiga2026: {
        general: { capacity: 18, competition: 3.39, additionalPassed: 7, score50: 401.7, score70: 401.0, kor70: 96, math70: 100, tam170: 83, tam270: 99, avg70: 96 },
        regional: null
      }
    },
    { 
      id: 'fdab', name: '식품동물생명공학부', category: 'BIO_AGRIC', 
      ranks: { 2021: 21, 2022: 27, 2023: 36, 2024: 25, 2025: 28, 2026: 29 },
      adiga2026: {
        general: { capacity: 20, competition: 2.55, additionalPassed: 1, score50: 400.0, score70: 399.6, kor70: 98, math70: 97, tam170: 99, tam270: 84, avg70: 96 },
        regional: null
      }
    },
    { 
      id: 'plant', name: '식물생산과학부', category: 'BIO_AGRIC', 
      ranks: { 2021: 29, 2022: 29, 2023: 28, 2024: 31, 2025: 32, 2026: 34 },
      adiga2026: {
        general: { capacity: 27, competition: 3.70, additionalPassed: 6, score50: 398.7, score70: 398.5, kor70: 96, math70: 99, tam170: 83, tam270: 98, avg70: 95 },
        regional: null
      }
    },
    { 
      id: 'food', name: '식품영양학과', category: 'BIO_AGRIC', 
      ranks: { 2021: 30, 2022: 30, 2023: 29, 2024: 32, 2025: 33, 2026: 28 },
      adiga2026: {
        general: { capacity: 11, competition: 3.55, additionalPassed: 3, score50: 400.1, score70: 399.7, kor70: 99, math70: 94, tam170: 99, tam270: 88, avg70: 96 },
        regional: null
      }
    },
    { 
      id: 'landscape', name: '조경지역시스템공학부', category: 'BIO_AGRIC', 
      ranks: { 2021: 24, 2022: 24, 2023: 31, 2024: 29, 2025: 27, 2026: 31 },
      adiga2026: {
        general: { capacity: 16, competition: 4.13, additionalPassed: 1, score50: 400.1, score70: 399.5, kor70: 97, math70: 100, tam170: 79, tam270: 95, avg70: 95 },
        regional: null
      }
    },
    { 
      id: 'forest', name: '산림과학부', category: 'BIO_AGRIC', 
      ranks: { 2021: 26, 2022: 31, 2023: 34, 2024: 28, 2025: 30, 2026: 33 },
      adiga2026: {
        general: { capacity: 18, competition: 3.83, additionalPassed: 11, score50: 398.8, score70: 398.6, kor70: 88, math70: 100, tam170: 95, tam270: 95, avg70: 94 },
        regional: null
      }
    },

    { 
      id: 'mathed', name: '수학교육과', category: 'EDU', 
      ranks: { 2021: 8, 2022: 28, 2023: 21, 2024: null, 2025: 31, 2026: 26 },
      adiga2026: {
        general: { capacity: 10, competition: 5.60, additionalPassed: 4, score50: 401.7, score70: 400.5, kor70: 99, math70: 99, tam170: 90, tam270: 91, avg70: 96 },
        regional: null
      }
    },
    { 
      id: 'physed', name: '물리교육과', category: 'EDU', 
      ranks: { 2021: 31, 2022: 23, 2023: 23, 2024: 30, 2025: 25, 2026: 32 },
      adiga2026: {
        general: { capacity: 10, competition: 4.50, additionalPassed: 1, score50: 399.5, score70: 398.7, kor70: 94, math70: 100, tam170: 79, tam270: 88, avg70: 93 },
        regional: null
      }
    },
    { 
      id: 'chemed', name: '화학교육과', category: 'EDU', 
      ranks: { 2021: 22, 2022: null, 2023: 37, 2024: 34, 2025: 26, 2026: 36 },
      adiga2026: {
        general: { capacity: 7, competition: 4.29, additionalPassed: 4, score50: 400.4, score70: 397.7, kor70: 99, math70: 97, tam170: 93, tam270: 89, avg70: 96 },
        regional: null
      }
    },
    { 
      id: 'bioed', name: '생물교육과', category: 'EDU', 
      ranks: { 2021: 28, 2022: 33, 2023: 30, 2024: 35, 2025: 35, 2026: 37 },
      adiga2026: {
        general: { capacity: 11, competition: 3.73, additionalPassed: 1, score50: 397.5, score70: 397.4, kor70: 88, math70: 100, tam170: 90, tam270: 89, avg70: 93 },
        regional: null
      }
    },
    { 
      id: 'earthed', name: '지구과학교육과', category: 'EDU', 
      ranks: { 2021: 33, 2022: 32, 2023: 25, 2024: 33, 2025: 34, 2026: 38 },
      adiga2026: {
        general: { capacity: 8, competition: 3.50, additionalPassed: 2, score50: 397.3, score70: 397.0, kor70: 91, math70: 100, tam170: 93, tam270: 95, avg70: 95 },
        regional: null
      }
    },

    { 
      id: 'clothing', name: '의류학과', category: 'ETC', 
      ranks: { 2021: 27, 2022: 34, 2023: 26, 2024: 36, 2025: 37, 2026: 35 },
      adiga2026: {
        general: { capacity: 10, competition: 4.40, additionalPassed: 1, score50: 399.2, score70: 398.2, kor70: 97, math70: 97, tam170: 95, tam270: 97, avg70: 97 },
        regional: null
      }
    },
    { 
      id: 'nursing', name: '간호학과', category: 'ETC', 
      ranks: { 2021: null, 2022: 35, 2023: 32, 2024: 37, 2025: 38, 2026: 39 },
      adiga2026: {
        general: { capacity: 29, competition: 4.03, additionalPassed: 14, score50: 396.9, score70: 396.6, kor70: 99, math70: 94, tam170: 100, tam270: 73, avg70: 93 },
        regional: null
      }
    },
    { 
      id: 'convergence', name: '첨단융합학부', category: 'ETC', 
      ranks: { 2021: null, 2022: null, 2023: null, 2024: 15, 2025: 11, 2026: 17 },
      adiga2026: {
        general: { capacity: 53, competition: 3.40, additionalPassed: 7, score50: 404.0, score70: 403.0, kor70: 98, math70: 99, tam170: 99, tam270: 79, avg70: 95 },
        regional: { capacity: 20, competition: 2.15, additionalPassed: 9, score50: 403.2, score70: 400.9, kor70: 98, math70: 99, tam170: 93, tam270: 95, avg70: 97 }
      }
    },
    { 
      id: 'smartsys', name: '스마트시스템과학과', category: 'ETC', 
      ranks: { 2021: null, 2022: null, 2023: null, 2024: null, 2025: 24, 2026: 30 },
      adiga2026: {
        general: { capacity: 10, competition: 5.50, additionalPassed: 3, score50: 400.1, score70: 399.5, kor70: 98, math70: 97, tam170: 95, tam270: 95, avg70: 97 },
        regional: null
      }
    }
  ],

  // 5대 Tier 정의
  tiers: [
    {
      level: 1,
      name: 'Tier 1: 최상위 의약학 & 수리·통계계열',
      range: '수능 환산 410.0점 이상 (백분위 97~100%)',
      desc: '의예과, 치의학과, 수리과학부, 통계학과, 약학과, 전기정보공학부',
      departments: ['med', 'dent', 'math', 'stat', 'pharm', 'ece']
    },
    {
      level: 2,
      name: 'Tier 2: 최상위 이공계 & 수의예',
      range: '수능 환산 406.0 ~ 409.9점 (백분위 96~97%)',
      desc: '수의예과, 물리학과, 산업공학과, 기계공학부, 화학생물공학부',
      departments: ['vet', 'physics', 'ie', 'me', 'cbe']
    },
    {
      level: 3,
      name: 'Tier 3: 첨단·핵심 공학 & 기초자연',
      range: '수능 환산 403.0 ~ 405.9점 (백분위 94~96%)',
      desc: '원자핵공학과, 재료공학부, 천문학과, 컴퓨터공학부, 항공우주공학과, 화학부, 첨단융합학부',
      departments: ['nuclear', 'mse', 'astro', 'cs', 'aero', 'chem', 'convergence']
    },
    {
      level: 4,
      name: 'Tier 4: 건설·응용공학 & 생명/농생대',
      range: '수능 환산 400.0 ~ 402.9점 (백분위 93~95%)',
      desc: '생명과학부, 에너지자원, 조선해양, 건축, 바이오시스템소재, 건설환경, 응용생물화학, 수학교육',
      departments: ['bio', 'ere', 'nae', 'arch', 'calbs', 'cee', 'abc', 'mathed']
    },
    {
      level: 5,
      name: 'Tier 5: 농생대·사범대 & 생활과학계열',
      range: '수능 환산 396.0 ~ 399.9점 (백분위 92~94%)',
      desc: '식품영양, 식품동물생명, 조경지역시스템, 스마트시스템, 식물생산, 산림, 과학교육계열, 의류, 간호',
      departments: ['food', 'fdab', 'landscape', 'smartsys', 'plant', 'forest', 'physed', 'chemed', 'bioed', 'earthed', 'clothing', 'nursing']
    }
  ]
};

// 정밀 서울대 정시 수능 환산점수 계산 알고리즘 (서울대 공식)
ADMISSIONS_DATA.calculateSNUScore = function(korStd, mathStd, tam1Std, tam2Std, engGrade, korHistoryGrade, tamCombo, schoolEvalGrade) {
  // 1. 국어 (1.0배)
  const korScore = korStd * 1.0;

  // 2. 수학 (1.2배)
  const mathScore = mathStd * 1.2;

  // 3. 탐구 (0.8배)
  const tamScore = (tam1Std + tam2Std) * 0.8;

  // 4. 과탐 II 조정 가산점
  let tamBonus = 0;
  if (tamCombo === 'I_II') tamBonus = 3.0;
  else if (tamCombo === 'II_II') tamBonus = 5.0;

  // 5. 영어 감점
  const engDeductions = [0, 0, -0.5, -2.0, -4.0, -6.0, -8.0, -10.0, -12.0, -14.0];
  const engDeduction = engDeductions[engGrade] || 0;

  // 6. 한국사 감점
  const historyDeductions = [0, 0, 0, 0, -0.4, -0.8, -1.2, -1.6, -2.0, -2.4];
  const historyDeduction = historyDeductions[korHistoryGrade] || 0;

  // 수능 기본 환산 총점
  const suneungTotal = korScore + mathScore + tamScore + tamBonus + engDeduction + historyDeduction;

  // 7. 교과평가 환산 (일반전형 20점 만점 기준: AA 5, AB 4, BB 3, BC 1.5, CC 0 + 기본 15)
  const evalScores = { 'AA': 5.0, 'AB': 4.0, 'BB': 3.0, 'BC': 1.5, 'CC': 0.0 };
  const schoolEvalScore = (evalScores[schoolEvalGrade] || 3.0) + 15.0; // 기본 15점 포함 총 20점 만점

  // 최종 환산 총점 (수능 80 + 교과 20 산출 구조)
  const finalTotal = suneungTotal + schoolEvalScore;

  return {
    suneungTotal: suneungTotal.toFixed(2),
    schoolEvalScore: schoolEvalScore.toFixed(1),
    finalTotal: finalTotal.toFixed(2),
    tamBonus: tamBonus
  };
};

// 동적 분석 통계 함수
ADMISSIONS_DATA.getDepartmentStats = function(deptId) {
  const dept = this.departments.find(d => d.id === deptId);
  if (!dept) return null;

  const validRanks = Object.values(dept.ranks).filter(r => r !== null);
  const avg = validRanks.reduce((a, b) => a + b, 0) / validRanks.length;
  const min = Math.min(...validRanks);
  const max = Math.max(...validRanks);

  // 추합 회전율 (충원율 %)
  const genData = dept.adiga2026.general;
  const additionalRate = genData ? ((genData.additionalPassed / genData.capacity) * 100).toFixed(1) : '0.0';

  return {
    ...dept,
    avgRank: avg.toFixed(1),
    bestRank: min,
    worstRank: max,
    additionalRate: additionalRate
  };
};

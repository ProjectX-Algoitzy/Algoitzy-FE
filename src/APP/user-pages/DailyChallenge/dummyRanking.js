const rankingData = [
  // 2025-08-20
  {
    date: "2025-08-20",
    language: "Python",
    ranking: [
      { rank: 1, name: "이유경", speed: "0.12s", codeLength: 120 },
      { rank: 2, name: "이유경1", speed: "0.15s", codeLength: 150 },
      { rank: 3, name: "박창현", speed: "1.20s", codeLength: 80 },
      { rank: 4, name: "민중원", speed: "1.20s", codeLength: 80 }
    ]
  },
  {
    date: "2025-08-20",
    language: "C++",
    ranking: [
      { rank: 1, name: "Alice", speed: "0.10s", memory: "950KB", codeLength: 110 },
      { rank: 2, name: "Bob", speed: "0.14s", memory: "1020KB", codeLength: 140 },
      { rank: 3, name: "Charlie", speed: "0.20s", memory: "990KB", codeLength: 160 },
      { rank: 4, name: "David", speed: "0.25s", memory: "1005KB", codeLength: 180 }
    ]
  },
  {
    date: "2025-08-20",
    language: "Java",
    ranking: [
      { rank: 1, name: "Emma", speed: "0.11s", memory: "1200KB", codeLength: 130 },
      { rank: 2, name: "Frank", speed: "0.16s", memory: "1100KB", codeLength: 160 },
      { rank: 3, name: "Grace", speed: "0.22s", memory: "1150KB", codeLength: 90 },
      { rank: 4, name: "Hank", speed: "0.28s", memory: "1180KB", codeLength: 200 }
    ]
  },

  // 2025-08-21
  {
    date: "2025-08-21",
    language: "Python",
    ranking: [
      { rank: 1, name: "이유경", speed: "0.10s", codeLength: 115 },
      { rank: 2, name: "민중원", speed: "0.14s", codeLength: 145 },
      { rank: 3, name: "박창현", speed: "0.30s", codeLength: 95 },
      { rank: 4, name: "홍길동", speed: "0.50s", codeLength: 85 }
    ]
  },
  {
    date: "2025-08-21",
    language: "C++",
    ranking: [
      { rank: 1, name: "Alice", speed: "0.09s", memory: "930KB", codeLength: 100 },
      { rank: 2, name: "Bob", speed: "0.12s", memory: "960KB", codeLength: 120 },
      { rank: 3, name: "Charlie", speed: "0.19s", memory: "980KB", codeLength: 140 },
      { rank: 4, name: "David", speed: "0.22s", memory: "1010KB", codeLength: 160 }
    ]
  },
  {
    date: "2025-08-21",
    language: "Java",
    ranking: [
      { rank: 1, name: "Emma", speed: "0.13s", memory: "1210KB", codeLength: 135 },
      { rank: 2, name: "Frank", speed: "0.18s", memory: "1190KB", codeLength: 150 },
      { rank: 3, name: "Grace", speed: "0.25s", memory: "1175KB", codeLength: 170 },
      { rank: 4, name: "Hank", speed: "0.35s", memory: "1160KB", codeLength: 200 }
    ]
  },

  // 2025-08-22
  {
    date: "2025-08-22",
    language: "Python",
    ranking: [
      { rank: 1, name: "박창현", speed: "0.09s", codeLength: 110 },
      { rank: 2, name: "민중원", speed: "0.12s", codeLength: 140 },
      { rank: 3, name: "이유경", speed: "0.20s", codeLength: 100 },
      { rank: 4, name: "김철수", speed: "0.35s", codeLength: 130 }
    ]
  },
  {
    date: "2025-08-22",
    language: "C++",
    ranking: [
      { rank: 1, name: "Alice", speed: "0.08s", memory: "900KB", codeLength: 105 },
      { rank: 2, name: "Bob", speed: "0.11s", memory: "940KB", codeLength: 115 },
      { rank: 3, name: "Charlie", speed: "0.16s", memory: "970KB", codeLength: 125 },
      { rank: 4, name: "David", speed: "0.21s", memory: "1000KB", codeLength: 140 }
    ]
  },
  {
    date: "2025-08-22",
    language: "Java",
    ranking: [
      { rank: 1, name: "Emma", speed: "0.12s", memory: "1190KB", codeLength: 128 },
      { rank: 2, name: "Frank", speed: "0.17s", memory: "1180KB", codeLength: 145 },
      { rank: 3, name: "Grace", speed: "0.24s", memory: "1170KB", codeLength: 165 },
      { rank: 4, name: "Hank", speed: "0.33s", memory: "1160KB", codeLength: 185 }
    ]
  },

  // 2025-08-23
  {
    date: "2025-08-23",
    language: "Python",
    ranking: [
      { rank: 1, name: "홍길동", speed: "0.08s", codeLength: 108 },
      { rank: 2, name: "이유경", speed: "0.11s", codeLength: 112 },
      { rank: 3, name: "박창현", speed: "0.22s", codeLength: 118 },
      { rank: 4, name: "민중원", speed: "0.40s", codeLength: 130 }
    ]
  },
  {
    date: "2025-08-23",
    language: "C++",
    ranking: [
      { rank: 1, name: "Alice", speed: "0.07s", memory: "890KB", codeLength: 95 },
      { rank: 2, name: "Bob", speed: "0.10s", memory: "920KB", codeLength: 110 },
      { rank: 3, name: "Charlie", speed: "0.14s", memory: "950KB", codeLength: 120 },
      { rank: 4, name: "David", speed: "0.19s", memory: "970KB", codeLength: 130 }
    ]
  },
  {
    date: "2025-08-23",
    language: "Java",
    ranking: [
      { rank: 1, name: "Emma", speed: "0.10s", memory: "1180KB", codeLength: 122 },
      { rank: 2, name: "Frank", speed: "0.15s", memory: "1170KB", codeLength: 138 },
      { rank: 3, name: "Grace", speed: "0.22s", memory: "1160KB", codeLength: 150 },
      { rank: 4, name: "Hank", speed: "0.30s", memory: "1150KB", codeLength: 175 }
    ]
  },

  // 2025-08-24
  {
    date: "2025-08-24",
    language: "Python",
    ranking: [
      { rank: 1, name: "이유경", speed: "0.09s", codeLength: 109 },
      { rank: 2, name: "민중원", speed: "0.13s", codeLength: 115 },
      { rank: 3, name: "박창현", speed: "0.21s", codeLength: 120 },
      { rank: 4, name: "홍길동", speed: "0.34s", codeLength: 135 }
    ]
  },
  {
    date: "2025-08-24",
    language: "C++",
    ranking: [
      { rank: 1, name: "Alice", speed: "0.08s", memory: "905KB", codeLength: 100 },
      { rank: 2, name: "Bob", speed: "0.12s", memory: "935KB", codeLength: 118 },
      { rank: 3, name: "Charlie", speed: "0.15s", memory: "965KB", codeLength: 125 },
      { rank: 4, name: "David", speed: "0.20s", memory: "990KB", codeLength: 135 }
    ]
  },
  {
    date: "2025-08-24",
    language: "Java",
    ranking: [
      { rank: 1, name: "Emma", speed: "0.11s", memory: "1170KB", codeLength: 130 },
      { rank: 2, name: "Frank", speed: "0.16s", memory: "1160KB", codeLength: 145 },
      { rank: 3, name: "Grace", speed: "0.23s", memory: "1150KB", codeLength: 160 },
      { rank: 4, name: "Hank", speed: "0.32s", memory: "1140KB", codeLength: 180 }
    ]
  },

  // 2025-08-25
  {
    date: "2025-08-25",
    language: "Python",
    ranking: [
      { rank: 1, name: "민중원", speed: "0.08s", codeLength: 111 },
      { rank: 2, name: "이유경", speed: "0.12s", codeLength: 118 },
      { rank: 3, name: "박창현", speed: "0.19s", codeLength: 125 },
      { rank: 4, name: "홍길동", speed: "0.29s", codeLength: 140 }
    ]
  },
  {
    date: "2025-08-25",
    language: "C++",
    ranking: [
      { rank: 1, name: "Alice", speed: "0.07s", memory: "880KB", codeLength: 90 },
      { rank: 2, name: "Bob", speed: "0.11s", memory: "910KB", codeLength: 110 },
      { rank: 3, name: "Charlie", speed: "0.14s", memory: "940KB", codeLength: 120 },
      { rank: 4, name: "David", speed: "0.18s", memory: "970KB", codeLength: 130 }
    ]
  },
  {
    date: "2025-08-25",
    language: "Java",
    ranking: [
      { rank: 1, name: "Emma", speed: "0.10s", memory: "1160KB", codeLength: 125 },
      { rank: 2, name: "Frank", speed: "0.15s", memory: "1150KB", codeLength: 140 },
      { rank: 3, name: "Grace", speed: "0.21s", memory: "1140KB", codeLength: 155 },
      { rank: 4, name: "Hank", speed: "0.28s", memory: "1130KB", codeLength: 170 }
    ]
  },

  // 2025-08-26
  {
    date: "2025-08-26",
    language: "Python",
    ranking: [
      { rank: 1, name: "박창현", speed: "0.09s", codeLength: 112 },
      { rank: 2, name: "이유경", speed: "0.13s", codeLength: 119 },
      { rank: 3, name: "민중원", speed: "0.18s", codeLength: 127 },
      { rank: 4, name: "홍길동", speed: "0.27s", codeLength: 142 },
      { rank: 5, name: "박창현11", speed: "0.09s", codeLength: 112 },
      { rank: 6, name: "이유경212", speed: "0.13s", codeLength: 119 },
      { rank: 7, name: "민중원2", speed: "0.18s", codeLength: 127 },
      { rank: 8, name: "홍길동1", speed: "0.27s", codeLength: 142 }
    ]
  },
  {
    date: "2025-08-26",
    language: "C++",
    ranking: [
      { rank: 1, name: "Alice", speed: "0.08s", memory: "895KB", codeLength: 98 },
      { rank: 2, name: "Bob", speed: "0.12s", memory: "925KB", codeLength: 115 },
      { rank: 3, name: "Charlie", speed: "0.15s", memory: "950KB", codeLength: 128 },
      { rank: 4, name: "David", speed: "0.20s", memory: "980KB", codeLength: 135 }
    ]
  },
  {
    date: "2025-08-26",
    language: "Java",
    ranking: [
      { rank: 1, name: "Emma", speed: "0.11s", memory: "1150KB", codeLength: 126 },
      { rank: 2, name: "Frank", speed: "0.16s", memory: "1140KB", codeLength: 142 },
      { rank: 3, name: "Grace", speed: "0.22s", memory: "1130KB", codeLength: 158 },
      { rank: 4, name: "Hank", speed: "0.30s", memory: "1120KB", codeLength: 175 }
    ]
  }
];

export default rankingData;
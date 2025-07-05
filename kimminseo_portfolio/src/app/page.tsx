"use client"
import { useRef, useEffect, useState, createRef } from "react";

const tooltipText1 = `Q. 비전공자이지만 개발자로 입문하게된 이유\nA. 처음 프로그래밍을 접했던건 특성화고 재학당시 배웠던 프로그래밍 과목이었습니다.\n그 과목에서 내가 필요로 하는 프로그램을 개발할 수 있다는 것을 알게되었고 그 뒤로 C언어, 파이썬 등을 공부하였고 그러다가 앱 및 웹 개발에 관심을 갖게되었습니다.`;
const tooltipText2 = `Q. 본인만의 문제해결방법\nA. 저는 하나의 작은 문제만을 바라보지 않습니다.\n그 작은 문제는 하나의 큰 문제에서 나온것이기에 큰 문제를 먼저 파악합니다.\n그것이 사람과의 문제든 프로젝트의 문제든 팀원 및 상대방과의 원만한 합의를 통해 문제를 해결하는 편입니다.`;
const tooltipText3 = `Q. 프로젝트 진행시 가장 중요하게 생각하는 부분\nA. 저는 총 3번의 프로젝트를 진행 및 담당하였고 여러 개발자분들을 접하였습니다.\n이런 저만의 경험하면서 느낀 바는 프로젝트시의 약속이 가장 중요하다고 생각했습니다.\n약속을 지킴의 유무는 곧 프로젝트의 품질과 연결되기 때문이라 생각합니다.`;
const tooltipText4 = `Q. 개발자로서 도전하고싶은 목표\nA. 처음 프로그래밍을 접하여 입문하게 되면서 꼭 내게 기획하고 장악한 작품을 만들고싶었습니다.\n저는 아직도 이 목표를 앞에 두고 이 목표를 이루기 위한 공부를 진행하고 있습니다.`;

const tooltipArr = [tooltipText1, tooltipText2, tooltipText3, tooltipText4];

// 기술 스택 정보 (예시: python만 설명)
const techStacks = [
  {
    src: '/image 3.svg',
    name: 'Next.js',
    desc: '#SSR #SSG #프론트엔드'
  },
  {
    src: '/image 4.svg',
    name: 'Notion',
    desc: '#문서화 #프로젝트관리'
  },
  {
    src: '/image 5.svg',
    name: 'AWS',
    desc: '#배포 #S3 #EC2 #RDS'
  },
  {
    src: '/image 8.svg',
    name: 'Redis',
    desc: '#캐싱 #세션관리 #속도'
  },
  {
    src: '/image 10.svg',
    name: 'TypeScript',
    desc: '#정적타입 #프론트엔드 #안정성'
  },
  {
    src: '/image 11.svg',
    name: 'Git',
    desc: '#협업 #형상관리 #오픈소스'
  },
  {
    src: '/image 22.svg',
    name: 'Python',
    desc: '#AI #백엔드 #스크립트'
  },
  {
    src: '/image 23.svg',
    name: 'Java',
    desc: '#백엔드 #안정성 #생산성'
  },
  {
    src: '/image 24.svg',
    name: 'HTML',
    desc: '#마크업 #기초 #웹표준'
  },
  {
    src: '/image 25.svg',
    name: 'CSS',
    desc: '#디자인 #반응형 #애니메이션'
  },
  {
    src: '/image 26.svg',
    name: 'Spring Boot',
    desc: '#MVC #REST API #생산성'
  },
  {
    src: '/pngwing.com 1.svg',
    name: 'Docker',
    desc: '#배포 #DevOps #환경일관성'
  },
];


// tech stack 아이콘별 ref 배열
const stackRefs = techStacks.map(() => createRef<HTMLDivElement>());

export default function Home() {
  const introRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const [introActive, setIntroActive] = useState(false);
  const [mainActive, setMainActive] = useState(false);
  const [tooltip, setTooltip] = useState({ show: false, x: 0, y: 0, idx: 0 });
  // tech stack 툴팁 상태
  const [stackTooltip, setStackTooltip] = useState({ show: false, idx: 0, x: 0, y: 0, direction: 'up' });

  // 각 물음표별로 랜덤하게 Q/A 배정 (컴포넌트 마운트 시)
  const [questionOrder] = useState(() => {
    const arr = [0, 1, 2, 3];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  });

  // 툴팁 위치 조정 함수 (idx: 물음표 인덱스)
  const handleMouseEnter = (e: React.MouseEvent, idx: number) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setTooltip({ show: true, x: rect.left + rect.width / 2, y: rect.top, idx });
  };
  const handleMouseLeave = () => setTooltip({ show: false, x: 0, y: 0, idx: 0 });

  // tech stack 마우스 오버 핸들러
  const handleStackMouseEnter = (idx: number) => {
    const ref = stackRefs[idx].current;
    if (ref) {
      const rect = ref.getBoundingClientRect();
      // 오른쪽 위에 있는 아이콘(23, 27 등)은 아래, 나머지는 위
      const rightTopIdx = [23, 27];
      const direction = rightTopIdx.includes(Number(techStacks[idx].name.replace(/[^0-9]/g, ''))) ? 'down' :
        ([22,24,25,26].includes(Number(techStacks[idx].name.replace(/[^0-9]/g, ''))) ? 'down' : 'up');
      setStackTooltip({
        show: true,
        idx,
        x: rect.left + rect.width / 2,
        y: direction === 'down' ? rect.bottom : rect.top,
        direction,
      });
    }
  };
  const handleStackMouseLeave = () => setStackTooltip({ show: false, idx: 0, x: 0, y: 0, direction: 'up' });

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target === introRef.current) {
          setIntroActive(entry.isIntersecting);
        } else if (entry.target === mainRef.current) {
          setMainActive(entry.isIntersecting);
        }
      });
    });

    if (introRef.current && mainRef.current) {
      observer.observe(introRef.current);
      observer.observe(mainRef.current);
    }

    return () => {
      if (introRef.current && mainRef.current) {
        observer.unobserve(introRef.current);
        observer.unobserve(mainRef.current);
      }
    };
  }, []);

  return (
    <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory">
      {/* 인트로 섹션 */}
      <section
        ref={introRef}
        className={`snap-start h-screen w-full flex flex-col items-center justify-center bg-[#151a27] relative section-inactive ${introActive ? "section-animate" : ""}`}
      >
        <h1
          className="text-7xl md:text-8xl text-white mb-12"
          style={{ fontFamily: 'iceSimin-Rg', letterSpacing: '0.08em', fontWeight: 'normal' }}
        >
          안녕하세요
        </h1>
        <div className="absolute bottom-12 flex flex-col items-center">
          <span className="text-white text-sm mb-2 tracking-widest">scroll to continue</span>
          <span className="text-white animate-bounce text-2xl">↓↓</span>
        </div>
      </section>
      {/* 두 번째 섹션: 백엔드 개발자 김민서 + 물음표 */}
      <section
        ref={mainRef}
        className={`snap-start h-screen w-full flex items-center justify-center bg-[#22304a] relative section-inactive ${mainActive ? "section-animate" : ""}`}
      >
        {/* 네 귀퉁이 물음표 (각각 랜덤 Q/A) */}
        <span
          className="absolute left-69 top-50 text-white text-6xl cursor-pointer select-none"
          onMouseEnter={e => handleMouseEnter(e, questionOrder[0])}
          onMouseLeave={handleMouseLeave}
          style={{ fontFamily: 'iceSimin-Rg' }}
        >
          ?
        </span>
        <span
          className="absolute right-50 top-70 text-white text-6xl cursor-pointer select-none"
          onMouseEnter={e => handleMouseEnter(e, questionOrder[1])}
          onMouseLeave={handleMouseLeave}
          style={{ fontFamily: 'iceSimin-Rg' }}
        >
          ?
        </span>
        <span
          className="absolute left-56 bottom-56 text-white text-6xl cursor-pointer select-none"
          onMouseEnter={e => handleMouseEnter(e, questionOrder[2])}
          onMouseLeave={handleMouseLeave}
          style={{ fontFamily: 'iceSimin-Rg' }}
        >
          ?
        </span>
        <span
          className="absolute right-76 bottom-56 text-white text-6xl cursor-pointer select-none"
          onMouseEnter={e => handleMouseEnter(e, questionOrder[3])}
          onMouseLeave={handleMouseLeave}
          style={{ fontFamily: 'iceSimin-Rg' }}
        >
          ?
        </span>
        {/* 중앙 텍스트 */}
        <div className="text-white text-4xl md:text-5xl" style={{ fontFamily: 'iceSimin-Rg' }}>
          백엔드 개발자 김민서
        </div>
        {/* 툴팁 */}
        {tooltip.show && (
          <div
            className="fixed z-50 bg-white text-black text-sm rounded-xl shadow-lg p-4 border border-gray-300 max-w-xs whitespace-pre-line"
            style={{ left: tooltip.x, top: tooltip.y - 10, transform: 'translate(-50%, -100%)' }}
          >
            {tooltipArr[tooltip.idx]}
          </div>
        )}
      </section>
      {/* 세 번째 섹션: Tech Stack */}
      <section className="snap-start h-screen w-full flex flex-col items-center justify-center bg-[#f5f6fa] relative">
        <div className="absolute inset-0 flex items-center justify-center">
          {/* 원형 배치 */}
          <div className="relative w-[700px] h-[500px] mx-auto">
            {techStacks.map((stack, i) => {
              // 원형 좌표 계산
              const angle = (2 * Math.PI * i) / techStacks.length;
              const radius = 200;
              const cx = 350 + radius * Math.cos(angle);
              const cy = 250 + radius * Math.sin(angle);
              return (
                <div
                  key={stack.name}
                  ref={stackRefs[i]}
                  className="absolute p-4 rounded-full hover:bg-black/10 transition-all duration-150"
                  style={{ left: cx, top: cy, transform: 'translate(-50%, -50%)' }}
                  onMouseEnter={() => handleStackMouseEnter(i)}
                  onMouseLeave={handleStackMouseLeave}
                >
                  <img
                    src={stack.src}
                    alt={stack.name}
                    className="w-20 h-20 cursor-pointer drop-shadow-xl pointer-events-none select-none"
                  />
                </div>
              );
            })}
            {/* 중앙 텍스트 */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl font-bold" style={{ fontFamily: 'Pacifico, cursive' , color: '#22304a' }}>
              Tech Stack
            </div>
          </div>
        </div>
        {/* 툴팁: fixed로, 항상 맨 위에 */}
        {stackTooltip.show && techStacks[stackTooltip.idx].desc && (
          <div
            className="fixed z-[9999] pointer-events-auto bg-[#f4faff] text-[#22304a] text-lg rounded-2xl shadow-2xl p-8 border border-blue-200 max-w-md font-semibold"
            style={{
              left: stackTooltip.x,
              top: stackTooltip.direction === 'down' ? stackTooltip.y + 10 : stackTooltip.y - 16,
              transform:
                stackTooltip.direction === 'down'
                  ? 'translate(-50%, 0)'
                  : (stackTooltip.y - 16 < 120 ? 'translate(-50%, 0)' : 'translate(-50%, -100%)'),
              whiteSpace: 'pre-line',
            }}
          >
            <div style={{ fontFamily: 'Pacifico, cursive', fontSize: '2rem', marginBottom: '0.5rem' }}>
              {techStacks[stackTooltip.idx].desc.split('\n')[0]}
            </div>
            <div className="text-base font-normal whitespace-pre-line">
              {techStacks[stackTooltip.idx].desc.split('\n').slice(1).join('\n')}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

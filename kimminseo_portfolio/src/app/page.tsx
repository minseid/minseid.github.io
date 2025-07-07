"use client"
import { useRef, useEffect, useState, createRef } from "react";

const tooltipText1 = `Q. 비전공자이지만 개발자로 입문하게된 이유
A. 처음 프로그래밍을 접했던건 특성화고 재학당시 배웠던 프로그래밍 과목이었습니다.
그 과목에서 내가 필요로 하는 프로그램을 개발할 수 있다는 것을 알게되었고 그 뒤로 C언어, 파이썬 등을 공부하였고 그러다가 앱 및 웹 개발에 관심을 갖게되었습니다.`;
const tooltipText2 = `Q. 본인만의 문제해결방법
A. 저는 하나의 작은 문제만을 바라보지 않습니다.
그 작은 문제는 하나의 큰 문제에서 나온것이기에 큰 문제를 먼저 파악합니다.
그것이 사람과의 문제든 프로젝트의 문제든 팀원 및 상대방과의 원만한 합의를 통해 문제를 해결하는 편입니다.`;
const tooltipText3 = `Q. 프로젝트 진행시 가장 중요하게 생각하는 부분
A. 저는 총 3번의 프로젝트를 진행 및 담당하였고 여러 개발자분들을 접하였습니다.
이런 저만의 경험하면서 느낀 바는 프로젝트시의 약속이 가장 중요하다고 생각했습니다.
약속을 지킴의 유무는 곧 프로젝트의 품질과 연결되기 때문이라 생각합니다.`;
const tooltipText4 = `Q. 개발자로서 도전하고싶은 목표
A. 처음 프로그래밍을 접하여 입문하게 되면서 꼭 내게 기획하고 장악한 작품을 만들고싶었습니다.
저는 아직도 이 목표를 앞에 두고 이 목표를 이루기 위한 공부를 진행하고 있습니다.`;

const tooltipArr = [tooltipText1, tooltipText2, tooltipText3, tooltipText4];

// 기술 스택 정보
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

const stackRefs = techStacks.map(() => createRef());

// Project Data
const projects = [
  { id: 1, imageSrc: '/Mask group11.svg', title: '프로젝트 1', description: '이 프로젝트는 사용자 관리 시스템으로, React와 Spring Boot를 사용하여 개발되었습니다. 사용자 등록, 로그인, 정보 수정 등의 기능을 포함합니다.', githubLink: 'https://github.com/your-repo/project1', demoLink: 'https://demo.project1.com' },
  { id: 2, imageSrc: '/Mask group-1.svg', title: '프로젝트 2', description: '온라인 쇼핑몰 백엔드 시스템입니다. Java와 Spring Framework를 기반으로 주문 처리, 재고 관리, 결제 연동 등을 구현했습니다.', githubLink: 'https://github.com/your-repo/project2', demoLink: 'https://demo.project2.com' },
  { id: 3, imageSrc: '/Mask group1.svg', title: '프로젝트 3', description: 'AI 기반 이미지 분류 서비스. Python과 TensorFlow를 사용하여 이미지 데이터를 학습하고 분류하는 RESTful API를 제공합니다.', githubLink: 'https://github.com/your-repo/project3', demoLink: 'https://demo.project3.com' },
];

export default function Home() {
  const introRef = useRef(null);
  const mainRef = useRef(null);
  const [introActive, setIntroActive] = useState(false);
  const [mainActive, setMainActive] = useState(false);
  const [tooltip, setTooltip] = useState({ show: false, x: 0, y: 0, idx: 0 });
  const [stackTooltip, setStackTooltip] = useState({ show: false, idx: 0, x: 0, y: 0, direction: 'up' });

  // 프로젝트 관련 상태들
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isProjectExpanded, setIsProjectExpanded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [dragDistance, setDragDistance] = useState(0);
  const projectScrollRef = useRef<HTMLDivElement | null>(null);
  const dragThreshold = 5;
  const closeThreshold = 150; // 오른쪽으로 이만큼 넘기면 자동 접힘

  // 각 물음표별로 랜덤하게 Q/A 배정
  const [questionOrder] = useState(() => {
    const arr = [0, 1, 2, 3];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  });

  // 툴팁 관련 함수들
  const handleMouseEnter = (e) => {
    const rect = (e.target).getBoundingClientRect();
    setTooltip({ show: true, x: rect.left + rect.width / 2, y: rect.top, idx: parseInt(e.currentTarget.dataset.idx) });
  };
  const handleMouseLeave = () => setTooltip({ show: false, x: 0, y: 0, idx: 0 });

  const handleStackMouseEnter = (idx) => {
    const ref = stackRefs[idx].current;
    if (ref) {
      const rect = ref.getBoundingClientRect();
      let direction = 'up';
      if (rect.top < 120) {
        direction = 'down';
      }
      setStackTooltip({
        show: true,
        idx,
        x: rect.left + rect.width / 2,
        y: direction === 'down' ? rect.bottom + 10 : rect.top - 10,
        direction,
      });
    }
  };
  const handleStackMouseLeave = () => setStackTooltip({ show: false, idx: 0, x: 0, y: 0, direction: 'up' });

  // 프로젝트 카드 클릭 핸들러 (상세 모달 열기)
  const handleProjectCardClick = (project: any) => {
    if (!isDragging && dragDistance < dragThreshold) {
      setSelectedProject(project);
    }
  };

  // 드래그 관련 함수들
  const handleProjectMouseDown = (e: any) => {
    if (!isProjectExpanded) return;
    setIsDragging(true);
    if (projectScrollRef.current) {
      setStartX(e.pageX - projectScrollRef.current.offsetLeft);
      setScrollLeft(projectScrollRef.current.scrollLeft);
    }
    setDragDistance(0);
  };

  const handleProjectMouseMove = (e: any) => {
    if (!isDragging || !isProjectExpanded || !projectScrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - projectScrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    const distance = Math.abs(x - startX);
    setDragDistance(distance);
    projectScrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleProjectMouseUp = () => {
    setIsDragging(false);
  };

  const handleProjectMouseLeave = () => {
    setIsDragging(false);
  };

  // 배경 클릭 시 카드 접기
  const handleProjectBackgroundClick = (e: any) => {
    if (e.target === e.currentTarget && isProjectExpanded) {
      setIsProjectExpanded(false);
    }
  };

  // 모달 닫기
  const handleCloseModal = () => {
    setSelectedProject(null);
  };

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
        {/* 네 귀퉁이 물음표 */}
        <span
          className="absolute left-69 top-50 text-white text-6xl cursor-pointer select-none"
          onMouseEnter={e => handleMouseEnter(e, questionOrder[0])}
          onMouseLeave={handleMouseLeave}
          data-idx={questionOrder[0]}
          style={{ fontFamily: 'iceSimin-Rg' }}
        >
          ?
        </span>
        <span
          className="absolute right-50 top-70 text-white text-6xl cursor-pointer select-none"
          onMouseEnter={e => handleMouseEnter(e, questionOrder[1])}
          onMouseLeave={handleMouseLeave}
          data-idx={questionOrder[1]}
          style={{ fontFamily: 'iceSimin-Rg' }}
        >
          ?
        </span>
        <span
          className="absolute left-56 bottom-56 text-white text-6xl cursor-pointer select-none"
          onMouseEnter={e => handleMouseEnter(e, questionOrder[2])}
          onMouseLeave={handleMouseLeave}
          data-idx={questionOrder[2]}
          style={{ fontFamily: 'iceSimin-Rg' }}
        >
          ?
        </span>
        <span
          className="absolute right-76 bottom-56 text-white text-6xl cursor-pointer select-none"
          onMouseEnter={e => handleMouseEnter(e, questionOrder[3])}
          onMouseLeave={handleMouseLeave}
          data-idx={questionOrder[3]}
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
          <div className="relative w-[700px] h-[500px] mx-auto">
            {techStacks.map((stack, i) => {
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
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl font-bold" style={{ fontFamily: 'Pacifico, cursive' , color: '#000000' }}>
              Tech Stack
            </div>
          </div>
        </div>
        {/* 툴팁 */}
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
              {techStacks[stackTooltip.idx].name}
            </div>
            <div className="text-base font-normal whitespace-pre-line">
              {techStacks[stackTooltip.idx].desc}
            </div>
          </div>
        )}
      </section>

      {/* 프로젝트 섹션 */}
      <section>
        <div 
          className="snap-start h-screen w-full flex flex-col items-center justify-center bg-[#FFF7ED] relative overflow-hidden"
          onClick={handleProjectBackgroundClick}
        >
          <div className="w-full h-full relative">
            {/* Project 글씨 (배경) */}
            <div 
              className={`absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 text-5xl font-bold pointer-events-none transition-opacity duration-500 ${isProjectExpanded ? 'opacity-20' : 'opacity-100'}`}
              style={{ fontFamily: 'Pacifico, cursive', color: '#000000', whiteSpace: 'nowrap' }}
            >
              Project
            </div>
            
            {/* 카드 컨테이너 - 오른쪽에서 슬라이드 */}
            <div className="absolute right-0 top-0 w-full h-full flex items-center">
              <div
                ref={projectScrollRef}
                className={`flex space-x-8 py-8 scrollbar-hide transition-transform duration-700 ease-out ${isProjectExpanded ? 'transform translate-x-0' : 'transform translate-x-[calc(100%-400px)]'}`}
                style={{ scrollSnapType: 'x mandatory', cursor: isProjectExpanded ? 'grab' : 'pointer' }}
                onWheel={e => {
                  if (!isProjectExpanded) return;
                  const target = e.currentTarget as HTMLDivElement;
                  if (e.deltaY !== 0) {
                    e.preventDefault();
                    target.scrollLeft += e.deltaY;
                  }
                }}
                onMouseDown={handleProjectMouseDown}
                onMouseMove={handleProjectMouseMove}
                onMouseUp={handleProjectMouseUp}
                onMouseLeave={handleProjectMouseLeave}
                onClick={(e: any) => {
                  if (!isProjectExpanded) {
                    e.stopPropagation();
                    setIsProjectExpanded(true);
                  }
                }}
              >
                {projects.map((project: any) => (
                  <div
                    key={project.id}
                    className="flex-shrink-0 w-[500px] h-[300px] bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transform transition-transform duration-300 hover:scale-105"
                    onClick={(e: any) => {
                      if (isProjectExpanded) {
                        e.stopPropagation();
                        handleProjectCardClick(project);
                      }
                    }}
                    draggable="false"
                    style={{ scrollSnapAlign: 'center' }}
                  >
                    <img 
                      src={project.imageSrc} 
                      alt={project.title} 
                      className="w-full h-full object-cover" 
                      draggable="false" 
                    />
                  </div>
                ))}
              </div>
            </div>
            
            {/* 힌트 텍스트 */}
            {!isProjectExpanded && (
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-600 text-sm">
                카드를 클릭하여 프로젝트를 확인해보세요
              </div>
            )}
            
            {isProjectExpanded && (
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-600 text-sm">
                배경을 클릭하거나 오른쪽으로 드래그하면 닫힙니다
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 프로젝트 상세 모달 */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={handleCloseModal}>
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full flex flex-col md:flex-row gap-6 relative" onClick={(e) => e.stopPropagation()}>
            {/* 이미지 */}
            <div className="w-full md:w-1/2 flex items-center justify-center">
              <img src={selectedProject.imageSrc} alt={selectedProject.title} className="max-h-[70vh] object-contain rounded-lg shadow-md" />
            </div>

            {/* 상세 정보 */}
            <div className="w-full md:w-1/2 flex flex-col justify-center">
              <h2 className="text-4xl font-bold mb-4 text-gray-900">{selectedProject.title}</h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">{selectedProject.description}</p>
              <div className="flex gap-4">
                {selectedProject.githubLink && (
                  <a href={selectedProject.githubLink} target="_blank" rel="noopener noreferrer" className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-300 text-lg font-semibold">
                    GitHub
                  </a>
                )}
                {selectedProject.demoLink && (
                  <a href={selectedProject.demoLink} target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-500 transition-colors duration-300 text-lg font-semibold">
                    Demo
                  </a>
                )}
              </div>
            </div>

            {/* 닫기 버튼 */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-3xl font-bold"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
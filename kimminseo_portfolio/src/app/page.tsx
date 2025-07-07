"use client"
import { useRef, useEffect, useState } from "react";

// 기술 스택 정보
const techStacks = [
  {
    src: '/image 3.svg',
  },
  {
    src: '/image 4.svg',
  },
  {
    src: '/image 5.svg',
  },
  {
    src: '/image 8.svg',
  },
  {
    src: '/image 10.svg',
  },
  {
    src: '/image 11.svg',
  },
  {
    src: '/image 22.svg',
  },
  {
    src: '/image 23.svg',
  },
  {
    src: '/image 24.svg',
  },
  {
    src: '/image 25.svg',
  },
  {
    src: '/image 26.svg',
  },
  {
    src: '/pngwing.com 1.svg',
  },
];

// Project Data
const projects = [
  {
    id: 1,
    imageSrc: '/Mask group11.svg',
    title: 'NearBy',
    content: '전시회 및 공연의 통합 예약관리 앱',
    period: '2023.03 ~ 2023.06',
    role: '백엔드 보조로 참여해 전시API구현',
    techStack: ['Spring Boot', 'MySQL', 'AWS', 'JPA'],
    githubLink: 'https://github.com/your-repo/project1',
    Link: 'https://demo.project1.com'
  },
  {
    id: 2,
    imageSrc: '/Mask group-1.svg',
    title: '모아올리오',
    content: '포트폴리오 통합관리 및 공유서비스.',
    period: '2024.05 ~ 2024.09',
    role: '팀장 - PM 및 백엔드 개발',
    techStack: [ 'Spring', 'MySQL', 'Oracle', 'JPA'],
    githubLink: 'https://github.com/Moaolio/moaolio-be',
  },
  {
    id: 3,
    imageSrc: '/Mask group1.svg',
    title: '어디',
    content: '장소공유서비스',
    period: '2024.10 ~ ING',
    role: 'PM 및 백엔드 개발',
    techStack: ['Spring Boot', 'MySQL', 'AWS', 'JPA'],
    githubLink: 'https://github.com/minseid/OC_project',
    demoLink: 'https://demo.project3.com'
  },
];

export default function Home() {
  const introRef = useRef(null);
  const mainRef = useRef(null);
  const [introActive, setIntroActive] = useState(false);
  const [mainActive, setMainActive] = useState(false);

  // 프로젝트 관련 상태들
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [isProjectExpanded, setIsProjectExpanded] = useState(false);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

  const [isEducationExpanded, setIsEducationExpanded] = useState(false);
  const [isContactExpanded, setIsContactExpanded] = useState(false);
  const [isTechStackExpanded, setIsTechStackExpanded] = useState(false);
  const [visibleIconCount, setVisibleIconCount] = useState(0);
  const [isIntroQAExpanded, setIsIntroQAExpanded] = useState(false);
  const introQAs = [
    {
      type: 'profile',
      intro: '안녕하세요! 끊임없이 학습하는 개발자 김민서입니다.'
    },
    {
      q: '비전공자이지만 개발자로 입문하게된 이유',
      a: '처음 프로그래밍을 접했던건 특성화고 재학당시 배웠던 프로그래밍 과목이었습니다.\n그 과목에서 내가 필요로 하는 프로그램을 개발할 수 있다는 것을 알게되었고 그 뒤로 C언어, 파이썬 등을 공부하였고 그러다가 앱 및 웹 개발에 관심을 갖게되었습니다.'
    },
    {
      q: '본인만의 문제해결방법',
      a: '저는 하나의 작은 문제만을 바라보지 않습니다.\n그 작은 문제는 하나의 큰 문제에서 나온것이기에 큰 문제를 먼저 파악합니다.\n그것이 사람과의 문제든 프로젝트의 문제든 팀원 및 상대방과의 원만한 합의를 통해 문제를 해결하는 편입니다.'
    },
    {
      q: '프로젝트 진행시 가장 중요하게 생각하는 부분',
      a: '저는 총 3번의 프로젝트를 진행 및 담당하였고 여러 개발자분들을 접하였습니다.\n이런 저만의 경험하면서 느낀 바는 프로젝트시의 약속이 가장 중요하다고 생각했습니다.\n약속을 지킴의 유무는 곧 프로젝트의 품질과 연결되기 때문이라 생각합니다.'
    },
    {
      q: '개발자로서 도전하고싶은 목표',
      a: '처음 프로그래밍을 접하여 입문하게 되면서 꼭 내게 기획하고 장악한 작품을 만들고싶었습니다.\n저는 아직도 이 목표를 앞에 두고 이 목표를 이루기 위한 공부를 진행하고 있습니다.'
    },
  ];
  const [currentQAIndex, setCurrentQAIndex] = useState(0);

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

  // 프로젝트 카드 클릭 핸들러 (상세 모달 열기)
  const handleProjectCardClick = (project: typeof projects[0]) => {
    setSelectedProject(project);
  };

  // 화살표 버튼 핸들러
  const handlePrevProject = () => {
    setCurrentProjectIndex(prev => prev > 0 ? prev - 1 : projects.length - 1);
  };

  const handleNextProject = () => {
    setCurrentProjectIndex(prev => prev < projects.length - 1 ? prev + 1 : 0);
  };

  // 모달 닫기
  const handleCloseModal = () => {
    setSelectedProject(null);
  };

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

      {/* 두 번째 섹션: 백엔드 개발자 김민서 + Q&A */}
      <section
        ref={mainRef}
        className={`snap-start h-screen w-full flex items-center justify-center bg-[#22304a] relative section-inactive ${mainActive ? "section-animate" : ""}`}
      >
        {/* 중앙 텍스트 (클릭 시 Q&A 등장) */}
        <div
          className={`absolute left-1/2 transition-all duration-700 z-10 font-bold pointer-events-auto select-none cursor-pointer ${isIntroQAExpanded ? 'top-24 text-5xl -translate-x-1/2' : 'top-1/2 text-7xl -translate-x-1/2 -translate-y-1/2'}`}
          style={{ fontFamily: 'iceSimin-Rg', color: '#fff', whiteSpace: 'nowrap' }}
          onClick={() => setIsIntroQAExpanded(prev => !prev)}
          onMouseEnter={e => (e.currentTarget.style.color = '#888')}
          onMouseLeave={e => (e.currentTarget.style.color = '#fff')}


        >
          백엔드 개발자 김민서
        </div>
        {/* Q&A 카드 (글씨 아래에 Project 카드처럼 등장, 한 카드에 Q/A 하나씩, 좌우 넘김) */}
        <div
          className={`absolute left-1/2 w-full flex flex-col items-center transition-all duration-700 z-0 ${isIntroQAExpanded ? 'top-1/3 opacity-100 pointer-events-auto' : 'top-[80%] opacity-0 pointer-events-none'}`}
          style={{ transform: 'translate(-50%, 0)' }}
        >
          <div className="relative flex items-center justify-center w-full" style={{ maxWidth: 700, margin: '0 auto' }}>
            {/* 왼쪽 화살표 */}
            <button
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white rounded-full shadow p-2 text-3xl text-black hover:bg-gray-100 transition disabled:opacity-30"
              onClick={e => { e.stopPropagation(); setCurrentQAIndex(idx => idx > 0 ? idx - 1 : introQAs.length - 1); }}
              aria-label="이전"
              disabled={introQAs.length <= 1}
            >
              ◀
            </button>
            {/* Q/A 카드 */}
            {introQAs[currentQAIndex].type === 'profile' ? (
              <div className="w-full bg-white/90 rounded-2xl shadow-lg p-8 max-w-2xl text-black flex flex-col items-center justify-center gap-4" style={{ fontFamily: 'MaplestoryOTFBold', minHeight: 220 }}>
                <img src={'/KakaoTalk_20250624_192928124.jpg'} alt="프로필" className="w-32 h-32 rounded-full object-cover mb-4 shadow" />
                <div className="text-2xl font-bold text-center">김민서</div>
                <div className="text-lg text-center">{introQAs[currentQAIndex].intro}</div>
              </div>
            ) : (
              <div className="w-full bg-white/90 rounded-2xl shadow-lg p-8 max-w-2xl text-black text-lg space-y-6 flex flex-col items-center justify-center" style={{ fontFamily: 'MaplestoryOTFBold', minHeight: 220 }}>
                <div className="text-xl font-bold mb-2 text-center">Q. {introQAs[currentQAIndex].q}</div>
                <div className="whitespace-pre-line text-center">A. {introQAs[currentQAIndex].a}</div>
              </div>
            )}
            {/* 오른쪽 화살표 */}
            <button
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white rounded-full shadow p-2 text-3xl text-black hover:bg-gray-100 transition disabled:opacity-30"
              onClick={e => { e.stopPropagation(); setCurrentQAIndex(idx => idx < introQAs.length - 1 ? idx + 1 : 0); }}
              aria-label="다음"
              disabled={introQAs.length <= 1}
            >
              ▶
            </button>
          </div>
          {/* 인디케이터 */}
          <div className="flex justify-center space-x-2 mt-4">
            {introQAs.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${index === currentQAIndex ? 'bg-gray-800' : 'bg-gray-300'}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 세 번째 섹션: Tech Stack */}
      <section className="snap-start h-screen w-full flex flex-col items-center justify-center bg-[#f5f6fa] relative">
        <div className="absolute inset-0 flex items-center justify-center">
          {/* 중앙 고정 Tech Stack 글씨 */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-7xl font-bold z-10 select-none cursor-pointer"
            style={{ fontFamily: 'Pacifico, cursive', color: '#000000', whiteSpace: 'nowrap' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#888')}
          onMouseLeave={e => (e.currentTarget.style.color = '#000')}
            onClick={() => {
              if (!isTechStackExpanded) {
                setIsTechStackExpanded(true);
                let count = 0;
                const interval = setInterval(() => {
                  count++;
                  setVisibleIconCount(count);
                  if (count >= techStacks.length) clearInterval(interval);
                }, 120);
              } else {
                let count = techStacks.length;
                const interval = setInterval(() => {
                  count--;
                  setVisibleIconCount(count);
                  if (count <= 0) {
                    clearInterval(interval);
                    setIsTechStackExpanded(false);
                  }
                }, 120);
              }
              
            }}
          >
            Tech Stack
          </div>
          {/* 원형 tech stack 아이콘들 (글씨 주위로 공전하며 하나씩 등장/퇴장) */}
          <div className="absolute left-1/2 top-1/2 w-[700px] h-[500px] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            {techStacks.map((stack, i) => {
              const angle = (2 * Math.PI * i) / techStacks.length;
              const radius = 270;
              const cx = 350 + radius * Math.cos(angle);
              const cy = 250 + radius * Math.sin(angle);
              const isVisible = i < visibleIconCount;
              return (
                <div
                  key={stack.src}
                  className={`absolute transition-all duration-700 ease-in-out p-4 rounded-full hover:bg-black/10 pointer-events-auto ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
                  style={{
                    left: cx,
                    top: cy,
                    transform: `translate(-50%, -50%)`,
                  }}
                >
                  <img
                    src={stack.src}
                    alt={stack.src}
                    className="w-20 h-20 cursor-pointer drop-shadow-xl pointer-events-none select-none"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 프로젝트 섹션 */}
      <section>
        <div
          className="snap-start h-screen w-full flex flex-col items-center justify-center bg-[#FFF7ED] relative overflow-hidden"
        >
          <div className="w-full h-full relative flex flex-col items-center justify-center">
            {/* Project 글씨 (중앙/상단 이동 애니메이션) */}
            <div
              className={`absolute left-1/2 transition-all duration-700 z-10 font-bold pointer-events-auto select-none cursor-pointer ${isProjectExpanded ? 'top-24 text-5xl -translate-x-1/2' : 'top-1/2 text-7xl -translate-x-1/2 -translate-y-1/2'}`}
              style={{ fontFamily: 'Pacifico, cursive', color: '#000000', whiteSpace: 'nowrap' }}
              onClick={() => setIsProjectExpanded(prev => !prev)}
              onMouseEnter={e => (e.currentTarget.style.color = '#888')}
          onMouseLeave={e => (e.currentTarget.style.color = '#000')}
            >
              Project
            </div>
            {/* 프로젝트 카드 리스트 (아래에서 슬라이드 등장) */}
            <div
              className={`absolute left-1/2 w-full flex flex-col items-center transition-all duration-700 z-0 ${isProjectExpanded ? 'top-1/3 opacity-100 pointer-events-auto' : 'top-[80%] opacity-0 pointer-events-none'}`}
              style={{ transform: 'translate(-50%, 0)' }}
            >
              <div className="relative flex items-center justify-center w-full" style={{ maxWidth: 1200, maxHeight: 350, margin: '0 auto' }}>
                {/* 왼쪽 화살표 */}
                <button
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white rounded-full shadow p-2 text-3xl text-black hover:bg-gray-100 transition disabled:opacity-30"
                  onClick={e => { e.stopPropagation(); handlePrevProject(); }}
                  aria-label="이전"
                >
                  ◀
                </button>
                {/* 프로젝트 카드 */}
                <div className="w-[500px] h-[300px] bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transform transition-transform duration-300 hover:scale-105 flex items-center justify-center">
                  <img
                    src={projects[currentProjectIndex].imageSrc}
                    alt={projects[currentProjectIndex].title}
                    className="w-full h-full object-cover"
                    onClick={e => {
                      e.stopPropagation();
                      handleProjectCardClick(projects[currentProjectIndex]);
                    }}
                    draggable="false"
                  />
                </div>
                {/* 오른쪽 화살표 */}
                <button
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white rounded-full shadow p-2 text-3xl text-black hover:bg-gray-100 transition disabled:opacity-30"
                  onClick={e => { e.stopPropagation(); handleNextProject(); }}
                  aria-label="다음"
                >
                  ▶
                </button>
              </div>
              {/* 프로젝트 정보 표시 및 인디케이터 */}
              <div className="mt-4 text-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{projects[currentProjectIndex].title}</h3>
                <div className="flex justify-center space-x-2 mt-2">
                  {projects.map((_, index) => (
                    <div
                      key={index}
                      className={`w-3 h-3 rounded-full transition-colors duration-200 ${index === currentProjectIndex ? 'bg-gray-800' : 'bg-gray-300'}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education 섹션 */}
      <section>
        <div
          className="snap-start h-screen w-full flex flex-col items-center justify-center bg-[#eaf0f6] relative overflow-hidden"
        >
          <div className="w-full h-full relative flex flex-col items-center justify-center">
            {/* Education 글씨 (중앙/상단 이동 애니메이션) */}
            <div
              className={`absolute left-1/2 transition-all duration-700 z-10 font-bold pointer-events-auto select-none cursor-pointer ${isEducationExpanded ? 'top-24 text-5xl -translate-x-1/2' : 'top-1/2 text-7xl -translate-x-1/2 -translate-y-1/2'}`}
              style={{ fontFamily: 'Pacifico, cursive', color: '#000000', whiteSpace: 'nowrap' }}
              onClick={() => setIsEducationExpanded(prev => !prev)}
              onMouseEnter={e => (e.currentTarget.style.color = '#888')}
              onMouseLeave={e => (e.currentTarget.style.color = '#000')}
            >
              Education
            </div>
            {/* 학력 카드 (아래에서 슬라이드 등장) */}
            <div
              className={`absolute left-1/2 w-full flex flex-col items-center transition-all duration-700 z-0 ${isEducationExpanded ? 'top-1/3 opacity-100 pointer-events-auto' : 'top-[80%] opacity-0 pointer-events-none'}`}
              style={{ transform: 'translate(-50%, 0)' }}
            >
              <div className="relative flex items-center justify-center w-full" style={{ maxWidth: 600, maxHeight: 350, margin: '0 auto' }}>
                <div className="w-full bg-white rounded-2xl shadow-lg overflow-hidden flex flex-row items-center p-8 border-2 border-blue-200" style={{ minHeight: 180 }}>
                  {/* 학교 로고 */}
                  <img src="/image 16.svg" alt="한양대학교" className="w-20 h-20 mr-6 object-contain" />
                  {/* 학력 정보 */}
                  <div className="flex-1">
                    <div className="text-black text-xl font-bold mb-2" style={{ fontFamily: 'MaplestoryOTFBold' }}>
                      한양대학교 에리카캠퍼스<br/>스마트융합공학부 로봇융합 졸업
                    </div>
                    <ul className="text-black text-base mt-2 list-disc pl-5" style={{ fontFamily: 'Cafe24Ohsquare' }}>
                      <li>로봇설계, 역학 학습</li>
                      <li>이산수학, 알고리즘 등 컴퓨터 공학관련 학습</li>
                      <li>Python, AI 학습</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact 섹션 */}
      <section>
        <div
          className="snap-start h-screen w-full flex flex-col items-center justify-center bg-[#16a085] relative overflow-hidden"
        >
          <div className="w-full h-full relative flex flex-col items-center justify-center">
            {/* Contact 글씨 (중앙/상단 이동 애니메이션) */}
            <div
              className={`absolute left-1/2 transition-all duration-700 z-10 font-bold pointer-events-auto select-none cursor-pointer ${isContactExpanded ? 'top-24 text-5xl -translate-x-1/2' : 'top-1/2 text-7xl -translate-x-1/2 -translate-y-1/2'}`}
              style={{ fontFamily: 'Pacifico, cursive', color: '#fff', whiteSpace: 'nowrap' }}
              onClick={() => setIsContactExpanded(prev => !prev)}
              onMouseEnter={e => (e.currentTarget.style.color = '#888')}
              onMouseLeave={e => (e.currentTarget.style.color = '#fff')}
            >
              Contact
            </div>
            {/* 아이콘 리스트 (아래에서 슬라이드 등장) */}
            <div
              className={`absolute left-1/2 w-full flex flex-col items-center transition-all duration-700 z-0 ${isContactExpanded ? 'top-1/3 opacity-100 pointer-events-auto' : 'top-[80%] opacity-0 pointer-events-none'}`}
              style={{ transform: 'translate(-50%, 0)' }}
            >
              <div className="flex flex-row items-center justify-center gap-8 mt-8">
                {/* Velog (툴팁) */}
                <div className="relative flex items-center group">
                  <a href="https://velog.io/@minseid" target="_blank" rel="noopener noreferrer">
                    <img src="/image 19.svg" alt="velog" className="w-16 h-16 hover:scale-110 transition-transform" />
                  </a>
                  <span
                    className="absolute left-1/2 -translate-x-1/2 -top-8 bg-black text-white text-sm rounded px-3 py-1 opacity-0 pointer-events-none transition-opacity duration-200 group-hover:opacity-100"
                    style={{ whiteSpace: 'nowrap' }}
                  >
                    @minseid
                  </span>
                </div>
                {/* Naver Mail (툴팁) */}
                <div className="relative flex items-center group">
                  <a target="_blank" rel="noopener noreferrer">
                    <img src="/pngwing.com (1) 1.svg" alt="naver mail" className="w-16 h-16 hover:scale-110 transition-transform" />
                  </a>
                  <span
                    className="absolute left-1/2 -translate-x-1/2 -top-8 bg-black text-white text-sm rounded px-3 py-1 opacity-0 pointer-events-none transition-opacity duration-200 group-hover:opacity-100"
                    style={{ whiteSpace: 'nowrap' }}
                  >
                    minstandup@naver.com
                  </span>
                </div>
                {/* Github (툴팁) */}
                <div className="relative flex items-center group">
                  <a href="https://github.com/minseid" target="_blank" rel="noopener noreferrer">
                    <img src="/image 18.svg" alt="github" className="w-16 h-16 hover:scale-110 transition-transform" />
                  </a>
                  <span
                    className="absolute left-1/2 -translate-x-1/2 -top-8 bg-black text-white text-sm rounded px-3 py-1 opacity-0 pointer-events-none transition-opacity duration-200 group-hover:opacity-100"
                    style={{ whiteSpace: 'nowrap' }}
                  >
                    @minseid
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 프로젝트 상세 모달 */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={handleCloseModal}>
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full flex flex-col md:flex-row gap-6 relative" onClick={(e) => e.stopPropagation()} style={{ fontFamily: 'MaplestoryOTFBold' }}>
            {/* 이미지 */}
            <div className="w-full md:w-1/2 flex items-center justify-center">
              <img src={selectedProject.imageSrc} alt={selectedProject.title} className="max-h-[70vh] object-contain rounded-lg shadow-md" />
            </div>

            {/* 상세 정보 */}
            <div className="w-full md:w-1/2 flex flex-col justify-center">
              <h2 className="text-4xl font-bold mb-4 text-black">{selectedProject.title}</h2>
              <p className="mb-2 text-black"  style={{fontSize: '30px',}}>{selectedProject.content}</p>
              <div className="mb-1 text-black"  style={{fontSize: '20px', fontFamily: 'Cafe24Ohsquare'}}><b>기간:</b> {selectedProject.period}</div>
              <div className="mb-1 text-black" style={{fontSize: '20px', fontFamily: 'Cafe24Ohsquare'}}><b>역할:</b> {selectedProject.role}</div>
              <div className="mb-1 text-black" style={{fontSize: '20px', fontFamily: 'Cafe24Ohsquare'}}><b>기술스택:</b> {selectedProject.techStack.join(', ')}</div>
              <div className="flex gap-4 mt-4">
                {selectedProject.githubLink && (
                  <a href={selectedProject.githubLink} target="_blank" rel="noopener noreferrer" className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-300 text-lg font-semibold">
                    GitHub
                  </a>
                )}
                {selectedProject.demoLink && (
                  <a href={selectedProject.demoLink} target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-500 transition-colors duration-300 text-lg font-semibold">
                    Link
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
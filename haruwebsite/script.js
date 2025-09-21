const SUPABASE_URL = "https://rpiqhiwmvnqaewaqizkk.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJwaXFoaXdtdm5xYWV3YXFpemtrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM2MDE4NTMsImV4cCI6MjA2OTE3Nzg1M30.6qBRIUCUp1j6ujc7VeneF1R-B94AvsTnSz5AZtecTUs";

// 스크롤 시 헤더 스타일 변경
window.addEventListener("scroll", function () {
  const header = document.querySelector(".header");
  if (window.scrollY > 100) {
    header.style.background = "rgba(255, 255, 255, 0.98)";
    header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
  } else {
    header.style.background = "rgba(255, 255, 255, 0.95)";
    header.style.boxShadow = "none";
  }
});

// 스무스 스크롤
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const href = this.getAttribute("href");
    if (href && href !== "#") {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  });
});

// CTA 버튼 클릭 이벤트
const ctaButtons = document.querySelectorAll(
  ".cta-button-primary, .cta-button-small"
);
if (ctaButtons.length > 0) {
  ctaButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // 실제 구현에서는 여기에 회원가입/로그인 페이지로 이동하는 코드를 넣으세요
      alert(
        "🎉 무료 체험을 시작합니다!\n\n실제 구현에서는 회원가입 페이지로 이동합니다."
      );
    });
  });
}

// 데모 영상 버튼 클릭 이벤트
const demoButton = document.querySelector(".cta-button-secondary");
if (demoButton) {
  demoButton.addEventListener("click", function () {
    alert(
      "📹 데모 영상을 재생합니다!\n\n실제 구현에서는 데모 영상 모달을 띄웁니다."
    );
  });
}

// 스크롤 애니메이션 (HTML에서 이동된 코드)
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// 애니메이션 대상 요소들
const animatedElements = document.querySelectorAll(
  ".problem-card, .feature-card, .testimonial-card, .process-step"
);
if (animatedElements.length > 0) {
  animatedElements.forEach((el) => {
    el.style.transform = "translateY(30px)";
    observer.observe(el);
  });
}

// 섹션 나타나는 효과 (HTML에서 이동된 코드)
document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section");

  const sectionObserverOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, sectionObserverOptions);

  sections.forEach((section) => {
    sectionObserver.observe(section);
  });

  // 히어로 섹션은 즉시 보이도록 설정
  const heroSection = document.querySelector("#hero");
  if (heroSection) {
    heroSection.classList.add("visible");
  }
});

// 통계 숫자 애니메이션
function animateNumbers() {
  const stats = document.querySelectorAll(".stat-number");
  stats.forEach((stat) => {
    const target = stat.textContent;
    const isPercentage = target.includes("%");
    const isMultiplier = target.includes("배");
    const isPlus = target.includes("+");

    let numericValue = parseFloat(target.replace(/[^\d.]/g, ""));
    let current = 0;
    const increment = numericValue / 50;

    const timer = setInterval(() => {
      current += increment;
      if (current >= numericValue) {
        current = numericValue;
        clearInterval(timer);
      }

      let displayValue = Math.floor(current);
      if (isPercentage) {
        displayValue = Math.floor(current) + "%";
      } else if (isMultiplier) {
        displayValue = Math.floor(current) + "배";
      } else if (isPlus) {
        displayValue = Math.floor(current).toLocaleString() + "+";
      } else {
        displayValue = Math.floor(current).toLocaleString();
      }

      stat.textContent = displayValue;
    }, 30);
  });
}

// 히어로 섹션이 보일 때 통계 애니메이션 실행
const heroObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setTimeout(animateNumbers, 500);
        heroObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

const heroSection = document.querySelector(".hero");
if (heroSection) {
  heroObserver.observe(heroSection);
}

// 모바일 메뉴 토글 (필요시)
function createMobileMenu() {
  const nav = document.querySelector(".nav-links");
  const mobileMenuButton = document.createElement("button");
  mobileMenuButton.className = "mobile-menu-button";
  mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
  mobileMenuButton.style.display = "none";

  const navContainer = document.querySelector(".nav-container");
  navContainer.appendChild(mobileMenuButton);

  mobileMenuButton.addEventListener("click", function () {
    nav.classList.toggle("mobile-active");
    this.innerHTML = nav.classList.contains("mobile-active")
      ? '<i class="fas fa-times"></i>'
      : '<i class="fas fa-bars"></i>';
  });

  // 모바일에서 메뉴 링크 클릭 시 메뉴 닫기
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", function () {
      nav.classList.remove("mobile-active");
      mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
    });
  });
}

// 모바일 메뉴 스타일 추가
const mobileStyles = `
      @media (max-width: 768px) {
          .mobile-menu-button {
              display: block !important;
              background: none;
              border: none;
              font-size: 1.5rem;
              color: #2563eb;
              cursor: pointer;
          }
          
          .nav-links {
              position: absolute;
              top: 100%;
              left: 0;
              right: 0;
              background: white;
              flex-direction: column;
              padding: 20px;
              box-shadow: 0 5px 15px rgba(0,0,0,0.1);
              transform: translateY(-100%);
              opacity: 0;
              visibility: hidden;
              transition: all 0.3s ease;
          }
          
          .nav-links.mobile-active {
              transform: translateY(0);
              opacity: 1;
              visibility: visible;
          }
      }
  `;

const styleSheet = document.createElement("style");
styleSheet.textContent = mobileStyles;
document.head.appendChild(styleSheet);

// 모바일 메뉴 초기화 (필요한 경우에만)
try {
  createMobileMenu();
} catch (error) {
  console.log("모바일 메뉴 초기화 생략:", error.message);
}

// 모바일 메뉴 토글 기능 (HTML에서 이동된 코드)
const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");

if (mobileMenuToggle && mobileMenu) {
  mobileMenuToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
  });

  // 모바일 메뉴 링크 클릭 시 메뉴 닫기
  const mobileMenuLinks = document.querySelectorAll(".mobile-menu a");
  if (mobileMenuLinks.length > 0) {
    mobileMenuLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
      });
    });
  }
}

// 컨설팅 폼 모달 함수들
function openConsultingForm() {
  const modal = document.getElementById("consultingModal");
  if (modal) {
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
    console.log("✅ 모달 열기 성공");
  } else {
    console.error("❌ 모달 요소를 찾을 수 없습니다");
  }
}

function closeConsultingForm() {
  const modal = document.getElementById("consultingModal");
  if (modal) {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
    console.log("✅ 모달 닫기 성공");
  }
}

// 모달 외부 클릭 시 닫기
function handleModalOutsideClick(event) {
  const modal = document.getElementById("consultingModal");
  if (event.target === modal) {
    closeConsultingForm();
  }
}

// 폼 제출 처리 (HTML에서 이동된 코드)
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("consultingForm");
  if (form) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      const submitBtn = this.querySelector(".submit-btn");
      const originalText = submitBtn.innerHTML;

      // 버튼 비활성화
      submitBtn.disabled = true;
      submitBtn.innerHTML = "신청 중...";

      try {
        const formData = new FormData(this);
        const data = {
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
        };

        console.log("📝 폼 데이터:", data);

        // 간단한 유효성 검사
        if (!data.name || !data.email || !data.phone) {
          throw new Error("모든 필드를 입력해주세요.");
        }

        // 폼 제출 처리
        const response = await submitConsultingApplication(data);

        if (response.success) {
          // 성공 메시지 표시
          document.getElementById("consultingForm").style.display = "none";
          document.getElementById("formSuccess").style.display = "block";

          // 3초 후 모달 닫기
          setTimeout(() => {
            closeConsultingForm();
            // 폼 초기화
            this.reset();
            document.getElementById("consultingForm").style.display = "block";
            document.getElementById("formSuccess").style.display = "none";
          }, 3000);
        } else {
          throw new Error(
            response.error || "신청 처리 중 오류가 발생했습니다."
          );
        }
      } catch (error) {
        console.error("폼 제출 오류:", error);
        alert(
          error.message ||
            "신청 처리 중 오류가 발생했습니다. 다시 시도해주세요."
        );
      } finally {
        // 버튼 복원
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
    });
  }
});

async function trySendEmail(data) {
  try {
    console.log("📧 이메일 전송 시도...");

    // 현재 Supabase URL을 기반으로 이메일 함수 URL 생성
    const emailFunctionUrl = `${SUPABASE_URL.replace(
      ".supabase.co",
      ""
    )}.functions.supabase.co/send-consulting-email`;

    console.log("📧 이메일 함수 URL:", emailFunctionUrl);

    const response = await fetch(emailFunctionUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        phone: data.phone,
      }),
    });

    console.log("📧 이메일 응답 상태:", response.status);

    if (response.ok) {
      const result = await response.json();
      console.log("✅ 이메일 전송 성공:", result);
      return { success: true, data: result };
    } else {
      const errorText = await response.text();
      console.warn("⚠️ 이메일 전송 실패:", errorText);
      return { success: false, error: errorText };
    }
  } catch (error) {
    console.error("⚠️ 이메일 전송 중 오류:", error);
    return { success: false, error: error.message };
  }
}

// Supabase API 호출 함수 (실제 구현)
async function submitConsultingApplication(data) {
  try {
    console.log("🚀 Supabase 데이터 전송 시작");
    console.log("📝 전송할 데이터:", data);

    // 데이터 유효성 검사
    if (!data.name || !data.email || !data.phone) {
      throw new Error("모든 필드를 입력해주세요.");
    }

    // Supabase 클라이언트 생성
    const supabaseClient = supabase.createClient(
      SUPABASE_URL,
      SUPABASE_ANON_KEY
    );
    console.log("✅ Supabase 클라이언트 생성 완료");

    // 데이터 삽입
    console.log("📤 데이터 삽입 시도...");
    const { data: result, error } = await supabaseClient
      .from("consulting_application")
      .insert([
        {
          name: data.name,
          email: data.email,
          phone: data.phone,
          status: "pending",
          created_at: new Date().toISOString(),
        },
      ])
      .select();

    if (error) {
      console.error("❌ Supabase 데이터 삽입 실패:", error);
      throw error;
    }

    console.log("✅ Supabase 데이터 삽입 성공:", result);

    // 로컬 백업 (조용히)
    try {
      const applications = JSON.parse(
        localStorage.getItem("consulting_applications") || "[]"
      );
      applications.push({
        id: result[0].id || Date.now(),
        name: data.name,
        email: data.email,
        phone: data.phone,
        status: "pending",
        created_at: new Date().toISOString(),
        supabase_id: result[0].id,
      });
      localStorage.setItem(
        "consulting_applications",
        JSON.stringify(applications)
      );
    } catch (backupError) {
      // 백업 실패는 조용히 무시
    }

    return { success: true, data: result[0] };
  } catch (error) {
    console.error("❌ Supabase 전송 실패:", error);

    // REST API 직접 호출
    try {
      console.log("🔄 REST API 시도...");

      const response = await fetch(
        `${SUPABASE_URL}/rest/v1/consulting_application`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: SUPABASE_ANON_KEY,
            Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
            Prefer: "return=representation",
          },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            phone: data.phone,
            status: "pending",
            created_at: new Date().toISOString(),
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`REST API 오류: ${response.status} - ${errorText}`);
      }

      const restResult = await response.json();
      console.log("✅ REST API 성공:", restResult);

      // 로컬 백업 (조용히)
      try {
        const applications = JSON.parse(
          localStorage.getItem("consulting_applications") || "[]"
        );
        applications.push({
          id: Date.now(),
          name: data.name,
          email: data.email,
          phone: data.phone,
          status: "pending",
          created_at: new Date().toISOString(),
          method: "rest_api",
        });
        localStorage.setItem(
          "consulting_applications",
          JSON.stringify(applications)
        );
      } catch (backupError) {
        // 백업 실패는 조용히 무시
      }

      return { success: true, data: restResult[0] };
    } catch (restError) {
      console.error("❌ REST API도 실패:", restError);
      throw new Error("데이터 전송에 실패했습니다. 다시 시도해주세요.");
    }
  }
}

// Supabase 클라이언트 로드 함수
function loadSupabaseClient() {
  return new Promise((resolve, reject) => {
    if (document.querySelector('script[src*="supabase"]')) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://unpkg.com/@supabase/supabase-js@2";
    script.onload = () => {
      console.log("Supabase 클라이언트 로드됨");
      resolve();
    };
    script.onerror = (error) => {
      console.error("Supabase 클라이언트 로드 실패:", error);
      reject(error);
    };
    document.head.appendChild(script);
  });
}

// 전역 함수 노출
window.submitConsultingApplicationFromScript = submitConsultingApplication;
window.openConsultingForm = openConsultingForm;
window.closeConsultingForm = closeConsultingForm;
window.submitConsultingApplication = submitConsultingApplication;

// 페이지 로드 완료 시 실행
document.addEventListener("DOMContentLoaded", function () {
  console.log("🎉 랜딩페이지가 로드되었습니다!");

  // 모달 관련 이벤트 리스너 설정
  window.addEventListener("click", handleModalOutsideClick);

  // CTA 버튼들에 모달 열기 기능 연결 (이벤트 위임 사용)
  document.addEventListener("click", function (e) {
    // CTA 버튼 클릭 감지
    if (e.target.matches(".cta-button, .header-cta")) {
      e.preventDefault();
      console.log("🎯 CTA 버튼 클릭됨:", e.target.textContent);
      openConsultingForm();
    }
  });

  // 모달 닫기 버튼 이벤트 리스너
  const closeButtons = document.querySelectorAll(".close");
  if (closeButtons.length > 0) {
    closeButtons.forEach((button) => {
      button.addEventListener("click", closeConsultingForm);
    });
  }

  // Supabase 연결 테스트
  testSupabaseConnection();

  // 페이지 로드 시 저장된 신청서 확인 (개발용)
  const savedApplications = localStorage.getItem("consulting_applications");
  if (savedApplications) {
    console.log("📋 저장된 신청서:", JSON.parse(savedApplications));
  }

  // 뉴스 섹션 초기화
  initNewsSection();
});

// Supabase 연결 테스트 함수
async function testSupabaseConnection() {
  try {
    if (typeof supabase === "undefined") {
      console.log("⚠️ Supabase 클라이언트가 로드되지 않았습니다.");
      return;
    }

    const supabaseClient = supabase.createClient(
      SUPABASE_URL,
      SUPABASE_ANON_KEY
    );

    const { data, error } = await supabaseClient
      .from("consulting_application")
      .select("count")
      .limit(1);

    if (error) {
      console.error("❌ Supabase 연결 테스트 실패:", error);
    } else {
      console.log("✅ Supabase 연결 준비 완료");
    }
  } catch (error) {
    console.error("❌ Supabase 연결 테스트 중 오류:", error);
  }
}

// 성능 최적화: 이미지 지연 로딩 (필요시)
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        imageObserver.unobserve(img);
      }
    });
  });

  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img);
  });
}

// ======================================================
// 네이버 블로그 연동 "최신 소식" 섹션
// ======================================================

// 네이버 블로그 ID
const NAVER_BLOG_ID = "artourtreasure";

// 네이버 블로그 RSS 피드 URL (수정된 형식)
const NAVER_BLOG_RSS_URL = `https://blog.naver.com/${NAVER_BLOG_ID}`;

// RSS 파싱 서비스들 (순서대로 시도)
const RSS_PARSING_SERVICES = [
  // 방법 1: RSS2JSON (네이버 블로그 RSS 직접)
  `https://rss2json.com/v1/api.json?rss_url=https://blog.naver.com/${NAVER_BLOG_ID}/rss`,
  
  // 방법 2: RSS2JSON (네이버 블로그 메인)
  `https://rss2json.com/v1/api.json?rss_url=${NAVER_BLOG_RSS_URL}`,
  
  // 방법 3: AllOrigins (CORS 우회)
  `https://api.allorigins.win/raw?url=${encodeURIComponent(NAVER_BLOG_RSS_URL)}`,
  
  // 방법 4: 직접 네이버 블로그 API 시도
  `https://blog.naver.com/api/blogs/${NAVER_BLOG_ID}/posts`
];

// 현재 사용할 서비스 인덱스
let currentServiceIndex = 0;

// 뉴스 데이터 저장소
let newsData = [];
let currentPage = 0;
const itemsPerPage = 6;

// 썸네일 이미지 추출 함수
const getThumbnail = (content) => {
  if (!content) return null;

  try {
    // 여러 이미지 태그 패턴을 시도
    const patterns = [
      /<img[^>]+src=["']([^"']+)["'][^>]*>/i,
      /<img[^>]+src=([^"'\s>]+)[^>]*>/i,
    ];

    for (const pattern of patterns) {
      const match = content.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }

    return null;
  } catch (error) {
    console.error("썸네일 추출 중 오류:", error);
    return null;
  }
};

// CORS 문제를 해결하기 위한 이미지 프록시 함수
const getProxiedImageUrl = (originalUrl) => {
  if (!originalUrl) return null;

  try {
    // URL이 이미 data: 또는 blob: 스킴인 경우 그대로 반환
    if (originalUrl.startsWith("data:") || originalUrl.startsWith("blob:")) {
      return originalUrl;
    }

    // 상대 URL인 경우 현재 도메인에 추가
    if (originalUrl.startsWith("/")) {
      return window.location.origin + originalUrl;
    }

    // 외부 URL인 경우 프록시 서비스 사용
    if (originalUrl.startsWith("http")) {
      // 여러 프록시 서비스 옵션 (순서대로 시도)
      const proxyServices = [
        `https://images.weserv.nl/?url=${encodeURIComponent(
          originalUrl
        )}&w=300&h=200&fit=cover`,
        `https://cors-anywhere.herokuapp.com/${originalUrl}`,
        `https://api.allorigins.win/raw?url=${encodeURIComponent(originalUrl)}`,
      ];

      // 첫 번째 프록시 서비스 사용 (가장 안정적)
      return proxyServices[0];
    }

    return originalUrl;
  } catch (error) {
    console.error("프록시 URL 생성 중 오류:", error);
    return null;
  }
};

// HTML 태그 제거 및 텍스트 정리
const cleanHtml = (html) => {
  if (!html) return "";
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .trim();
};

// 날짜 포맷팅
const formatDate = (dateString) => {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      return "어제";
    } else if (diffDays < 7) {
      return `${diffDays}일 전`;
    } else if (diffDays < 30) {
      const weeks = Math.ceil(diffDays / 7);
      return `${weeks}주 전`;
    } else {
      return date.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }
  } catch (error) {
    console.error("날짜 포맷팅 오류:", error);
    return dateString;
  }
};

// 뉴스 카드 HTML 생성
const createNewsCard = (item) => {
  const thumbnail = getThumbnail(item.content);
  const proxiedImageUrl = getProxiedImageUrl(thumbnail);
  const cleanTitle = cleanHtml(item.title);
  const cleanExcerpt = cleanHtml(item.description || item.content);
  const formattedDate = formatDate(item.pubDate);

  return `
    <div class="news-card">
      <div class="news-card-image">
        ${thumbnail ? 
          `<img src="${proxiedImageUrl}" alt="${cleanTitle}" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />` : 
          ""
        }
        <div class="placeholder" style="display: ${thumbnail ? 'none' : 'flex'}">
          📝
        </div>
      </div>
      <div class="news-card-content">
        <div class="news-card-date">${formattedDate}</div>
        <h3 class="news-card-title">${cleanTitle}</h3>
        <p class="news-card-excerpt">${cleanExcerpt}</p>
        <a href="${item.link}" target="_blank" rel="noopener noreferrer" class="news-card-link">
          자세히 보기
        </a>
      </div>
    </div>
  `;
};

// 뉴스 데이터 로드 (여러 서비스 순차 시도)
const loadNewsData = async () => {
  try {
    console.log("📰 뉴스 데이터 로드 시작...");
    
    // 로딩 상태 표시
    showNewsLoading();
    
    let data = null;
    let lastError = null;
    
    // 여러 서비스를 순차적으로 시도
    for (let i = currentServiceIndex; i < RSS_PARSING_SERVICES.length; i++) {
      const serviceUrl = RSS_PARSING_SERVICES[i];
      console.log(`🔄 서비스 ${i + 1} 시도: ${serviceUrl}`);
      
      try {
        const response = await fetch(serviceUrl, {
          method: 'GET',
          headers: {
            'Accept': 'application/json, text/html, */*',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          }
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const responseText = await response.text();
        console.log(`📡 서비스 ${i + 1} 응답:`, responseText.substring(0, 200) + "...");
        
        // JSON 파싱 시도
        try {
          data = JSON.parse(responseText);
        } catch (parseError) {
          // HTML 응답인 경우 파싱 시도
          if (responseText.includes('<html') || responseText.includes('<!DOCTYPE')) {
            data = await parseHtmlResponse(responseText);
          } else {
            throw new Error("응답을 파싱할 수 없습니다.");
          }
        }
        
        // 데이터 유효성 검사
        if (data && (data.items || data.posts || data.entries)) {
          console.log(`✅ 서비스 ${i + 1} 성공!`);
          currentServiceIndex = i; // 성공한 서비스 저장
          break;
        } else {
          throw new Error("유효한 데이터가 없습니다.");
        }
        
      } catch (serviceError) {
        console.warn(`⚠️ 서비스 ${i + 1} 실패:`, serviceError.message);
        lastError = serviceError;
        
        // 마지막 서비스인 경우 에러 표시
        if (i === RSS_PARSING_SERVICES.length - 1) {
          throw lastError;
        }
        
        // 다음 서비스 시도
        continue;
      }
    }
    
    if (!data) {
      throw new Error("모든 서비스에서 데이터를 가져올 수 없습니다.");
    }
    
    // 데이터 정리 및 저장
    newsData = normalizeNewsData(data);
    
    console.log(`✅ ${newsData.length}개의 뉴스 데이터 로드 완료`);
    
    // 첫 페이지 표시
    displayNewsPage(0);
    
    // 더보기 버튼 표시 (데이터가 충분한 경우)
    if (newsData.length > itemsPerPage) {
      showLoadMoreButton();
    }
    
  } catch (error) {
    console.error("❌ 뉴스 데이터 로드 실패:", error);
    showNewsError(`데이터를 불러올 수 없습니다: ${error.message}`);
  }
};

// 뉴스 페이지 표시
const displayNewsPage = (pageIndex) => {
  const startIndex = pageIndex * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const pageItems = newsData.slice(startIndex, endIndex);
  
  const newsGrid = document.getElementById("newsGrid");
  if (!newsGrid) return;
  
  // 첫 페이지인 경우 기존 내용 초기화
  if (pageIndex === 0) {
    newsGrid.innerHTML = "";
  }
  
  // 뉴스 카드 추가
  pageItems.forEach(item => {
    const cardHtml = createNewsCard(item);
    newsGrid.insertAdjacentHTML("beforeend", cardHtml);
  });
  
  // 뉴스 그리드 표시
  newsGrid.style.display = "grid";
  
  // 더보기 버튼 상태 업데이트
  updateLoadMoreButton(pageIndex, endIndex);
  
  console.log(`📄 페이지 ${pageIndex + 1} 표시 완료 (${pageItems.length}개 항목)`);
};

// 더보기 버튼 표시
const showLoadMoreButton = () => {
  const loadMoreContainer = document.getElementById("newsLoadMore");
  if (loadMoreContainer) {
    loadMoreContainer.style.display = "block";
  }
};

// 더보기 버튼 상태 업데이트
const updateLoadMoreButton = (currentPage, endIndex) => {
  const loadMoreBtn = document.getElementById("loadMoreBtn");
  if (!loadMoreBtn) return;
  
  if (endIndex >= newsData.length) {
    loadMoreBtn.disabled = true;
    loadMoreBtn.textContent = "모든 소식을 불러왔습니다";
  } else {
    loadMoreBtn.disabled = false;
    loadMoreBtn.textContent = "더 많은 소식 보기";
  }
};

// 로딩 상태 표시
const showNewsLoading = () => {
  const loading = document.getElementById("newsLoading");
  const error = document.getElementById("newsError");
  const grid = document.getElementById("newsGrid");
  const loadMore = document.getElementById("newsLoadMore");
  
  if (loading) loading.style.display = "block";
  if (error) error.style.display = "none";
  if (grid) grid.style.display = "none";
  if (loadMore) loadMore.style.display = "none";
};

// 에러 상태 표시
const showNewsError = (message) => {
  const loading = document.getElementById("newsLoading");
  const error = document.getElementById("newsError");
  const grid = document.getElementById("newsGrid");
  const loadMore = document.getElementById("newsLoadMore");
  
  if (loading) loading.style.display = "none";
  if (error) {
    error.style.display = "block";
    const errorMessage = error.querySelector("p");
    if (errorMessage) {
      errorMessage.textContent = message || "잠시 후 다시 시도해주세요";
    }
  }
  if (grid) grid.style.display = "none";
  if (loadMore) loadMore.style.display = "none";
};

// 더보기 버튼 클릭 이벤트
const handleLoadMore = () => {
  currentPage++;
  displayNewsPage(currentPage);
};

// 재시도 버튼 클릭 이벤트
const handleRetry = () => {
  currentPage = 0;
  loadNewsData();
};

// 이미지 로딩 실패 시 자동 복구
const handleImageError = (imgElement) => {
  const placeholder = imgElement.nextElementSibling;
  if (placeholder && placeholder.classList.contains("placeholder")) {
    imgElement.style.display = "none";
    placeholder.style.display = "flex";
  }
};

// 뉴스 섹션 초기화
const initNewsSection = () => {
  console.log("📰 뉴스 섹션 초기화 시작...");
  
  // 이벤트 리스너 설정
  const loadMoreBtn = document.getElementById("loadMoreBtn");
  const retryBtn = document.getElementById("retryBtn");
  
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", handleLoadMore);
  }
  
  if (retryBtn) {
    retryBtn.addEventListener("click", handleRetry);
  }
  
  // 뉴스 데이터 로드
  loadNewsData();
};



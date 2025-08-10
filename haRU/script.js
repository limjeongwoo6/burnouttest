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

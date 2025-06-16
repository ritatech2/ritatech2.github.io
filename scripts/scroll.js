gsap.registerPlugin(ScrollTrigger); 

export function initHorizontalScroll() {
  const section4 = document.querySelector(".section_4");
  const gamesList = document.querySelector(".games_list");
  const gamesCards = gsap.utils.toArray(".game_card");
  const gamesWidth = gamesCards.length * 320 + (gamesCards.length - 1) * 20;

  gamesList.style.width = `${gamesWidth + 100}%`;

  gsap.to(gamesList, {
    x: () => -(gamesWidth - window.innerWidth + 40),
    ease: "none",
    scrollTrigger: {
      trigger: section4,
      start: "top top",
      end: () => `+=${gamesWidth * 1.2}`,
      pin: true,
      pinSpacing: true,
      scrub: true, // Увеличиваем задержку для большего "сопротивления"
    },
  });

  // Анимация для кнопок
  gsap.utils.toArray(".register").forEach((btn) => {
    btn.addEventListener("mouseenter", () => {
      gsap.to(btn, { scale: 1.05, duration: 0.3 });
    });
    btn.addEventListener("mouseleave", () => {
      gsap.to(btn, { scale: 1, duration: 0.3 });
    });
  });
}

export function initHeadScroll() {
  const container = document.getElementById("parallax-container");
  const layers = container.querySelectorAll(".layer[data-speed]");

  layers.forEach((layer) => {
    const speed = parseFloat(layer.getAttribute("data-speed"));

    gsap.to(layer, {
      y: 100 * speed,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  });
}

export function initAboutScroll() {
  const section = document.querySelector(".section_2");
  const aboutContent = section.querySelector(".about_content");

  // Разбиваем текст на слова (сохраняя HTML-разметку)
  aboutContent.innerHTML = aboutContent.innerHTML
    .replace(/<[^>]+>/g, (m) => `<!--${m}-->`) // Временно маскируем HTML-теги
    .replace(/(\S+)/g, "<span class='word'>$1</span>")
    .replace(/<!--([^>]+)-->/g, "$1"); // Восстанавливаем HTML-теги

  const words = aboutContent.querySelectorAll(".word");

  // Начальное состояние слов (скрыты внизу)
  gsap.set(words, {
    opacity: 0,
    y: 80,
    display: "inline-block", // Важно для корректного позиционирования
    transformOrigin: "center bottom",
  });

  // Анимация при входе в секцию
  ScrollTrigger.create({
    trigger: section,
    start: "top 75%",
    once: true,
    onEnter: () => {
      gsap.to(words, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.1, // Задержка между словами
        ease: "elastic.out(1, 0.8)", // Резкий пружинный эффект
        overwrite: "auto",
        // Для более частых подскоков нескольких слов:
        onComplete: () => {
          // Подскок 3 случайных слов
          for (let i = 0; i < 6; i++) {
            const randomIndex = Math.floor(Math.random() * words.length);
            gsap.to(words[randomIndex], {
              y: -10,
              duration: 0.3,
              delay: i * 0.8, // Последовательный подскок
              repeat: 1,
              yoyo: true,
              ease: "sine.out",
            });
          }
        },
      });
    },
  });
}

export function initPinSidebarScroll() {
  const section = document.querySelector(".section_5");
  const authorText = document.querySelector(".author_text");

  if (!section || !authorText) return;

  gsap.set(authorText, {
    yPercent: 100,
    opacity: 0,
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: "+=200%",
      pin: true,
      scrub: true,
      markers: false,
    },
  });

  tl.to(authorText, {
    yPercent: 0,
    opacity: 1,
    duration: 1.5,
    ease: "power4.out",
  });
}

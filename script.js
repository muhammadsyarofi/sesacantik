/**
 * PROJECT: A JOURNEY OF LOVE ❤️
 * Premium Cinematic Romantic Website — Vanilla JavaScript Engine
 */

(() => {
  'use strict';

  /* ==========================================================================
     1. STATE & CONFIGURATION
     ========================================================================== */
  const state = {
    currentScene: 1,
    storyStarted: false,
    audioPlaying: false,
    scene3Typed: false,
    letterOpened: false,
    letterTyping: false,
    giftOpened: false,
    finaleTriggered: false,
    mouseX: window.innerWidth / 2,
    mouseY: window.innerHeight / 2,
  };

  const LOVE_LETTER_TEXT = `Untuk perempuan yang selalu punya tempat istimewa di hatiku.

Aku tidak tahu bagaimana cara menjelaskan betapa bersyukurnya aku bisa mengenalmu.

Mungkin aku bukan orang yang sempurna. Mungkin aku juga masih punya banyak kekurangan.

Tapi aku ingin terus belajar menjadi seseorang yang lebih baik.

Aku ingin menjadi tempat kamu bercerita, tempat kamu tertawa, dan seseorang yang tetap ada ketika hari-harimu tidak berjalan dengan baik.

Aku tidak bisa menjanjikan bahwa setiap hari akan selalu indah. Tetapi aku berharap kita bisa melewati hari-hari itu bersama.

Terima kasih sudah menjadi kamu.

I Love You, More Than You Know. ❤️`;

  /* ==========================================================================
     2. DOM ELEMENTS
     ========================================================================== */
  const bgCanvas = document.getElementById('bg-canvas');
  const fxCanvas = document.getElementById('fx-canvas');
  const bgCtx = bgCanvas.getContext('2d');
  const fxCtx = fxCanvas.getContext('2d');

  const transitionOverlay = document.getElementById('cinematic-transition');
  const sceneDots = document.querySelectorAll('.scene-dot');

  const bgmAudio = document.getElementById('bgm-audio');
  const audioToggleBtn = document.getElementById('audio-toggle');
  const audioIcon = document.getElementById('audio-icon');
  const audioVisualizer = document.getElementById('audio-visualizer');

  // Scene 1
  const openingHeart = document.getElementById('opening-heart');
  const s1Line1 = document.getElementById('s1-line-1');
  const s1Line2 = document.getElementById('s1-line-2');
  const s1Line3 = document.getElementById('s1-line-3');
  const s1CtaWrapper = document.getElementById('s1-cta-wrapper');
  const btnStartStory = document.getElementById('btn-start-story');

  // Scene 2
  const roseGarden = document.getElementById('rose-garden');

  // Scene 3
  const portraitFrame3D = document.getElementById('portrait-frame-3d');
  const mainPortraitImg = document.getElementById('main-portrait-img');
  const s3TypingCaption = document.getElementById('s3-typing-caption');

  // Scene 4
  const reasonCards = document.querySelectorAll('.reason-card-container');

  // Scene 5
  const envelopeWrapper = document.getElementById('envelope-wrapper');
  const envelope3D = document.getElementById('envelope-3d');
  const heartWaxSeal = document.getElementById('heart-wax-seal');
  const envelopeInstruction = document.getElementById('envelope-instruction');
  const letterTypewriterBody = document.getElementById('letter-typewriter-body');
  const letterSignature = document.getElementById('letter-signature');

  // Scene 6
  const polaroidCards = document.querySelectorAll('.polaroid-card');
  const memoryUploadInput = document.getElementById('memory-upload');
  const customMemoryImg = document.getElementById('custom-memory-img');
  const memoryLightbox = document.getElementById('memory-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');

  // Scene 7
  const giftStageWrapper = document.querySelector('.gift-stage-wrapper');
  const giftBox3D = document.getElementById('gift-box-3d');
  const btnOpenGift = document.getElementById('btn-open-gift');

  // Scene 8
  const btnStayOfCourse = document.getElementById('btn-stay-ofcourse');
  const btnStayForever = document.getElementById('btn-stay-forever');
  const proposalResponse = document.getElementById('proposal-response');
  const responseTitle = document.getElementById('response-title');
  const responseMessage = document.getElementById('response-message');

  // Scene 9
  const finaleCameraStage = document.getElementById('finale-camera-stage');
  const finaleSteps = document.querySelectorAll('.finale-step');
  const btnReplayStory = document.getElementById('btn-replay-story');

  /* ==========================================================================
     3. GLOBAL CANVAS PARTICLE ENGINE (STARS, ROSE PETALS, HEARTS, CONFETTI, CURSOR)
     ========================================================================== */
  let width = (bgCanvas.width = fxCanvas.width = window.innerWidth);
  let height = (bgCanvas.height = fxCanvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = bgCanvas.width = fxCanvas.width = window.innerWidth;
    height = bgCanvas.height = fxCanvas.height = window.innerHeight;
  });

  // Background ambient particles
  const stars = [];
  const petals = [];
  const floatingHearts = [];
  const glowingOrbs = [];

  // Foreground FX particles (Cursor sparkles, Confetti, Heart Bursts)
  const fxParticles = [];

  function randomRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  function initAmbientParticles() {
    stars.length = 0;
    petals.length = 0;
    floatingHearts.length = 0;
    glowingOrbs.length = 0;

    const starCount = window.innerWidth < 768 ? 95 : 175;
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: randomRange(0.5, 2.1),
        alpha: randomRange(0.2, 0.95),
        twinkleSpeed: randomRange(0.008, 0.03),
        phase: Math.random() * Math.PI * 2,
        color: Math.random() > 0.25 ? '#FFF5FA' : '#FF9BCB',
      });
    }

    const petalCount = window.innerWidth < 768 ? 18 : 30;
    for (let i = 0; i < petalCount; i++) {
      petals.push(createPetal(true));
    }

    const heartCount = window.innerWidth < 768 ? 12 : 20;
    for (let i = 0; i < heartCount; i++) {
      floatingHearts.push(createFloatingHeart(true));
    }

    const orbCount = window.innerWidth < 768 ? 15 : 26;
    for (let i = 0; i < orbCount; i++) {
      glowingOrbs.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: randomRange(1.5, 4.2),
        vx: randomRange(-0.25, 0.25),
        vy: randomRange(-0.45, -0.12),
        alpha: randomRange(0.2, 0.75),
        color: Math.random() > 0.45 ? '#FF9BCB' : '#D9A078',
      });
    }
  }

  function createPetal(randomY = false) {
    return {
      x: Math.random() * width,
      y: randomY ? Math.random() * height : -25,
      size: randomRange(6, 13),
      vy: randomRange(0.6, 1.45),
      vx: randomRange(-0.45, 0.55),
      angle: Math.random() * Math.PI * 2,
      spin: randomRange(-0.02, 0.02),
      swayAmp: randomRange(0.4, 1.2),
      swaySpeed: randomRange(0.01, 0.025),
      time: Math.random() * 100,
      alpha: randomRange(0.45, 0.85),
      hue: Math.random() > 0.3 ? '#FF85BD' : '#D94F86',
    };
  }

  function createFloatingHeart(randomY = false) {
    return {
      x: Math.random() * width,
      y: randomY ? Math.random() * height : height + 25,
      size: randomRange(8, 18),
      vy: randomRange(0.35, 0.9),
      vx: randomRange(-0.25, 0.25),
      alpha: randomRange(0.18, 0.48),
      color: Math.random() > 0.5 ? '#FF9BCB' : '#D9A078',
    };
  }

  function drawHeartShape(ctx, x, y, size, color, alpha) {
    ctx.save();
    ctx.translate(x, y);
    ctx.beginPath();
    const topCurveHeight = size * 0.3;
    ctx.moveTo(0, topCurveHeight);
    ctx.bezierCurveTo(0, 0, -size / 2, 0, -size / 2, topCurveHeight);
    ctx.bezierCurveTo(-size / 2, (size + topCurveHeight) / 2, 0, (size + topCurveHeight) / 1.4, 0, size);
    ctx.bezierCurveTo(0, (size + topCurveHeight) / 1.4, size / 2, (size + topCurveHeight) / 2, size / 2, topCurveHeight);
    ctx.bezierCurveTo(size / 2, 0, 0, 0, 0, topCurveHeight);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
    ctx.shadowColor = color;
    ctx.shadowBlur = 10;
    ctx.fill();
    ctx.restore();
  }

  function drawPetalShape(ctx, p) {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.angle);
    ctx.beginPath();
    ctx.moveTo(0, -p.size);
    ctx.bezierCurveTo(p.size * 0.8, -p.size * 0.5, p.size * 0.8, p.size * 0.6, 0, p.size);
    ctx.bezierCurveTo(-p.size * 0.8, p.size * 0.6, -p.size * 0.8, -p.size * 0.5, 0, -p.size);
    ctx.closePath();
    ctx.fillStyle = p.hue;
    ctx.globalAlpha = p.alpha;
    ctx.shadowColor = '#FF9BCB';
    ctx.shadowBlur = 8;
    ctx.fill();
    ctx.restore();
  }

  /* Interactive FX Spawners (Confetti, Heart Burst, Cursor Sparkles) */
  function spawnCursorSparkle(x, y) {
    if (fxParticles.length > 260) return;
    for (let i = 0; i < 2; i++) {
      fxParticles.push({
        type: Math.random() > 0.65 ? 'heart' : 'sparkle',
        x: x + randomRange(-8, 8),
        y: y + randomRange(-8, 8),
        vx: randomRange(-1.1, 1.1),
        vy: randomRange(-1.4, 0.4),
        size: randomRange(3, 7),
        alpha: 0.95,
        decay: randomRange(0.02, 0.038),
        color: Math.random() > 0.4 ? '#FF9BCB' : '#D9A078',
      });
    }
  }

  function spawnHeartBurst(centerX = width / 2, centerY = height / 2, count = 42) {
    const colors = ['#FF9BCB', '#FF61A6', '#D9A078', '#FFF5FA', '#FFB8DC'];
    for (let i = 0; i < count; i++) {
      const angle = randomRange(0, Math.PI * 2);
      const speed = randomRange(1.8, 7.5);
      fxParticles.push({
        type: 'heart',
        x: centerX + randomRange(-30, 30),
        y: centerY + randomRange(-20, 20),
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - randomRange(1.5, 3.8),
        gravity: 0.06,
        size: randomRange(9, 20),
        alpha: 1,
        decay: randomRange(0.007, 0.015),
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
  }

  function spawnConfettiExplosion(centerX = width / 2, centerY = height / 2, count = 85) {
    const colors = ['#FF9BCB', '#D9A078', '#FFF5FA', '#FF5C9E', '#F7D29C', '#C969A8'];
    for (let i = 0; i < count; i++) {
      const angle = randomRange(-Math.PI, 0);
      const speed = randomRange(3, 12);
      fxParticles.push({
        type: 'confetti',
        x: centerX,
        y: centerY,
        vx: Math.cos(angle) * speed + randomRange(-3, 3),
        vy: Math.sin(angle) * speed - randomRange(1, 5),
        gravity: 0.16,
        w: randomRange(6, 12),
        h: randomRange(4, 8),
        rotation: randomRange(0, Math.PI * 2),
        rotSpeed: randomRange(-0.15, 0.15),
        alpha: 1,
        decay: randomRange(0.005, 0.011),
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
  }

  /* Master Animation Loop (requestAnimationFrame) */
  function renderLoop() {
    bgCtx.clearRect(0, 0, width, height);
    fxCtx.clearRect(0, 0, width, height);

    // 1. Twinkling Stars
    for (let i = 0; i < stars.length; i++) {
      const s = stars[i];
      s.phase += s.twinkleSpeed;
      const currentAlpha = s.alpha * (0.55 + 0.45 * Math.sin(s.phase));
      bgCtx.beginPath();
      bgCtx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      bgCtx.fillStyle = s.color;
      bgCtx.globalAlpha = currentAlpha;
      bgCtx.fill();
    }

    // 2. Rising Glowing Particles
    for (let i = 0; i < glowingOrbs.length; i++) {
      const o = glowingOrbs[i];
      o.x += o.vx;
      o.y += o.vy;
      if (o.y < -10) o.y = height + 10;
      if (o.x < -10) o.x = width + 10;
      if (o.x > width + 10) o.x = -10;

      bgCtx.save();
      bgCtx.beginPath();
      bgCtx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
      bgCtx.fillStyle = o.color;
      bgCtx.globalAlpha = o.alpha;
      bgCtx.shadowColor = o.color;
      bgCtx.shadowBlur = 12;
      bgCtx.fill();
      bgCtx.restore();
    }

    // 3. Translucent Floating Hearts
    for (let i = 0; i < floatingHearts.length; i++) {
      const h = floatingHearts[i];
      h.y -= h.vy;
      h.x += h.vx;
      if (h.y < -30) {
        Object.assign(h, createFloatingHeart(false));
      }
      drawHeartShape(bgCtx, h.x, h.y, h.size, h.color, h.alpha);
    }

    // 4. Falling Rose Petals
    for (let i = 0; i < petals.length; i++) {
      const p = petals[i];
      p.time += p.swaySpeed;
      p.x += p.vx + Math.sin(p.time) * p.swayAmp;
      p.y += p.vy;
      p.angle += p.spin;
      if (p.y > height + 30) {
        Object.assign(p, createPetal(false));
      }
      drawPetalShape(bgCtx, p);
    }

    // 5. Foreground Interactive FX Particles
    for (let i = fxParticles.length - 1; i >= 0; i--) {
      const fx = fxParticles[i];
      fx.x += fx.vx;
      fx.y += fx.vy;
      if (fx.gravity) fx.vy += fx.gravity;
      fx.alpha -= fx.decay;

      if (fx.alpha <= 0) {
        fxParticles.splice(i, 1);
        continue;
      }

      if (fx.type === 'heart') {
        drawHeartShape(fxCtx, fx.x, fx.y, fx.size, fx.color, fx.alpha);
      } else if (fx.type === 'confetti') {
        fx.rotation += fx.rotSpeed;
        fxCtx.save();
        fxCtx.translate(fx.x, fx.y);
        fxCtx.rotate(fx.rotation);
        fxCtx.fillStyle = fx.color;
        fxCtx.globalAlpha = fx.alpha;
        fxCtx.fillRect(-fx.w / 2, -fx.h / 2, fx.w, fx.h);
        fxCtx.restore();
      } else {
        fxCtx.save();
        fxCtx.beginPath();
        fxCtx.arc(fx.x, fx.y, fx.size / 2, 0, Math.PI * 2);
        fxCtx.fillStyle = fx.color;
        fxCtx.globalAlpha = fx.alpha;
        fxCtx.shadowColor = fx.color;
        fxCtx.shadowBlur = 10;
        fxCtx.fill();
        fxCtx.restore();
      }
    }

    requestAnimationFrame(renderLoop);
  }

  /* Pointer / Touch Trail Effect */
  window.addEventListener('pointermove', (e) => {
    state.mouseX = e.clientX;
    state.mouseY = e.clientY;
    spawnCursorSparkle(e.clientX, e.clientY);
  });

  window.addEventListener('pointerdown', (e) => {
    spawnHeartBurst(e.clientX, e.clientY, 10);
  });

  /* ==========================================================================
     4. TYPEWRITER ENGINE
     ========================================================================== */
  function typeText(element, text, speed = 48) {
    return new Promise((resolve) => {
      if (!element) {
        resolve();
        return;
      }
      element.textContent = '';
      element.classList.add('typing-cursor');
      let index = 0;

      function step() {
        if (index < text.length) {
          element.textContent += text.charAt(index);
          index++;
          setTimeout(step, speed);
        } else {
          element.classList.remove('typing-cursor');
          resolve();
        }
      }
      step();
    });
  }

  function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /* ==========================================================================
     5. SCENE 1 — OPENING CINEMATIC SEQUENCE
     ========================================================================== */
  async function runScene1Sequence() {
    s1Line1.textContent = '';
    s1Line2.textContent = '';
    s1Line3.textContent = '';
    s1CtaWrapper.classList.remove('ready');
    openingHeart.classList.remove('zoom-explode');

    await wait(1100);
    await typeText(s1Line1, 'Somewhere in this universe...', 52);
    await wait(1000);
    await typeText(s1Line2, 'I found someone special.', 55);
    await wait(950);
    await typeText(s1Line3, 'And that someone is YOU. ❤️', 62);
    await wait(450);

    s1CtaWrapper.classList.add('ready');
    spawnHeartBurst(width / 2, height * 0.35, 24);
  }

  /* ==========================================================================
     6. AUDIO CONTROLLER & SIMPLE VISUALIZER
     ========================================================================== */
  function startBackgroundMusic() {
    if (!bgmAudio) return;
    bgmAudio.volume = 0.65;
    const playPromise = bgmAudio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          state.audioPlaying = true;
          updateAudioUI();
        })
        .catch(() => {
          // Fallback if browser blocked audio
          state.audioPlaying = false;
          updateAudioUI();
        });
    }
  }

  function toggleBackgroundMusic() {
    if (!bgmAudio) return;
    if (bgmAudio.paused) {
      bgmAudio.play().then(() => {
        state.audioPlaying = true;
        updateAudioUI();
      }).catch(() => {});
    } else {
      bgmAudio.pause();
      state.audioPlaying = false;
      updateAudioUI();
    }
  }

  function updateAudioUI() {
    if (state.audioPlaying && !bgmAudio.paused) {
      audioIcon.textContent = '🎵';
      audioVisualizer.classList.add('playing');
    } else {
      audioIcon.textContent = '🔇';
      audioVisualizer.classList.remove('playing');
    }
  }

  audioToggleBtn.addEventListener('click', toggleBackgroundMusic);

  /* ==========================================================================
     7. CINEMATIC SCENE TRANSITIONS & NAVIGATION
     ========================================================================== */
  function navigateToScene(sceneNumber, useFlashTransition = true) {
    const targetSection = document.getElementById(`scene-${sceneNumber}`);
    if (!targetSection) return;

    // Unlock scroll once leaving Scene 1
    if (sceneNumber > 1) {
      document.body.classList.remove('locked-scroll');
      state.storyStarted = true;
    }

    if (useFlashTransition) {
      transitionOverlay.classList.add('active');
      setTimeout(() => {
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        updateActiveDot(sceneNumber);
      }, 420);
      setTimeout(() => {
        transitionOverlay.classList.remove('active');
      }, 1050);
    } else {
      targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      updateActiveDot(sceneNumber);
    }
  }

  function updateActiveDot(sceneNumber) {
    state.currentScene = Number(sceneNumber);
    sceneDots.forEach((dot) => {
      dot.classList.toggle('active', Number(dot.dataset.target) === state.currentScene);
    });
  }

  // Scene 1 "Start Our Story ✨" Button
  btnStartStory.addEventListener('click', () => {
    startBackgroundMusic();
    openingHeart.classList.add('zoom-explode');
    spawnHeartBurst(width / 2, height / 2, 45);
    setTimeout(() => {
      navigateToScene(2, true);
    }, 450);
  });

  // Next Scene CTA Buttons across scenes
  document.querySelectorAll('.btn-next-scene').forEach((btn) => {
    btn.addEventListener('click', () => {
      const nextScene = Number(btn.dataset.next);
      if (nextScene) {
        navigateToScene(nextScene, true);
      }
    });
  });

  // Top HUD Chapter Dots
  sceneDots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const target = Number(dot.dataset.target);
      if (!state.storyStarted && target > 1) {
        startBackgroundMusic();
      }
      navigateToScene(target, true);
    });
  });

  /* ==========================================================================
     8. INTERSECTION OBSERVER FOR SCENE REVEALS & SPECIFIC SCENE TRIGGERS
     ========================================================================== */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    },
    { threshold: 0.18 }
  );

  document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
    revealObserver.observe(el);
  });

  // Scene-level Observer
  const sceneObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const sceneNum = Number(entry.target.dataset.scene);
        updateActiveDot(sceneNum);

        // SCENE 2 Trigger: Grow roses from bottom
        if (sceneNum === 2 && roseGarden) {
          roseGarden.classList.add('bloomed');
        }

        // SCENE 3 Trigger: Blur-to-sharp portrait + typing caption
        if (sceneNum === 3) {
          setTimeout(() => {
            mainPortraitImg.classList.add('sharp-revealed');
          }, 250);

          if (!state.scene3Typed && s3TypingCaption) {
            state.scene3Typed = true;
            const captionText = s3TypingCaption.dataset.text || '';
            setTimeout(() => {
              typeText(s3TypingCaption, captionText, 38);
            }, 900);
          }
        }

        // SCENE 4 Trigger: Staggered cards reveal
        if (sceneNum === 4) {
          reasonCards.forEach((card, idx) => {
            setTimeout(() => {
              card.classList.add('card-visible');
            }, idx * 220);
          });
        }

        // SCENE 6 Trigger: Scrapbook Polaroid cards one-by-one
        if (sceneNum === 6) {
          polaroidCards.forEach((card, idx) => {
            setTimeout(() => {
              card.classList.add('polaroid-visible');
            }, idx * 240);
          });
        }

        // SCENE 9 Trigger: Virtual camera zoom & staggered finale lines
        if (sceneNum === 9 && !state.finaleTriggered) {
          state.finaleTriggered = true;
          triggerFinaleSequence();
        }
      });
    },
    { threshold: 0.35 }
  );

  document.querySelectorAll('.scene').forEach((sec) => {
    sceneObserver.observe(sec);
  });

  /* ==========================================================================
     9. SCENE 3 — 3D PORTRAIT INTERACTIVE PARALLAX TILT
     ========================================================================== */
  if (portraitFrame3D) {
    portraitFrame3D.addEventListener('pointermove', (e) => {
      const rect = portraitFrame3D.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      portraitFrame3D.style.animation = 'none';
      portraitFrame3D.style.transform = `rotateY(${x * 16}deg) rotateX(${-y * 16}deg) scale(1.02)`;
    });

    portraitFrame3D.addEventListener('pointerleave', () => {
      portraitFrame3D.style.transform = '';
      portraitFrame3D.style.animation = 'portraitFloat3D 5.5s ease-in-out infinite, gradientShift 6s ease infinite';
    });
  }

  /* ==========================================================================
     10. SCENE 4 — 3D FLIP CARDS INTERACTION
     ========================================================================== */
  reasonCards.forEach((card) => {
    card.addEventListener('click', () => {
      card.classList.toggle('flipped');
      const rect = card.getBoundingClientRect();
      spawnHeartBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 12);
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.classList.toggle('flipped');
      }
    });
  });

  /* ==========================================================================
     11. SCENE 5 — 3D LOVE LETTER ENVELOPE & TYPEWRITER REVEAL
     ========================================================================== */
  async function openLoveLetter() {
    if (state.letterOpened || state.letterTyping) return;
    state.letterOpened = true;
    state.letterTyping = true;

    envelope3D.classList.add('opened');
    envelopeWrapper.classList.add('letter-expanded');
    if (envelopeInstruction) {
      envelopeInstruction.textContent = 'Sepucuk surat dari hatiku untukmu... ❤️';
    }

    const rect = envelope3D.getBoundingClientRect();
    spawnHeartBurst(rect.left + rect.width / 2, rect.top + rect.height / 3, 28);

    await wait(1100);
    await typeText(letterTypewriterBody, LOVE_LETTER_TEXT, 24);

    letterSignature.classList.add('visible');
    state.letterTyping = false;

    // Burst dozens of glowing little hearts upon completion
    spawnHeartBurst(width / 2, height / 2, 55);
  }

  if (envelope3D) {
    envelope3D.addEventListener('click', openLoveLetter);
  }
  if (heartWaxSeal) {
    heartWaxSeal.addEventListener('click', (e) => {
      e.stopPropagation();
      openLoveLetter();
    });
  }

  /* ==========================================================================
     12. SCENE 6 — MEMORIES LIGHTBOX & OPTIONAL PHOTO SLOT UPLOAD
     ========================================================================== */
  polaroidCards.forEach((card) => {
    card.addEventListener('click', (e) => {
      // Ignore if clicking upload button/input
      if (e.target.closest('.memory-upload-btn') || e.target.tagName === 'INPUT') {
        return;
      }
      const img = card.querySelector('.polaroid-img');
      const caption = card.dataset.caption || '';
      if (img && memoryLightbox) {
        lightboxImg.src = img.src;
        lightboxCaption.textContent = caption;
        memoryLightbox.classList.add('open');
        memoryLightbox.setAttribute('aria-hidden', 'false');
      }
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', () => {
      memoryLightbox.classList.remove('open');
      memoryLightbox.setAttribute('aria-hidden', 'true');
    });
  }

  if (memoryLightbox) {
    memoryLightbox.addEventListener('click', (e) => {
      if (e.target === memoryLightbox) {
        memoryLightbox.classList.remove('open');
        memoryLightbox.setAttribute('aria-hidden', 'true');
      }
    });
  }

  if (memoryUploadInput && customMemoryImg) {
    memoryUploadInput.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        customMemoryImg.src = ev.target.result;
        customMemoryImg.classList.remove('filter-vintage');
        spawnHeartBurst(width / 2, height / 2, 30);
      };
      reader.readAsDataURL(file);
    });
  }

  /* ==========================================================================
     13. SCENE 7 — 3D INTERACTIVE GIFT BOX SURPRISE
     ========================================================================== */
  function openGiftBox() {
    if (state.giftOpened) return;
    state.giftOpened = true;
    giftStageWrapper.classList.add('gift-opened');

    const rect = giftBox3D.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    spawnConfettiExplosion(cx, cy, 95);
    spawnHeartBurst(cx, cy, 48);

    setTimeout(() => {
      spawnConfettiExplosion(width * 0.25, height * 0.4, 55);
      spawnConfettiExplosion(width * 0.75, height * 0.4, 55);
    }, 450);
  }

  if (btnOpenGift) {
    btnOpenGift.addEventListener('click', openGiftBox);
  }
  if (giftBox3D) {
    giftBox3D.addEventListener('click', openGiftBox);
  }

  /* ==========================================================================
     14. SCENE 8 — "WILL YOU STAY WITH ME?" DUAL ROMANTIC RESPONSES
     ========================================================================== */
  function handleProposalChoice(choiceType) {
    proposalResponse.classList.add('active');

    if (choiceType === 'ofcourse') {
      responseTitle.textContent = 'You Just Made My Heart So Full! ❤️';
      responseMessage.textContent =
        'Terima kasih sudah memilih untuk tetap tinggal. Aku berjanji akan selalu menjaga senyummu dan mencintaimu dengan sebaik-baiknya setiap hari.';
    } else {
      responseTitle.textContent = 'Forever & Always With You! 💗';
      responseMessage.textContent =
        'Mendengar kata "Selamanya" darimu adalah hadiah terindah di semesta ini. Mari kita tulis ribuan halaman bahagia bersama-sama.';
    }

    spawnConfettiExplosion(width / 2, height * 0.55, 90);
    spawnHeartBurst(width / 2, height * 0.55, 50);

    setTimeout(() => {
      proposalResponse.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 200);
  }

  if (btnStayOfCourse) {
    btnStayOfCourse.addEventListener('click', () => handleProposalChoice('ofcourse'));
  }
  if (btnStayForever) {
    btnStayForever.addEventListener('click', () => handleProposalChoice('forever'));
  }

  /* ==========================================================================
     15. SCENE 9 — THE FINAL SCENE & REPLAY STORY
     ========================================================================== */
  function triggerFinaleSequence() {
    if (finaleCameraStage) {
      finaleCameraStage.classList.add('camera-zoom-active');
    }

    finaleSteps.forEach((stepEl, idx) => {
      setTimeout(() => {
        stepEl.classList.add('step-visible');
        if (idx === finaleSteps.length - 1) {
          spawnHeartBurst(width / 2, height * 0.45, 55);
        }
      }, 650 + idx * 1300);
    });
  }

  if (btnReplayStory) {
    btnReplayStory.addEventListener('click', () => {
      // Reset interactive states for a fresh cinematic replay
      state.scene3Typed = false;
      state.finaleTriggered = false;
      finaleSteps.forEach((stepEl) => stepEl.classList.remove('step-visible'));
      if (finaleCameraStage) {
        finaleCameraStage.classList.remove('camera-zoom-active');
      }

      spawnHeartBurst(width / 2, height / 2, 40);
      navigateToScene(1, true);

      setTimeout(() => {
        document.body.classList.add('locked-scroll');
        runScene1Sequence();
      }, 600);
    });
  }

  /* ==========================================================================
     16. INITIALIZATION ON LOAD
     ========================================================================== */
  window.addEventListener('DOMContentLoaded', () => {
    window.scrollTo(0, 0);
    initAmbientParticles();
    requestAnimationFrame(renderLoop);
    runScene1Sequence();
  });
})();

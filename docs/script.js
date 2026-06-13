/* ==========================================================================
   CUSTOMER REVIEW INSIGHT AI — COMPANION JAVASCRIPT (script.js)
   ========================================================================= */

document.addEventListener('DOMContentLoaded', () => {

    /* --- MOBILE NAVIGATION TOGGLE --- */
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when links are clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    /* --- NAVBAR SCROLL STATE --- */
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* --- SCROLL PROGRESS INDICATOR --- */
    const scrollProgress = document.getElementById('scroll-progress');
    window.addEventListener('scroll', () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (totalHeight > 0) {
            const progress = (window.scrollY / totalHeight) * 100;
            scrollProgress.style.width = `${progress}%`;
        }
    });

    /* --- SCROLL REVEAL ANIMATION --- */
    const revealElements = document.querySelectorAll('.scroll-reveal');
    const checkReveal = () => {
        const triggerBottom = window.innerHeight * 0.85;
        revealElements.forEach(el => {
            const boxTop = el.getBoundingClientRect().top;
            if (boxTop < triggerBottom) {
                el.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', checkReveal);
    checkReveal(); // Trigger once on load to reveal above-the-fold content

    /* --- COUNT-UP NUMBERS ANIMATION --- */
    const animateNumbers = () => {
        const countElements = document.querySelectorAll('.animate-number');
        countElements.forEach(el => {
            const target = parseInt(el.getAttribute('data-target'), 10);
            const duration = 1500; // Total duration in ms
            const stepTime = Math.max(Math.floor(duration / target), 15);
            let current = 0;
            const increment = Math.ceil(target / (duration / stepTime));

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    el.textContent = target.toLocaleString();
                    clearInterval(timer);
                } else {
                    el.textContent = current.toLocaleString();
                }
            }, stepTime);
        });
    };

    // Trigger number animations once hero visual is fully in view
    setTimeout(animateNumbers, 300);

    /* --- INTERACTIVE DASHBOARD SIMULATOR --- */
    const dashboardChart = document.querySelector('.dashboard-chart-demo');
    if (dashboardChart) {
        // Add a trigger button dynamically for simulated review updates
        const chartHeader = dashboardChart.querySelector('.chart-header');
        const triggerBtn = document.createElement('button');
        triggerBtn.className = 'btn btn-secondary btn-simulate';
        triggerBtn.style.padding = '0.25rem 0.6rem';
        triggerBtn.style.fontSize = '0.7rem';
        triggerBtn.style.borderRadius = '6px';
        triggerBtn.style.marginLeft = 'auto';
        triggerBtn.style.marginRight = '10px';
        triggerBtn.textContent = 'Simulate Feed';
        chartHeader.insertBefore(triggerBtn, chartHeader.querySelector('.badge-active'));

        const reviewsProcessedVal = document.querySelector('.stat-box:nth-child(3) .animate-number');
        const latencyVal = document.querySelector('.stat-box:nth-child(2) .animate-number');

        triggerBtn.addEventListener('click', () => {
            // Disable button briefly
            triggerBtn.disabled = true;
            triggerBtn.textContent = 'Analyzing...';
            triggerBtn.style.opacity = '0.6';

            // Simulate random processing latency
            const randomLatency = Math.floor(Math.random() * 120) + 80; // 80ms to 200ms
            
            setTimeout(() => {
                // Randomly change aspect bars to simulate review batch processing
                const barRows = document.querySelectorAll('.chart-bar-row');
                barRows.forEach(row => {
                    const positiveBar = row.querySelector('.bar.positive');
                    const negativeBar = row.querySelector('.bar.negative');
                    const neutralBar = row.querySelector('.bar.neutral');
                    const label = row.querySelector('.aspect-pct');

                    const newPos = Math.floor(Math.random() * 50) + 35; // 35% to 85%
                    const newNeg = Math.floor(Math.random() * (90 - newPos));
                    const newNeu = 100 - newPos - newNeg;

                    positiveBar.style.width = `${newPos}%`;
                    negativeBar.style.width = `${newNeg}%`;
                    neutralBar.style.width = `${newNeu}%`;

                    label.textContent = `${newPos}% Pos`;
                });

                // Update reviews count and latency
                if (reviewsProcessedVal) {
                    const currReviews = parseInt(reviewsProcessedVal.textContent.replace(/,/g, ''), 10);
                    reviewsProcessedVal.textContent = (currReviews + Math.floor(Math.random() * 4) + 1).toLocaleString();
                }
                if (latencyVal) {
                    latencyVal.textContent = randomLatency;
                }

                // Re-enable button
                triggerBtn.disabled = false;
                triggerBtn.textContent = 'Simulate Feed';
                triggerBtn.style.opacity = '1';
            }, 800);
        });
    }
});

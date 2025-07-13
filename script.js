document.addEventListener('DOMContentLoaded', function() {
    // 1. Rolagem Suave para Links de Navegação
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // Fechar o menu mobile se estiver aberto
                if (document.body.classList.contains('menu-open')) {
                    toggleMobileMenu(); // Reutiliza a função de toggle
                }

                const headerOffset = document.querySelector('header').offsetHeight;
                const elementPosition = targetSection.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - (headerOffset + 20);

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 2. Validação Básica de Formulário de Contato (sem alterações)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const nome = document.getElementById('nome').value.trim();
            const email = document.getElementById('email').value.trim();
            const mensagem = document.getElementById('mensagem').value.trim();

            if (nome === '' || email === '' || mensagem === '') {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Por favor, insira um endereço de e-mail válido.');
                return;
            }

            console.log('Formulário enviado com sucesso!');
            alert('Sua mensagem foi enviada com sucesso! Em breve entraremos em contato.');
            contactForm.reset();
        });
    }

    // --- 3. Funcionalidade do Menu Mobile Aprimorada ---
    const hamburgerBtn = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    const menuOverlay = document.querySelector('.menu-overlay');
    const closeMenuBtn = document.querySelector('.close-menu-btn');
    const hamburgerIcon = hamburgerBtn.querySelector('i');

    // Função para abrir/fechar o menu
    function toggleMobileMenu() {
        navLinks.classList.toggle('active');
        document.body.classList.toggle('menu-open');

        // Troca o ícone do hambúrguer para X e vice-versa
        if (navLinks.classList.contains('active')) {
            hamburgerIcon.classList.remove('fa-bars');
            hamburgerIcon.classList.add('fa-times'); // Troca para X
            hamburgerBtn.setAttribute('aria-label', 'Fechar menu de navegação');
        } else {
            hamburgerIcon.classList.remove('fa-times');
            hamburgerIcon.classList.add('fa-bars'); // Troca para hambúrguer
            hamburgerBtn.setAttribute('aria-label', 'Abrir menu de navegação');
        }
    }

    // Abrir menu ao clicar no hambúrguer
    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', toggleMobileMenu);
    }

    // Fechar menu ao clicar no overlay
    if (menuOverlay) {
        menuOverlay.addEventListener('click', toggleMobileMenu);
    }

    // Fechar menu ao clicar no botão "X" dentro do menu
    if (closeMenuBtn) {
        closeMenuBtn.addEventListener('click', toggleMobileMenu);
    }

    // Fechar menu ao clicar em um link (seção) dentro do menu
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });

    // --- Nova Funcionalidade: Animação dos Cards na Rolagem ---
    const animatedCards = document.querySelectorAll('.service-item, .benefit-item, .testimonial-item');

    // Adiciona a classe base para animação
    animatedCards.forEach(card => {
        card.classList.add('animated-card');
    });

    const observerOptions = {
        root: null, // O viewport é o elemento raiz
        rootMargin: '0px', // Margem em torno do root
        threshold: 0.1 // O card se torna visível quando 10% dele está na viewport
    };

    const cardObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Se o card está visível, adiciona a classe de animação e para de observar
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observa cada card
    animatedCards.forEach(card => {
        cardObserver.observe(card);
    });
});

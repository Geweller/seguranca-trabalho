// MENU HAMBÚRGER RESPONSIVO
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });
}

// SUAVIZAR SCROLL DOS LINKS DE NAVEGAÇÃO
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Fechar menu hambúrger se estiver aberto
            if (navLinks) {
                navLinks.style.display = 'none';
            }
        }
    });
});

// FORMULÁRIO DE CONTATO
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obter valores do formulário
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const empresa = document.getElementById('empresa').value;
        const mensagem = document.getElementById('mensagem').value;
        
        // Validar campos
        if (!nome || !email || !empresa || !mensagem) {
            mostrarMensagem('Por favor, preencha todos os campos!', 'error');
            return;
        }
        
        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            mostrarMensagem('Por favor, insira um email válido!', 'error');
            return;
        }
        
        // Simular envio (em produção, você mandaria para um servidor)
        console.log({
            nome,
            email,
            empresa,
            mensagem
        });
        
        mostrarMensagem('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
        contactForm.reset();
        
        // Limpar mensagem após 5 segundos
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    });
}

// FUNÇÃO PARA MOSTRAR MENSAGEM
function mostrarMensagem(texto, tipo) {
    formMessage.textContent = texto;
    formMessage.className = `form-message ${tipo}`;
    formMessage.style.display = 'block';
}

// ANIMAÇÃO DE SCROLL
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideInLeft 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Aplicar observador aos cards
document.querySelectorAll('.dica-card, .ppe-item, .lei-card').forEach(card => {
    card.style.opacity = '0';
    observer.observe(card);
});

// EFEITO DE BOTÃO CTA
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', () => {
        const dicasSection = document.querySelector('#dicas');
        if (dicasSection) {
            dicasSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// ADICIONAR CLASSE ATIVA NO LINK DE NAVEGAÇÃO
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 200) {
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
            });
            
            const activeLink = document.querySelector(`.nav-links a[href="#${section.id}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
});

// ADICIONAR CSS PARA LINK ATIVO
const style = document.createElement('style');
style.textContent = `
    .nav-links a.active {
        color: var(--accent-color) !important;
    }
    .nav-links a.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// CONTADOR DE SEÇÕES VISITADAS
let secçõesVisitadas = new Set();

window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            secçõesVisitadas.add(section.id);
        }
    });
});

// LOG DE AÇÕES (para análise)
console.log('🛡️ Site de Segurança no Trabalho - Carregado com Sucesso');
console.log('Criado por: Gabriel Lima, Dayllon Kauan e Adryan Kaue');
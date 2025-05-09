// Função para criar ícones flutuantes no fundo
function createFloatingIcons() {
    const backgroundElement = document.getElementById('background-icons');
    const iconTypes = [
        '<svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>',
        '<svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>',
        '<svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>'
    ];
    
    // Criar 20 ícones flutuantes
    for (let i = 0; i < 20; i++) {
        const icon = document.createElement('div');
        icon.className = 'floating-icon';
        
        // Selecionar um ícone aleatório
        const iconIndex = Math.floor(Math.random() * iconTypes.length);
        icon.innerHTML = iconTypes[iconIndex];
        
        // Posição aleatória
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        // Tamanho aleatório
        const size = Math.random() * 20 + 10;
        
        // Velocidade e direção aleatórias
        const speed = Math.random() * 0.2 + 0.1;
        const direction = Math.random() * 360;
        
        // Aplicar estilos
        icon.style.left = `${x}%`;
        icon.style.top = `${y}%`;
        icon.style.width = `${size}px`;
        icon.style.height = `${size}px`;
        
        // Armazenar propriedades para animação
        icon.dataset.x = x;
        icon.dataset.y = y;
        icon.dataset.speed = speed;
        icon.dataset.direction = direction;
        
        backgroundElement.appendChild(icon);
    }
}

// Função para animar os ícones flutuantes
function animateFloatingIcons() {
    const icons = document.querySelectorAll('.floating-icon');
    
    icons.forEach(icon => {
        // Obter propriedades atuais
        let x = parseFloat(icon.dataset.x);
        let y = parseFloat(icon.dataset.y);
        const speed = parseFloat(icon.dataset.speed);
        let direction = parseFloat(icon.dataset.direction);
        
        // Calcular nova posição
        const radians = (direction * Math.PI) / 180;
        x += Math.cos(radians) * speed;
        y += Math.sin(radians) * speed;
        
        // Verificar limites e fazer ricochete
        if (x < 0 || x > 100) {
            direction = 180 - direction;
            x = Math.max(0, Math.min(100, x));
        }
        
        if (y < 0 || y > 100) {
            direction = 360 - direction;
            y = Math.max(0, Math.min(100, y));
        }
        
        // Atualizar posição
        icon.style.left = `${x}%`;
        icon.style.top = `${y}%`;
        
        // Atualizar propriedades
        icon.dataset.x = x;
        icon.dataset.y = y;
        icon.dataset.direction = direction;
    });
    
    // Continuar animação
    requestAnimationFrame(animateFloatingIcons);
}

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    createFloatingIcons();
    animateFloatingIcons();
    
    // Adicionar efeito de cursor piscando no terminal
    const terminalContent = document.querySelector('.terminal-content');
    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    cursor.textContent = '|';
    cursor.style.opacity = '1';
    cursor.style.animation = 'blink 1s infinite';
    
    // Adicionar regra de animação para o cursor
    const style = document.createElement('style');
    style.textContent = `
        @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    // Adicionar cursor ao final do conteúdo do terminal
    terminalContent.appendChild(cursor);
});

// Atualizar o ano atual no rodapé
document.addEventListener('DOMContentLoaded', () => {
    // Código existente...
    
    // Atualizar o ano atual no rodapé
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
    
    // Manipulação do formulário de contato
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Obter valores do formulário
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Aqui você pode adicionar código para enviar o formulário
            // Por exemplo, usando a API Fetch ou exibindo uma mensagem
            
            alert(`Obrigado ${name}! Sua mensagem foi enviada com sucesso.`);
            contactForm.reset();
        });
    }
    
    // Adicionar navegação suave para links de âncora
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Ajuste para o cabeçalho fixo
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Adicionar efeito de revelação ao rolar a página
    const revealElements = document.querySelectorAll('.section, .project-card');
    
    function checkReveal() {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('revealed');
            }
        });
    }
    
    // Adicionar classe para animação CSS
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Verificar elementos ao carregar a página
    checkReveal();
    
    // Verificar elementos ao rolar a página
    window.addEventListener('scroll', checkReveal);
});

// Função para marcar o link de navegação ativo com base na seção visível
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.menu-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active-link');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active-link');
        }
    });
}

// Adicionar classe CSS para link ativo
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .active-link {
            color: var(--marsala-dark) !important;
            border-color: var(--marsala-dark) !important;
            font-weight: 600;
        }
        
        .revealed {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    </style>
`);

// Atualizar link ativo ao rolar
window.addEventListener('scroll', updateActiveNavLink);
window.addEventListener('load', updateActiveNavLink);
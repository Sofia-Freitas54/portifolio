const menuButton = document.querySelector('#menu-toggle');
const mobileMenu = document.querySelector('#mobile-menu');

document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector('#menu-toggle');
  const closeButton = document.querySelector('#menu-close');
  const mobileMenu = document.querySelector('#mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  // Função para abrir o menu lateral
  if (menuButton && mobileMenu) {
    menuButton.addEventListener('click', (e) => {
      e.stopPropagation();
      mobileMenu.classList.remove('hidden');
      menuButton.setAttribute('aria-expanded', 'true');
    });
  }

  // Função para fechar o menu lateral (no botão X)
  if (closeButton && mobileMenu) {
    closeButton.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      menuButton.setAttribute('aria-expanded', 'false');
    });
  }

  // FECHAR MANDATORIAMENTE AO CLICAR EM QUALQUER OPÇÃO
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileMenu) {
        mobileMenu.classList.add('hidden');
        if (menuButton) menuButton.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Fecha se o usuário clicar fora do menu lateral
  document.addEventListener('click', (e) => {
    if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
      if (!mobileMenu.contains(e.target) && e.target !== menuButton) {
        mobileMenu.classList.add('hidden');
        if (menuButton) menuButton.setAttribute('aria-expanded', 'false');
      }
    }
  });

});

function calcularTempoEmpresa() {
        const dataInicio = new Date(2025, 4, 1); 
        const dataAtual = new Date();

        let anos = dataAtual.getFullYear() - dataInicio.getFullYear();
        let meses = dataAtual.getMonth() - dataInicio.getMonth();

        // Ajusta os meses e anos se o mês atual for menor que o mês de início
        if (meses < 0) {
          anos--;
          meses += 12;
        }

        // Formata o texto final dinamicamente
        let textoAnos = anos > 0 ? `${anos} ${anos === 1 ? 'ano' : 'anos'}` : '';
        let textoMeses = meses > 0 ? `${meses} ${meses === 1 ? 'mês' : 'meses'}` : '';
        
        let resultado = '';
        if (textoAnos && textoMeses) {
          resultado = `${textoAnos} e ${textoMeses}`;
        } else {
          resultado = textoAnos || textoMeses || 'Menos de um mês';
        }

        // Insere o resultado na tag com o id "tempo-atual"
        document.querySelector('#tempo-atual span').innerText = resultado;
      }
      
      // Executa a função assim que a página carrega
      window.addEventListener('DOMContentLoaded', calcularTempoEmpresa);



  document.addEventListener('DOMContentLoaded', () => {
    const textoCompleto = "Dados | Análise de Dados | Python | SQL";
    let index = 0;
    const velocidade = 60; // Velocidade da digitação em milissegundos por letra
    const elemento = document.getElementById('typing-text');
    
    function digitarTexto() {
      if (index < textoCompleto.length) {
        elemento.textContent += textoCompleto.charAt(index);
        index++;
        setTimeout(digitarTexto, velocidade);
      } else {
        // Quando termina de digitar, remove o cursor piscante após 2 segundos
        setTimeout(() => {
          elemento.classList.add('typing-done');
        }, 2000);
      }
    }
    
    // Inicia a digitação após o container surgir na tela (efeito do FadeInUp)
    setTimeout(digitarTexto, 1200);
  });

  document.addEventListener("DOMContentLoaded", () => {
  // 1. Aplica a classe de revelação nas seções principais de conteúdo
  const portfolioSection = document.querySelector("#portfolio h2");
  const projectCards = document.querySelectorAll("#portfolio .grid > div");
  const experienceSection = document.getElementById("experiencia");
  const educationSection = document.getElementById("educacao");

  // Adiciona a classe inicial de animação para os blocos
  if (portfolioSection) portfolioSection.classList.add("scroll-reveal");
  if (experienceSection) experienceSection.classList.add("scroll-reveal");
  if (educationSection) educationSection.classList.add("scroll-reveal");
  projectCards.forEach(card => card.classList.add("scroll-reveal"));

  // 2. Configura o observador para ativar os elementos quando visíveis na tela
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        // Opcional: remove a observação após animar para não repetir o efeito
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1, // Dispara a animação assim que 10% do item surgir na tela
    rootMargin: "0px 0px -50px 0px" // Adiciona uma margem sutil para disparar antes do rodapé
  });

  // Começa a observar cada elemento selecionado
  const elementsToReveal = document.querySelectorAll(".scroll-reveal");
  elementsToReveal.forEach((el) => revealObserver.observe(el));
});


document.addEventListener("DOMContentLoaded", () => {
  const techBadges = document.querySelectorAll(".tech-badge-anim");
  
  // Criamos um observador para assistir quando o bloco de tecnologias entra na tela
  const techObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Quando a seção fica visível, ativa cada tag com um atraso (delay) progressivo
        techBadges.forEach((badge, index) => {
          setTimeout(() => {
            badge.classList.add("reveal");
          }, index * 50); // 50ms de diferença sutil entre o surgimento de cada um
        });
        
        // Desativa o observador para rodar a animação apenas uma vez
        techObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15 // Dispara quando 15% da seção estiver visível
  });

  // Começa a observar o container pai das tecnologias
  const techContainer = document.getElementById("technologies");
  if (techContainer) {
    techObserver.observe(techContainer);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  
  // 1. ANIMAÇÃO GERAL DE SEÇÕES E CARDS
  const generalElements = document.querySelectorAll(".scroll-animate");
  
  const generalObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal");
        // Se quiser que a animação aconteça SEMPRE que rolar (e não só uma vez), remova a linha abaixo:
        generalObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 }); // Dispara quando 10% do elemento aparece

  generalElements.forEach((el) => generalObserver.observe(el));


  // 2. ANIMAÇÃO EM CASCATA (DOMINÓ) PARA AS TECNOLOGIAS
  const techBadges = document.querySelectorAll(".tech-badge-anim");
  const techContainer = document.getElementById("technologies");

  if (techContainer) {
    const techObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          techBadges.forEach((badge, index) => {
            setTimeout(() => {
              badge.classList.add("reveal");
            }, index * 50); // Atraso de 50ms entre cada tag
          });
          techObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    techObserver.observe(techContainer);
  }
});

// ==========================================
// VERCEL WEB ANALYTICS
// ==========================================
import { inject } from '@vercel/analytics';

inject();

// ==========================================
// 1. GERENCIAMENTO DO MENU LATERAL (MOBILE)
// ==========================================
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
      if (menuButton) menuButton.setAttribute('aria-expanded', 'false');
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

// ==========================================
// 2. CÁLCULO DE TEMPO DINÂMICO NA EMPRESA
// ==========================================
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
  const elementoTempo = document.querySelector('#tempo-atual span');
  if (elementoTempo) {
    elementoTempo.innerText = resultado;
  }
}

// Executa a função assim que a página carrega
window.addEventListener('DOMContentLoaded', calcularTempoEmpresa);

// ==========================================
// 3. EFEITO DE DIGITAÇÃO (TYPING EFFECT)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  const textoCompleto = "Dados | Análise de Dados | Python | SQL";
  let index = 0;
  const velocidade = 60; // Velocidade da digitação em milissegundos por letra
  const elemento = document.getElementById('typing-text');
  
  function digitarTexto() {
    if (elemento && index < textoCompleto.length) {
      elemento.textContent += textoCompleto.charAt(index);
      index++;
      setTimeout(digitarTexto, velocidade);
    } else if (elemento) {
      // Quando termina de digitar, remove o cursor piscante após 2 segundos
      setTimeout(() => {
        elemento.classList.add('typing-done');
      }, 2000);
    }
  }
  
  // Inicia a digitação após o container surgir na tela
  setTimeout(digitarTexto, 1200);
});

// ==========================================
// 4. ANIMAÇÕES UNIFICADAS VIA SCROLL (OBSERVER)
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  
  // Captura os elementos com as classes de animação do seu HTML
  const portfolioSection = document.querySelector("#portfolio h2");
  const projectCards = document.querySelectorAll("#portfolio .grid > div");
  const experienceSection = document.getElementById("experiencia");
  const educationSection = document.getElementById("educacao");
  const generalElements = document.querySelectorAll(".scroll-animate");

  // Adiciona uma classe base de revelação para unificar o comportamento do CSS
  if (portfolioSection) portfolioSection.classList.add("scroll-animate");
  if (experienceSection) experienceSection.classList.add("scroll-animate");
  if (educationSection) educationSection.classList.add("scroll-animate");
  projectCards.forEach(card => card.classList.add("scroll-animate"));

  // Recarrega a lista para incluir os itens acima configurados dinamicamente
  const elementsToAnimate = document.querySelectorAll(".scroll-animate");

  // Configura o observador único para ativar as seções e projetos na tela
  const generalObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Ativa todas as variações de classes que o seu CSS/Tailwind pode estar esperando
        entry.target.classList.add("reveal");
        entry.target.classList.add("active");
        
        // Remove a observação após animar para fixar o elemento na tela
        generalObserver.unobserve(entry.target);
      }
    });
  }, { 
    threshold: 0.1, 
    rootMargin: "0px 0px -50px 0px" 
  });

  // Inicia a observação de todos os blocos de conteúdo
  elementsToAnimate.forEach((el) => generalObserver.observe(el));

  // ANIMAÇÃO EM CASCATA (DOMINÓ) PARA AS TECNOLOGIAS
  const techBadges = document.querySelectorAll(".tech-badge-anim");
  const techContainer = document.getElementById("technologies");

  if (techContainer) {
    const techObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          techBadges.forEach((badge, index) => {
            setTimeout(() => {
              badge.classList.add("reveal");
              badge.classList.add("active");
            }, index * 50); // Atraso de 50ms entre cada tag
          });
          techObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    techObserver.observe(techContainer);
  }
});

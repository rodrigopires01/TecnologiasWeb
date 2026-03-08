
// HOVER PARCEIROS 


// Aguardar que o DOM esteja carregado
document.addEventListener('DOMContentLoaded', function() {
    initHoverParceiros();
});

function initHoverParceiros() {
    const parceirosBoxes = document.querySelectorAll('.grid-parceiros .grid-box');
    
    if (parceirosBoxes.length === 0) {
        console.log('Nenhum parceiro encontrado');
        return;
    }

    // Mapeamento dos nomes completos (baseado nos alts das imagens)
    const nomesCompletos = {
        'UAC': 'Universidade dos Açores',
        'HDES': 'Hospital do Divino Espírito Santo',
        'USISM': 'Unidade de Saúde da Ilha de São Miguel',
        'INOVA': 'Instituto de Inovação Tecnológica dos Açores',
    };

    // Para cada parceiro, preparar o efeito
    parceirosBoxes.forEach((box, index) => {
        // Obter a imagem e o seu texto alternativo
        const img = box.querySelector('img');
        if (!img) return;
        
        const altText = img.getAttribute('alt') || '';
        const nomeCompleto = nomesCompletos[altText] || altText || 'Parceiro CACA';
        
        // --- 1. Preparar o nome (se não existir) ---
        let nomeEl = box.querySelector('.parceiro-nome');
        if (!nomeEl) {
            nomeEl = document.createElement('div');
            nomeEl.className = 'parceiro-nome';
            nomeEl.textContent = nomeCompleto;
            box.appendChild(nomeEl);
        }
        
        // --- 2. Adicionar um overlay de brilho (se não existir) ---
        if (!box.querySelector('.parceiro-brilho')) {
            const brilhoEl = document.createElement('div');
            brilhoEl.className = 'parceiro-brilho';
            box.appendChild(brilhoEl);
        }
        
        // --- 3. Eventos para rato (hover) ---
        box.addEventListener('mouseenter', function() {
            this.classList.add('hover-ativo');
            // Para acessibilidade
            this.setAttribute('aria-label', `Parceiro: ${nomeCompleto} (em destaque)`);
        });
        
        box.addEventListener('mouseleave', function() {
            this.classList.remove('hover-ativo');
            this.setAttribute('aria-label', `Parceiro: ${nomeCompleto}`);
        });
        
        // --- 4. Suporte para teclado (acessibilidade) ---
        box.addEventListener('focusin', function() {
            this.classList.add('hover-ativo');
        });
        
        box.addEventListener('focusout', function() {
            this.classList.remove('hover-ativo');
        });
        
        // --- 5. Tornar o box focável ---
        if (!box.hasAttribute('tabindex')) {
            box.setAttribute('tabindex', '0');
        }
        box.setAttribute('role', 'button');
        box.setAttribute('aria-label', `Parceiro: ${nomeCompleto}`);
        
        // Opcional: pequeno delay para cada parceiro (efeito cascata)
        box.style.transitionDelay = (index * 0.05) + 's';
    });
}

// Validação simples do formulário de contato
document.addEventListener('DOMContentLoaded', function() { 
  const form = document.querySelector('.contacto-form form'); 
  if (form) {
    form.addEventListener('submit', function(event) { 
      event.preventDefault(); 
      // Limpar mensagens de erro anteriores 
      limparErros(); 

      // Pegar os valores dos campos pelas classes 
      const nome = document.querySelector('.nome_contacto')?.value.trim() ?? ''; 
      const email = document.querySelector('.email_contacto')?.value.trim() ?? ''; 
      const assunto = document.querySelector('.assunto_contacto')?.value.trim() ?? ''; 
      const mensagem = document.querySelector('.mensagem_contacto')?.value.trim() ?? ''; 

      let formValido = true; 

      // Validações simples
      if (nome === '') { 
        mostrarErro('.nome_contacto', 'Nome é obrigatório'); 
        formValido = false; 
      } 
      if (email === '') { 
        mostrarErro('.email_contacto', 'Email é obrigatório'); 
        formValido = false; 
      } else if (!email.includes('@') || !email.includes('.')) { 
        mostrarErro('.email_contacto', 'Email inválido (precisa ter @ e .)'); 
        formValido = false; 
      } 
      if (assunto === '') { 
        mostrarErro('.assunto_contacto', 'Assunto é obrigatório'); 
        formValido = false; 
      } 
      if (mensagem === '') { 
        mostrarErro('.mensagem_contacto', 'Mensagem é obrigatória'); 
        formValido = false; 
      } 

      if (formValido) { 
        alert('Mensagem enviada com sucesso!'); 
        form.reset(); 
      } 
    }); 
  }

  function mostrarErro(campoClass, mensagem) { 
    const campo = document.querySelector(campoClass); 
    if (!campo) return;

    const erroDiv = document.createElement('div'); 
    erroDiv.className = 'mensagem-erro'; 
    erroDiv.style.color = 'red'; 
    erroDiv.style.fontSize = '12px'; 
    erroDiv.style.marginTop = '2px'; 
    erroDiv.style.marginBottom = '5px'; 
    erroDiv.textContent = mensagem; 

    campo.parentNode.insertBefore(erroDiv, campo.nextSibling); 
    campo.style.border = '1px solid red'; 
  } 

  function limparErros() { 
    document.querySelectorAll('.mensagem-erro').forEach(function(elemento) { 
      elemento.remove(); 
    }); 
    const campos = document.querySelectorAll('.nome_contacto, .email_contacto, .assunto_contacto, .mensagem_contacto'); 
    campos.forEach(function(campo) { 
      campo.style.border = '1px solid #ccc'; 
    }); 
  } 

  
  // Botão "Voltar ao topo" 
  
  (function initFixedBackToTop() { 
    const btn = document.getElementById('toTop'); 
    if (!btn) return; 

    // Mostra/oculta aos 300px de scroll
    function updateVisibility() {
      btn.hidden = window.scrollY <= 300;
    }
    window.addEventListener('scroll', updateVisibility, { passive: true });
    updateVisibility(); // estado inicial

    // Ao clicar: sobe suavemente ao topo
    btn.addEventListener('click', () => { 
      window.scrollTo({ top: 0, behavior: 'smooth' });
      // (Opcional) focar o header após subir
      document.querySelector('header')?.focus?.(); 
    }); 
  })(); 
});

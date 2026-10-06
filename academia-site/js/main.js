// ---------- Menu mobile ----------
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var isOpen = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  // ---------- Acordeão (FAQ) ----------
  document.querySelectorAll('.accordion-trigger').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var panel = document.getElementById(btn.getAttribute('aria-controls'));
      var expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      btn.querySelector('.icon').textContent = expanded ? '+' : '\u2212';
      panel.style.maxHeight = expanded ? null : panel.scrollHeight + 'px';
    });
  });

  // ---------- Validação: formulário de matrícula ----------
  var matriculaForm = document.getElementById('form-matricula');
  if (matriculaForm) {
    matriculaForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var msg = document.getElementById('matricula-msg');
      var cpf = document.getElementById('cpf').value.replace(/\D/g, '');
      var modalidades = matriculaForm.querySelectorAll('input[name="modalidade"]:checked');

      // O formulário usa novalidate; por isso a checagem dos campos obrigatórios
      // e do formato de e-mail é feita aqui, via API de validação do navegador.
      var invalido = matriculaForm.querySelector(':invalid');
      if (invalido) {
        showMsg(msg, 'err', 'Preencha corretamente todos os campos obrigatórios e aceite o regulamento.');
        invalido.focus();
        return;
      }

      if (cpf.length !== 11) {
        showMsg(msg, 'err', 'Informe um CPF válido, com 11 dígitos.');
        return;
      }
      if (modalidades.length === 0) {
        showMsg(msg, 'err', 'Selecione ao menos uma modalidade de interesse.');
        return;
      }

      showMsg(msg, 'ok', 'Pré-matrícula enviada com sucesso! Nossa equipe vai confirmar seus dados e agendar a avaliação física. (Este é um formulário de demonstração, sem envio real a um servidor.)');
      matriculaForm.reset();
    });
  }

  function showMsg(el, type, text) {
    if (!el) return;
    el.textContent = text;
    el.classList.remove('ok', 'err');
    el.classList.add('show', type);
  }
});

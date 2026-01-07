document.addEventListener('DOMContentLoaded', () => {
    const perfilSelect = document.getElementById('perfil_id');
    const form = document.getElementById('cadastro-form');
    const messageDiv = document.getElementById('message');

    // Busca os perfis de acesso na API
    fetch('/api/perfis')
        .then(response => {
            if (!response.ok) {
                throw new Error('Não foi possível carregar os perfis de acesso.');
            }
            return response.json();
        })
        .then(perfis => {
            perfilSelect.innerHTML = '<option value="">Selecione um perfil</option>'; // Limpa o "Carregando..."
            perfis.forEach(perfil => {
                const option = document.createElement('option');
                option.value = perfil.id;
                option.textContent = perfil.nome;
                perfilSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Erro ao buscar perfis:', error);
            perfilSelect.innerHTML = '<option value="">Erro ao carregar perfis</option>';
            perfilSelect.disabled = true;
        });

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        messageDiv.style.display = 'none';
        messageDiv.className = 'message';

        const formData = new FormData(form);
        const data = {
            nome: formData.get('nome'),
            email: formData.get('email'),
            senha: formData.get('senha'),
            perfil_id: parseInt(formData.get('perfil_id'), 10)
        };

        // Assume-se que a API de usuários está em /api/usuarios
        fetch('/api/usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => {
            if (response.status === 201) {
                return response.json();
            }
            return response.json().then(err => { throw new Error(err.erro || 'Ocorreu um erro no cadastro.') });
        })
        .then(result => {
            messageDiv.textContent = `Usuário "${result.nome}" cadastrado com sucesso!`;
            messageDiv.classList.add('success');
            messageDiv.style.display = 'block';
            form.reset();
        })
        .catch(error => {
            messageDiv.textContent = `Erro: ${error.message}`;
            messageDiv.classList.add('error');
            messageDiv.style.display = 'block';
        });
    });
});

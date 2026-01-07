document.addEventListener('DOMContentLoaded', () => {
    const table = document.getElementById('avaliacoes-table');
    const tbody = document.getElementById('avaliacoes-tbody');
    const filtroInput = document.getElementById('filtro-nome');
    const loadingMessage = document.getElementById('loading-message');
    const errorMessage = document.getElementById('error-message');

    let allEvaluations = [];

    const renderTable = (data) => {
        tbody.innerHTML = '';
        if (data.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" style="text-align: center;">Nenhuma avaliação encontrada.</td></tr>';
            return;
        }

        data.forEach(aval => {
            const statusClass = `status-${(aval.avaliacao_status || 'outro').toLowerCase().replace(' ', '-')}`;
            
            const row = `
                <tr>
                    <td>${aval.avaliacao_id}</td>
                    <td>${aval.colaborador_nome}</td>
                    <td>${aval.ciclo_nome}</td>
                    <td>${aval.avaliacao_tipo}</td>
                    <td><span class="status-badge ${statusClass}">${aval.avaliacao_status}</span></td>
                    <td>${aval.score_final_merito !== null ? aval.score_final_merito : 'N/A'}</td>
                </tr>
            `;
            tbody.innerHTML += row;
        });
    };

    fetch('/api/avaliacoes')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na API: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            allEvaluations = data;
            renderTable(allEvaluations);
            loadingMessage.style.display = 'none';
            table.style.display = 'table';
        })
        .catch(error => {
            console.error('Erro ao buscar avaliações:', error);
            loadingMessage.style.display = 'none';
            errorMessage.textContent = 'Não foi possível carregar os dados das avaliações. Verifique a API e tente novamente.';
            errorMessage.style.display = 'block';
        });

    filtroInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredData = allEvaluations.filter(aval => 
            aval.colaborador_nome.toLowerCase().includes(searchTerm)
        );
        renderTable(filteredData);
    });
});

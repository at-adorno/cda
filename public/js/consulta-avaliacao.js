document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('consulta-form');
    const messageDiv = document.getElementById('message');
    const resultsContainer = document.getElementById('results-container');
    const btnVerDetalhes = document.getElementById('btn-ver-detalhes');
    const detalhesContainer = document.getElementById('detalhes-pontuacoes');
    const listaPontuacoes = document.getElementById('lista-pontuacoes');
    
    const fields = {
        colaborador_nome: document.getElementById('colaborador_nome'),
        ciclo_nome: document.getElementById('ciclo_nome'),
        ciclo_periodo: document.getElementById('ciclo_periodo'),
        avaliacao_status: document.getElementById('avaliacao_status'),
        avaliacao_tipo: document.getElementById('avaliacao_tipo'),
        nine_box_posicao: document.getElementById('nine_box_posicao'),
        score_final_merito: document.getElementById('score_final_merito'),
        avaliacao_comentario: document.getElementById('avaliacao_comentario'),
    };

    let currentAvaliacaoId = null;

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        messageDiv.style.display = 'none';
        resultsContainer.style.display = 'none';
        detalhesContainer.style.display = 'none';
        btnVerDetalhes.style.display = 'none';

        const colaboradorId = document.getElementById('colaborador_id').value;
        if (!colaboradorId) {
            messageDiv.textContent = 'Por favor, insira um ID de colaborador.';
            messageDiv.classList.add('error');
            messageDiv.style.display = 'block';
            return;
        }

        // Assumindo que a API está em /api/colaboradores/:id/ultima-avaliacao
        const apiUrl = `/api/colaboradores/${colaboradorId}/ultima-avaliacao`;

        fetch(apiUrl)
        .then(response => {
            if (response.status === 404) {
                throw new Error('Colaborador não encontrado ou sem avaliação no ciclo mais recente. Verifique o ID.');
            }
            if (!response.ok) {
                throw new Error('Não foi possível conectar ao servidor. Verifique se a API está rodando.');
            }
            return response.json();
        })
        .then(data => {
            if (!data) {
               throw new Error('A resposta da API não contém dados.');
            }
            
            currentAvaliacaoId = data.avaliacao_id;

            const formatDate = (dateStr) => {
                if (!dateStr) return 'N/A';
                const date = new Date(dateStr);
                return date.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
            }

            fields.colaborador_nome.textContent = data.colaborador_nome || 'Nome não encontrado';
            fields.ciclo_nome.textContent = data.ciclo_nome || '-';
            fields.ciclo_periodo.textContent = `${formatDate(data.ciclo_data_inicio)} a ${formatDate(data.ciclo_data_fim)}`;
            fields.avaliacao_status.textContent = data.avaliacao_status || '-';
            fields.avaliacao_tipo.textContent = data.avaliacao_tipo || '-';
            fields.nine_box_posicao.textContent = data.posicao_x_potencial && data.posicao_y_desempenho 
                ? `${data.posicao_y_desempenho} / ${data.posicao_x_potencial}` 
                : '-';
            fields.score_final_merito.textContent = data.score_final_merito !== null ? data.score_final_merito : '-';
            fields.avaliacao_comentario.textContent = data.avaliacao_comentario || 'Nenhum comentário.';

            resultsContainer.style.display = 'block';
            if (currentAvaliacaoId) {
                btnVerDetalhes.style.display = 'block';
            }
        })
        .catch(error => {
            messageDiv.textContent = `Erro: ${error.message}`;
            messageDiv.classList.add('error');
            messageDiv.style.display = 'block';
        });
    });

    btnVerDetalhes.addEventListener('click', () => {
        if (!currentAvaliacaoId) return;

        // Evita recarregar se já estiver visível
        if (detalhesContainer.style.display === 'block') {
            detalhesContainer.style.display = 'none';
            btnVerDetalhes.textContent = 'Ver Detalhes das Pontuações';
            return;
        }

        fetch(`/api/pontuacoes?avaliacao_id=${currentAvaliacaoId}`)
            .then(res => res.json())
            .then(pontuacoes => {
                listaPontuacoes.innerHTML = '';
                if (pontuacoes.length === 0) {
                    listaPontuacoes.innerHTML = '<tr><td colspan="3" style="text-align:center;">Nenhuma pontuação detalhada encontrada.</td></tr>';
                } else {
                    pontuacoes.forEach(p => {
                        const itemNome = p.competencia_nome || p.meta_titulo || 'Item Geral';
                        const row = `<tr>
                            <td>${itemNome}</td>
                            <td>${p.nota}</td>
                            <td>${p.comentario || '-'}</td>
                        </tr>`;
                        listaPontuacoes.innerHTML += row;
                    });
                }
                detalhesContainer.style.display = 'block';
                btnVerDetalhes.textContent = 'Ocultar Detalhes';
            })
            .catch(err => {
                console.error('Erro ao buscar pontuações:', err);
                alert('Não foi possível carregar os detalhes das pontuações.');
            });
    });
});

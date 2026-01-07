document.addEventListener('DOMContentLoaded', () => {
    const selector = document.getElementById('colaborador-selector');
    const dataContainer = document.getElementById('data-container');
    const nomeDisplay = document.getElementById('nome-colaborador-display');
    const nineBoxContainer = document.getElementById('nine-box-container');
    const avaliacoesContainer = document.getElementById('avaliacoes-container');

    async function populateCollaboratorSelector() {
        try {
            const response = await fetch('/api/colaboradores');
            if (!response.ok) throw new Error('Não foi possível carregar a lista de colaboradores.');
            const colaboradores = await response.json();
            
            selector.innerHTML = '<option value="">-- Selecione --</option>'; 
            colaboradores.forEach(col => {
                const option = document.createElement('option');
                option.value = col.id;
                option.textContent = `${col.nome} (ID: ${col.id})`;
                selector.appendChild(option);
            });
        } catch (error) {
            selector.innerHTML = `<option value="">${error.message}</option>`;
        }
    }

    async function fetchAndRenderData(colaboradorId) {
        if (!colaboradorId) {
            dataContainer.style.display = 'none';
            return;
        }

        const selectedOption = selector.options[selector.selectedIndex];
        nomeDisplay.textContent = selectedOption.text.split(' (ID:')[0];
        dataContainer.style.display = 'block';
        
        nineBoxContainer.innerHTML = '<p>Carregando...</p>';
        avaliacoesContainer.innerHTML = '<p>Carregando...</p>';

        try {
            const nineBoxPromise = fetch(`/api/colaboradores/${colaboradorId}/ultima-avaliacao`).then(res => res.json());
            const avaliacoesPromise = fetch(`/api/avaliacoes?avaliado_id=${colaboradorId}`).then(res => res.json());
            
            const [nineBoxData, avaliacoesData] = await Promise.all([nineBoxPromise, avaliacoesPromise]);

            renderNineBox(Array.isArray(nineBoxData) ? nineBoxData : [nineBoxData]);
            renderAvaliacoes(Array.isArray(avaliacoesData) ? avaliacoesData : [avaliacoesData]);

        } catch (error) {
            console.error('Erro ao buscar dados:', error);
            nineBoxContainer.innerHTML = '<p>Não foi possível carregar os dados do Nine Box.</p>';
            avaliacoesContainer.innerHTML = '<p>Não foi possível carregar as avaliações.</p>';
        }
    }

    function renderNineBox(data) {
        // A API de NineBox parece retornar um array, então pegamos o mais recente se houver.
        const latestNineBox = data.sort((a, b) => new Date(b.data_calculo) - new Date(a.data_calculo))[0];

        if (!latestNineBox) {
            nineBoxContainer.innerHTML = '<p>Nenhum dado de Nine Box encontrado para este ciclo.</p>';
            return;
        }
        
        const { posicao_x_potencial, posicao_y_desempenho, score_final_merito, score_competencias, score_metas, elegivel_carreira } = latestNineBox;

        nineBoxContainer.innerHTML = `
            <div style="text-align: center; margin-bottom: 20px;">
                <span class="score-highlight">${score_final_merito || 0}</span>
                <p>Score Final de Mérito</p>
            </div>
            <div style="display: flex; gap: 40px; flex-wrap: wrap; justify-content: center; width: 100%;">
                <div><strong>Potencial (X):</strong> ${posicao_x_potencial || 'N/A'}<br><strong>Desempenho (Y):</strong> ${posicao_y_desempenho || 'N/A'}</div>
                <div><strong>Competências:</strong> ${score_competencias || 0}<br><strong>Metas:</strong> ${score_metas || 0}</div>
                <div><strong>Elegível Carreira:</strong> ${elegivel_carreira ? 'Sim' : 'Não'}</div>
            </div>
        `;
    }

    function renderAvaliacoes(listaAvaliacoes) {
        avaliacoesContainer.innerHTML = '';
        if (!listaAvaliacoes || listaAvaliacoes.length === 0) {
            avaliacoesContainer.innerHTML = '<p>Nenhuma avaliação histórica encontrada.</p>';
            return;
        }

        listaAvaliacoes.forEach(av => {
            const dataEnvio = av.data_envio ? new Date(av.data_envio).toLocaleDateString('pt-BR') : 'Pendente';
            const statusClass = (av.status || '').toLowerCase();
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <div class="card-header">
                    <span>${av.tipo || 'Avaliação'}</span>
                    <span class="badge ${statusClass}">${av.status || 'N/A'}</span>
                </div>
                <div class="card-body">
                    <p><strong>Pontuação:</strong> ${av.pontuacao_merito ?? '-'}</p>
                    <p><strong>Data Envio:</strong> ${dataEnvio}</p>
                    <p><strong>Comentário:</strong> ${av.comentario || 'Sem comentários'}</p>
                </div>`;
            avaliacoesContainer.appendChild(card);
        });
    }

    selector.addEventListener('change', () => {
        fetchAndRenderData(selector.value);
    });

    populateCollaboratorSelector();
});

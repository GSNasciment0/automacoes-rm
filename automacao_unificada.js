// automacao_unificada.js - V2.0 - Script Unificado com Interface Avançada

(async function() {
    // 1. Prevenção de Duplicidade
    if (document.getElementById("gm-master-panel")) {
        console.log("O painel de automação master já está aberto.");
        return;
    }

    // 2. CSS Unificado (V2.0: Suporte a Drag, Minimize e Tema Escuro)
    const css = `
        #gm-master-panel {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 550px;
            max-width: 95%;
            background: #f9f9f9;
            border: 2px solid #007bff;
            border-radius: 8px;
            z-index: 999999;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
            font-family: Arial, sans-serif;
            transition: width 0.3s, height 0.3s; /* Para a minimização */
        }
        #gm-master-panel.minimized {
            width: 300px;
            height: auto;
        }
        #gm-master-panel.minimized .gm-content {
            display: none !important;
        }
        #gm-master-panel * {
            font-family: Arial, sans-serif;
            transition: color 0.3s, background-color 0.3s;
        }

        /* Tema Claro (Padrão) */
        .gm-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px;
            background: #007bff;
            color: white;
            border-radius: 6px 6px 0 0;
            font-weight: bold;
            cursor: move; /* Indica que pode ser arrastado */
        }
        .gm-controls {
            display: flex;
            gap: 5px;
        }
        .gm-header button {
            background: none;
            border: none;
            color: white;
            font-size: 16px;
            cursor: pointer;
            padding: 0 5px;
            font-weight: bold;
        }
        .gm-content {
            padding: 15px;
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        #gm-text-input {
            width: 98%;
            height: 150px;
            padding: 8px;
            border: 1px solid #ccc;
            border-radius: 4px;
            resize: vertical;
            background: white;
            color: #333;
        }
        .gm-actions {
            display: flex;
            gap: 10px;
            align-items: stretch;
            margin-bottom: 10px;
        }
        .gm-actions button {
            border: none;
            padding: 10px;
            font-size: 14px;
            font-weight: bold;
            border-radius: 4px;
            cursor: pointer;
            flex-grow: 1;
            transition: background-color 0.2s, color 0.2s;
        }
        /* Estilos dos botões */
        #gm-btn-paste {background: #ffc107; color: #333; width: 40px; height: 40px; flex-grow: 0; display: flex; align-items: center; justify-content: center;}
        #gm-btn-paste:hover {background: #e0a800;}
        #gm-btn-cliente {background: #28a745; color: white;}
        #gm-btn-cliente:hover {background: #218838;}
        #gm-btn-veiculo {background: #17a2b8; color: white;}
        #gm-btn-veiculo:hover {background: #138496;}

        /* Log Section */
        .gm-log-section h4 {margin:0 0 5px 0; font-size:14px}
        #gm-log-output {
            background:#fff;
            border:1px solid #eee;
            border-radius:4px;
            padding:10px;
            height:100px;
            overflow-y:auto;
            font-size:12px;
            font-family:'Courier New',Courier,monospace;
            color:#333
        }
        .gm-log-error {color:#d9534f;font-weight:bold}
        .gm-log-success {color:#5cb85c;font-weight:bold}

        /* =================================== */
        /* TEMA ESCURO */
        /* =================================== */
        #gm-master-panel.dark-mode {
            background: #333;
            border-color: #00bcd4;
            color: #ccc;
        }
        #gm-master-panel.dark-mode .gm-header {
            background: #00bcd4;
        }
        #gm-master-panel.dark-mode #gm-text-input {
            background: #444;
            color: #eee;
            border-color: #666;
        }
        #gm-master-panel.dark-mode #gm-log-output {
            background: #444;
            color: #ccc;
            border-color: #666;
        }
        #gm-master-panel.dark-mode .gm-log-error {
            color: #ff8a80; /* Vermelho mais suave */
        }
        #gm-master-panel.dark-mode .gm-log-success {
            color: #a5d6a7; /* Verde mais suave */
        }
        #gm-master-panel.dark-mode .gm-header button {
            color: #eee;
        }
    `;

    // Adiciona o CSS ao HEAD
    const style = document.createElement("style");
    style.appendChild(document.createTextNode(css));
    style.id = "gm-master-style";
    document.head.appendChild(style);

    // 3. Estrutura HTML do Painel (Novo Header)
    const panel = document.createElement("div");
    panel.id = "gm-master-panel";
    
    // Configura a posição inicial (será ajustada pelo CSS e JS)
    panel.style.top = "100px";
    panel.style.left = "100px";
    panel.style.transform = "none";
    
    panel.innerHTML = `
        <div class="gm-header" id="gm-header-drag">
            <span>🚀 Automação Master (Cliente & Veículo)</span>
            <div class="gm-controls">
                <button id="gm-btn-theme" title="Alternar Tema">💡</button>
                <button id="gm-btn-minimize" title="Minimizar">➖</button>
                <button id="gm-btn-close" title="Fechar">X</button>
            </div>
        </div>
        <div class="gm-content">
            
            <div class="gm-controls-top">
                <input type="checkbox" id="gm-is-ileva-checkbox" style="width:20px;height:20px;">
                <label for="gm-is-ileva-checkbox" style="font-weight:bold;">Cliente pertence à ILEVA?</label>
            </div>

            <label for="gm-text-input" style="font-weight:bold;">Cole o texto completo do PDF/Contrato aqui:</label>
            <textarea id="gm-text-input" placeholder="Cole o texto copiado aqui."></textarea>
            
            <div class="gm-actions">
                <button id="gm-btn-paste" title="Colar da Área de Transferência">
                    <svg style="width:20px;height:20px;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="10" y="4" width="4" height="4" rx="1"/><path d="M14 2c2.2 0 4 1.8 4 4v14c0 1.1-.9 2-2 2H8c-1.1 0-2-.9-2-2V6c0-2.2 1.8-4 4-4z"/></svg>
                </button>
                <button id="gm-btn-cliente">Preencher Cliente</button>
                <button id="gm-btn-veiculo">Preencher Veículo</button>
            </div>

            <div class="gm-log-section">
                <h4>📜 Log de Execução</h4>
                <div id="gm-log-output"></div>
            </div>
        </div>
    `;
    document.body.appendChild(panel);

    // 4. Referências e Funções Utilitárias (Mantidas)
    const logArea = panel.querySelector("#gm-log-output");
    const input = panel.querySelector("#gm-text-input");
    const headerDrag = panel.querySelector("#gm-header-drag");
    const btnMinimize = panel.querySelector("#gm-btn-minimize");
    const btnClose = panel.querySelector("#gm-btn-close");
    const btnTheme = panel.querySelector("#gm-btn-theme");
    
    // Função de Log (Mantida)
    const log = (msg, type = "info") => { /* ... (mesma lógica) ... */ 
        const div = document.createElement("div");
        div.textContent = `[${new Date().toLocaleTimeString()}] ${msg}`;
        if (type === "error") div.className = "gm-log-error";
        if (type === "success") div.className = "gm-log-success";
        logArea.appendChild(div);
        logArea.scrollTop = logArea.scrollHeight;
    };
    
    // Funções de Extração/Preenchimento (Mantidas)
    const handlePaste = async () => { /* ... (mesma lógica) ... */ };
    const setField = (id, value, label) => { /* ... (mesma lógica) ... */ };
    const cleanPhone = e => { /* ... (mesma lógica) ... */ };
    const extractClientData = (text) => { /* ... (mesma lógica) ... */ };
    const fillClientForm = (extractedData, isIleva) => { /* ... (mesma lógica) ... */ };
    const extractVehicleData = (text) => { /* ... (mesma lógica) ... */ };
    const fillVehicleForm = (extractedData) => { /* ... (mesma lógica) ... */ };


    // ===========================================
    // NOVAS FUNÇÕES DE INTERFACE (V2.0)
    // ===========================================

    // Funções para tornar o painel móvel (Drag and Drop)
    const makeDraggable = (element, dragHandle) => {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        dragHandle.onmousedown = dragMouseDown;

        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            // Posição inicial do cursor
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            // Calcular nova posição do cursor
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // Definir a nova posição do elemento
            element.style.top = (element.offsetTop - pos2) + "px";
            element.style.left = (element.offsetLeft - pos1) + "px";
        }

        function closeDragElement() {
            // Parar de mover quando o botão do mouse for solto
            document.onmouseup = null;
            document.onmousemove = null;
        }
    };
    makeDraggable(panel, headerDrag);
    
    // Função para Minimizar/Maximizar
    const toggleMinimize = () => {
        const isMin = panel.classList.toggle("minimized");
        btnMinimize.textContent = isMin ? "➕" : "➖";
        btnMinimize.title = isMin ? "Maximizar" : "Minimizar";
        log(isMin ? "Painel minimizado." : "Painel maximizado.");
    };

    // Função para Alternar Tema
    const toggleTheme = () => {
        const isDark = panel.classList.toggle("dark-mode");
        btnTheme.textContent = isDark ? "🌙" : "💡";
        btnTheme.title = isDark ? "Tema Claro" : "Tema Escuro";
        localStorage.setItem('gm_automacao_theme', isDark ? 'dark' : 'light');
        log(`Tema alterado para ${isDark ? 'Escuro' : 'Claro'}.`);
    };

    // Aplica o tema salvo (se houver)
    if (localStorage.getItem('gm_automacao_theme') === 'dark') {
        toggleTheme();
    }


    // 5. Conexão de Eventos dos Botões (Listeneres - ATUALIZADO)
    
    // 5.1 Eventos da Interface
    panel.querySelector("#gm-btn-paste").addEventListener("click", handlePaste);
    btnMinimize.addEventListener("click", toggleMinimize);
    btnTheme.addEventListener("click", toggleTheme);
    
    // CORREÇÃO: O evento de fechar estava no lugar errado
    btnClose.addEventListener("click", () => {
        panel.remove();
        document.getElementById("gm-master-style")?.remove();
        log("Painel fechado e recursos limpos.", "info"); // Este log não será visto, mas é bom para a lógica
    });


    // 5.2 Eventos de Ação (Mantidos)
    panel.querySelector("#gm-btn-cliente").addEventListener("click", () => {
        logArea.innerHTML = ""; // Limpa o log
        const text = input.value;
        if (!text) return log("O campo de texto está vazio. Cole os dados primeiro.", "error");

        const isIleva = panel.querySelector("#gm-is-ileva-checkbox").checked;
        const clientData = extractClientData(text);
        
        if (clientData) {
            fillClientForm(clientData, isIleva);
        } else {
            log("A automação de Cliente falhou. Verifique os logs e o texto colado.", "error");
        }
    });

    panel.querySelector("#gm-btn-veiculo").addEventListener("click", () => {
        logArea.innerHTML = ""; // Limpa o log
        const text = input.value;
        if (!text) return log("O campo de texto está vazio. Cole os dados primeiro.", "error");

        const vehicleData = extractVehicleData(text);
        
        if (vehicleData) {
            fillVehicleForm(vehicleData);
        } else {
            log("A automação de Veículo falhou. Verifique os logs e o texto colado.", "error");
        }
    });

    log("Painel de automação Master V2.0 (Móvel, Temático) carregado e pronto.", "success");

})();

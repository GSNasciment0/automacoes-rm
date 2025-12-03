// automacao_master.js - V1.0 - Script Unificado

(function() {
    // 1. Prevenção de Duplicidade
    if (document.getElementById("gm-master-panel")) {
        console.log("O painel de automação unificada já está aberto.");
        return;
    }

    // 2. CSS Unificado
    const css = `#gm-master-panel{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:550px;max-width:95%;background:#f9f9f9;border:2px solid #007bff;border-radius:8px;z-index:999999;box-shadow:0 5px 15px rgba(0,0,0,0.5);font-family:Arial,sans-serif}#gm-master-panel *{font-family:Arial,sans-serif}.gm-header{display:flex;justify-content:space-between;align-items:center;padding:10px;background:#007bff;color:white;border-radius:6px 6px 0 0;font-weight:bold}.gm-header button{background:none;border:none;color:white;font-size:16px;cursor:pointer}.gm-content{padding:15px;display:flex;flex-direction:column;gap:10px}#gm-text-input{width:98%;height:150px;padding:8px;border:1px solid #ccc;border-radius:4px;resize:vertical}.gm-actions{display:flex;gap:10px;align-items:stretch;margin-bottom: 10px;}.gm-actions button{border:none;padding:10px;font-size:14px;font-weight:bold;border-radius:4px;cursor:pointer;flex-grow:1;transition:background-color 0.2s}#gm-btn-paste{background:#ffc107;color:#333;width:40px;height:40px;flex-grow:0;display:flex;align-items:center;justify-content:center}#gm-btn-paste:hover{background:#e0a800}#gm-btn-cliente{background:#28a745;color:white}#gm-btn-cliente:hover{background:#218838}#gm-btn-veiculo{background:#17a2b8;color:white}#gm-btn-veiculo:hover{background:#138496}.gm-controls-top{display: flex; gap: 10px; align-items: center; margin-bottom: 10px;}.gm-log-section{margin-top: 10px;}.gm-log-section h4{margin:0 0 5px 0;font-size:14px}#gm-log-output{background:#fff;border:1px solid #eee;border-radius:4px;padding:10px;height:100px;overflow-y:auto;font-size:12px;font-family:'Courier New',Courier,monospace;color:#333}.gm-log-error{color:#d9534f;font-weight:bold}.gm-log-success{color:#5cb85c;font-weight:bold}`;

    // Adiciona o CSS ao HEAD
    const style = document.createElement("style");
    style.appendChild(document.createTextNode(css));
    style.id = "gm-master-style";
    document.head.appendChild(style);

    // 3. Estrutura HTML do Painel
    const panel = document.createElement("div");
    panel.id = "gm-master-panel";
    panel.innerHTML = `
        <div class="gm-header">
            <span>🚀 Automação Cadastro Unificado (Cliente & Veículo)</span>
            <button id="gm-btn-close">X</button>
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

    // 4. Referências e Eventos Básicos
    const logArea = panel.querySelector("#gm-log-output");
    const input = panel.querySelector("#gm-text-input");
    
    // Função de Log
    const log = (msg, type = "info") => {
        const div = document.createElement("div");
        div.textContent = `[${new Date().toLocaleTimeString()}] ${msg}`;
        if (type === "error") div.className = "gm-log-error";
        if (type === "success") div.className = "gm-log-success";
        logArea.appendChild(div);
        logArea.scrollTop = logArea.scrollHeight;
    };

    // Evento Fechar
    panel.querySelector("#gm-btn-close").addEventListener("click", () => {
        panel.remove();
        document.getElementById("gm-master-style")?.remove();
    });
    
    // O restante do código (Lógica de Extração e Preenchimento) virá aqui na Etapa 2
    // ...
    
    // Adicione esta linha no final para simular o restante das funções
    log("Painel de automação carregado. Aguardando dados.", "success");

})();

// automacao_unificada.js - V2.19 - Correção ReferenceError (THEMES)

(async function() {
    // 1. Prevenção de Duplicidade
    if (document.getElementById("gm-master-panel")) {
        console.log("O painel de automação master já está aberto.");
        return;
    }

    // ===========================================
    // 2. CSS e Temas (Modernizado com 7 Cores)
    // ===========================================
    const css = `
/* --- 1. Estilos Base (Aplicados em todos os temas) --- */
#gm-master-panel {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 550px; /* Largura ligeiramente maior para modernizar */
    max-width: 95%;
    border-radius: 12px; /* Cantos mais arredondados */
    z-index: 999999;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2); /* Sombra mais suave e moderna */
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    transition: width 0.3s, height 0.3s, background-color 0.3s, color 0.3s, border-color 0.3s;
}
#gm-master-panel.minimized {
    width: 300px;
    height: auto;
}
#gm-master-panel.minimized .gm-content {
    display: none !important;
}
#gm-master-panel * {
    font-family: inherit;
    box-sizing: border-box;
    transition: color 0.3s, background-color 0.3s;
}
.gm-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 15px;
    border-radius: 12px 12px 0 0;
    font-weight: 600;
    font-size: 16px;
    cursor: move;
    transition: background-color 0.3s, color 0.3s;
}
.gm-controls {
    display: flex;
    gap: 5px;
}
.gm-header button {
    background: none;
    border: none;
    font-size: 18px;
    cursor: pointer;
    margin-left: 10px;
    padding: 0;
    font-weight: bold;
    transition: color 0.2s, transform 0.2s;
}
.gm-header button:hover {
    transform: scale(1.1);
}
.gm-content {
    padding: 15px;
    display: flex;
    flex-direction: column;
    gap: 12px;
}
textarea, input[type="text"] {
    width: 100%;
    min-height: 100px;
    padding: 10px;
    border-radius: 8px;
    resize: vertical;
    border: 1px solid;
    transition: background-color 0.3s, color 0.3s, border-color 0.3s;
}
.gm-actions {
    display: flex;
    gap: 10px;
}
.gm-actions button {
    border: none;
    padding: 12px;
    font-size: 15px;
    font-weight: 600;
    border-radius: 8px;
    cursor: pointer;
    flex-grow: 1;
    transition: background-color 0.2s, opacity 0.2s;
    text-shadow: 0 1px 1px rgba(0,0,0,0.1);
}
.gm-actions button:hover {
    opacity: 0.9;
}

/* Checkbox estilizado */
.gm-checkbox-group {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 0;
}
.gm-checkbox-group input[type="checkbox"] {
    width: 18px;
    height: 18px;
    min-height: 18px; 
    flex-shrink: 0;
}

#gm-log-output {
    min-height: 90px;
    max-height: 200px;
    overflow-y: auto;
    font-size: 12px;
    border-radius: 8px;
    padding: 10px;
    border: 1px solid;
    line-height: 1.4;
    font-family:'Courier New',Courier,monospace;
    transition: background-color 0.3s, color 0.3s, border-color 0.3s;
}

/* Estilo do Dropdown Menu */
.gm-dropdown {
    position: relative;
    display: inline-block;
}
.gm-dropdown-content {
    display: none;
    position: absolute;
    right: 0;
    top: 35px; /* Abaixo do cabeçalho */
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1000000; /* Acima do painel principal */
    border-radius: 6px;
    overflow: hidden;
}
.gm-dropdown-content button {
    color: black;
    padding: 10px 15px;
    text-decoration: none;
    display: block;
    width: 100%;
    text-align: left;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.2s;
    margin: 0; /* Override margin-left: 10px from .gm-header button */
}
.gm-dropdown-content button:hover {
    background-color: #ddd;
}
.gm-dropdown-content .active-theme {
    background-color: #007bff;
    color: white !important;
    font-weight: bold;
}
/* Força a visibilidade no click */
.gm-dropdown.open .gm-dropdown-content {
    display: block;
}


/* --- 2. Tema Padrão (Claro) - light-mode --- */
#gm-master-panel.light-mode {
    background: #ffffff;
    border: 1px solid #ddd;
    color: #333333;
}
#gm-master-panel.light-mode .gm-header {
    background: #f8f9fa;
    color: #495057;
    border-bottom: 1px solid #eee;
}
#gm-master-panel.light-mode .gm-header button { color: #495057; }
#gm-master-panel.light-mode textarea, #gm-master-panel.light-mode #gm-text-input {
    background: #f0f0f0;
    color: #333333;
    border-color: #ced4da;
}
#gm-master-panel.light-mode #gm-log-output {
    background: #fcfcfc;
    border-color: #ced4da;
    color: #333;
}
#gm-master-panel.light-mode #gm-btn-veiculo { background: #007bff; color: white; }
#gm-master-panel.light-mode #gm-btn-cliente { background: #28a745; color: white; }
#gm-master-panel.light-mode #gm-btn-paste { background: #ffc107; color: #333; }
#gm-master-panel.light-mode .log-success { color: #28a745; }
#gm-master-panel.light-mode .log-error { color: #dc3545; }

/* --- 3. Tema Escuro (dark-mode) --- */
#gm-master-panel.dark-mode {
    background: #2c3e50; 
    border: 1px solid #34495e;
    color: #ecf0f1; 
}
#gm-master-panel.dark-mode .gm-header {
    background: #34495e;
    color: #ecf0f1;
    border-bottom: 1px solid #4a627a;
}
#gm-master-panel.dark-mode .gm-header button { color: #ecf0f1; }
#gm-master-panel.dark-mode textarea, #gm-master-panel.dark-mode #gm-text-input {
    background: #34495e;
    color: #ecf0f1;
    border-color: #5d758c;
}
#gm-master-panel.dark-mode #gm-log-output {
    background: #34495e;
    border-color: #5d758c;
    color: #ecf0f1;
}
#gm-master-panel.dark-mode #gm-btn-veiculo { background: #1abc9c; }
#gm-master-panel.dark-mode #gm-btn-cliente { background: #2ecc71; }
#gm-master-panel.dark-mode #gm-btn-paste { background: #f1c40f; }
#gm-master-panel.dark-mode .log-success { color: #a3e4d9; }
#gm-master-panel.dark-mode .log-error { color: #e74c3c; }


/* --- 4. Novo Tema: Azul Primário (blue-primary) --- */
#gm-master-panel.blue-primary {
    background: #1a237e; 
    border: 2px solid #3f51b5;
    color: #e8eaf6;
}
#gm-master-panel.blue-primary .gm-header {
    background: #283593; 
    color: #ffffff;
    border-bottom: 1px solid #3f51b5;
}
#gm-master-panel.blue-primary .gm-header button { color: #ffffff; }
#gm-master-panel.blue-primary textarea, #gm-master-panel.blue-primary #gm-text-input {
    background: #3f51b5; 
    color: #ffffff;
    border-color: #7986cb;
}
#gm-master-panel.blue-primary #gm-log-output {
    background: #3f51b5;
    border-color: #7986cb;
    color: #ffffff;
}
#gm-master-panel.blue-primary #gm-btn-veiculo { background: #ff9800; color: #1a237e; }
#gm-master-panel.blue-primary #gm-btn-cliente { background: #4caf50; color: #ffffff; }
#gm-master-panel.blue-primary #gm-btn-paste { background: #ffee58; color: #1a237e; }
#gm-master-panel.blue-primary .log-success { color: #c8e6c9; }
#gm-master-panel.blue-primary .log-error { color: #ffcdd2; }

/* --- 5. Novo Tema: Verde Floresta (green-forest) --- */
#gm-master-panel.green-forest {
    background: #e8f5e9;
    border: 2px solid #388e3c;
    color: #1b5e20;
}
#gm-master-panel.green-forest .gm-header {
    background: #1b5e20; 
    color: #ffffff;
    border-bottom: 1px solid #388e3c;
}
#gm-master-panel.green-forest .gm-header button { color: #ffffff; }
#gm-master-panel.green-forest textarea, #gm-master-panel.green-forest #gm-text-input, 
#gm-master-panel.green-forest #gm-log-output {
    background: #c8e6c9;
    color: #1b5e20;
    border-color: #81c784;
}
#gm-master-panel.green-forest #gm-btn-veiculo { background: #558b2f; color: #ffffff; }
#gm-master-panel.green-forest #gm-btn-cliente { background: #388e3c; color: #ffffff; }
#gm-master-panel.green-forest #gm-btn-paste { background: #a5d6a7; color: #1b5e20; }
#gm-master-panel.green-forest .log-success { color: #388e3c; }
#gm-master-panel.green-forest .log-error { color: #d32f2f; }

/* --- 6. Novo Tema: Lava/Preto (red-lava) --- */
#gm-master-panel.red-lava {
    background: #212121;
    border: 2px solid #d32f2f;
    color: #f5f5f5;
}
#gm-master-panel.red-lava .gm-header {
    background: #b71c1c; 
    color: #ffffff;
    border-bottom: 1px solid #d32f2f;
}
#gm-master-panel.red-lava .gm-header button { color: #ffffff; }
#gm-master-panel.red-lava textarea, #gm-master-panel.red-lava #gm-text-input,
#gm-master-panel.red-lava #gm-log-output {
    background: #424242;
    color: #f5f5f5;
    border-color: #ef9a9a;
}
#gm-master-panel.red-lava #gm-btn-veiculo { background: #ff5252; color: #212121; }
#gm-master-panel.red-lava #gm-btn-cliente { background: #d32f2f; color: #ffffff; }
#gm-master-panel.red-lava #gm-btn-paste { background: #ffccbc; color: #212121; }
#gm-master-panel.red-lava .log-success { color: #4caf50; }
#gm-master-panel.red-lava .log-error { color: #ff8a80; }

/* --- 7. Novo Tema: Roxo Real (purple-royal) --- */
#gm-master-panel.purple-royal {
    background: #ede7f6;
    border: 2px solid #5e35b1;
    color: #4527a0;
}
#gm-master-panel.purple-royal .gm-header {
    background: #4527a0; 
    color: #ffffff;
    border-bottom: 1px solid #5e35b1;
}
#gm-master-panel.purple-royal .gm-header button { color: #ffffff; }
#gm-master-panel.purple-royal textarea, #gm-master-panel.purple-royal #gm-text-input,
#gm-master-panel.purple-royal #gm-log-output {
    background: #d1c4e9;
    color: #4527a0;
    border-color: #9575cd;
}
#gm-master-panel.purple-royal #gm-btn-veiculo { background: #7e57c2; color: #ffffff; }
#gm-master-panel.purple-royal #gm-btn-cliente { background: #5e35b1; color: #ffffff; }
#gm-master-panel.purple-royal #gm-btn-paste { background: #b39ddb; color: #4527a0; }
#gm-master-panel.purple-royal .log-success { color: #4caf50; }
#gm-master-panel.purple-royal .log-error { color: #e53935; }

/* --- 8. Novo Tema: Pôr do Sol (orange-sunset) --- */
#gm-master-panel.orange-sunset {
    background: #fff3e0;
    border: 2px solid #f4511e;
    color: #ff6f00;
}
#gm-master-panel.orange-sunset .gm-header {
    background: #ff6f00; 
    color: #ffffff;
    border-bottom: 1px solid #f4511e;
}
#gm-master-panel.orange-sunset .gm-header button { color: #ffffff; }
#gm-master-panel.orange-sunset textarea, #gm-master-panel.orange-sunset #gm-text-input,
#gm-master-panel.orange-sunset #gm-log-output {
    background: #ffe0b2;
    color: #ff6f00;
    border-color: #ff9800;
}
#gm-master-panel.orange-sunset #gm-btn-veiculo { background: #ffb300; color: #424242; }
#gm-master-panel.orange-sunset #gm-btn-cliente { background: #f4511e; color: #ffffff; }
#gm-master-panel.orange-sunset #gm-btn-paste { background: #ffcc80; color: #424242; }
#gm-master-panel.orange-sunset .log-success { color: #4caf50; }
#gm-master-panel.orange-sunset .log-error { color: #e53935; }
`;

    const style = document.createElement("style");
    style.appendChild(document.createTextNode(css));
    style.id = "gm-master-style";
    document.head.appendChild(style);
    
    // ===========================================
    // 3. DEFINIÇÃO DE TEMAS (MOVIDO PARA CIMA - CORREÇÃO DE ERRO)
    // ===========================================
    const THEMES = {
        'light-mode': { name: 'Padrão Claro', icon: '💡', headerBg: '#f8f9fa' },
        'dark-mode': { name: 'Escuro (Navy)', icon: '🌙', headerBg: '#34495e' },
        'blue-primary': { name: 'Azul Primário', icon: '🔵', headerBg: '#283593' },
        'green-forest': { name: 'Verde Floresta', icon: '🌳', headerBg: '#1b5e20' }, 
        'red-lava': { name: 'Lava/Preto', icon: '🔥', headerBg: '#b71c1c' }, 
        'purple-royal': { name: 'Roxo Real', icon: '🟣', headerBg: '#4527a0' }, 
        'orange-sunset': { name: 'Pôr do Sol', icon: '🟠', headerBg: '#ff6f00' }
    };
    const STORAGE_KEY = 'gm-master-theme';


    // ===========================================
    // 4. Estrutura HTML (Com Menu Cascata de Temas)
    // ===========================================
    const panel = document.createElement("div"); 
    panel.id = "gm-master-panel";
    
    // Gera os botões do menu dinamicamente (AGORA PODE USAR THEMES)
    const themeButtonsHtml = Object.keys(THEMES).map(key => `
        <button data-theme="${key}">${THEMES[key].icon} ${THEMES[key].name}</button>
    `).join('');

    panel.innerHTML = `
        <div class="gm-header" id="gm-header-drag">
            <span>🚀 Automação Master (Cliente & Veículo) V2.19</span>
            <div class="gm-controls">
                <div class="gm-dropdown" id="gm-theme-dropdown">
                    <button id="gm-btn-theme" title="Alternar Tema">💡</button>
                    <div class="gm-dropdown-content">
                        ${themeButtonsHtml}
                    </div>
                </div>
                <button id="gm-btn-minimize" title="Minimizar">➖</button>
                <button id="gm-btn-close" title="Fechar">X</button>
            </div>
        </div>
        <div class="gm-content">
            
            <div class="gm-checkbox-group">
                <input type="checkbox" id="gm-is-ileva-checkbox">
                <label for="gm-is-ileva-checkbox" style="font-weight:bold;">Cliente pertence à S.GROUP?</label>
            </div>

            <label for="gm-text-input" style="font-weight:bold;">Cole o texto completo do PDF/Contrato aqui:</label>
            <textarea id="gm-text-input" placeholder="Cole o texto copiado aqui."></textarea>
            
            <div class="gm-actions">
                <button id="gm-btn-paste" title="Colar da Área de Transferência">
                    <svg style="width:20px;height:20px;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="10" y="4" width="4" height="4" rx="1"/><path d="M14 2c2.2 0 4 1.8 4 4v14c0 1.1-.9 2-2 2H8c-1.1 0-2-.9-2-2V6c0-2.2 1.8-4 4-4z"/></svg>
                </button>
                <button id="gm-btn-cliente" type="button">Preencher Cliente</button>
                <button id="gm-btn-veiculo" type="button">Preencher Veículo</button>
            </div>

            <div class="gm-log-section">
                <h4>📜 Log de Execução</h4>
                <div id="gm-log-output"></div>
            </div>
        </div>
    `;
    document.body.appendChild(panel);

    // ===========================================
    // 5. Referências e Funções Utilitárias
    // ===========================================
    const logArea = panel.querySelector("#gm-log-output");
    const input = panel.querySelector("#gm-text-input");
    const headerDrag = panel.querySelector("#gm-header-drag");
    const btnMinimize = panel.querySelector("#gm-btn-minimize");
    const btnClose = panel.querySelector("#gm-btn-close");
    const btnTheme = panel.querySelector("#gm-btn-theme");
    const themeDropdown = panel.querySelector("#gm-theme-dropdown");
    const btnPaste = panel.querySelector("#gm-btn-paste");
    const btnCliente = panel.querySelector("#gm-btn-cliente");
    const btnVeiculo = panel.querySelector("#gm-btn-veiculo");
    
    // Função de Log (Atualizada para usar classes de tema)
    const log = (msg, type = "info") => { 
        const div = document.createElement("div");
        div.textContent = `[${new Date().toLocaleTimeString()}] ${msg}`;
        if (type === "error") div.className = "log-error"; 
        if (type === "success") div.className = "log-success"; 
        logArea.appendChild(div);
        logArea.scrollTop = logArea.scrollHeight;
    };
    
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    
    const handlePaste = async () => { 
        try {
            const text = await navigator.clipboard.readText();
            input.value = text;
            log("OK: Texto colado da área de transferência.", "success");
        } catch (err) {
            log("Erro ao acessar clipboard. Cole manualmente o texto no campo.", "error");
        }
    };
    
    /**
     * Preenche um campo e simula eventos. V2.16/V2.18: Lógica V18 simplificada para Data Nascimento.
     */
    const setField = (id, value, label) => { 
        if (!value) return log(`Info: Sem valor para ${label}.`, "info");
        const el = document.getElementById(id) || document.getElementsByName(id)[0];
        
        if (el) {
            // ** LÓGICA V18 SIMPLIFICADA PARA DATA NASCIMENTO (V2.16 FIX) **
            if (id.includes("dt_bertura_nasc")) {
                // Apenas define o valor e dispara 'change', sem focus/blur/timeouts.
                el.value = value; 
                el.dispatchEvent(new Event('change', { bubbles: true }));
                log(`OK: ${label} preenchido com lógica V18 (Simplificada e Segura).`, "success");
                return; // FINALIZA o setField para Data Nascimento AQUI
            }
            // ** FIM DA LÓGICA V18 SIMPLIFICADA **
            
            // Lógica de preenchimento normal para TODOS OS OUTROS CAMPOS:
            el.focus();
            
            // 1. SETAR VALOR VIA PROTOTYPE (Mais robusto para frameworks)
            try {
                let prototype = Object.getPrototypeOf(el);
                let prototypeValueSetter = Object.getOwnPropertyDescriptor(prototype, "value").set;
                prototypeValueSetter.call(el, value);
            } catch (e) {
                el.value = value;
            }
            
            // 2. DISPARAR EVENTOS PADRÃO
            el.dispatchEvent(new Event('input', { bubbles: true }));
            el.dispatchEvent(new Event('change', { bubbles: true }));
            el.dispatchEvent(new Event('blur', { bubbles: true })); 

            log(`OK: ${label} preenchido.`, "success");

        } else {
            log(`Erro: Campo ${label} (ID: ${id}) não encontrado!`, "error");
        }
    };

    const cleanPhone = e => {
        const t = (e || "").replace(/[^\d]/g, "");
        return t.startsWith("55") ? t.substring(2) : t;
    };

    const extractClientData = (text) => {
        log("Iniciando extração de dados do Cliente...");
        let data = {};
        let format = "";

        try {
            const getMatch = (regex) => {
                const cleanText = text.replace(/[\r\n]+/g, ' ').replace(/ {2,}/g, ' ').trim();
                const match = (cleanText.match(regex) || [])[1]?.trim();
                return match || null;
            };
            
            if (text.includes("Nome/Razão Social:")) {
                log("Detectado Formato 1 (PDF/EVOGARD).");
                format = "PDF";
                data = {
                    nome: getMatch(/Nome\/Razão\s*Social:\s*(.*?)(?:\s*CPF\/CNPJ:)/i),
                    cpf: getMatch(/CPF\/CNPJ:\s*(.*?)(?:\s*RG:|\s*CNH:)/i),
                    rg: getMatch(/RG:\s*(.*?)(?:\s*CNH:|\s*E-mail:)/i),
                    email: getMatch(/E-mail:\s*(.*?)(?:\s*Nasc\.:|\s*End:)/i),
                    nascimento: getMatch(/Nasc\.:\s*(.*?)(?:\s*End:|\s*Celular:)/i),
                    celular1: getMatch(/Celular:\s*(.*?)(?:\s*Telefone:|\s*VEÍCULO)/i),
                    celular2: getMatch(/Telefone:\s*(.*?)(?:\s*VEÍCULO|\s*Marca:)/i),
                    complemento: getMatch(/Compl:\s*(.*?)\s*Bairro:/i), 
                    cep: getMatch(/CEP:\s*(.*?)(?:\s*Celular:|\s*Telefone:)/i),
                    numero: getMatch(/Número:\s*(.*?)(?:\s*Compl:)/i)
                };
            } else if (text.includes("Nome:") && (text.includes("CPF/CNPJ:") || text.includes("Dt nascimento:"))) { 
                log("Detectado Formato 2 (Portal Antigo/Modelo 2).");
                format = "Portal Antigo";
                const tempText = text.replace(/[\r\n]+/g, '\n').trim();

                const getMatchNL = (regex) => {
                    const match = (tempText.match(regex) || [])[1]?.trim();
                    return match?.replace(/\n/g, " ")?.trim() || null;
                };

                data = {
                    nome: getMatchNL(/Nome:([\s\S]*?)E-mail:/i) || getMatchNL(/Nome:([\s\S]*?)Telefone\s*\/\s*Whatsapp/i),
                    email: getMatchNL(/E-mail:([\s\S]*?)Telefone\s*\/\s*Whatsapp/i),
                    celular1: getMatchNL(/Telefone\s*\/\s*Whatsapp([\s\S]*?)Telefone\s*2:/i) || getMatchNL(/Telefone\s*\/\s*Whatsapp([\s\S]*?)RG:/i) || getMatchNL(/Telefone\s*\/\s*Whatsapp([\s\S]*?)Tipo:/i),
                    celular2: getMatchNL(/Telefone\s*2:([\s\S]*?)RG:/i),
                    rg: getMatchNL(/RG:([\s\S]*?)RG\s*Orgão\s*expeditor:/i),
                    cpf: getMatchNL(/CPF\/CNPJ:([\s\S]*?)Dt\s*nascimento:/i),
                    nascimento: getMatchNL(/Dt\s*nascimento:([\s\S]*?)Número\s*CNH:/i),
                    cep: getMatchNL(/CEP:([\s\S]*?)Nome\s*da\s*Mãe:/i),
                    numero: getMatchNL(/Número:([\s\S]*?)Complemento:/i),
                    complemento: getMatchNL(/Complemento:([\s\S]*?)Estado:/i)
                };

            } else if (text.includes("Nome Completo\n") && text.includes("Celular WhatsApp:")) {
                log("Detectado Formato 3 (Novo S.GROUP).");
                format = "Novo S.GROUP";
            } else {
                log("Erro: Formato de texto de Cliente não reconhecido.", "error");
                return null;
            }

            if (!data.nome || !data.cpf) {
                log(`Falha ao extrair dados essenciais (Nome ou CPF) do formato ${format}.`, "error");
                return null;
            }
            
            const cleanedData = {
                nome: (data.nome || "").toUpperCase(),
                cpf: (data.cpf || "").replace(/[^\d]/g, ""),
                rg: (data.rg || "").replace(/[^a-zA-Z0-9]/g, ""),
                email: data.email || "",
                nascimento: data.nascimento || "",
                celular1: cleanPhone(data.celular1),
                celular2: cleanPhone(data.celular2),
                cep: (data.cep || "").replace(/[^\d]/g, ""),
                numero: data.numero || "",
                complemento: data.complemento || ""
            };

            log("Dados de Cliente extraídos com sucesso.", "success");
            return cleanedData;

        } catch (e) {
            log(`Erro inesperado durante a extração do Cliente: ${e.message}`, "error");
            return null;
        }
    };
    
    const clickNoButton = () => {
        const onButton = document.querySelector(".bootstrap-switch-handle-on");
        if (onButton && onButton.textContent.trim() === "Sim") {
            onButton.click();
            log("OK: Chave de Rastreador desligada.", "success");
        } else {
            log("Aviso: Botão 'Sim' da chave de Rastreador não encontrado ou já está 'Não'.", "info");
        }
    };

    const extractVehicleData = (text) => {
        log("Iniciando extração de dados do Veículo...");
        const cleanText=text.replace(/\r\n/g,"\n").replace(/\r/g,"\n").replace(/ {2,}/g," ").trim();
        const getVal=(regex)=>(cleanText.match(regex)||[])[1]?.trim()||null;
        
        let placa=getVal(/Placa:\s*([^\n]*?)(?:\s*Cód|\s*Valor|\n)/i);
        let chassi=getVal(/(?:Chassi|Nº Chassi):\s*([^\n]*?)(\s*Tipo|\s*Renava|\n)/i);
        let renavam=getVal(/Renava[nm]:\s*([^\n]*?)(?:\s*Tipo|\s*Cota|\n)/i);
        let cor=getVal(/Cor:\s*([^\n]*?)(?:\s*Placa|\s*Possui|\n)/i);
        let anoFabricacao=getVal(/(?:Ano\/Modelo|Ano Fabricação):\s*(\d{4})/i);
        let anoModelo=getVal(/Ano\/Modelo:\s*(\d{4})/i);
        let marca=getVal(/Marca:\s*([^\n]*?)(?:\s*Modelo:|\s*Ano|\n)/i);
        let modelo=getVal(/(?<!Ano\s)Modelo:\s*([^\n]*?)(?:\s*Cor:|\s*Cód|Ano\/|\s*Placa:|Placa:\n|$)/i);

        if(placa) placa=placa.replace(/[^a-zA-Z0-9]/g,"").toUpperCase();
        if(marca) marca=marca.replace(/Modelo:.*|Cor:.*|Placa:.*|Ano\/.*/i,"").trim();
        if(modelo) modelo=modelo.replace(/Cor:.*|Cód.*|Ano\/.*/i,"").trim();
        
        log(`Dados de Veículo extraídos: Placa ${placa||"?"}, Modelo: ${modelo||"?"}.`, "success");
        
        return {
            placa,
            chassi,
            renavam,
            cor,
            anoFabricacao,
            anoModelo: anoModelo || anoFabricacao,
            marca,
            modelo
        };
    };

    const fillClientForm = async (extractedData, isSGroup) => { 
        log("Iniciando preenchimento do formulário de Cliente...");
        try {
            const categoria = isSGroup ? "34" : "6";
            
            setField("id_form_pessoa-nome_razao_social", extractedData.nome, "Nome/Razão Social");
            setField("id_form_pessoa-apelido_fantasia", extractedData.nome, "Nome Fantasia");
            setField("id_form_pessoa-cnpj_cpf", extractedData.cpf, "CNPJ/CPF");
            setField("id_form_pessoa-rg", extractedData.rg, "RG");
            setField("id_form_pessoa-email", extractedData.email, "Email");
            
            // CHAMADA CRÍTICA: Data de Nascimento (Usa a lógica V18 interna)
            setField("id_form_pessoa-dt_bertura_nasc", extractedData.nascimento, "Data Nascimento");
            
            setField("id_form_pessoa-categoria", categoria, "Categoria (Valor Selecionado)");
            
            // Endereço
            setField("id_form_endereco-cep", extractedData.cep, "CEP");
            setField("id_form_endereco-numero", extractedData.numero, "Número Residência");
            setField("id_form_endereco-complemento", extractedData.complemento, "Complemento");

            if (extractedData.cep) {
                const cepField = document.getElementById("id_form_endereco-cep");
                if (cepField) {
                    cepField.dispatchEvent(new Event("blur", { bubbles: true }));
                    log("OK: Evento 'blur' forçado no CEP para iniciar busca do endereço.", "success");
                    const logradouroField = document.getElementById("id_form_endereco-logradouro");
                    if (logradouroField) logradouroField.focus();
                }
                log("Atenção: Para o preenchimento completo do Endereço, mude para a aba 'Endereço'.", "info");
            }

            // Telefones
            if (extractedData.celular1 || extractedData.celular2) {
                const phones = [
                    { num: extractedData.celular1, is_whatsapp: true },
                    { num: extractedData.celular2, is_whatsapp: false }
                ].filter(p => p.num && p.num.length > 0);

                for (let i = 0; i < phones.length; i++) {
                    const phone = phones[i];
                    const numField = document.querySelector(`div.item${i} input[name="form_fone-numero"]`);
                    if (numField) {
                        setField(numField.id, phone.num, `Telefone ${i+1}`); 
                        
                        const whatsappField = document.querySelector(`div.item${i} input[name="form_fone-whatsapp-0"]`);
                        if (i === 0 && phone.is_whatsapp && whatsappField) {
                            whatsappField.checked = true;
                            whatsappField.dispatchEvent(new Event("change", { bubbles: true }));
                            log(`OK: Checkbox WhatsApp (Telefone ${i+1}) marcado.`, "success");
                        }
                    } else {
                        log(`Info: Campo de Telefone ${i+1} (div.item${i}) não encontrado.`, "info");
                    }
                }
                log("Preenchimento dos números de telefone concluído.");
            } else {
                log("Info: Nenhum número de telefone encontrado.", "info");
            }

            log("Preenchimento do formulário de Cliente concluído!", "success");

        } catch (e) {
            log(`Erro inesperado ao preencher Cliente: ${e.message}`, "error");
        }
    };
    
    const fillVehicleForm = (data) => {
        log("Iniciando preenchimento do formulário de Veículo...");
        
        clickNoButton();
        setField("id_placa", data.placa, "Placa");
        setField("id_chassi", data.chassi, "Chassi");
        setField("id_renavam", data.renavam, "Renavam");
        setField("id_ano_fabricacao", data.anoFabricacao, "Ano Fabricação");
        setField("id_cor", data.cor, "Cor");
        setField("id_marca", data.marca, "Marca");
        setField("id_modelo", data.modelo, "Modelo");
        setField("id_ano", data.anoModelo, "Ano do Modelo (id_ano)");
        
        log("Preenchimento do formulário de Veículo concluído!", "success");
    };


    // ===========================================
    // 6. Lógica de Drag and Drop
    // ===========================================
    const makeDraggable = (element, dragHandle) => { 
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        dragHandle.addEventListener('mousedown', dragMouseDown);

        function dragMouseDown(e) {
            e = e || window.event;
            
            if (e.target.closest('.gm-controls')) {
                return; 
            }
            
            e.preventDefault(); 
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.addEventListener('mouseup', closeDragElement);
            document.addEventListener('mousemove', elementDrag);
        }

        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            
            element.style.transform = 'none'; 
            
            element.style.top = (element.offsetTop - pos2) + "px";
            element.style.left = (element.offsetLeft - pos1) + "px";
        }

        function closeDragElement() {
            document.removeEventListener('mouseup', closeDragElement);
            document.removeEventListener('mousemove', elementDrag);
        }
    };
    makeDraggable(panel, headerDrag);
    
    // ===========================================
    // 7. Lógica de Temas (UX - Menu Cascata)
    // ===========================================
    
    // As constantes THEMES e STORAGE_KEY já estão definidas na seção 3

    // Função para aplicar o tema ao painel e guardar no storage
    const applyTheme = (theme) => {
        panel.className = ''; // Remove todas as classes de tema anteriores
        panel.classList.add(theme);
        localStorage.setItem(STORAGE_KEY, theme); // Guarda a escolha
        
        // Atualiza o ícone do botão principal do dropdown
        const themeButton = panel.querySelector("#gm-btn-theme");
        if (themeButton) {
            themeButton.textContent = THEMES[theme]?.icon || '💡';
        }

        // Marca o botão ativo no dropdown
        const dropdownButtons = panel.querySelectorAll('.gm-dropdown-content button');
        dropdownButtons.forEach(btn => {
            if (btn.dataset.theme === theme) {
                btn.classList.add('active-theme');
            } else {
                btn.classList.remove('active-theme');
            }
        });
    };

    // Função para carregar o tema guardado ao iniciar
    const loadSavedTheme = () => {
        const savedTheme = localStorage.getItem(STORAGE_KEY);
        const defaultTheme = Object.keys(THEMES)[0]; // light-mode
        
        if (savedTheme && THEMES[savedTheme]) {
            applyTheme(savedTheme);
        } else {
            // Aplica o tema padrão se não houver tema guardado ou for inválido
            applyTheme(defaultTheme); 
        }
    };
    
    const toggleMinimize = () => { 
        const isMin = panel.classList.toggle("minimized");
        btnMinimize.textContent = isMin ? "➕" : "➖";
        btnMinimize.title = isMin ? "Maximizar" : "Minimizar";
        log(isMin ? "Painel minimizado." : "Painel maximizado.");
    };
    
    const toggleDropdown = (e) => {
        // Impede que o clique no botão tema feche imediatamente o dropdown
        if (e && e.target.closest('#gm-btn-theme')) {
            themeDropdown.classList.toggle('open');
        } else {
             // Fecha o dropdown se o clique for fora dele
            if (!themeDropdown.contains(e.target)) {
                themeDropdown.classList.remove('open');
            }
        }
    };

    // ===========================================
    // 8. Conexão de Eventos dos Botões
    // ===========================================
    
    // Carrega o tema salvo no localStorage
    loadSavedTheme(); 

    // Event Listener para abrir/fechar o dropdown
    document.addEventListener('click', toggleDropdown);

    // Event Listener para a seleção de tema no dropdown
    const themeButtons = panel.querySelectorAll('.gm-dropdown-content button');
    themeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const newTheme = e.target.dataset.theme;
            if (newTheme) {
                applyTheme(newTheme);
                log(`OK: Tema alterado para "${THEMES[newTheme].name}".`, 'success');
                themeDropdown.classList.remove('open'); // Fecha após a seleção
            }
        });
    });

    if (btnPaste) btnPaste.addEventListener("click", handlePaste);
    if (btnMinimize) btnMinimize.addEventListener("click", toggleMinimize); 
    
    btnClose.addEventListener("click", () => {
        panel.remove();
        document.getElementById("gm-master-style")?.remove();
        document.removeEventListener('click', toggleDropdown); // Limpa listener global
    });

    if (btnCliente) btnCliente.addEventListener("click", async () => {
        logArea.innerHTML = "";
        const text = input.value;
        if (!text) return log("O campo de texto está vazio. Cole os dados primeiro.", "error");

        const isSGroup = panel.querySelector("#gm-is-ileva-checkbox").checked;
        const clientData = extractClientData(text);
        
        if (clientData) {
            await fillClientForm(clientData, isSGroup);
        } else {
            log("A automação de Cliente falhou. Verifique os logs e o texto colado.", "error");
        }
    });

    if (btnVeiculo) btnVeiculo.addEventListener("click", () => {
        logArea.innerHTML = "";
        const text = input.value;
        if (!text) return log("O campo de texto está vazio. Cole os dados primeiro.", "error");

        const vehicleData = extractVehicleData(text);
        
        if (vehicleData) {
            fillVehicleForm(vehicleData);
        } else {
            log("A automação de Veículo falhou. Verifique os logs e o texto colado.", "error");
        }
    });

    log("Painel de automação Master V2.19 (Correção de Inicialização) carregado e pronto.", "success");

})();

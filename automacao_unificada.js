// automacao_unificada.js - V2.16 - Data de Nascimento (Correção V18 Simples)

(async function() { // Função principal agora é async!
    // 1. Prevenção de Duplicidade
    if (document.getElementById("gm-master-panel")) {
        console.log("O painel de automação master já está aberto.");
        return;
    }

    // ===========================================
    // 2. CSS, HTML, etc. (Mantido)
    // ===========================================
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
            transition: width 0.3s, height 0.3s;
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
        .gm-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px;
            background: #007bff;
            color: white;
            border-radius: 6px 6px 0 0;
            font-weight: bold;
            cursor: move;
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
        #gm-btn-paste {background: #ffc107; color: #333; width: 40px; height: 40px; flex-grow: 0; display: flex; align-items: center; justify-content: center;}
        #gm-btn-paste:hover {background: #e0a800;}
        #gm-btn-cliente {background: #28a745; color: white;}
        #gm-btn-cliente:hover {background: #218838;}
        #gm-btn-veiculo {background: #17a2b8; color: white;}
        #gm-btn-veiculo:hover {background: #138496;}

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
            color: #ff8a80;
        }
        #gm-master-panel.dark-mode .gm-log-success {
            color: #a5d6a7;
        }
        #gm-master-panel.dark-mode .gm-header button {
            color: #eee;
        }
    `;

    const style = document.createElement("style");
    style.appendChild(document.createTextNode(css));
    style.id = "gm-master-style";
    document.head.appendChild(style);
    
    // ===========================================
    // 3. Estrutura HTML e Referências
    // ===========================================
    const panel = document.createElement("div"); 
    panel.id = "gm-master-panel";
    
    panel.innerHTML = `
        <div class="gm-header" id="gm-header-drag">
            <span>🚀 Automação Master (Cliente & Veículo) V2.16</span>
            <div class="gm-controls">
                <button id="gm-btn-theme" title="Alternar Tema">💡</button>
                <button id="gm-btn-minimize" title="Minimizar">➖</button>
                <button id="gm-btn-close" title="Fechar">X</button>
            </div>
        </div>
        <div class="gm-content">
            
            <div class="gm-controls-top">
                <input type="checkbox" id="gm-is-ileva-checkbox" style="width:20px;height:20px;">
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
    // 4. Referências e Funções Utilitárias
    // ===========================================
    const logArea = panel.querySelector("#gm-log-output");
    const input = panel.querySelector("#gm-text-input");
    const headerDrag = panel.querySelector("#gm-header-drag");
    const btnMinimize = panel.querySelector("#gm-btn-minimize");
    const btnClose = panel.querySelector("#gm-btn-close");
    const btnTheme = panel.querySelector("#gm-btn-theme");
    const btnPaste = panel.querySelector("#gm-btn-paste");
    const btnCliente = panel.querySelector("#gm-btn-cliente");
    const btnVeiculo = panel.querySelector("#gm-btn-veiculo");
    
    // Função de Log
    const log = (msg, type = "info") => { 
        const div = document.createElement("div");
        div.textContent = `[${new Date().toLocaleTimeString()}] ${msg}`;
        if (type === "error") div.className = "gm-log-error";
        if (type === "success") div.className = "gm-log-success";
        logArea.appendChild(div);
        logArea.scrollTop = logArea.scrollHeight;
    };
    
    // Função de Delay Assíncrono (mantida caso necessária no futuro, mas não usada para data)
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
     * Preenche um campo e simula eventos. V2.16: Lógica V18 simplificada para Data Nascimento.
     */
    const setField = (id, value, label) => { 
        if (!value) return log(`Info: Sem valor para ${label}.`, "info");
        const el = document.getElementById(id) || document.getElementsByName(id)[0];
        
        if (el) {
            // ** 1. LÓGICA V18 SIMPLIFICADA PARA DATA NASCIMENTO **
            if (id.includes("dt_bertura_nasc")) {
                // Apenas define o valor e dispara 'change', sem focus/blur/timeouts.
                // Isso evita a ativação da lógica de limpeza/validação agressiva do Datepicker.
                // Replicando a única lógica que funcionava na V18.
                el.value = value; 
                el.dispatchEvent(new Event('change', { bubbles: true }));
                log(`OK: ${label} preenchido com lógica V18 (Simplificada e Segura).`, "success");
                return; // FINALIZA o setField para Data Nascimento AQUI
            }
            // ** FIM DA LÓGICA V18 SIMPLIFICADA **
            
            // Lógica de preenchimento normal para TODOS OS OUTROS CAMPOS:
            el.focus();
            
            // 2. SETAR VALOR VIA PROTOTYPE (Mais robusto para frameworks)
            try {
                let prototype = Object.getPrototypeOf(el);
                let prototypeValueSetter = Object.getOwnPropertyDescriptor(prototype, "value").set;
                prototypeValueSetter.call(el, value);
            } catch (e) {
                el.value = value;
            }
            
            // 3. DISPARAR EVENTOS PADRÃO
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
            // Formato 2 (Portal Antigo - Modelo 2)
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

    // fillClientForm agora é async (mas o delay foi removido)
    const fillClientForm = async (extractedData, isSGroup) => { 
        log("Iniciando preenchimento do formulário de Cliente...");
        try {
            const categoria = isSGroup ? "34" : "6";
            
            setField("id_form_pessoa-nome_razao_social", extractedData.nome, "Nome/Razão Social");
            setField("id_form_pessoa-apelido_fantasia", extractedData.nome, "Nome Fantasia");
            setField("id_form_pessoa-cnpj_cpf", extractedData.cpf, "CNPJ/CPF");
            setField("id_form_pessoa-rg", extractedData.rg, "RG");
            setField("id_form_pessoa-email", extractedData.email, "Email");
            
            // ** CHAMADA CRÍTICA: Data de Nascimento (Usa a lógica V18 interna) **
            setField("id_form_pessoa-dt_bertura_nasc", extractedData.nascimento, "Data Nascimento");
            
            // ** V2.16: REMOVIDO o 'await delay(150)' **
            // O setField da Data agora usa a lógica V18 síncrona e segura, não precisa de delay.
            
            setField("id_form_pessoa-categoria", categoria, "Categoria (Valor Selecionado)");
            
            // Campos que provocam BLUR e que vinham logo em seguida:
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
    
    const toggleMinimize = () => { 
        const isMin = panel.classList.toggle("minimized");
        btnMinimize.textContent = isMin ? "➕" : "➖";
        btnMinimize.title = isMin ? "Maximizar" : "Minimizar";
        log(isMin ? "Painel minimizado." : "Painel maximizado.");
    };

    const toggleTheme = () => { 
        const isDark = panel.classList.toggle("dark-mode");
        btnTheme.textContent = isDark ? "🌙" : "💡";
        btnTheme.title = isDark ? "Tema Claro" : "Tema Escuro";
        localStorage.setItem('gm_automacao_theme', isDark ? 'dark' : 'light');
        log(`Tema alterado para ${isDark ? 'Escuro' : 'Claro'}.`);
    };

    if (localStorage.getItem('gm_automacao_theme') === 'dark') {
        toggleTheme();
    }


    // 6. Conexão de Eventos dos Botões (Listeneres)
    if (btnPaste) btnPaste.addEventListener("click", handlePaste);
    if (btnMinimize) btnMinimize.addEventListener("click", toggleMinimize); 
    if (btnTheme) btnTheme.addEventListener("click", toggleTheme); 
    
    btnClose.addEventListener("click", () => {
        panel.remove();
        document.getElementById("gm-master-style")?.remove();
    });

    // Event Listener agora chama a função async fillClientForm
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

    log("Painel de automação Master V2.16 (Data de Nascimento V18 Simples) carregado e pronto.", "success");

})();

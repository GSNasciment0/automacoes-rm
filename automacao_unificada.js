// automacao_unificada.js - V1.0 - Script Unificado

(async function() {
    // 1. Prevenção de Duplicidade
    if (document.getElementById("gm-master-panel")) {
        console.log("O painel de automação master já está aberto.");
        return;
    }

    // 2. CSS Unificado (Mantido da Etapa 1)
    const css = `#gm-master-panel{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:550px;max-width:95%;background:#f9f9f9;border:2px solid #007bff;border-radius:8px;z-index:999999;box-shadow:0 5px 15px rgba(0,0,0,0.5);font-family:Arial,sans-serif}#gm-master-panel *{font-family:Arial,sans-serif}.gm-header{display:flex;justify-content:space-between;align-items:center;padding:10px;background:#007bff;color:white;border-radius:6px 6px 0 0;font-weight:bold}.gm-header button{background:none;border:none;color:white;font-size:16px;cursor:pointer}.gm-content{padding:15px;display:flex;flex-direction:column;gap:10px}#gm-text-input{width:98%;height:150px;padding:8px;border:1px solid #ccc;border-radius:4px;resize:vertical}.gm-actions{display:flex;gap:10px;align-items:stretch;margin-bottom: 10px;}.gm-actions button{border:none;padding:10px;font-size:14px;font-weight:bold;border-radius:4px;cursor:pointer;flex-grow:1;transition:background-color 0.2s}#gm-btn-paste{background:#ffc107;color:#333;width:40px;height:40px;flex-grow:0;display:flex;align-items:center;justify-content:center}#gm-btn-paste:hover{background:#e0a800}#gm-btn-cliente{background:#28a745;color:white}#gm-btn-cliente:hover{background:#218838}#gm-btn-veiculo{background:#17a2b8;color:white}#gm-btn-veiculo:hover{background:#138496}.gm-controls-top{display: flex; gap: 10px; align-items: center; margin-bottom: 10px;}.gm-log-section{margin-top: 10px;}.gm-log-section h4{margin:0 0 5px 0;font-size:14px}#gm-log-output{background:#fff;border:1px solid #eee;border-radius:4px;padding:10px;height:100px;overflow-y:auto;font-size:12px;font-family:'Courier New',Courier,monospace;color:#333}.gm-log-error{color:#d9534f;font-weight:bold}.gm-log-success{color:#5cb85c;font-weight:bold}`;

    // Adiciona o CSS ao HEAD
    const style = document.createElement("style");
    style.appendChild(document.createTextNode(css));
    style.id = "gm-master-style";
    document.head.appendChild(style);

    // 3. Estrutura HTML do Painel (Mantida da Etapa 1)
    const panel = document.createElement("div");
    panel.id = "gm-master-panel";
    panel.innerHTML = `
        <div class="gm-header">
            <span>🚀 Automação Master (Cliente & Veículo)</span>
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

    // 4. Referências e Funções Utilitárias
    const logArea = panel.querySelector("#gm-log-output");
    const input = panel.querySelector("#gm-text-input");
    
    // Função de Log [cite: 3]
    const log = (msg, type = "info") => {
        const div = document.createElement("div");
        div.textContent = `[${new Date().toLocaleTimeString()}] ${msg}`;
        if (type === "error") div.className = "gm-log-error";
        if (type === "success") div.className = "gm-log-success";
        logArea.appendChild(div);
        logArea.scrollTop = logArea.scrollHeight;
    };
    
    // Função para Colar da Área de Transferência (Async) 
    const handlePaste = async () => {
        try {
            const text = await navigator.clipboard.readText();
            input.value = text;
            log("OK: Texto colado da área de transferência.", "success");
        } catch (err) {
            log("Erro ao acessar clipboard. Cole manualmente o texto no campo.", "error");
        }
    };
    
    // Função para Preencher um Campo no Formulário 
    const setField = (id, value, label) => {
        if (!value) return log(`Info: Sem valor para ${label}.`, "info");
        const el = document.getElementById(id) || document.getElementsByName(id)[0];
        if (el) {
            el.focus();
            try {
                // Tenta simular a entrada do usuário para Frameworks React/Vue
                let prototype = Object.getPrototypeOf(el);
                let prototypeValueSetter = Object.getOwnPropertyDescriptor(prototype, "value").set;
                prototypeValueSetter.call(el, value);
            } catch (e) {
                // Fallback simples
                el.value = value;
            }
            el.dispatchEvent(new Event('input', { bubbles: true })); // Para alguns listeners
            el.dispatchEvent(new Event('change', { bubbles: true })); // Para validação
            el.dispatchEvent(new Event('blur', { bubbles: true })); // Para gatilhos (como CEP)
            log(`OK: ${label} preenchido.`, "success");
        } else {
            log(`Erro: Campo ${label} (ID: ${id}) não encontrado!`, "error");
        }
    };

    // Função auxiliar para limpar número de telefone (remove 55 se presente) 
    const cleanPhone = e => {
        const t = (e || "").replace(/[^\d]/g, "");
        return t.startsWith("55") ? t.substring(2) : t;
    };

    // Lógica de Extração de DADOS DO CLIENTE 
    const extractClientData = (text) => {
        log("Iniciando extração de dados do Cliente...");
        let data = {};
        let format = "";

        try {
            const getMatch = (regex) => {
                const match = (text.match(regex) || [])[1]?.trim();
                return match?.replace(/\n/g, " ")?.trim() || null;
            };
            
            // Lógica de formatos (mantida do V18) 
            if (text.includes("Nome/Razão Social:")) {
                log("Detectado Formato 1 (PDF).");
                format = "PDF";
                data = {
                    nome: getMatch(/Nome\/Razão Social:\s*(.*?)\n/),
                    cpf: getMatch(/CPF\/CNPJ:\s*(.*?)(?:\s*RG:|\n)/),
                    rg: getMatch(/RG:\s*(.*?)(?:\s*CNH:|\n)/),
                    email: getMatch(/E-mail:\s*(.*?)(?:\s*Nasc\.:|\n)/),
                    nascimento: getMatch(/Nasc\.:\s*(.*?)\n/),
                    celular1: getMatch(/Celular:\s*(.*?)(?:\s*Telefone:|\n)/),
                    celular2: getMatch(/Telefone:\s*(.*?)\n/),
                    cep: getMatch(/CEP:\s*(.*?)\n/),
                    numero: getMatch(/Número:\s*(.*?)\n/)
                };
            } else if (text.includes("Nome Completo\n") && text.includes("Celular WhatsApp:")) {
                log("Detectado Formato 3 (Novo ILEVA).");
                format = "Novo ILEVA";
                data = {
                    nome: getMatch(/Nome Completo\s*\n(.*?)\n/),
                    cpf: getMatch(/CPF:\s*\n(.*?)\n/),
                    rg: getMatch(/RG:\s*\n(.*?)\n/),
                    email: getMatch(/E-mail:\s*\n(.*?)\n/),
                    nascimento: getMatch(/Data Nasc.:\s*\n(.*?)\n/),
                    celular1: getMatch(/Celular WhatsApp:\s*\n(.*?)\n/),
                    celular2: getMatch(/Telefone fixo:\s*\n(.*?)\n/)||getMatch(/Celular Recado:\s*\n(.*?)\n/),
                    cep: getMatch(/CEP:\s*\n(.*?)\n/),
                    numero: getMatch(/Número:\s*\n(.*?)\n/)
                };
            } else if (text.includes("Nome:") || text.includes("Telefone / Whatsapp")) {
                log("Detectado Formato 2 (Portal Antigo).");
                format = "Portal Antigo";
                data = {
                    nome: getMatch(/Nome:\s*\n(.*?)\n/),
                    cpf: getMatch(/CPF\/CNPJ:\s*\n(.*?)\n/),
                    rg: getMatch(/^RG:\s*\n(.*?)\n/m),
                    email: getMatch(/E-mail:\s*\n(.*?)\n/),
                    nascimento: getMatch(/Dt nascimento:\s*\n(.*?)\n/),
                    celular1: getMatch(/Telefone \/ Whatsapp\s*\n(.*?)\n/),
                    celular2: getMatch(/Telefone 2:\s*\n(.*?)\n/),
                    cep: getMatch(/CEP:\s*\n(.*?)\n/),
                    numero: getMatch(/Número:\s*\n(.*?)\n/)
                };
            } else {
                log("Erro: Formato de texto de Cliente não reconhecido.", "error");
                return null;
            }

            if (!data.nome || !data.cpf) {
                log(`Falha ao extrair dados essenciais (Nome ou CPF) do formato ${format}.`, "error");
                return null;
            }
            
            // Limpeza e normalização dos dados
            const cleanedData = {
                nome: (data.nome || "").toUpperCase(),
                cpf: (data.cpf || "").replace(/[^\d]/g, ""),
                rg: data.rg || "",
                email: data.email || "",
                nascimento: data.nascimento || "",
                celular1: cleanPhone(data.celular1),
                celular2: cleanPhone(data.celular2),
                cep: (data.cep || "").replace(/[^\d]/g, ""),
                numero: data.numero || ""
            };

            log("Dados de Cliente extraídos com sucesso.", "success");
            return cleanedData;

        } catch (e) {
            log(`Erro inesperado durante a extração do Cliente: ${e.message}`, "error");
            return null;
        }
    };
    
    // Lógica de Preenchimento de CLIENTE 
    const fillClientForm = (extractedData, isIleva) => {
        log("Iniciando preenchimento do formulário de Cliente...");
        try {
            // Categoria: 34 para ILEVA, 6 para outros (padrão do V18)
            const categoria = isIleva ? "34" : "6";
            
            setField("id_form_pessoa-nome_razao_social", extractedData.nome, "Nome/Razão Social");
            setField("id_form_pessoa-apelido_fantasia", extractedData.nome, "Nome Fantasia");
            setField("id_form_pessoa-cnpj_cpf", extractedData.cpf, "CNPJ/CPF");
            setField("id_form_pessoa-rg", extractedData.rg, "RG");
            setField("id_form_pessoa-email", extractedData.email, "Email");
            setField("id_form_pessoa-dt_bertura_nasc", extractedData.nascimento, "Data Nascimento");
            setField("id_form_pessoa-categoria", categoria, "Categoria (Valor Selecionado)");
            setField("id_form_endereco-cep", extractedData.cep, "CEP");
            setField("id_form_endereco-numero", extractedData.numero, "Número Residência");

            // Gatilho do CEP
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

            // Preenchimento de Telefones [cite: 5]
            if (extractedData.celular1 || extractedData.celular2) {
                const phones = [
                    { num: extractedData.celular1, is_whatsapp: true },
                    { num: extractedData.celular2, is_whatsapp: false }
                ].filter(p => p.num && p.num.length > 0);

                for (let i = 0; i < phones.length; i++) {
                    const phone = phones[i];
                    // Busca pelo campo de número (usando a estrutura div.itemX do V18)
                    const numField = document.querySelector(`div.item${i} input[name="form_fone-numero"]`);
                    if (numField) {
                        setField(numField.id, phone.num, `Telefone ${i+1}`); // Usa setField para simular a digitação
                        
                        // Marca o WhatsApp apenas para o primeiro número se for o caso
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
    
    // Lógica de Extração de DADOS DO VEÍCULO 
    const extractVehicleData = (text) => {
        log("Iniciando extração de dados do Veículo...");
        const cleanText = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n").replace(/ {2,}/g, " ").trim();
        const getVal = (regex) => (cleanText.match(regex) || [])[1]?.trim() || null;
        
        let placa = getVal(/Placa:\s*([^\n]*?)(?:\s*Cód|\s*Valor|\n)/i);
        let chassi = getVal(/(?:Chassi|Nº Chassi):\s*([^\n]*?)(\s*Tipo|\s*Renava|\n)/i);
        let renavam = getVal(/Renava[nm]:\s*([^\n]*?)(?:\s*Tipo|\s*Cota|\n)/i);
        let cor = getVal(/Cor:\s*([^\n]*?)(?:\s*Placa|\s*Possui|\n)/i);
        let anoFabricacao = getVal(/(?:Ano\/Modelo|Ano Fabricação):\s*(\d{4})/i);
        let anoModelo = getVal(/Ano\/Modelo:\s*(\d{4})/i);
        let marca = getVal(/Marca:\s*([^\n]*?)(?:\s*Modelo:|\s*Ano|\n)/i);
        let modelo = getVal(/(?<!Ano\s)Modelo:\s*([^\n]*?)(?:\s*Cor:|\s*Cód|Ano\/|\s*Placa:|\n|$)/i);

        if (placa) placa = placa.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
        if (marca) marca = marca.replace(/Modelo:.*|Cor:.*|Placa:.*|Ano\/.*/i, "").trim();
        if (modelo) modelo = modelo.replace(/Cor:.*|Cód.*|Ano\/.*/i, "").trim();
        
        log(`Dados extraídos: Placa ${placa||"?"}, Renavam ${renavam||"?"}`);
        log(`Modelo: ${modelo||"?"}`);
        
        return {
            placa,
            chassi,
            renavam,
            cor,
            anoFabricacao,
            anoModelo,
            marca,
            modelo
        };
    };
    
    // Lógica de Preenchimento de VEÍCULO 
    const fillVehicleForm = (extractedData) => {
        log("Iniciando preenchimento do formulário de Veículo...");
        try {
            // Função para desmarcar a chave de rastreador (mantida do V2.2) 
            const clickNoButton = () => {
                const onButton = document.querySelector(".bootstrap-switch-handle-on");
                if (onButton && onButton.textContent.trim() === "Sim") {
                    onButton.click();
                    log("OK: Chave de Rastreador desligada.", "success");
                } else {
                    log("Aviso: Botão 'Sim' da chave de Rastreador não encontrado ou já está 'Não'.", "info");
                }
            };
            
            clickNoButton(); // Executa a desativação da chave

            setField("id_placa", extractedData.placa, "Placa");
            setField("id_chassi", extractedData.chassi, "Chassi");
            setField("id_renavam", extractedData.renavam, "Renavam");
            setField("id_ano_fabricacao", extractedData.anoFabricacao, "Ano Fabricação");
            setField("id_cor", extractedData.cor, "Cor");
            setField("id_marca", extractedData.marca, "Marca");
            setField("id_modelo", extractedData.modelo, "Modelo");
            // Usa anoModelo ou anoFabricacao se o Modelo não tiver ano específico
            setField("id_ano", extractedData.anoModelo || extractedData.anoFabricacao, "Ano do Modelo (id_ano)");
            
            log("Preenchimento do formulário de Veículo concluído!", "success");
            
        } catch (e) {
            log(`Erro inesperado ao preencher Veículo: ${e.message}`, "error");
        }
    };
    
    // 5. Conexão de Eventos dos Botões (Listeneres)
    panel.querySelector("#gm-btn-paste").addEventListener("click", handlePaste);
    
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

    log("Painel de automação Master carregado. Aguardando interação.", "success");

})();

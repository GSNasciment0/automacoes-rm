// automacao_unificada.js - V2.4 - Ação Final Consertada

(async function() {
    // 1. Prevenção de Duplicidade
    if (document.getElementById("gm-master-panel")) {
        console.log("O painel de automação master já está aberto.");
        return;
    }

    // ... (CSS e Estrutura HTML OMITIDOS para brevidade, são iguais à V2.3) ...

    // 4. Referências e Funções Utilitárias (Mantidas)
    const logArea = panel.querySelector("#gm-log-output");
    const input = panel.querySelector("#gm-text-input");
    const headerDrag = panel.querySelector("#gm-header-drag");
    const btnMinimize = panel.querySelector("#gm-btn-minimize");
    const btnClose = panel.querySelector("#gm-btn-close");
    const btnTheme = panel.querySelector("#gm-btn-theme");
    
    // Função de Log
    const log = (msg, type = "info") => { /* ... (mantida) ... */
        const div = document.createElement("div");
        div.textContent = `[${new Date().toLocaleTimeString()}] ${msg}`;
        if (type === "error") div.className = "gm-log-error";
        if (type === "success") div.className = "gm-log-success";
        logArea.appendChild(div);
        logArea.scrollTop = logArea.scrollHeight;
    };
    
    // Funções de Extração/Preenchimento (Mantidas)
    const handlePaste = async () => { /* ... (mantida) ... */
        try {
            const text = await navigator.clipboard.readText();
            input.value = text;
            log("OK: Texto colado da área de transferência.", "success");
        } catch (err) {
            log("Erro ao acessar clipboard. Cole manualmente o texto no campo.", "error");
        }
    };
    
    const setField = (id, value, label) => { /* ... (mantida) ... */
        if (!value) return log(`Info: Sem valor para ${label}.`, "info");
        const el = document.getElementById(id) || document.getElementsByName(id)[0];
        if (el) {
            el.focus();
            try {
                let prototype = Object.getPrototypeOf(el);
                let prototypeValueSetter = Object.getOwnPropertyDescriptor(prototype, "value").set;
                prototypeValueSetter.call(el, value);
            } catch (e) {
                el.value = value;
            }
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

    const extractClientData = (text) => { /* ... (mantida) ... */
        // ... Lógica de extração de cliente (manter) ...
        log("Iniciando extração de dados do Cliente...");
        let data = {};
        let format = "";

        try {
            const getMatch = (regex) => {
                const match = (text.match(regex) || [])[1]?.trim();
                return match?.replace(/\n/g, " ")?.trim() || null;
            };
            
            // Lógica de formatos (mantida da V2.3)
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
                log("Detectado Formato 3 (Novo S.GROUP).");
                format = "Novo S.GROUP";
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
    
    const fillClientForm = (extractedData, isSGroup) => { /* ... (mantida) ... */
        // ... Lógica de preenchimento de cliente (manter) ...
        log("Iniciando preenchimento do formulário de Cliente...");
        try {
            const categoria = isSGroup ? "34" : "6";
            
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

            // Preenchimento de Telefones
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
    
    // Lógica de Extração de DADOS DO VEÍCULO (Mantida da V2.3)
    const extractVehicleData = (text) => {
        log("Iniciando extração de dados do Veículo (RegEx V2.3 Estrito)...");
        const cleanText = text.replace(/[\r\n]+/g, ' ').replace(/ {2,}/g, ' ').trim();
        const getVal = (regex) => (cleanText.match(regex) || [])[1]?.trim() || null;
        
        let placa = getVal(/(?:PLACA|Placa|PLACA\/UF)\s*:\s*([A-Z0-9]{3}[A-Z0-9]{1,4})\s+/i);
        if (!placa) placa = getVal(/(?:PLACA|Placa)\s*([^A-Z]*?)([A-Z]{3}[0-9]{1}[A-Z0-9]{1}[0-9]{2})/i); 

        let chassi = getVal(/(?:N\s*[º.]?\s*Chassi|Chassi|Nº\sChassi)\s*:\s*([A-Z0-9]{17})/i); 
        if (!chassi) chassi = getVal(/(?:N\s*[º.]?\s*Chassi|Chassi)\s*:\s*([^\s]{10,20})\s/i); 

        let renavam = getVal(/(?:Renava[nm]|Cód\. Renava[nm])\s*:\s*(\d{8,11})/i); 

        // COR: Para no próximo campo principal: 'Placa' ou 'Cód.fipe'
        let cor = getVal(/(?:Cor|COR)\s*:\s*(.*?)(?:\sPlaca:|\sCód\.fipe|\sAno|\\n|$)/i);
        
        let anoFabricacao = getVal(/(?:Ano\s*Fabricação|Ano\s*Fab|Ano\/Modelo)\s*:\s*(\d{4})/i);
        let anoModelo = getVal(/(?:Ano\/Modelo|Ano\s*Modelo)\s*:\s*\d{4}\/?(\d{4})/i); 
        if (!anoModelo) anoModelo = getVal(/(?:Ano\s*Modelo|Modelo\s*Ano)\s*:\s*(\d{4})/i); 

        // MARCA: Para no próximo campo principal: 'Modelo'
        let marca = getVal(/(?:Marca|Fabricante)\s*:\s*(.*?)(?:\sModelo:|\sAno|\\n|$)/i);
        
        // MODELO: Para no próximo campo principal: 'Cor' ou 'Cód.fipe'
        let modelo = getVal(/(?<!Ano\s)(?:Modelo|MODELO)\s*:\s*(.*?)(?:\sCor:|\sCód\.fipe|\sPlaca:|\sAno|\\n|$)/i);
        
        if (placa) placa = placa.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
        if (chassi) chassi = chassi.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
        if (renavam) renavam = renavam.replace(/[^0-9]/g, "");

        if (marca) marca = marca.replace(/\s{2,}/g, ' ').trim();
        if (modelo) modelo = modelo.replace(/\s{2,}/g, ' ').trim();
        if (cor) cor = cor.replace(/\s{2,}/g, ' ').trim();

        log(`Dados extraídos: Placa ${placa||"?"}, Renavam ${renavam||"?"}`);
        log(`Marca: ${marca||"?"}, Modelo: ${modelo||"?"}`);
        
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
    
    // Ação Adicional: Clicar no botão de pesquisa (Lupa) - CORRIGIDA (V2.4)
    const clickSearchButton = () => {
        // PRIORIDADE 1: Buscar pelo ID específico fornecido (btnChassi)
        const specificButton = document.getElementById('btnChassi');
        
        if (specificButton) {
            specificButton.click(); 
            log("OK: Botão de pesquisa Clicado com sucesso (Via ID: btnChassi).", "success");
            return true;
        }
        
        // PRIORIDADE 2: Fallback (Se não encontrar o ID específico)
        const searchIcon = document.querySelector('i.fas.fa-search');
        if (searchIcon) {
            const buttonElement = searchIcon.closest('button') || searchIcon.parentElement;
            if (buttonElement) {
                buttonElement.click(); 
                log("OK: Botão de pesquisa Clicado com sucesso (Via ícone).", "success");
                return true;
            }
        }
        
        // PRIODIDADE 3: Procura o botão de submissão (submit) padrão
        const saveButton = document.querySelector('button[type="submit"]');
        if (saveButton) {
            saveButton.click();
            log("OK: Botão 'submit' clicado.", "success");
            return true;
        }

        log("Aviso: Botão de pesquisa (btnChassi) ou 'submit' não encontrado para ação final. O preenchimento foi concluído.", "info");
        return false;
    };


    // Lógica de Preenchimento de VEÍCULO (Mantida com Ação Final)
    const fillVehicleForm = (extractedData) => {
        log("Iniciando preenchimento do formulário de Veículo...");
        try {
            // Função para desmarcar a chave de rastreador
            const clickNoButton = () => {
                const onButton = document.querySelector(".bootstrap-switch-handle-on");
                if (onButton && onButton.textContent.trim() === "Sim") {
                    onButton.click();
                    log("OK: Chave de Rastreador desligada.", "success");
                } else {
                    log("Aviso: Botão 'Sim' da chave de Rastreador não encontrado ou já está 'Não'.", "info");
                }
            };
            
            clickNoButton(); 

            // Preenchimento dos campos
            setField("id_placa", extractedData.placa, "Placa");
            setField("id_chassi", extractedData.chassi, "Chassi");
            setField("id_renavam", extractedData.renavam, "Renavam");
            setField("id_ano_fabricacao", extractedData.anoFabricacao, "Ano Fabricação");
            setField("id_cor", extractedData.cor, "Cor");
            setField("id_marca", extractedData.marca, "Marca");
            setField("id_modelo", extractedData.modelo, "Modelo");
            setField("id_ano", extractedData.anoModelo, "Ano do Modelo (id_ano)");
            
            log("Preenchimento do formulário de Veículo concluído!", "success");

            // ÚLTIMA AÇÃO: Clicar no botão de pesquisa
            clickSearchButton();
            
        } catch (e) {
            log(`Erro inesperado ao preencher Veículo: ${e.message}`, "error");
        }
    };


    // ... (Funções de interface/eventos drag, minimize, theme e event listeners dos botões OMITIDOS para brevidade, são iguais à V2.3) ...

    const makeDraggable = (element, dragHandle) => { /* ... (mantido) ... */
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        dragHandle.addEventListener('mousedown', dragMouseDown);

        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            if (e.target.closest('.gm-controls')) return; 
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


    // 5. Conexão de Eventos dos Botões (Listeneres)
    panel.querySelector("#gm-btn-paste").addEventListener("click", handlePaste);
    btnMinimize.addEventListener("click", toggleMinimize);
    btnTheme.addEventListener("click", toggleTheme);
    
    btnClose.addEventListener("click", () => {
        panel.remove();
        document.getElementById("gm-master-style")?.remove();
    });


    // Eventos de Ação
    panel.querySelector("#gm-btn-cliente").addEventListener("click", () => {
        logArea.innerHTML = "";
        const text = input.value;
        if (!text) return log("O campo de texto está vazio. Cole os dados primeiro.", "error");

        const isSGroup = panel.querySelector("#gm-is-ileva-checkbox").checked;
        const clientData = extractClientData(text);
        
        if (clientData) {
            fillClientForm(clientData, isSGroup);
        } else {
            log("A automação de Cliente falhou. Verifique os logs e o texto colado.", "error");
        }
    });

    panel.querySelector("#gm-btn-veiculo").addEventListener("click", () => {
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

    log("Painel de automação Master V2.4 (Ação Final Consertada) carregado e pronto.", "success");

})();

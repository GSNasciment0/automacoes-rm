# 🚀 Automação de Cadastro e Veículos

Bem-vindo ao repositório de ferramentas de automação. Estes scripts foram criados para agilizar o preenchimento de formulários no nosso sistema, reduzindo erros e poupando tempo.

## 📋 Funcionalidades

* **Automação de Clientes (V18):** Preenche dados pessoais, endereços e contactos a partir de texto de PDF ou do sistema ILEVA.
* **Automação de Veículos (V2.2):** Preenche dados do veículo (Placa, Chassi, Renavam, etc.) a partir do contrato.

---

## ⚙️ Como Instalar (Passo a Passo)

Para usar estas ferramentas, precisamos de criar um "Favorito Inteligente" (Bookmarklet) no navegador. Só precisa de fazer isto uma vez.

### 1. Instalar a Automação de CLIENTES

1.  No seu navegador, clique com o botão direito na barra de favoritos e selecione **"Adicionar página"** (ou "Adicionar favorito").
2.  **Nome:** Digite `🤖 Auto Clientes`.
3.  **URL (ou Endereço):** Copie e cole **todo** o código abaixo:

```javascript
javascript:(function(){    var script = document.createElement('script');    script.src = 'https://cdn.jsdelivr.net/gh/GSNasciment0/automacoes-rm/clientes.js?v=%27 + Date.now();    document.body.appendChild(script);})();

```javascript
javascript:(function(){    var script = document.createElement('script');    script.src = 'https://cdn.jsdelivr.net/gh/GSNasciment0/automacoes-rm/veiculos.js?v=%27 + Date.now();    document.body.appendChild(script);})();

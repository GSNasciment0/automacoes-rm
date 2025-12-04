# 🚀 Automação Master de Cadastro e Veículos (V2.16)

Bem-vindo ao repositório da Ferramenta de Automação Master. Este script unificado foi criado para agilizar o preenchimento de formulários de **Cliente e Veículo** no nosso sistema, reduzindo erros, poupando tempo e garantindo maior precisão na transferência de dados.

A versão **V2.16** inclui a correção definitiva para o campo de Data de Nascimento.

---

## 📋 Funcionalidades Integradas

A Ferramenta Master unifica as funcionalidades anteriores:

* **Preenchimento de Clientes:** Preenche dados pessoais, CNPJ/CPF, e-mail, Data de Nascimento (agora com a correção V18 aplicada) e contactos.
* **Preenchimento de Endereço:** Preenche CEP, Número e Complemento (o logradouro é preenchido automaticamente pelo sistema após o *blur* do CEP).
* **Preenchimento de Veículos:** Preenche Placa, Chassi, Renavam, Ano/Modelo, Cor, Marca e Modelo.

---

## ⚙️ Como Instalar a Versão Unificada (Passo a Passo)

Para usar a versão unificada, precisamos de criar um "Favorito Inteligente" (Bookmarklet) no navegador. Só precisa de fazer isto uma vez.

### 1. Criar o Novo Favorito Inteligente

1.  No seu navegador, clique com o botão direito na barra de favoritos e selecione **"Adicionar página"** (ou "Adicionar favorito").
2.  **Nome:** Digite um nome claro, como `🚀 Auto Master V2.16` ou `🤖 Automação Unificada`.
3.  **URL (ou Endereço):** Copie e cole **todo** o código abaixo.

### 2. O Código (URL do Bookmarklet)

Para garantir que o script **sempre** carregue a versão mais atualizada do seu repositório no GitHub, você deve usar o *link* direto para o ficheiro na *branch* principal (`main` ou `master`) sem especificar o SHA.

**Atenção:** O link correto para puxar a **última versão** do ficheiro `automacao_unificada.js` do ramo principal (`main`) no repositório `GSNasciment0/automacoes-rm` é este.

```javascript
javascript:(function(){var s=document.createElement('script');s.src='[https://cdn.jsdelivr.net/gh/GSNasciment0/automacoes-rm/automacao_unificada.js?v=](https://cdn.jsdelivr.net/gh/GSNasciment0/automacoes-rm/automacao_unificada.js?v=)' + Date.now();document.body.appendChild(s);})();

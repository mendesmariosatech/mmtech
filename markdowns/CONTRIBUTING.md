# Contribuindo para MM-Tech

Siga as diretrizes abaixo para garantir que suas contribuições sejam integradas sem problemas.

## Passos para Contribuir

1. **Fork o Repositório:**

   - Crie um fork do repositório em sua conta GitHub.
   - Clone o fork para o seu ambiente local:
     ```bash
     git clone https://github.com/mendesmariosatech/mmtech.git
     ```
   - Navegue até o diretório do projeto:
     ```bash
     cd mmtech
     ```

2. **Crie uma Nova Branch:**

   - Sempre crie uma nova branch a partir da branch `dev`:
     ```bash
     git checkout dev
     git pull origin dev
     git checkout -b seu-nome/nome-da-sua-branch
     ```
   - Nomeie sua branch de forma descritiva para refletir o trabalho que você está fazendo (exemplo: `silas/feature_nova-funcionalidade` ou `alex/bugfix_corrigir-bug`).

3. **Faça Suas Alterações:**

   - Implemente suas mudanças na nova branch criada.
   - Certifique-se de seguir as convenções de código do projeto.

4. **Teste Suas Alterações:**

   - Teste seu código para garantir que suas alterações não quebrem nada.
   - Se aplicável, adicione novos testes para cobrir as mudanças realizadas.

5. **Commit das Alterações:**

   - Faça commit das suas alterações com uma mensagem clara e descritiva:
     ```bash
     git add .
     git commit -m "Descrição do que foi alterado"
     ```

6. **Envie as Alterações para o Repositório Remoto:**

   - Envie sua branch para o seu fork no GitHub:
     ```bash
     git push origin nome-da-sua-branch
     ```

7. **Abra um Pull Request:**
   - No GitHub, navegue até o seu fork e abra um Pull Request (PR) para a branch `dev` do repositório original.
   - Preencha a descrição do PR explicando as alterações e por que elas são necessárias.
   - Acompanhe o PR para responder a quaisquer comentários ou solicitações de mudanças feitas pelos revisores.

## Revisão de Código

Todos os PRs passarão por uma revisão de código. Certifique-se de que seu código esteja limpo, comentado (quando necessário), e siga os padrões estabelecidos.

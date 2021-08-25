Aplicação React que simula uma carteira de despesas. A manipulação do estado global da aplicação é feita usando Redux.

Link GitHub Pages: vitor8.github.io/trybewallet/

![Captura de tela de 2021-08-25 14-15-02](https://user-images.githubusercontent.com/24492328/130835704-73ac54c5-f1b5-4cc3-b661-b83da650d746.png)

Passo a Passo para a instalção do projeto:

Fork o repositório
Clone o repositório: git clone git@github.com:Vitor8/trybewallet.git
Entre na pasta: cd trybewallet
Instale as seguintes dependências:
  - npm install
Rode a aplicação com: npm-start

Inicialmente, a aplicação faz requisição a uma API cujo resultado é o preço do câmbio BRL em diferentes moedas.

O objetivo do app é o usuário ter um lugar para armazenar suas diferentes despesas, em várias possíveis moedas. 

No momento de inserir uma despesa, o usuário deve digitar seu valor, a moeda em questão, o método de pagamento, o tipo de gasto, e uma descrição. Ao clicar no botão 'Adicionar despesa', o gasto em questão será adicionado a lista a ser renderizada. Ao fim, o usuário também tem a opção de deletar aquela despesa.  

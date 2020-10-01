# :frowning_face: Teste Sádico :frowning_face:

Apesar do nome, o **Teste Sádico** é apenas um contador de piadas geeks aleatórias para animar o dia do nosso amigo Zezinho (esse carinha aqui -> :neutral_face:) e quem sabe nesse processo animar o seu também! 

## A ideia do aplicativo :bulb:
A ideia desse aplicativo vem de um teste frontend da [incuca](https://incuca.net/) e segue as seguintes regras:
    1. Aplicação inicia com uma tela nem feliz, nem triste :|
    2. O primeiro clique na tela deve alterar a rota (URL do navegador) e torná-la 100% triste :(  
    3. Um clique na tela deve alterar a rota (URL no navegador) e gerar uma piada randômica em um modal
    4. A tela deverá progressivamente melhorar o seu humor enquanto eu leio a piada para ela :)
    5. Fechada a modal, a SPA a sua indecisão inicial sobre o seu humor, sua vida, o universo e tudo mais :|

## Ferramentas/bibliotecas utilizadas :books: 

Essa aplicação foi feita em Vue e utiliza o Vuex e o Vue-Router para gerenciamento do estado e das rotas da aplicação. Além disso, foram adicionadas as bibliotecas vue-meta para melhoria no SEO e o Jest para realização dos testes automatizados.

## Passo a passo da criação do a aplicativo :memo:
Primeiro passo para a criação da aplicação é visualizar que existem três páginas/views: a sem alteração de humor, a 100% triste e a que tem a modal onde a piada é contada. Aqui chamamos elas, respectivamente, de Pokerface, Sad e Joke e podem ser vistas dentro da pasta views.

#### Pokerface.vue e Sad.vue views
Como a aplicação começa pela tela de pokerface é por ela também que vamos começa a construção do sistema. Nessa primeira tela, precisamos garantir que o nosso amigo (aqui chamado de Zezinho) não esteja nem feliz e nem triste sempre que essa tela for carregada. Como o humor de Zezinho é compartilhado por toda a aplicação, foi criada uma variável chamada **mood** dentro da store do **Vuex** e, junto com ela, o getter **getMood** e a mutation **SET_MOOD**. O valor do mood foi inicializado para SAD por ele ser o humor inicial tanto na tela SAD quanto na tela Joke. O código do Vuex pode ser visto abaixo. 
    
    export default new Vuex.Store({
        state: {
            mood: MOOD.SAD
        },
        mutations: {
            SET_MOOD(state, newMood){
            state.mood = newMood;
            }
        },
        getters:{
            getMood(state) {
            return state.mood;
            },
        }
    })
    // src/store/index.js XD
Com isso pronto, agora é só checar se o humor de Zezinho é diferente de pokerface (nem triste, nem feliz) e caso não seja, trocá-lo para pokerface toda vez que a tela for carregada. Para isso, criamos um if dentro do método de ciclo de vida mounted da página/view Pokerface para fazer essa verficação sempre que o componente for montado.

    mounted() {
        if (this.$store.getters.getMood !== MOOD.POKER_FACE)
            this.$store.commit('SET_MOOD', MOOD.POKER_FACE);
        },
    // src/views/Pokerface.vue XD

Tendo isso em mãos, basta agora só exibir a cara de Zezinho e pegar o evento de clique na tela para direcionar o usuário para próxima página. Para exibir a cara foi criado um componente chamado **Emoticon.vue**, que nada mais faz do que utilizar o getMood para pegar o humor da store e adicionar ele a uma tag h2. Com isso temos nossa tela Pokerface 100% funcionando.

    <template>
      <div @click="nextPage" class="emoticon-container">
        <h1 class="title">Bem-vindo ao Teste Sádico!</h1>
        <Emoticon />
        <span class="subtitle">
          Este carinha acima é o Zezinho! E hoje, aparentemente, ele não está em um
          dia legal...
        </span>
      </div>
    </template>
    // src/views/Pokerface.vue XD

A página Sad segue a mesma lógica da página Pokerface, só que checando se Zezinho está triste em vez de com cara de pokerface e direcionando para página Joke com o clique na tela.

    mounted() {
        if (this.$store.getters.getMood !== MOOD.SAD)
            this.$store.commit('SET_MOOD', MOOD.SAD);
    },
    // src/views/Sad.vue XD

#### Joke.vue view
Nessa página seguimos uma ideia parecida com a das duas anteriores, checamos o estado da aplicação assim que a tela é carregada e setamos o valor triste ao **mood** caso ele esteja com um valor diferente. Feito isso, ainda no mounted da página, fazemos uma requisição para a API de piadas e ao recebermos a resposta, a atribuimos à variavel **joke** do data, abrimos o modal e chamamos o método **listenJoke**.
    
    mounted() {
        if (this.$store.getters.Mood !== MOOD.SAD)
            this.$store.commit('SET_MOOD', MOOD.SAD);

        ApiService.getJoke()
            .then((response) => {
                this.joke = response.joke;
                this.openModal();
                this.listenJoke();
            })
            .catch((err) => {
                console.log(err);
            });
    },
    // src/views/Joke.vue XD

O **listenJoke** é o método responsável por realizar a animação dos emoticons e criar a ilusão de que o humor de Zezinho está progredindo gradualmente. Nela estão aninhados um conjunto de setTimeouts responsável por mudar o humor conforme o tempo for passando. Ao final do método é chamado uma função que fecha o modal e redireciona para a página Pokerface reiniciando todo o ciclo da aplicação.  

    methods: {
        listenJoke() {
            setTimeout(() => {
            //await 2000 ms and change state to less sad
            this.changeMood(MOOD.LESS_SAD);
                setTimeout(() => {
                //await 2000 ms and change state to almost poker face
                this.changeMood(MOOD.ALMOST_POKER_FACE);
                    setTimeout(() => {
                        //await 2000 ms and change state to poker face
                        this.changeMood(MOOD.POKER_FACE);
                        setTimeout(() => {
                            //await 2000 ms and change state to happy
                            this.changeMood(MOOD.HAPPY);
                            setTimeout(() => {
                            //await 2000 ms and restart to first page
                            this.closeModal();
                            }, 2000);
                        }, 2000);
                    }, 2000);
                }, 2000);
             }, 2000);
        },
        changeMood(newMood) {
            this.$store.commit('SET_MOOD', newMood);
         },
         closeModal() {
            this.$refs.baseModal.closeModal();
            this.$router.push({ name: 'pokerface' });
        }
    }
    // src/views/Joke.vue XD



## Rodando o sistema :rocket:
Para rodar o sistema web, abra o diretório e digite no terminal:

    //Para instalar as depêndencias
    yarn  
    ou 
    npm install

E

    yarn serve // para inicializar o sistema na sua máquina local

E pronto! O seu sistema está configurado e rodando! 



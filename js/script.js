
/* =========================================
   1. MONTAGEM DE FICHA DE TREINO
========================================= */

if (document.getElementById("grupo-muscular")) {

    // Elementos do HTML
    const grupo = document.getElementById("grupo-muscular");
    const exercicio = document.getElementById("exercicio");
    const series = document.getElementById("series");
    const repeticoes = document.getElementById("repeticoes");

    const adicionar = document.getElementById("adicionar-exercicio");
    const limpar = document.getElementById("limpar-ficha");

    const lista = document.getElementById("lista-ficha");
    const mensagem = document.getElementById("mensagem-ficha");
    const total = document.getElementById("total-exercicios");


    // Lista de exercícios
    const exercicios = {

        Peito: [
            "Supino reto",
            "Supino inclinado",
            "Crucifixo com halteres",
            "Peck deck"
        ],

        Costas: [
            "Puxada alta",
            "Remada baixa",
            "Remada curvada",
            "Remada unilateral"
        ],

        Pernas: [
            "Agachamento livre",
            "Leg press",
            "Cadeira extensora",
            "Mesa flexora"
        ],

        Braços: [
            "Rosca direta",
            "Rosca martelo",
            "Tríceps pulley",
            "Tríceps testa"
        ]

    };


    // Recupera os exercícios salvos
    let ficha = [];

    try {
        ficha = JSON.parse(localStorage.getItem("minhaFicha")) || [];
    } catch (erro) {
        ficha = [];
    }


    // Seleciona os exercícios de acordo com o grupo
    grupo.addEventListener("change", function () {

        exercicio.innerHTML = "";

        if (grupo.value === "") {

            exercicio.innerHTML =
                '<option value="">Escolha um grupo primeiro</option>';

            exercicio.disabled = true;

        } else {

            exercicio.disabled = false;

            exercicio.innerHTML =
                '<option value="">Selecione um exercício</option>';

            for (let i = 0; i < exercicios[grupo.value].length; i++) {

                const opcao = document.createElement("option");

                opcao.value = exercicios[grupo.value][i];
                opcao.textContent = exercicios[grupo.value][i];

                exercicio.appendChild(opcao);

            }

        }

    });


    // Adiciona exercício à ficha
    adicionar.addEventListener("click", function () {

        const nomeGrupo = grupo.value;
        const nomeExercicio = exercicio.value;

        const qtdSeries = Number(series.value);
        const qtdRepeticoes = Number(repeticoes.value);


        if (nomeGrupo === "" || nomeExercicio === "") {

            mensagem.textContent = "Selecione um grupo e um exercício.";
            return;

        }


        if (
            series.value === "" ||
            repeticoes.value === "" ||
            qtdSeries < 1 ||
            qtdSeries > 10 ||
            qtdRepeticoes < 1 ||
            qtdRepeticoes > 50 ||
            !Number.isInteger(qtdSeries) ||
            !Number.isInteger(qtdRepeticoes)
        ) {

            mensagem.textContent = "Informe séries e repetições válidas.";
            return;

        }


        // Cria o exercício
        const novoExercicio = {

            grupo: nomeGrupo,
            nome: nomeExercicio,
            series: qtdSeries,
            repeticoes: qtdRepeticoes

        };


        ficha.push(novoExercicio);

        salvarFicha();
        mostrarFicha();

        mensagem.textContent = "Exercício adicionado com sucesso!";

        exercicio.value = "";

    });


    // Salva a ficha no navegador
    function salvarFicha() {

        localStorage.setItem("minhaFicha", JSON.stringify(ficha));

    }


    // Mostra os exercícios na tela
    function mostrarFicha() {

        lista.innerHTML = "";


        if (ficha.length === 0) {

            lista.innerHTML = `
                <div class="ficha-vazia">
                    <span>📋</span>
                    <p>Sua ficha está vazia.</p>
                    <small>Adicione exercícios para começar.</small>
                </div>
            `;

        } else {

            for (let i = 0; i < ficha.length; i++) {

                const item = document.createElement("div");
                item.className = "item-ficha";

                const informacoes = document.createElement("div");
                informacoes.className = "informacoes-exercicio";

                const titulo = document.createElement("h4");
                titulo.textContent = ficha[i].nome;

                const detalhes = document.createElement("p");

                detalhes.textContent =
                    ficha[i].series + " séries x " +
                    ficha[i].repeticoes + " repetições";

                const nomeGrupo = document.createElement("span");
                nomeGrupo.textContent = ficha[i].grupo.toUpperCase();

                const botaoRemover = document.createElement("button");

                botaoRemover.textContent = "Remover";
                botaoRemover.className = "remover-exercicio";
                botaoRemover.setAttribute("data-indice", i);

                informacoes.appendChild(titulo);
                informacoes.appendChild(detalhes);
                informacoes.appendChild(nomeGrupo);

                item.appendChild(informacoes);
                item.appendChild(botaoRemover);

                lista.appendChild(item);

            }

        }


        total.textContent = "Total de exercícios: " + ficha.length;

    }


    // Remove exercício
    lista.addEventListener("click", function (evento) {

        if (evento.target.classList.contains("remover-exercicio")) {

            const indice = Number(
                evento.target.getAttribute("data-indice")
            );

            ficha.splice(indice, 1);

            salvarFicha();
            mostrarFicha();

            mensagem.textContent = "Exercício removido.";

        }

    });


    // Limpa toda a ficha
    limpar.addEventListener("click", function () {

        ficha = [];

        salvarFicha();
        mostrarFicha();

        mensagem.textContent = "Ficha limpa com sucesso.";

    });


    // Mostra a ficha ao abrir a página
    mostrarFicha();

}



/* =========================================
   2. CALCULADORA DE IMC
========================================= */

if (document.getElementById("calcular-imc")) {

    // Elementos do HTML
    const peso = document.getElementById("peso");
    const altura = document.getElementById("altura");

    const botaoCalcular = document.getElementById("calcular-imc");

    const resultado = document.getElementById("resultado-imc");
    const mensagemIMC = document.getElementById("mensagem-imc");


    // Evento do botão calcular
    botaoCalcular.addEventListener("click", function () {

        const valorPeso = Number(peso.value);
        const valorAltura = Number(altura.value);


        // Verifica os campos
        if (
            peso.value === "" ||
            altura.value === "" ||
            !Number.isFinite(valorPeso) ||
            !Number.isFinite(valorAltura) ||
            valorPeso <= 0 ||
            valorAltura < 0.5 ||
            valorAltura > 2.5
        ) {

            mensagemIMC.textContent = "Informe peso e altura válidos.";

            return;

        }


        // Calcula o IMC
        const imc = valorPeso / (valorAltura * valorAltura);


        // Define a classificação
        let classificacao = "";


        if (imc < 18.5) {

            classificacao = "Baixo peso";

        } else if (imc < 25) {

            classificacao = "Peso adequado";

        } else if (imc < 30) {

            classificacao = "Sobrepeso";

        } else if (imc < 35) {

            classificacao = "Obesidade grau I";

        } else if (imc < 40) {

            classificacao = "Obesidade grau II";

        } else {

            classificacao = "Obesidade grau III";

        }


        // Define a cor do resultado
        if (imc >= 18.5 && imc < 25) {

            resultado.className = "resultado-imc adequado";

        } else {

            resultado.className = "resultado-imc inadequado";

        }


        // Apresenta o resultado
        resultado.innerHTML = `

            <div class="icone-resultado-imc">📊</div>

            <h3>Resultado do seu IMC</h3>

            <div class="valor-imc">
                ${imc.toFixed(2).replace(".", ",")}
            </div>

            <div class="classificacao-imc">
                ${classificacao}
            </div>

            <div class="classificacoes-imc">

                <div>
                    <span>Seu peso</span>
                    <strong>${valorPeso} kg</strong>
                </div>

                <div>
                    <span>Sua altura</span>
                    <strong>${valorAltura.toFixed(2)} m</strong>
                </div>

                <div>
                    <span>Classificação</span>
                    <strong>${classificacao}</strong>
                </div>

            </div>

        `;


        // Limpa a mensagem
        mensagemIMC.textContent = "";

    });

}

//O principal objetivo deste desafio é fortalecer suas habilidades em lógica de programação. Aqui você deverá desenvolver a lógica para resolver o problema.

// Desafio

const amigos = [];

function atualizarLista() {
    const lista = document.getElementById('listaAmigos');
    if (!lista) {
        console.error('Elemento com id "listaAmigos" não encontrado.');
        return;
    }
    lista.innerHTML = '';
    amigos.forEach(amigo => {
        const li = document.createElement('li');
        li.textContent = amigo;
        lista.appendChild(li);
    });
}

function adicionarAmigo() {
    const input = document.getElementById('amigo');
    if (!input) {
        console.error('Elemento com id "amigo" não encontrado.');
        return;
    }
    const nomeAmigo = input.value.trim();
    if (nomeAmigo) {
        amigos.push(nomeAmigo);
        atualizarLista();
        input.value = '';
    } else {
        alert('Por favor, insira um nome válido.');
    }
}

function sortearAmigo() {
    if (amigos.length < 2) {
        alert('Adicione pelo menos 2 amigos para realizar o sorteio.');
        return;
    }
    
    // Limpar resultados anteriores
    const resultado = document.getElementById('resultado');
    if (resultado) {
        resultado.innerHTML = '';
    }
    
    // Criar cópia do array para não modificar o original
    const amigosCopia = [...amigos];
    // Embaralhar a lista
    const amigosEmbaralhados = embaralharArray([...amigosCopia]);
    
    // Criar pares de amigos secretos
    for (let i = 0; i < amigos.length; i++) {
        const pessoa = amigos[i];
        const amigoSorteado = amigosEmbaralhados[i];
        
        // Adicionar ao resultado
        if (resultado) {
            const li = document.createElement('li');
            li.textContent = `${pessoa} → ${amigoSorteado}`;
            resultado.appendChild(li);
        }
        
        // Também podemos mostrar no console para debug
        console.log(`${pessoa} tirou ${amigoSorteado}`);
    }
    
    alert('Sorteio realizado com sucesso! Veja o resultado abaixo.');
}

// Função para embaralhar array (algoritmo Fisher-Yates)
function embaralharArray(array) {
    // Cria uma cópia para não modificar o array original
    const novoArray = [...array];
    
    // Verifica se há pelo menos 2 elementos para evitar que alguém tire a si mesmo
    if (novoArray.length < 2) {
        return novoArray;
    }
    
    // Embaralha o array
    for (let i = novoArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [novoArray[i], novoArray[j]] = [novoArray[j], novoArray[i]];
    }
    
    // Verifica se alguém tirou a si mesmo e corrige se necessário
    for (let i = 0; i < array.length; i++) {
        if (novoArray[i] === array[i]) {
            // Se alguém tirou a si mesmo, troca com o próximo ou o primeiro elemento
            const indexTroca = (i + 1) % array.length;
            [novoArray[i], novoArray[indexTroca]] = [novoArray[indexTroca], novoArray[i]];
        }
    }
    
    return novoArray;
}

// Inicializar a lista ao carregar a página
document.addEventListener('DOMContentLoaded', atualizarLista);

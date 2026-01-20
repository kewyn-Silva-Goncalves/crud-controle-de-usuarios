const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

let Usuarios = [];
let proximoID = 1;

function perguntar(txt, callback) {
    rl.question(txt, (resposta) => {
        callback(resposta);
    });
}

function AcharIndicePorID(id) {
    for (let i = 0;  i < Usuarios.length; i++) {
        if (Usuarios[i].id === id) {
            return i;
        }
    }

    return -1;
}

function cadastrarusuario() {
    console.log('Cadastrar Usuario');

    perguntar('Nome: ', (nome) => {
        perguntar('Idade: ', (idade) => {
            perguntar('CPF: ', (CPF) => {
                nome = nome.trim();
                idade = +idade;
                CPF = +CPF;

                if (!nome || Number.isNaN(idade) || Number.isNaN(CPF)) {
                    console.log('Dados errados');

                    return menu();
                }

                const user = {
                    id: proximoID,
                    nome: nome,
                    idade: idade,
                    CPF: CPF,
                }

                Usuarios.push(user);
                proximoID++;

                console.log('Usuario cadastrado com sucesso', user.id);
                menu();
            });
        });
    });
}

function listarusuarios() {
    console.log('Listar usuarios');

    if (Usuarios.length === 0) {
        console.log('Nenhum usuario cadastrado');
    }

    for (let i = 0; i < Usuarios.length; i++) {
        const U = Usuarios[i];
        console.log('Nome: ', U.nome, '|','Idade: ', U.idade, '|' , 'CPF: ', U.CPF);
    }
    menu();
}

function deletarusuario() {
    console.log('Deletar usuario');

    perguntar('Digite o ID: ', (idStr) => {
        const id = +idStr;

        if (Number.isNaN(id)) {
            console.log('Dados errados');

            return menu();
        }

        const Posicao = AcharIndicePorID(id);

        if (Posicao === -1) {
            console.log('Usuario não encontrado');

            return menu();
        }

        Usuarios.splice(Posicao, 1);
        console.log('Usuario deletado com sucesso');
        menu();
    });
}

function mostrarmenu() {
    console.log('\n===========================')
    console.log('       CRUD USUARIOS')
    console.log('===========================')
    console.log('1) Cadastrar usuario')
    console.log('2) Listar usuario')
    console.log('3) Vizualizar usuario por ID')
    console.log('4) editar usuario')
    console.log('5) Deletar usuario')
    console.log('0) Sair')
    console.log('============================')
}

function menu() {
    mostrarmenu();

    perguntar('Escolha uma opção: ', (op) => {
        op = op.trim();

        switch (op) {
            case '1':
                cadastrarusuario();
                break;
            case '2':
                listarusuarios();
                break;
            case '3':
                vizualizarporID();
                break;
            case '4':
                editarusuario();
                break;
            case '5':
                deletarusuario();
                break;
            case '0':
                console.log('Saindo')
                rl.close();
                break;

                default:
                    console.log('Opção invalida');
                    return menu();
        }
    });
}

menu();
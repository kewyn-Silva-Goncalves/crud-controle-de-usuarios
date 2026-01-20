const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

function perguntar(txt, callback) {
    rl.question(txt, (resposta) => {
        callback(resposta);
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
    })
}
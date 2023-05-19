async function buscaEndereco(cep) {

    var mensagemErro = document.getElementById('erro')
    mensagemErro.innerHTML = ""
    try {

        var consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
        var consultaCEPConvert = await consultaCEP.json()
        if(consultaCEPConvert.erro){

            throw Error('CEP não existente!')
            //Particularmente essa API não retorna um erro caso o CEP não exista, essa linha então, expõe esse tipo de erro

        }

        var cidade = document.getElementById('cidade')
        var bairro = document.getElementById('bairro')
        var logradouro = document.getElementById('endereco')
        var estado = document.getElementById('estado')

        cidade.value = consultaCEPConvert.localidade
        bairro.value = consultaCEPConvert.bairro
        logradouro.value = consultaCEPConvert.logradouro
        estado.value = consultaCEPConvert.uf
        //Adicionando os valores consultados pela API para dentro dos campos do programa

        console.log(consultaCEPConvert)
        return consultaCEPConvert
        //Envia a requisição pra API pedindo as informações do CEP e converte para dados manipulaveis 

    } catch(erro) {

        mensagemErro.innerHTML = `<p>O CEP inserido é inválido. Por favor, Tente novamente!</p>`
        console.log(erro)
        //É impresso na tela caso o CEP seja inválido

    }
}

var cep = document.getElementById('cep')
cep.addEventListener("focusout", () => buscaEndereco(cep.value))
//focusout funciona quando o usuário termina de escrever o cep e clica fora do campo
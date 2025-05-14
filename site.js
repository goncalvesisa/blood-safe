async function buscarPostos() {
    const cep = document.getElementById('cep').value;
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = "";
  
    if (!cep.match(/^\d{5}-?\d{3}$/)) {
      resultado.innerHTML = "<p>Por favor, insira um CEP válido.</p>";
      return;
    }
  
   
    const cepSemHifen = cep.replace('-', '');
  
    try {
  
      const enderecoResponse = await fetch(`https://brasilapi.com.br/api/cep/v2/${cepSemHifen}`);
      if (!enderecoResponse.ok) {
        resultado.innerHTML = "<p>CEP não encontrado.</p>";
        return;
      }
      const enderecoData = await enderecoResponse.json();
      const bairro = enderecoData.neighborhood;
      const cidade = enderecoData.city;
      const estado = enderecoData.state;
      console.log(bairro)
      console.log(cidade)
      console.log(estado)
  
     
      resultado.innerHTML += `<p><strong>Bairro:</strong> ${bairro}</p>`;
  
      
      const postos = await obterPostosProximos(bairro, cidade, estado);
      if (postos.length === 0) {
        resultado.innerHTML += "<p>Nenhum posto de doação encontrado nas proximidades.</p>";
      } else {
        resultado.innerHTML += "<h3>Postos encontrados:</h3>";
        postos.forEach(p => {

          
             const query = `where=municipio='${cidade}' AND doacao_sangue='Sim'&outFields=nome_da_unidade,no_logradouro,nome_bairro,municipio,latitude,longitude&f=json`;
  
          resultado.innerHTML += `
            <div class="posto">
              <strong>${p.nome}</strong><br>
              ${p.endereco}<br>
             
            </div>
          `;
        });
      }
    } catch (error) {
      resultado.innerHTML = "<p>Erro ao buscar informações. Tente novamente mais tarde.</p>";
      console.error(error);
    }
  }
  
  async function obterPostosProximos(bairro, cidade, estado) {
    const postoPerto = await fetch(`https://iede.rs.gov.br/server/rest/services/SES/UBS_RS/FeatureServer`);
  
    if (cidade === "Caxias do Sul") {
      if (bairro === "Centro") {
        return [
          {
            nome: "UPA Central (Postão 24 Horas)",
            endereco: "Rua Marechal Floriano, 421, Centro, Caxias do Sul - RS",
            telefone: "(54) 3066-0200"
          },
          {
            nome: "UBS Centro de Saúde",
            endereco: "Rua Pinheiro Machado, Centro, Caxias do Sul - RS",
            telefone: "(54) 3217-8833 / (54) 98421-0377"
          }
        ];
      }
  
      if (bairro === "Cristo Redentor") {
        return [
          {
            nome: "UBS Cristo Redentor",
            endereco: "R. Silveira Martins, 1434 - Cristo Redentor, Caxias do Sul - RS, 95082-000",
            telefone: "(54) 98418-5009"
          }
        ];
      }
  
      if (bairro === "São Leopoldo") {
        return [
          {
            nome: "UBS São Leopoldo",
            endereco: "R. Sapucaia, 101 - São Leopoldo, Caxias do Sul - RS, 95080-570",
            telefone: "(54) 98419-0261"
          }
        ];
      }
  
      if (bairro === "Galópolis") {
        return [
          {
            nome: "UBS Galópolis",
            endereco: "R. Edviges Galló, 47 - Galópolis, Caxias do Sul - RS, 95090-080",
            telefone: "(54) 98418-9025 / 98418-9122"
          }
        ];
      }
  
      if (bairro === "Santa Catarina") {
        return [
          {
            nome: "UBS Santa Lúcia Cohab",
            endereco: "R. Padre Aquilino Franceschet, 303 - Santa Catarina, Caxias do Sul - RS, 95032-270",
            telefone: "(54) 99927-1602"
          }
        ];
      }
  
      if (bairro === "Oliva") {
        return [
          {
            nome: "UBS Vila Oliva",
            endereco: "Av. Gavioli, 5575 - Oliva, Caxias do Sul - RS, 95135-000",
            telefone: "(54) 99952-4144"
          }
        ];
      }
  
      if (bairro === "Esplanada") {
        return [
          {
            nome: "UBS Esplanada",
            endereco: "Av. Bom Pastor, 2225 - Esplanada, Caxias do Sul - RS, 95096-150",
            telefone: "(54) 98423-1564 / 98433-6639 / 98433-6082 / 98448-6679"
          },
          {
            nome: "UBS São Caetano",
            endereco: "R. Pixinguinha, 2.466 - Esplanada, Caxias do Sul - RS, 95095-140",
            telefone: "(54) 98421-0388 / 98421-0383 / 98421-0619"
          },
          {
            nome: "UBS Alvorada",
            endereco: "R. Srg. Venino Vargas, 201 - Esplanada, Caxias do Sul - RS, 95095-075",
            telefone: "(54) 98434-7570"
          }
        ];
      }
  
      if (bairro === "Salgado Filho") {
        return [
          {
            nome: "UBS Salgado Filho",
            endereco: "R. Marcelo Filipe, 268 - Salgado Filho, Caxias do Sul - RS, 95098-320",
            telefone: "(54) 98418-6397 / 98418-6325"
          }
        ];
      }
  
      if (bairro === "Fazenda Souza") {
        return [
          {
            nome: "UBS Fazenda Souza",
            endereco: "R. Rosa Sgarbi, 5006 - Distrito Fazenda Souza, Caxias do Sul - RS, 95125-000",
            telefone: "(54) 98434-7930"
          }
        ];
      }
  
      if (bairro === "Nossa Sra. de Fátima") {
        return [
          {
            nome: "UBS Fátima Baixo",
            endereco: "Av. Dr. Mário Lópes, 860 - Nossa Sra. de Fátima, Caxias do Sul - RS, 95043-240",
            telefone: "(54) 98434-8142"
          },
          {
            nome: "UBS Fátima Alta",
            endereco: "R. Isabel Pezi, 395 - Nossa Sra. de Fátima, Caxias do Sul - RS, 95043-310",
            telefone: "(54) 98432-8138 / 98432-8589 / 98432-8003"
          }
        ];
      }
  
      if (bairro === "Centenário") {
        return [
          {
            nome: "UBS Centenário",
            endereco: "Saturnino Pereira, 160 - Centenário, Caxias do Sul - RS, 95047-121",
            telefone: "(54) 99928-9174"
          },
          {
            nome: "UPA Zona Norte (Centenário II)",
            endereco: "Rua João Gregório Paniz, 602, Centenário II, Caxias do Sul - RS",
            telefone: "(54) 3901-1625 / 3220-5859 / 3220-5890 / 3220-5860 / 3220-5970"
          }
        ];
      }
  
      if (bairro === "Rio Branco") {
        return [
          {
            nome: "UBS Rio Branco",
            endereco: "Av. Rio Branco, 1619 - Rio Branco, Caxias do Sul - RS, 95010-060",
            telefone: "(54) 98434-6800"
          }
        ];
      }
  
      if (bairro === "Planalto") {
        return [
          {
            nome: "UBS Planalto",
            endereco: "Rua Arthur Rodolfo Rossarolla, 508 - Planalto, Caxias do Sul - RS, 95088-420",
            telefone: "(54) 98434-8101"
          }
        ];
      }
  
      if (bairro === "Mariani") {
        return [
          {
            nome: "UBS Mariani",
            endereco: "R. Vergínia Botini Reuse, 299 - Mariani, Caxias do Sul - RS, 95112-500",
            telefone: "(54) 98449-9339 / 98449-1720 / 98449-9820"
          }
        ];
      }
  
      if (bairro === "Serrano") {
        return [
          {
            nome: "UBS Serrano",
            endereco: "Rua Alcides Ramos, 1.307 - Serrano, Caxias do Sul - RS, 95059-710",
            telefone: "(54) 98418-9095 / 98418-9795"
          }
        ];
      }
  
      if (bairro === "Sagrada Família") {
        return [
          {
            nome: "UBS Sagrada Família",
            endereco: "R. Cândido João Calcagnotto, 553 - Sagrada Família, Caxias do Sul - RS, 95052-110",
            telefone: "(54) 98419-1004"
          }
        ];
      }
  
      if (bairro === "Vila Cristina") {
        return [
          {
            nome: "UBS Vila Cristina",
            endereco: "R. da Cidadania, 426 - Vila Cristina, Caxias do Sul - RS, 95133-970",
            telefone: "(54) 99928-9121"
          }
        ];
      }
  
      if (bairro === "São Ciro") {
        return [
          {
            nome: "UBS São Ciro",
            endereco: "R. Joaquim Oss, 83 - São Ciro, Caxias do Sul - RS, 95057-410",
            telefone: "(54) 98419-2442"
          },
          {
            nome: "CAPS Novo Amanhã",
            endereco: "Rua Padre Tiago Alberione, 290, São Ciro, Caxias do Sul - RS",
            telefone: "(54) 2101-0555"
          }
        ];
      }
  
      if (bairro === "Cruzeiro") {
        return [
          {
            nome: "UBS Cruzeiro",
            endereco: "Av. Hércules, 1917 - Cruzeiro, Caxias do Sul - RS, 95074-220",
            telefone: "(54) 98446-5830"
          }
        ];
      }
  
      if (bairro === "Bela Vista") {
        return [
          {
            nome: "UBS Bela Vista",
            endereco: "R. Valentim Comerlatto, 983 - Bela Vista, Caxias do Sul - RS, 95072-430",
            telefone: "(54) 98434-7908"
          }
        ];
      }
  
      if (bairro === "Mariland") {
        return [
          {
            nome: "UBS Século XX",
            endereco: "R. Nelsom Michielon, 111 - Mariland, Caxias do Sul - RS, 95057-490",
            telefone: "(54) 98429-5484"
          }
        ];
      }
  
      if (bairro === "Santa Fé") {
        return [
          {
            nome: "UBS Vila Ipê",
            endereco: "Av. Antônio Andrighetti, 2290 - Santa Fé, Caxias do Sul - RS, 95045-470",
            telefone: "(54) 98449-7674 / 98449-8752 / 99924-8443"
          },
          {
            nome: "UBS Santa Fé",
            endereco: "Av. Santa Fé, 349 - Santa Fé, Caxias do Sul - RS, 95045-000",
            telefone: "(54) 98418-8611 / 98418-8343"
          }
        ];
      }
  
      
      return [];
    }
  
    
    return [];
  }
  document.addEventListener('DOMContentLoaded', function() {
    const formularioAgendamento = document.getElementById('formulario-agendamento');
    const mensagemAgendamento = document.getElementById('mensagem-agendamento');
  
    
    const agendamentos = {}; 
  
    formularioAgendamento.addEventListener('submit', function(event) {
      event.preventDefault();
  
      const localDoacao = document.getElementById('local-doacao').value;
      const dataDoacao = document.getElementById('data-doacao').value;
      const horarioDoacao = document.getElementById('horario-doacao').value;
  
      
      if (agendamentos[localDoacao] && agendamentos[localDoacao][dataDoacao] && agendamentos[localDoacao][dataDoacao].includes(horarioDoacao)) {
        exibirMensagem('Este horário já está reservado. Por favor, escolha outro horário.', 'erro');
      } else {
        
        if (!agendamentos[localDoacao]) {
          agendamentos[localDoacao] = {};
        }
        if (!agendamentos[localDoacao][dataDoacao]) {
          agendamentos[localDoacao][dataDoacao] = [];
        }
        agendamentos[localDoacao][dataDoacao].push(horarioDoacao);
  
        const mensagem = `Sua doação foi agendada com sucesso para o dia ${formatarData(dataDoacao)} às ${horarioDoacao} em ${obterNomeLocal(localDoacao)}.`;
        exibirMensagem(mensagem, 'sucesso');
        formularioAgendamento.reset();
      }
    });
  
    function obterNomeLocal(valor) {
      switch (valor) {
        case 'hemocentro-caxias':
          return 'Hemocentro de Caxias do Sul';
        case 'unidade-shopping':
          return 'Unidade de Coleta no Shopping Serra Azul';
        case 'hospital-geral':
          return 'Hospital Geral - Coleta Externa';
        default:
          return 'Local não especificado';
      }
    }
  
    function formatarData(data) {
      const partes = data.split('-');
      return `${partes[2]}/${partes[1]}/${partes[0]}`;
    }
  
    function exibirMensagem(texto, tipo) {
      mensagemAgendamento.textContent = texto;
      mensagemAgendamento.className = `mensagem ${tipo}`;
      mensagemAgendamento.style.display = 'block';
  
      setTimeout(() => {
        mensagemAgendamento.style.display = 'none';
      }, 5000);
    }
  });
  
   
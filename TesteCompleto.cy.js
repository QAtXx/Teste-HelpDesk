///<reference types="cypress"/>
describe('Teste completo no LegHub',()=>{
  beforeEach(()=>{
    cy.login()
  })
  it('Criar novo chamado normal', () =>{
    cy.fixture('cliente.json').then((cliente)=>{
      cy.get('[id=":r7:"')// clica no campo do codigo e insere
        .type(cliente.codCliente)
    })
    cy.fixture('chamado.json').then((chamado)=>{    
      cy.get('[id=":re:"')// clica no campo contato e insere nome
        .click() 
        .type(chamado.nomeContato)
      cy.get('[id=":rf:"')// clica no campo telefone e insere numero
        .clear()
        .type(chamado.telefoneContato)
      cy.get('[id=":rg:"')// clica no campo descrição e insere
        .type(chamado.descricao)
      cy.contains('Salvar')// clica no botão salvar 
        .click()
    })
    cy.get('.MuiAlert-message')// verifica a mensagem de retorno
      .should('contain', 'Novo chamado criado com sucesso')
  })
  
  it('Criar novo chamado agendado',()=>{
    cy.fixture('cliente.json').then((cliente)=>{
      cy.get('[id=":r7:"')// clica no campo do codigo e insere
        .type(cliente.codCliente)
    /*cy.get('[id=":r13:"') // clica no campo cpf/cnpj e insere 
        .click()
        .type(cliente.CNPJ) */
    })
    cy.fixture('chamado.json').then((chamado)=>{    
      cy.get('[id=":re:"')// clica no campo contato e insere nome
        .click() 
        .type(chamado.nomeContato)
      cy.get('[id=":rf:"')// clica no campo telefone e insere numero
        .clear()
        .type(chamado.telefoneContato)
      cy.get('[id=":rg:"')// clica no campo descrição e insere
        .type(chamado.descricao)
      cy.get('.MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input')//seleciona a opção de agendar
        .click()
      cy.get('[id=":rc:"')// clica no campo e insere a data e hora 
        .click()
        .type(`{selectAll}${chamado.dtAgendamento}`) 
      cy.contains('Salvar')// clica no botão salvar 
        .click()
   })
   cy.get('.MuiAlert-message')// verifica a mensagem de retorno
      .should('contain', 'Novo chamado criado com sucesso')
  })

  it('Criar novo chamado Urgente',()=>{
    cy.fixture('cliente.json').then((cliente)=>{
      cy.get('[id=":r7:"')// clica no campo do codigo e insere
        .type(cliente.codCliente
    })
    cy.fixture('chamado.json').then((chamado)=>{    
      cy.get('[id=":re:"')// clica no campo contato e insere nome
        .click() 
        .type(chamado.nomeContato)
      cy.get('[id=":rf:"')// clica no campo telefone e insere numero
        .clear()
        .type(chamado.telefoneContato)
      cy.get('[id=":rg:"')// clica no campo descrição e insere
        .type(chamado.descricao)
      cy.get('.MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input') // clica na opção de urgente
        .click() 
      cy.contains('Salvar')// clica no botão salvar 
        .click()
    })
    cy.get('.MuiAlert-message')// verifica a mensagem de retorno
      .should('contain', 'Novo chamado criado com sucesso')
  })

  for(let x = 1; x <= 2; x++){
    it('iniciar um atendimento', () =>{      
      cy.get('div').contains('Abertos')//clicar na aba Abertos 
        .click()     
      cy.get('button').contains('Iniciar')//clica no botão Iniciar atendimento  
        .click()    
      cy.get('button').contains('OK')// clica no botão Ok 
        .click()  
    })
  }
  
  it('Realizar o cancelamento de um chamado',()=>{
    cy.fixture('chamado.json').then((chamado)=>{             
      cy.get('div').contains('Abertos')//clica na aba Abertos
        .click()              
        cy.get('.css-1uznl32 > .css-8br529 > .css-b95f0i > .MuiGrid-container > :nth-child(1) > .MuiBadge-root > .MuiPaper-root > .MuiCardActionArea-root > .css-mywm6h > .css-l5c1s3 > .css-1ialerq > .MuiStack-root > [aria-label="Cancelar chamado"] > [data-testid="DeleteOutlinedIcon"]')//clica na opção de cancelar chamado
      //cy.get(':nth-child(1) > .MuiBadge-root > .MuiPaper-root > .MuiCardActionArea-root > .css-mywm6h > .css-l5c1s3 > .css-1ialerq > .MuiStack-root > [aria-label="Cancelar chamado"]')
        .click()
      cy.get(':nth-child(2) > .MuiInputBase-root') //clica dentro do campo observação e insere a descrição        
        .click()
        .type(chamado.obsCancelamento)
    })
      // Inserir dados do gerente, caso user seja tecnico/atendente
    cy.fixture('login.json').then((login) =>{
      cy.get('[id=":r5s:"')//clica no campo e insere o email do gerente
        .click()
        .type(login.emailGerente)              
      cy.get('[id=":r5t:"')//clica no campo e insere a senha do gerente
        .click()
        .type(login.senhaGerente)
    })     
      cy.get('.MuiDialogActions-root > .MuiStack-root > :nth-child(2)')//clica no "OK"
        .click()
      cy.get('.MuiAlert-message')// verifica a mensagem de retorno
        .should('contain', 'Chamado cancelado')
  })

  it('Finalizar um chamado', () =>{ 
    cy.fixture('chamado.json').then((chamado) =>{
      cy.get('div').contains('Atendimentos') // clica na aba Atendimentos
        .click()
      cy.get('Button').contains('Fechar') // clica no botão finalizar
        .click()
      cy.get('.MuiInputBase-root') // clica e insere a descrição de finalização
        .click()
        .type(chamado.obsFinalizacao)
      cy.get('.css-1t62lt9 > :nth-child(2)') // clica no botão Ok
        .click()
    })
    cy.get('.MuiAlert-message')// verifica a mensagem de retorno
      .should('contain', 'Chamado fechado')
  })
})

describe('example to-do app', () => {
    beforeEach(() => {
        cy.visit('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login')
    });

    const goToBankManager = () => {
        cy.get(':nth-child(3) > .btn').click();
    };

    const addCustomer = () => {
        cy.get('[ng-class="btnClass1"]').click();
        cy.get(':nth-child(1) > .form-control').type('Omar');
        cy.get(':nth-child(2) > .form-control').type('fadili');
        cy.get(':nth-child(3) > .form-control').type("25000");
        cy.get('form.ng-dirty > .btn').click();
    };

    const openAccount = () => {
        cy.visit("https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/openAccount");
        cy.get('#userSelect').select("Omar fadili");
        cy.get('#currency').select("Dollar");
        cy.get('form.ng-dirty > button').click();
    };

    const selectAccount = () => {
        cy.get('#userSelect').select("Omar fadili");
        cy.get('form.ng-valid > .btn').click();
    };

    const depositAmount = (amount) => {
        cy.get('[ng-class="btnClass2"]').click();
        cy.get('.form-control').type(amount);
        cy.get('form.ng-dirty > .btn').click();
    };

    const withdrawAmount = (amount) => {
        cy.get('[ng-class="btnClass3"]').click();
        cy.get('.form-control').type(amount);
        cy.get('form.ng-dirty > .btn').click();
        cy.get('.form-control').type(amount);
        cy.get('form.ng-dirty > .btn').click();
        
    };

    it('before add customer we enter to bank manager login', () => {
        goToBankManager();
        addCustomer();

        // Verify alert
        // Visit clients lists
        cy.visit("https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/list");
        cy.contains("Omar").should("exist");
        cy.contains("fadili").should("exist");
        cy.contains("25000").should("exist");

        openAccount();
        //delete customer
        //cy.visit("https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/list");
        //cy.get(':nth-child(6) > :nth-child(5) > button').click()
        
        //retourner au home
        cy.get('.home').click();

        //acceder au login
        cy.get('.borderM > :nth-child(1) > .btn').click();

        selectAccount();
        depositAmount(50000);
        cy.get('[ng-class="btnClass3"]').click();
        cy.get('.form-control').type('20000');
        cy.get('form.ng-pristine > .btn').click();
        cy.get('[ng-class="btnClass3"]').click();
        cy.get('.form-control').type('20000');
        cy.get('form.ng-dirty > .btn').click();
        
        //cy.get('form.ng-pristine > .btn').click();
    });
});

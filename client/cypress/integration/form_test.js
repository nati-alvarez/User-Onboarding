describe("Enters name", function(){
    it("types name into name input", function(){
        cy.visit("http://localhost:3000");

        cy.get("[name=name]")
        .type("Sandra")
        .should('have.value', "Sandra");
    });
});

describe ("Enters email", function(){
    it("types email into email input", function(){
        cy.get("[name=email]")
        .type("bob@hotmail.com")
        .should("have.value", "bob@hotmail.com");
    });
})

describe("Enters password", function(){
    it("types password into password input", function(){
        cy.get("[name=password]")
        .type("somepassword123123")
        .should("have.value", "somepassword123123");
    });
});

describe("Agrees to terms", function(){
    it("checks terms of service checkbox", function(){
        cy.get("[name=terms]")
        .check()
        .should("be.checked");
    });
})

describe("Sign up user", function(){
    it("submits form with data entered", function(){
        cy.get('form')
        .submit()
        cy.get(".user").contains("Sandra");
    });
})

describe("Check for validation", function(){
    it("checks if validation works when an input is left empty", function(){
        cy.get("[name=name]").type("Bob");
        cy.get("[name=password]").type("password123");
        cy.get("[name=terms]").check();

        cy.get("button")
        .should("be.disabled");
    })
})
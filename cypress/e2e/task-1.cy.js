const URL = "http://192.168.18.65:8080/task-1/task-1-index.html";
const defaultParagraphs = ["Welcome dear user", "This is a small program that calculates your family oldest, youngest and average age !", "Entry the number of members your family have to begin"];
const expectedParagraphs = ["The youngest member on your family is 1 years old", "While the oldest is 4 years old", "And the average age in your family is 2.5."];
const expectedErrors = ["This field cannot be empty", "This field doesn't accept decimals", "This field should only contain a maximum of 3 characters", ""];

describe("Testing task-1-calculator", () => {
  it("Test the correct use of task-1-calculator", () => {
    cy.visit(URL);

    cy.get('input[name="members-quantity"]').type("4");
    cy.get('button[name="quantity-submit"]').click();

    cy.get("button[name='calculate-button']").should("be.visible");
    cy.get("button[name='restart-form-button']").should("be.visible");
    cy.get(".created-members").should("exist");

    for (let i = 0; i < 4; i++) {
      cy.get(`#member-${i + 1}`).type(`${i + 1}`);
    }

    cy.get("button[name='calculate-button']").click();
    for (let i = 0; i < expectedParagraphs.length; i++) {
      cy.get(`#paragraph-${i + 1}`).should("have.text", `${expectedParagraphs[i]}`);
    }
  });

  it("Test the correct use of task-1-calculator and restart button", () => {
    cy.visit(URL);

    cy.get('input[name="members-quantity"]').type("4");
    cy.get('button[name="quantity-submit"]').click();

    cy.get("button[name='calculate-button']").should("be.visible");
    cy.get("button[name='restart-form-button']").should("be.visible");
    cy.get(".created-members").should("exist");

    for (let i = 0; i < 4; i++) {
      cy.get(`#member-${i + 1}`).type(`${i + 1}`);
    }

    cy.get("button[name='calculate-button']").click();
    for (let i = 0; i < expectedParagraphs; i++) {
      cy.get(`#paragraph-${i + 1}`).should("have.text", `${expectedParagraphs[i]}`);
    }

    cy.get("button[name='restart-form-button']").click();
    cy.get(".created-members").should("not.exist");

    for (let i = 0; i < defaultParagraphs.length; i++) {
      cy.get(`#paragraph-${i + 1}`).should("have.text", `${defaultParagraphs[i]}`);
    }
  });

  it("Test the reset button", () => {
    cy.visit(URL);

    cy.get('input[name="members-quantity"]').type("4");
    cy.get("#reset-button").click();
    cy.get('input[name="members-quantity"]').should("have.value", "");
  });

  it("Test errors in the main input", () => {
    cy.visit(URL);

    cy.get('button[name="quantity-submit"]').click();
    cy.get(".error").should("be.visible");
    cy.get("li").should("have.text", "This field can't be empty");
    cy.get("#reset-button").click();
    cy.get('input[name="members-quantity"]').type("0");
    cy.get('button[name="quantity-submit"]').click();
    cy.get(".error").should("be.visible");
    cy.get("li").should("have.text", "This field cannot have a value of 0 or be negative");
    cy.get("#reset-button").click();
    cy.get('input[name="members-quantity"]').type("3.4");
    cy.get('button[name="quantity-submit"]').click();
    cy.get(".error").should("be.visible");
    cy.get("li").should("have.text", "This field doesn't accept decimals");
    cy.get("#reset-button").click();
    cy.get('input[name="members-quantity"]').type("01");
    cy.get('button[name="quantity-submit"]').click();
    cy.get(".error").should("be.visible");
    cy.get("li").should("have.text", "This field should only contain numbers and cannot start with 0");
    cy.get("#reset-button").click();
    cy.get('input[name="members-quantity"]').type("111111");
    cy.get('button[name="quantity-submit"]').click();
    cy.get(".error").should("be.visible");
    cy.get("li").should("have.text", "This field should only contain a maximum of 2 characters");
    cy.get("#reset-button").click();
    cy.get('input[name="members-quantity"]').type("1");
    cy.get('button[name="quantity-submit"]').click();
    cy.get(".error").should("not.exist");
    cy.get(".created-members").should("exist");
  });

  it("Test errors in the member inputs", () => {
    cy.visit(URL);

    cy.get('input[name="members-quantity"]').type("4");
    cy.get('button[name="quantity-submit"]').click();

    cy.get(".created-members").should("exist");
    cy.get("#member-2").type("3.4");
    cy.get("#member-3").type("111111");
    cy.get("#member-4").type("4");

    cy.get('button[name="calculate-button"]').click();
    cy.get(".error").should("be.visible");

    for (let i = 0; i < expectedErrors.length; i++) {
      cy.get(`#error-${i + 1}`).should("have.text", `${expectedErrors[i]}`);
    }

    for (let i = 0; i < 4; i++) {
      cy.get(`#member-${i + 1}`).clear();
      cy.get(`#member-${i + 1}`).type(`${i + 1}`);
    }

    cy.get('button[name="calculate-button"]').click();
    cy.get(".error").should("not.exist");

    for (let i = 0; i < 4; i++) {
      cy.get(`#error-${i + 1}`).should("have.text", "");
    }

    for (let i = 0; i < expectedParagraphs.length; i++) {
      cy.get(`#paragraph-${i + 1}`).should("have.text", `${expectedParagraphs[i]}`);
    }

    cy.get("button[name='restart-form-button']").click();
    cy.get(".created-members").should("not.exist");

    for (let i = 0; i < defaultParagraphs.length; i++) {
      cy.get(`#paragraph-${i + 1}`).should("have.text", `${defaultParagraphs[i]}`);
    }

    cy.get('input[name="members-quantity"]').clear();
  });
});

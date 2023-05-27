const URL = "http://192.168.18.65:8080/task-1/task-1-index.html";

describe("Testing task-1-calculator", () => {
  it("Test the correct use of task-1-calculator", () => {
    cy.visit(URL);

    cy.get('input[name="members-quantity"]').type("4");
    cy.get('button[name="quantity-submit"]').click();

    cy.get("button[name='calculate-button']").should("be.visible");
    cy.get("button[name='restart-form-button']").should("be.visible");
    cy.get(".created-members").should("exist");
    cy.get("#member-1").type("1");
    cy.get("#member-2").type("2");
    cy.get("#member-3").type("3");
    cy.get("#member-4").type("4");

    cy.get("button[name='calculate-button']").click();
    cy.get("#paragraph-1").should("have.text", "The youngest member on your family is 1 years old");
    cy.get("#paragraph-2").should("have.text", "While the oldest is 4 years old");
    cy.get("#paragraph-3").should("have.text", "And the average age in your family is 2.5.");
  });

  it("Test the correct use of task-1-calculator and restart button", () => {
    cy.visit(URL);

    cy.get('input[name="members-quantity"]').type("4");
    cy.get('button[name="quantity-submit"]').click();

    cy.get("button[name='calculate-button']").should("be.visible");
    cy.get("button[name='restart-form-button']").should("be.visible");
    cy.get(".created-members").should("exist");
    cy.get("#member-1").type("1");
    cy.get("#member-2").type("2");
    cy.get("#member-3").type("3");
    cy.get("#member-4").type("4");

    cy.get("button[name='calculate-button']").click();
    cy.get("#paragraph-1").should("have.text", "The youngest member on your family is 1 years old");
    cy.get("#paragraph-2").should("have.text", "While the oldest is 4 years old");
    cy.get("#paragraph-3").should("have.text", "And the average age in your family is 2.5.");

    cy.get("button[name='restart-form-button']").click();
    cy.get(".created-members").should("not.exist");
    cy.get("#paragraph-1").should("have.text", "Welcome dear user");
    cy.get("#paragraph-2").should("have.text", "This is a small program that calculates your family oldest, youngest and average age !");
    cy.get("#paragraph-3").should("have.text", "Entry the number of members your family have to begin");
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
    cy.get("#error-1").should("have.text", "This field cannot be empty");
    cy.get("#error-2").should("have.text", "This field doesn't accept decimals");
    cy.get("#error-3").should("have.text", "This field should only contain a maximum of 3 characters");
    cy.get("#error-4").should("have.text", "");

    cy.get("#member-1").clear();
    cy.get("#member-2").clear();
    cy.get("#member-3").clear();
    cy.get("#member-4").clear();

    cy.get("#member-1").type("1");
    cy.get("#member-2").type("2");
    cy.get("#member-3").type("3");
    cy.get("#member-4").type("4");

    cy.get('button[name="calculate-button"]').click();
    cy.get(".error").should("not.exist");
    cy.get("#error-1").should("have.text", "");
    cy.get("#error-2").should("have.text", "");
    cy.get("#error-3").should("have.text", "");
    cy.get("#error-4").should("have.text", "");

    cy.get("#paragraph-1").should("have.text", "The youngest member on your family is 1 years old");
    cy.get("#paragraph-2").should("have.text", "While the oldest is 4 years old");
    cy.get("#paragraph-3").should("have.text", "And the average age in your family is 2.5.");

    cy.get("button[name='restart-form-button']").click();
    cy.get(".created-members").should("not.exist");
    cy.get("#paragraph-1").should("have.text", "Welcome dear user");
    cy.get("#paragraph-2").should("have.text", "This is a small program that calculates your family oldest, youngest and average age !");
    cy.get("#paragraph-3").should("have.text", "Entry the number of members your family have to begin");

    cy.get('input[name="members-quantity"]').clear();
  });
});

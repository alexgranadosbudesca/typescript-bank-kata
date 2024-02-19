Feature: Transfer money from an account to another

  Scenario: A valid transfer
    Given there is an account with ID "a3bee771-493e-4249-929a-789bc13d1d26" and balance "100"
    And there is an account with ID "1d435570-20d5-4335-9e42-b0c15ac74537" and balance "100"
    And I send a POST request to "/account/transfer" with body:
      """
      {
        "fromAccountId": "a3bee771-493e-4249-929a-789bc13d1d26",
        "toAccountId": "1d435570-20d5-4335-9e42-b0c15ac74537",
        "amount": 100
      }
      """
    Then the response status code should be 201
    And the response should be empty

  Scenario: A non existing from account
    Given I send a POST request to "/account/transfer" with body:
      """
      {
        "fromAccountId": "6b50b2bb-24e0-4ed2-bc90-434ac99b5dd0",
        "toAccountId": "436e5e77-22ae-45dc-a4e1-ac6fc0c56464",
        "amount": 100
      }
      """
    Then the response status code should be 404
    And the response should be:
      """
      {
        "error": "Account with Id 6b50b2bb-24e0-4ed2-bc90-434ac99b5dd0 not found."
      }
      """

  Scenario: A non existing to account
    Given there is an account with ID "6b50b2bb-24e0-4ed2-bc90-434ac99b5dd0"
    And I send a POST request to "/account/transfer" with body:
      """
      {
        "fromAccountId": "6b50b2bb-24e0-4ed2-bc90-434ac99b5dd0",
        "toAccountId": "436e5e77-22ae-45dc-a4e1-ac6fc0c56464",
        "amount": 100
      }
      """
    Then the response status code should be 404
    And the response should be:
      """
      {
        "error": "Account with Id 436e5e77-22ae-45dc-a4e1-ac6fc0c56464 not found."
      }
      """

  Scenario: Overdraft not allowed in transfers
    Given there is an account with ID "a2eb45d7-68db-4c3b-a1f4-cf4d4b4a1915"
    And there is an account with ID "8b78f3b3-f30c-48d1-9388-6f94e8ae2383"
    And I send a POST request to "/account/transfer" with body:
      """
      {
        "fromAccountId": "a2eb45d7-68db-4c3b-a1f4-cf4d4b4a1915",
        "toAccountId": "8b78f3b3-f30c-48d1-9388-6f94e8ae2383",
        "amount": 10
      }
      """
    Then the response status code should be 409
    And the response should be:
      """
      {
        "error": "Overdraft is not allowed in transfers."
      }
      """

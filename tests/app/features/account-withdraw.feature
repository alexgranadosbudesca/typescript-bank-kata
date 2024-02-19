Feature: Withdraw money from account

  Scenario: A valid withdraw
    Given there is an account with ID "a3bee771-493e-4249-929a-789bc13d1d26"
    And I send a POST request to "/account/withdraw" with body:
      """
      {
        "accountId": "a3bee771-493e-4249-929a-789bc13d1d26",
        "amount": 100
      }
      """
    Then the response status code should be 201
    And the response should be empty

  Scenario: A non existing account
    Given I send a POST request to "/account/withdraw" with body:
      """
      {
        "accountId": "ffb657a8-5077-4dcd-82de-d902eae4912f",
        "amount": 100
      }
      """
    Then the response status code should be 404
    And the response should be:
      """
      {
        "error": "Account with Id ffb657a8-5077-4dcd-82de-d902eae4912f not found."
      }
      """

  Scenario: Surpassing account overdraft limit
    Given there is an account with ID "a3bee771-493e-4249-929a-789bc13d1d26"
    And I send a POST request to "/account/withdraw" with body:
      """
      {
        "accountId": "a3bee771-493e-4249-929a-789bc13d1d26",
        "amount": 201
      }
      """
    Then the response status code should be 409
    And the response should be:
      """
      {
        "error": "Overdraft of -200$ surpased."
      }
      """

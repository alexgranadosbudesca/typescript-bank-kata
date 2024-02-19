Feature: Creates an account

  Scenario: A valid request
    Given I send a POST request to "/account" with body:
      """
      {
        "accountId": "b3bee771-493e-4249-929a-789bc13d1d26"
      }
      """
    Then the response status code should be 201
    And the response should be empty

  Scenario: Account already created
    Given there is an account with ID "b3bee771-493e-4249-929a-789bc13d1d26"
    And I send a POST request to "/account" with body:
      """
      {
        "accountId": "b3bee771-493e-4249-929a-789bc13d1d26"
      }
      """
    Then the response status code should be 409
    And the response should be:
      """
      {
        "error": "Account with Id b3bee771-493e-4249-929a-789bc13d1d26 already exists."
      }
      """

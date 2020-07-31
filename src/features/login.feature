Feature: Validate login feature

     As an user
     I want the dev-qa web portal to let me successfully log in

     @test
     Scenario: Validate user successfully logs in
          Given I have launched the dev-qa portal
          When I login using credentials
               | Username               | Password  |
               | test@qa-experience.com | Password1 |
          Then I should be successfully logged in

     @test
     Scenario: Validate user gets error for invalid username
          Given I have launched the dev-qa portal
          When I login using credentials
               | Username | Password  |
               | abc      | Password1 |
          Then I should get error for username

     @test
     Scenario: Validate user gets error for invalid password
          Given I have launched the dev-qa portal
          When I login using credentials
               | Username               | Password  |
               | test@qa-experience.com | abc       |
          Then I should get error for password
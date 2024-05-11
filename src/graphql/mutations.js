/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createParty = /* GraphQL */ `
  mutation CreateParty(
    $input: CreatePartyInput!
    $condition: ModelPartyConditionInput
  ) {
    createParty(input: $input, condition: $condition) {
      id
      name
      isGoing
      users {
        nextToken
        __typename
      }
      votes {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateParty = /* GraphQL */ `
  mutation UpdateParty(
    $input: UpdatePartyInput!
    $condition: ModelPartyConditionInput
  ) {
    updateParty(input: $input, condition: $condition) {
      id
      name
      isGoing
      users {
        nextToken
        __typename
      }
      votes {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteParty = /* GraphQL */ `
  mutation DeleteParty(
    $input: DeletePartyInput!
    $condition: ModelPartyConditionInput
  ) {
    deleteParty(input: $input, condition: $condition) {
      id
      name
      isGoing
      users {
        nextToken
        __typename
      }
      votes {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      name
      partyId
      party {
        id
        name
        isGoing
        createdAt
        updatedAt
        __typename
      }
      votes {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      partyUsersId
      __typename
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      name
      partyId
      party {
        id
        name
        isGoing
        createdAt
        updatedAt
        __typename
      }
      votes {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      partyUsersId
      __typename
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      name
      partyId
      party {
        id
        name
        isGoing
        createdAt
        updatedAt
        __typename
      }
      votes {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      partyUsersId
      __typename
    }
  }
`;
export const createVote = /* GraphQL */ `
  mutation CreateVote(
    $input: CreateVoteInput!
    $condition: ModelVoteConditionInput
  ) {
    createVote(input: $input, condition: $condition) {
      id
      userId
      partyId
      user {
        id
        name
        partyId
        createdAt
        updatedAt
        partyUsersId
        __typename
      }
      party {
        id
        name
        isGoing
        createdAt
        updatedAt
        __typename
      }
      country
      points
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateVote = /* GraphQL */ `
  mutation UpdateVote(
    $input: UpdateVoteInput!
    $condition: ModelVoteConditionInput
  ) {
    updateVote(input: $input, condition: $condition) {
      id
      userId
      partyId
      user {
        id
        name
        partyId
        createdAt
        updatedAt
        partyUsersId
        __typename
      }
      party {
        id
        name
        isGoing
        createdAt
        updatedAt
        __typename
      }
      country
      points
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteVote = /* GraphQL */ `
  mutation DeleteVote(
    $input: DeleteVoteInput!
    $condition: ModelVoteConditionInput
  ) {
    deleteVote(input: $input, condition: $condition) {
      id
      userId
      partyId
      user {
        id
        name
        partyId
        createdAt
        updatedAt
        partyUsersId
        __typename
      }
      party {
        id
        name
        isGoing
        createdAt
        updatedAt
        __typename
      }
      country
      points
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createWinner = /* GraphQL */ `
  mutation CreateWinner(
    $input: CreateWinnerInput!
    $condition: ModelWinnerConditionInput
  ) {
    createWinner(input: $input, condition: $condition) {
      id
      country
      place
      partyId
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateWinner = /* GraphQL */ `
  mutation UpdateWinner(
    $input: UpdateWinnerInput!
    $condition: ModelWinnerConditionInput
  ) {
    updateWinner(input: $input, condition: $condition) {
      id
      country
      place
      partyId
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteWinner = /* GraphQL */ `
  mutation DeleteWinner(
    $input: DeleteWinnerInput!
    $condition: ModelWinnerConditionInput
  ) {
    deleteWinner(input: $input, condition: $condition) {
      id
      country
      place
      partyId
      createdAt
      updatedAt
      __typename
    }
  }
`;

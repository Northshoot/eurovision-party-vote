/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateParty = /* GraphQL */ `
  subscription OnCreateParty($filter: ModelSubscriptionPartyFilterInput) {
    onCreateParty(filter: $filter) {
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
export const onUpdateParty = /* GraphQL */ `
  subscription OnUpdateParty($filter: ModelSubscriptionPartyFilterInput) {
    onUpdateParty(filter: $filter) {
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
export const onDeleteParty = /* GraphQL */ `
  subscription OnDeleteParty($filter: ModelSubscriptionPartyFilterInput) {
    onDeleteParty(filter: $filter) {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
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
export const onCreateVote = /* GraphQL */ `
  subscription OnCreateVote($filter: ModelSubscriptionVoteFilterInput) {
    onCreateVote(filter: $filter) {
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
export const onUpdateVote = /* GraphQL */ `
  subscription OnUpdateVote($filter: ModelSubscriptionVoteFilterInput) {
    onUpdateVote(filter: $filter) {
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
export const onDeleteVote = /* GraphQL */ `
  subscription OnDeleteVote($filter: ModelSubscriptionVoteFilterInput) {
    onDeleteVote(filter: $filter) {
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
export const onCreateWinner = /* GraphQL */ `
  subscription OnCreateWinner($filter: ModelSubscriptionWinnerFilterInput) {
    onCreateWinner(filter: $filter) {
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
export const onUpdateWinner = /* GraphQL */ `
  subscription OnUpdateWinner($filter: ModelSubscriptionWinnerFilterInput) {
    onUpdateWinner(filter: $filter) {
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
export const onDeleteWinner = /* GraphQL */ `
  subscription OnDeleteWinner($filter: ModelSubscriptionWinnerFilterInput) {
    onDeleteWinner(filter: $filter) {
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

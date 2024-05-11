/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getParty = /* GraphQL */ `
  query GetParty($id: ID!) {
    getParty(id: $id) {
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
export const listParties = /* GraphQL */ `
  query ListParties(
    $filter: ModelPartyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listParties(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        isGoing
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        partyId
        createdAt
        updatedAt
        partyUsersId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getVote = /* GraphQL */ `
  query GetVote($id: ID!) {
    getVote(id: $id) {
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
export const listVotes = /* GraphQL */ `
  query ListVotes(
    $filter: ModelVoteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listVotes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userId
        partyId
        country
        points
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getWinner = /* GraphQL */ `
  query GetWinner($id: ID!) {
    getWinner(id: $id) {
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
export const listWinners = /* GraphQL */ `
  query ListWinners(
    $filter: ModelWinnerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listWinners(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        country
        place
        partyId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const usersByPartyIdAndId = /* GraphQL */ `
  query UsersByPartyIdAndId(
    $partyId: ID!
    $id: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    usersByPartyIdAndId(
      partyId: $partyId
      id: $id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        partyId
        createdAt
        updatedAt
        partyUsersId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const votesByUserIdAndId = /* GraphQL */ `
  query VotesByUserIdAndId(
    $userId: ID!
    $id: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelVoteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    votesByUserIdAndId(
      userId: $userId
      id: $id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userId
        partyId
        country
        points
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const votesByPartyIdAndId = /* GraphQL */ `
  query VotesByPartyIdAndId(
    $partyId: ID!
    $id: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelVoteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    votesByPartyIdAndId(
      partyId: $partyId
      id: $id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userId
        partyId
        country
        points
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const winnersByPartyIdAndId = /* GraphQL */ `
  query WinnersByPartyIdAndId(
    $partyId: ID!
    $id: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelWinnerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    winnersByPartyIdAndId(
      partyId: $partyId
      id: $id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        country
        place
        partyId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;

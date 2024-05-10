import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection, AsyncItem } from "@aws-amplify/datastore";



type EagerWinner = {
  readonly country: string;
  readonly place: number;
}

type LazyWinner = {
  readonly country: string;
  readonly place: number;
}

export declare type Winner = LazyLoading extends LazyLoadingDisabled ? EagerWinner : LazyWinner

export declare const Winner: (new (init: ModelInit<Winner>) => Winner)

type EagerParty = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Party, 'id'>;
  };
  readonly id: string;
  readonly name: string;
  readonly isGoing: boolean;
  readonly users?: (User | null)[] | null;
  readonly votes?: (Vote | null)[] | null;
  readonly createdAt: string;
  readonly updatedAt: string;
}

type LazyParty = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Party, 'id'>;
  };
  readonly id: string;
  readonly name: string;
  readonly isGoing: boolean;
  readonly users: AsyncCollection<User>;
  readonly votes: AsyncCollection<Vote>;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export declare type Party = LazyLoading extends LazyLoadingDisabled ? EagerParty : LazyParty

export declare const Party: (new (init: ModelInit<Party>) => Party) & {
  copyOf(source: Party, mutator: (draft: MutableModel<Party>) => MutableModel<Party> | void): Party;
}

type EagerUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
  };
  readonly id: string;
  readonly name: string;
  readonly partyId: string;
  readonly party?: Party | null;
  readonly votes?: (Vote | null)[] | null;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly partyUsersId?: string | null;
}

type LazyUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
  };
  readonly id: string;
  readonly name: string;
  readonly partyId: string;
  readonly party: AsyncItem<Party | undefined>;
  readonly votes: AsyncCollection<Vote>;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly partyUsersId?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}

type EagerVote = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Vote, 'id'>;
  };
  readonly id: string;
  readonly userId: string;
  readonly partyId: string;
  readonly user?: User | null;
  readonly party?: Party | null;
  readonly country: string;
  readonly points: number;
  readonly createdAt: string;
  readonly updatedAt: string;
}

type LazyVote = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Vote, 'id'>;
  };
  readonly id: string;
  readonly userId: string;
  readonly partyId: string;
  readonly user: AsyncItem<User | undefined>;
  readonly party: AsyncItem<Party | undefined>;
  readonly country: string;
  readonly points: number;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export declare type Vote = LazyLoading extends LazyLoadingDisabled ? EagerVote : LazyVote

export declare const Vote: (new (init: ModelInit<Vote>) => Vote) & {
  copyOf(source: Vote, mutator: (draft: MutableModel<Vote>) => MutableModel<Vote> | void): Vote;
}
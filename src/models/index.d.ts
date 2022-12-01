import { ModelInit, MutableModel } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncItem } from "@aws-amplify/datastore";

export enum Genders {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER"
}

type MatchMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type PROJECTMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type EagerMatch = {
  readonly id: string;
  readonly user1?: User | null;
  readonly User2?: User | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly matchUser1Id?: string | null;
  readonly matchUser2Id?: string | null;
}

type LazyMatch = {
  readonly id: string;
  readonly user1: AsyncItem<User | undefined>;
  readonly User2: AsyncItem<User | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly matchUser1Id?: string | null;
  readonly matchUser2Id?: string | null;
}

export declare type Match = LazyLoading extends LazyLoadingDisabled ? EagerMatch : LazyMatch

export declare const Match: (new (init: ModelInit<Match, MatchMetaData>) => Match) & {
  copyOf(source: Match, mutator: (draft: MutableModel<Match, MatchMetaData>) => MutableModel<Match, MatchMetaData> | void): Match;
}

type EagerUser = {
  readonly id: string;
  readonly name: string;
  readonly image?: string | null;
  readonly bio: string;
  readonly lookingFor?: Genders | keyof typeof Genders | null;
  readonly gender: Genders | keyof typeof Genders;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUser = {
  readonly id: string;
  readonly name: string;
  readonly image?: string | null;
  readonly bio: string;
  readonly lookingFor?: Genders | keyof typeof Genders | null;
  readonly gender: Genders | keyof typeof Genders;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User, UserMetaData>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}

type EagerPROJECT = {
  readonly id: string;
  readonly name?: string | null;
  readonly description?: string | null;
  readonly image?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyPROJECT = {
  readonly id: string;
  readonly name?: string | null;
  readonly description?: string | null;
  readonly image?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type PROJECT = LazyLoading extends LazyLoadingDisabled ? EagerPROJECT : LazyPROJECT

export declare const PROJECT: (new (init: ModelInit<PROJECT, PROJECTMetaData>) => PROJECT) & {
  copyOf(source: PROJECT, mutator: (draft: MutableModel<PROJECT, PROJECTMetaData>) => MutableModel<PROJECT, PROJECTMetaData> | void): PROJECT;
}
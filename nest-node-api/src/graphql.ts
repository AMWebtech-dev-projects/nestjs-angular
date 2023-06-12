
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface CreateUserGraphqlDto {
    _id?: Nullable<string>;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string;
    gender: string;
    dob: string;
    role: string;
    status: string;
    forgotStatus?: Nullable<string>;
    updatedAt?: Nullable<string>;
    createdAt?: Nullable<string>;
}

export interface LoginUserGraphqlDto {
    _id?: Nullable<string>;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    email: string;
    phoneNumber?: Nullable<string>;
    password: string;
    gender?: Nullable<string>;
    dob?: Nullable<string>;
    role?: Nullable<string>;
    status?: Nullable<string>;
    forgotStatus?: Nullable<string>;
    updatedAt?: Nullable<string>;
    createdAt?: Nullable<string>;
}

export interface UserGraphqlModel {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string;
    gender: string;
    dob: string;
    role: string;
    status: number;
    authorization: string;
    createdAt: DateTime;
    updatedAt: DateTime;
    forgotStatus: string;
}

export interface IQuery {
    getAllUsers(): UserGraphqlModel[] | Promise<UserGraphqlModel[]>;
    user(_id: string): UserGraphqlModel | Promise<UserGraphqlModel>;
}

export interface IMutation {
    saveUserInfo(saveUser: CreateUserGraphqlDto): UserGraphqlModel | Promise<UserGraphqlModel>;
    removeUser(_id: string): UserGraphqlModel | Promise<UserGraphqlModel>;
    doSignIn(userLogin: LoginUserGraphqlDto): UserGraphqlModel | Promise<UserGraphqlModel>;
    logout(): UserGraphqlModel | Promise<UserGraphqlModel>;
}

export type DateTime = any;
type Nullable<T> = T | null;

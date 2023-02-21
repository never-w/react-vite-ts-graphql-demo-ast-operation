export type Maybe<T> = T;
export type InputMaybe<T> = T;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Book = {
  author: Scalars['String'];
  title: Scalars['String'];
};

export type ColoringBook = Book & {
  __typename?: 'ColoringBook';
  author: Scalars['String'];
  colors: Array<Scalars['String']>;
  title: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  _schema: Maybe<Scalars['String']>;
  books: Array<Book>;
};

export type Textbook = Book & {
  __typename?: 'Textbook';
  author: Scalars['String'];
  courses: Array<Scalars['String']>;
  title: Scalars['String'];
};

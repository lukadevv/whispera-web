/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A high precision floating point value represented as a string */
  BigFloat: { input: string; output: string; }
  /** An arbitrary size integer represented as a string */
  BigInt: { input: string; output: string; }
  /** An opaque string using for tracking a position in results during pagination */
  Cursor: { input: any; output: any; }
  /** A date wihout time information */
  Date: { input: string; output: string; }
  /** A date and time */
  Datetime: { input: string; output: string; }
  /** A Javascript Object Notation value serialized as a string */
  JSON: { input: string; output: string; }
  /** Any type not handled by the type system */
  Opaque: { input: any; output: any; }
  /** A time without date information */
  Time: { input: string; output: string; }
  /** A universally unique identifier */
  UUID: { input: string; output: string; }
};

/** Boolean expression comparing fields on type "BigFloat" */
export type BigFloatFilter = {
  eq?: InputMaybe<Scalars['BigFloat']['input']>;
  gt?: InputMaybe<Scalars['BigFloat']['input']>;
  gte?: InputMaybe<Scalars['BigFloat']['input']>;
  in?: InputMaybe<Array<Scalars['BigFloat']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['BigFloat']['input']>;
  lte?: InputMaybe<Scalars['BigFloat']['input']>;
  neq?: InputMaybe<Scalars['BigFloat']['input']>;
};

/** Boolean expression comparing fields on type "BigInt" */
export type BigIntFilter = {
  eq?: InputMaybe<Scalars['BigInt']['input']>;
  gt?: InputMaybe<Scalars['BigInt']['input']>;
  gte?: InputMaybe<Scalars['BigInt']['input']>;
  in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['BigInt']['input']>;
  lte?: InputMaybe<Scalars['BigInt']['input']>;
  neq?: InputMaybe<Scalars['BigInt']['input']>;
};

/** Boolean expression comparing fields on type "Boolean" */
export type BooleanFilter = {
  eq?: InputMaybe<Scalars['Boolean']['input']>;
  is?: InputMaybe<FilterIs>;
};

/** Boolean expression comparing fields on type "Date" */
export type DateFilter = {
  eq?: InputMaybe<Scalars['Date']['input']>;
  gt?: InputMaybe<Scalars['Date']['input']>;
  gte?: InputMaybe<Scalars['Date']['input']>;
  in?: InputMaybe<Array<Scalars['Date']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['Date']['input']>;
  lte?: InputMaybe<Scalars['Date']['input']>;
  neq?: InputMaybe<Scalars['Date']['input']>;
};

/** Boolean expression comparing fields on type "Datetime" */
export type DatetimeFilter = {
  eq?: InputMaybe<Scalars['Datetime']['input']>;
  gt?: InputMaybe<Scalars['Datetime']['input']>;
  gte?: InputMaybe<Scalars['Datetime']['input']>;
  in?: InputMaybe<Array<Scalars['Datetime']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['Datetime']['input']>;
  lte?: InputMaybe<Scalars['Datetime']['input']>;
  neq?: InputMaybe<Scalars['Datetime']['input']>;
};

export enum FilterIs {
  NotNull = 'NOT_NULL',
  Null = 'NULL'
}

/** Boolean expression comparing fields on type "Float" */
export type FloatFilter = {
  eq?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<Scalars['Float']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  neq?: InputMaybe<Scalars['Float']['input']>;
};

/** Boolean expression comparing fields on type "ID" */
export type IdFilter = {
  eq?: InputMaybe<Scalars['ID']['input']>;
};

/** Boolean expression comparing fields on type "Int" */
export type IntFilter = {
  eq?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  neq?: InputMaybe<Scalars['Int']['input']>;
};

/** The root type for creating and mutating data */
export type Mutation = {
  __typename?: 'Mutation';
  /** Deletes zero or more records from the `contact_requests` collection */
  deleteFromcontact_requestsCollection: Contact_RequestsDeleteResponse;
  /** Deletes zero or more records from the `contacts` collection */
  deleteFromcontactsCollection: ContactsDeleteResponse;
  /** Deletes zero or more records from the `private_chats` collection */
  deleteFromprivate_chatsCollection: Private_ChatsDeleteResponse;
  /** Deletes zero or more records from the `private_messages` collection */
  deleteFromprivate_messagesCollection: Private_MessagesDeleteResponse;
  /** Deletes zero or more records from the `users` collection */
  deleteFromusersCollection: UsersDeleteResponse;
  gen_random_name?: Maybe<Scalars['String']['output']>;
  gen_unique_random_code?: Maybe<Scalars['String']['output']>;
  /** Adds one or more `contact_requests` records to the collection */
  insertIntocontact_requestsCollection?: Maybe<Contact_RequestsInsertResponse>;
  /** Adds one or more `contacts` records to the collection */
  insertIntocontactsCollection?: Maybe<ContactsInsertResponse>;
  /** Adds one or more `private_chats` records to the collection */
  insertIntoprivate_chatsCollection?: Maybe<Private_ChatsInsertResponse>;
  /** Adds one or more `private_messages` records to the collection */
  insertIntoprivate_messagesCollection?: Maybe<Private_MessagesInsertResponse>;
  /** Adds one or more `users` records to the collection */
  insertIntousersCollection?: Maybe<UsersInsertResponse>;
  /** Updates zero or more records in the `contact_requests` collection */
  updatecontact_requestsCollection: Contact_RequestsUpdateResponse;
  /** Updates zero or more records in the `contacts` collection */
  updatecontactsCollection: ContactsUpdateResponse;
  /** Updates zero or more records in the `private_chats` collection */
  updateprivate_chatsCollection: Private_ChatsUpdateResponse;
  /** Updates zero or more records in the `private_messages` collection */
  updateprivate_messagesCollection: Private_MessagesUpdateResponse;
  /** Updates zero or more records in the `users` collection */
  updateusersCollection: UsersUpdateResponse;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromcontact_RequestsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<Contact_RequestsFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromcontactsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<ContactsFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromprivate_ChatsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<Private_ChatsFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromprivate_MessagesCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<Private_MessagesFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromusersCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<UsersFilter>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntocontact_RequestsCollectionArgs = {
  objects: Array<Contact_RequestsInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntocontactsCollectionArgs = {
  objects: Array<ContactsInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoprivate_ChatsCollectionArgs = {
  objects: Array<Private_ChatsInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoprivate_MessagesCollectionArgs = {
  objects: Array<Private_MessagesInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntousersCollectionArgs = {
  objects: Array<UsersInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationUpdatecontact_RequestsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<Contact_RequestsFilter>;
  set: Contact_RequestsUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdatecontactsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<ContactsFilter>;
  set: ContactsUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdateprivate_ChatsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<Private_ChatsFilter>;
  set: Private_ChatsUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdateprivate_MessagesCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<Private_MessagesFilter>;
  set: Private_MessagesUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdateusersCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<UsersFilter>;
  set: UsersUpdateInput;
};

export type Node = {
  /** Retrieves a record by `ID` */
  nodeId: Scalars['ID']['output'];
};

/** Boolean expression comparing fields on type "Opaque" */
export type OpaqueFilter = {
  eq?: InputMaybe<Scalars['Opaque']['input']>;
  is?: InputMaybe<FilterIs>;
};

/** Defines a per-field sorting order */
export enum OrderByDirection {
  /** Ascending order, nulls first */
  AscNullsFirst = 'AscNullsFirst',
  /** Ascending order, nulls last */
  AscNullsLast = 'AscNullsLast',
  /** Descending order, nulls first */
  DescNullsFirst = 'DescNullsFirst',
  /** Descending order, nulls last */
  DescNullsLast = 'DescNullsLast'
}

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
};

/** The root type for querying data */
export type Query = {
  __typename?: 'Query';
  /** A pagable collection of type `contact_requests` */
  contact_requestsCollection?: Maybe<Contact_RequestsConnection>;
  /** A pagable collection of type `contacts` */
  contactsCollection?: Maybe<ContactsConnection>;
  /** Retrieve a record by its `ID` */
  node?: Maybe<Node>;
  /** A pagable collection of type `private_chats` */
  private_chatsCollection?: Maybe<Private_ChatsConnection>;
  /** A pagable collection of type `private_messages` */
  private_messagesCollection?: Maybe<Private_MessagesConnection>;
  /** A pagable collection of type `users` */
  usersCollection?: Maybe<UsersConnection>;
};


/** The root type for querying data */
export type QueryContact_RequestsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Contact_RequestsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Contact_RequestsOrderBy>>;
};


/** The root type for querying data */
export type QueryContactsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<ContactsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ContactsOrderBy>>;
};


/** The root type for querying data */
export type QueryNodeArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root type for querying data */
export type QueryPrivate_ChatsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Private_ChatsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Private_ChatsOrderBy>>;
};


/** The root type for querying data */
export type QueryPrivate_MessagesCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Private_MessagesFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Private_MessagesOrderBy>>;
};


/** The root type for querying data */
export type QueryUsersCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<UsersFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<UsersOrderBy>>;
};

/** Boolean expression comparing fields on type "String" */
export type StringFilter = {
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  iregex?: InputMaybe<Scalars['String']['input']>;
  is?: InputMaybe<FilterIs>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  neq?: InputMaybe<Scalars['String']['input']>;
  regex?: InputMaybe<Scalars['String']['input']>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

/** Boolean expression comparing fields on type "Time" */
export type TimeFilter = {
  eq?: InputMaybe<Scalars['Time']['input']>;
  gt?: InputMaybe<Scalars['Time']['input']>;
  gte?: InputMaybe<Scalars['Time']['input']>;
  in?: InputMaybe<Array<Scalars['Time']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['Time']['input']>;
  lte?: InputMaybe<Scalars['Time']['input']>;
  neq?: InputMaybe<Scalars['Time']['input']>;
};

/** Boolean expression comparing fields on type "UUID" */
export type UuidFilter = {
  eq?: InputMaybe<Scalars['UUID']['input']>;
  in?: InputMaybe<Array<Scalars['UUID']['input']>>;
  is?: InputMaybe<FilterIs>;
  neq?: InputMaybe<Scalars['UUID']['input']>;
};

export type Contact_Requests = Node & {
  __typename?: 'contact_requests';
  accepted: Scalars['Boolean']['output'];
  created_at: Scalars['Datetime']['output'];
  id: Scalars['BigInt']['output'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  user_from: Scalars['UUID']['output'];
  user_to: Scalars['UUID']['output'];
  users: Users;
};

export type Contact_RequestsConnection = {
  __typename?: 'contact_requestsConnection';
  edges: Array<Contact_RequestsEdge>;
  pageInfo: PageInfo;
};

export type Contact_RequestsDeleteResponse = {
  __typename?: 'contact_requestsDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Contact_Requests>;
};

export type Contact_RequestsEdge = {
  __typename?: 'contact_requestsEdge';
  cursor: Scalars['String']['output'];
  node: Contact_Requests;
};

export type Contact_RequestsFilter = {
  accepted?: InputMaybe<BooleanFilter>;
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<Contact_RequestsFilter>>;
  created_at?: InputMaybe<DatetimeFilter>;
  id?: InputMaybe<BigIntFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<Contact_RequestsFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<Contact_RequestsFilter>>;
  user_from?: InputMaybe<UuidFilter>;
  user_to?: InputMaybe<UuidFilter>;
};

export type Contact_RequestsInsertInput = {
  accepted?: InputMaybe<Scalars['Boolean']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  user_from?: InputMaybe<Scalars['UUID']['input']>;
  user_to?: InputMaybe<Scalars['UUID']['input']>;
};

export type Contact_RequestsInsertResponse = {
  __typename?: 'contact_requestsInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Contact_Requests>;
};

export type Contact_RequestsOrderBy = {
  accepted?: InputMaybe<OrderByDirection>;
  created_at?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  user_from?: InputMaybe<OrderByDirection>;
  user_to?: InputMaybe<OrderByDirection>;
};

export type Contact_RequestsUpdateInput = {
  accepted?: InputMaybe<Scalars['Boolean']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  user_from?: InputMaybe<Scalars['UUID']['input']>;
  user_to?: InputMaybe<Scalars['UUID']['input']>;
};

export type Contact_RequestsUpdateResponse = {
  __typename?: 'contact_requestsUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Contact_Requests>;
};

export type Contacts = Node & {
  __typename?: 'contacts';
  avatar?: Maybe<Scalars['String']['output']>;
  code: Scalars['String']['output'];
  created_at: Scalars['Datetime']['output'];
  display_name: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  online: Scalars['Boolean']['output'];
  users?: Maybe<Users>;
};

export type ContactsConnection = {
  __typename?: 'contactsConnection';
  edges: Array<ContactsEdge>;
  pageInfo: PageInfo;
};

export type ContactsDeleteResponse = {
  __typename?: 'contactsDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Contacts>;
};

export type ContactsEdge = {
  __typename?: 'contactsEdge';
  cursor: Scalars['String']['output'];
  node: Contacts;
};

export type ContactsFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<ContactsFilter>>;
  avatar?: InputMaybe<StringFilter>;
  code?: InputMaybe<StringFilter>;
  created_at?: InputMaybe<DatetimeFilter>;
  display_name?: InputMaybe<StringFilter>;
  id?: InputMaybe<UuidFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<ContactsFilter>;
  online?: InputMaybe<BooleanFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<ContactsFilter>>;
};

export type ContactsInsertInput = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  code?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  display_name?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  online?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ContactsInsertResponse = {
  __typename?: 'contactsInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Contacts>;
};

export type ContactsOrderBy = {
  avatar?: InputMaybe<OrderByDirection>;
  code?: InputMaybe<OrderByDirection>;
  created_at?: InputMaybe<OrderByDirection>;
  display_name?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  online?: InputMaybe<OrderByDirection>;
};

export type ContactsUpdateInput = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  code?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  display_name?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  online?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ContactsUpdateResponse = {
  __typename?: 'contactsUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Contacts>;
};

export type Private_Chats = Node & {
  __typename?: 'private_chats';
  created_at: Scalars['Datetime']['output'];
  id: Scalars['UUID']['output'];
  is_from_typing: Scalars['Boolean']['output'];
  is_to_typing: Scalars['Boolean']['output'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  private_messagesCollection?: Maybe<Private_MessagesConnection>;
  user_from: Scalars['UUID']['output'];
  user_to: Scalars['UUID']['output'];
  users: Users;
};


export type Private_ChatsPrivate_MessagesCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Private_MessagesFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Private_MessagesOrderBy>>;
};

export type Private_ChatsConnection = {
  __typename?: 'private_chatsConnection';
  edges: Array<Private_ChatsEdge>;
  pageInfo: PageInfo;
};

export type Private_ChatsDeleteResponse = {
  __typename?: 'private_chatsDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Private_Chats>;
};

export type Private_ChatsEdge = {
  __typename?: 'private_chatsEdge';
  cursor: Scalars['String']['output'];
  node: Private_Chats;
};

export type Private_ChatsFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<Private_ChatsFilter>>;
  created_at?: InputMaybe<DatetimeFilter>;
  id?: InputMaybe<UuidFilter>;
  is_from_typing?: InputMaybe<BooleanFilter>;
  is_to_typing?: InputMaybe<BooleanFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<Private_ChatsFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<Private_ChatsFilter>>;
  user_from?: InputMaybe<UuidFilter>;
  user_to?: InputMaybe<UuidFilter>;
};

export type Private_ChatsInsertInput = {
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  is_from_typing?: InputMaybe<Scalars['Boolean']['input']>;
  is_to_typing?: InputMaybe<Scalars['Boolean']['input']>;
  user_from?: InputMaybe<Scalars['UUID']['input']>;
  user_to?: InputMaybe<Scalars['UUID']['input']>;
};

export type Private_ChatsInsertResponse = {
  __typename?: 'private_chatsInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Private_Chats>;
};

export type Private_ChatsOrderBy = {
  created_at?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  is_from_typing?: InputMaybe<OrderByDirection>;
  is_to_typing?: InputMaybe<OrderByDirection>;
  user_from?: InputMaybe<OrderByDirection>;
  user_to?: InputMaybe<OrderByDirection>;
};

export type Private_ChatsUpdateInput = {
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  is_from_typing?: InputMaybe<Scalars['Boolean']['input']>;
  is_to_typing?: InputMaybe<Scalars['Boolean']['input']>;
  user_from?: InputMaybe<Scalars['UUID']['input']>;
  user_to?: InputMaybe<Scalars['UUID']['input']>;
};

export type Private_ChatsUpdateResponse = {
  __typename?: 'private_chatsUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Private_Chats>;
};

export type Private_Messages = Node & {
  __typename?: 'private_messages';
  chat: Scalars['UUID']['output'];
  created_at: Scalars['Datetime']['output'];
  id: Scalars['UUID']['output'];
  is_edit: Scalars['Boolean']['output'];
  is_read: Scalars['Boolean']['output'];
  message: Scalars['String']['output'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  private_chats: Private_Chats;
  send_by: Scalars['UUID']['output'];
  users: Users;
};

export type Private_MessagesConnection = {
  __typename?: 'private_messagesConnection';
  edges: Array<Private_MessagesEdge>;
  pageInfo: PageInfo;
};

export type Private_MessagesDeleteResponse = {
  __typename?: 'private_messagesDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Private_Messages>;
};

export type Private_MessagesEdge = {
  __typename?: 'private_messagesEdge';
  cursor: Scalars['String']['output'];
  node: Private_Messages;
};

export type Private_MessagesFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<Private_MessagesFilter>>;
  chat?: InputMaybe<UuidFilter>;
  created_at?: InputMaybe<DatetimeFilter>;
  id?: InputMaybe<UuidFilter>;
  is_edit?: InputMaybe<BooleanFilter>;
  is_read?: InputMaybe<BooleanFilter>;
  message?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<Private_MessagesFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<Private_MessagesFilter>>;
  send_by?: InputMaybe<UuidFilter>;
};

export type Private_MessagesInsertInput = {
  chat?: InputMaybe<Scalars['UUID']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  is_edit?: InputMaybe<Scalars['Boolean']['input']>;
  is_read?: InputMaybe<Scalars['Boolean']['input']>;
  message?: InputMaybe<Scalars['String']['input']>;
  send_by?: InputMaybe<Scalars['UUID']['input']>;
};

export type Private_MessagesInsertResponse = {
  __typename?: 'private_messagesInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Private_Messages>;
};

export type Private_MessagesOrderBy = {
  chat?: InputMaybe<OrderByDirection>;
  created_at?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  is_edit?: InputMaybe<OrderByDirection>;
  is_read?: InputMaybe<OrderByDirection>;
  message?: InputMaybe<OrderByDirection>;
  send_by?: InputMaybe<OrderByDirection>;
};

export type Private_MessagesUpdateInput = {
  chat?: InputMaybe<Scalars['UUID']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  is_edit?: InputMaybe<Scalars['Boolean']['input']>;
  is_read?: InputMaybe<Scalars['Boolean']['input']>;
  message?: InputMaybe<Scalars['String']['input']>;
  send_by?: InputMaybe<Scalars['UUID']['input']>;
};

export type Private_MessagesUpdateResponse = {
  __typename?: 'private_messagesUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Private_Messages>;
};

export type Users = Node & {
  __typename?: 'users';
  contact: Scalars['UUID']['output'];
  contact_requestsCollection?: Maybe<Contact_RequestsConnection>;
  contacts: Contacts;
  created_at: Scalars['Datetime']['output'];
  id: Scalars['UUID']['output'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  private_chatsCollection?: Maybe<Private_ChatsConnection>;
  private_messagesCollection?: Maybe<Private_MessagesConnection>;
};


export type UsersContact_RequestsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Contact_RequestsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Contact_RequestsOrderBy>>;
};


export type UsersPrivate_ChatsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Private_ChatsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Private_ChatsOrderBy>>;
};


export type UsersPrivate_MessagesCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Private_MessagesFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Private_MessagesOrderBy>>;
};

export type UsersConnection = {
  __typename?: 'usersConnection';
  edges: Array<UsersEdge>;
  pageInfo: PageInfo;
};

export type UsersDeleteResponse = {
  __typename?: 'usersDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Users>;
};

export type UsersEdge = {
  __typename?: 'usersEdge';
  cursor: Scalars['String']['output'];
  node: Users;
};

export type UsersFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<UsersFilter>>;
  contact?: InputMaybe<UuidFilter>;
  created_at?: InputMaybe<DatetimeFilter>;
  id?: InputMaybe<UuidFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<UsersFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<UsersFilter>>;
};

export type UsersInsertInput = {
  contact?: InputMaybe<Scalars['UUID']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
};

export type UsersInsertResponse = {
  __typename?: 'usersInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Users>;
};

export type UsersOrderBy = {
  contact?: InputMaybe<OrderByDirection>;
  created_at?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
};

export type UsersUpdateInput = {
  contact?: InputMaybe<Scalars['UUID']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
};

export type UsersUpdateResponse = {
  __typename?: 'usersUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Users>;
};

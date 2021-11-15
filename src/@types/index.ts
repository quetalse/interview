export enum ActionTypes {
    // ADD_SITES = 'ADD_SITES',
    // ADD_TESTS = 'ADD_TESTS',
    ADD_DATA = "ADD_DATA",
    LOADING_DATA = "LOADING_DATA",
    ERROR_DATA = "ERROR_DATA",
}

export enum TestType {
    CLASSIC = "CLASSIC",
    SERVER_SIDE = "SERVER_SIDE",
    MVT = "MVT"
}

export enum TestStatus {
    DRAFT = "DRAFT",
    ONLINE = "ONLINE",
    PAUSED = "PAUSED",
    STOPPED = "STOPPED",
}

export type Site = {
    id: number;
    url: string;
}

export type Test = {
    id: number;
    name: string;
    type: TestType;
    status: TestStatus;
    siteId: number;
}

export type DataType = {
    id: number;
    name: string;
    type: TestType;
    status: TestStatus;
    site: string;
}

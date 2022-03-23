export type Satellite = {
    name: string;
    distance: number;
    message: string[]
}

export type TopSecretDTO = {
        satellites: Satellite[]
}
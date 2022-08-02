export type TCar = {
    '@assetType': string;
    '@key': string;
    '@lastTouchBy': string;
    'lastTx': string;
    driver: TDriver;
    id: number;
    model: string;
}

export type TDriver = {
    '@assetType': string;
    '@key': string;
    '@lastTouchBy': string
    '@lastTx': string
    id: number
    name: string
    team: TTeam
}

export type TTeam = {
    '@assetType': string;
    '@key': string
}
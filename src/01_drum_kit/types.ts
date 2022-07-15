// All pressed event.keys + musical key
export type KeyNoteMap = {
    [key: string]: string;
}

export enum PlayStatus {
    Playing,
    Fading,
}

export type PlayedSound = {
    key: string;
    audios: (HTMLAudioElement | null)[];
    status: PlayStatus;
    lastHandledIdx: number;
}

export type PlayedSoundMap = {
    [key: string]: PlayedSound;
}
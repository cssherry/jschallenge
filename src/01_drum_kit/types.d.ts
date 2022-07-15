// All pressed event.keys + musical key
export type KeyNoteMap = {
    [key: string]: string;
}

export type PlayedSound = {
    key: string;
    audio: HTMLAudioElement;
}

export type PlayedSoundMap = {
    [key: string]: PlayedSound;
}
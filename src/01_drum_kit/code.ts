import { appendSvgChild } from "../util/html_helpers";
import { KeyNoteMap, PlayedSound, PlayedSoundMap, PlayStatus } from "./types";

function getKeyElement(playedKey: string): SVGElement | null {
    return document.querySelector(`[data-key="${playedKey}"]`);
}

/* 01 - DRAW KEYBOARD */
const whiteHeight = 170;
const whiteWidth = 35;
const blackWidth = 22;
const blackHeight = whiteHeight * 0.6;
const whiteLabelOffset = whiteWidth / 2 - 2;
const blackOffset = blackWidth / 2;
const blackLabelOffset = (whiteWidth - blackWidth) / 2;
function getNextWhite(idx: number) {
    return (idx + 1) * whiteWidth;
}

function addWhiteRect(keyboard: SVGElement, idx: number, keyShortcut: string): SVGElement {
    const key = appendSvgChild(keyboard, 'rect', true);
    key.classList.add('key-white');
    key.setAttribute('height', `${whiteHeight}px`);
    key.setAttribute('width', `${whiteWidth}px`);
    key.setAttribute('y', '0');
    key.setAttribute('x', idx ? `${idx * whiteWidth}px` : '0');

    const nextWhiteWidth = getNextWhite(idx);
    const label = appendSvgChild(keyboard, 'text');
    label.classList.add('text-white');
    label.setAttribute('y', `${whiteHeight - 15}px`);
    label.setAttribute('x', `${nextWhiteWidth - whiteLabelOffset}px`);
    label.textContent = keyShortcut;
    return key;
}

function getBlackKey(unshiftedKey: string): string {
    // This is specific to US keyboard... oh well
    let shiftKey = Number.isNaN(parseInt(unshiftedKey)) ? unshiftedKey.toUpperCase() : unshiftedKey;
    switch (unshiftedKey) {
        case '1':
            shiftKey = '!';
            break;
        case '2':
            shiftKey = '@';
            break;
        case '3':
            shiftKey = '#';
            break;
        case '4':
            shiftKey = '$';
            break;
        case '5':
            shiftKey = '%';
            break;
        case '6':
            shiftKey = '^';
            break;
        case '7':
            shiftKey = '&';
            break;
        case '8':
            shiftKey = '*';
            break;
        case '9':
            shiftKey = '(';
            break;
        case '0':
            shiftKey = ')';
            break;
        default:
            break;
    }
    return shiftKey;
}

// Add sharps for every note except 3rd (E) and  7th (B)
function addBlackRect(keyboard: SVGElement, idx: number, keyShortcut: string): null | SVGElement {
    const scaleValue = idx % 7;
    if (scaleValue === 0 || scaleValue === 3) return null;

    const nextWhiteWidth = idx * whiteWidth;
    const key = appendSvgChild(keyboard, 'rect');
    key.classList.add('key-black');
    key.setAttribute('height', `${blackHeight}px`);
    key.setAttribute('width', `${blackWidth}px`);
    key.setAttribute('y', '0');
    key.setAttribute('x', `${nextWhiteWidth - blackOffset}`);

    const label = appendSvgChild(keyboard, 'text');
    label.classList.add('text-black');
    label.setAttribute('y', `${blackHeight / 2}px`);
    label.setAttribute('x', `${nextWhiteWidth - blackLabelOffset}px`);

    label.textContent = getBlackKey(keyShortcut);
    return key;
}

// Based off https://commons.wikimedia.org/wiki/File:PianoKeyboard.svg
export function drawKeyboard(
    containerElement: HTMLElement,
    keys: string[],
): KeyNoteMap {
    // Keypress event.key: https://www.freecodecamp.org/news/javascript-keycode-list-keypress-event-key-codes/
    const keyToNote: KeyNoteMap = {};

    // Always try to include middle C (C4)
    const numScale = Math.max(1, Math.floor(keys.length / 7));
    const startScale = numScale >= 7 ? 1 : 1 + Math.floor((7 - numScale) / 2);

    // Start drawing keyboard
    const keyboard = appendSvgChild(containerElement, 'svg');
    keyboard.setAttribute('height', `${whiteHeight}px`);
    keyboard.setAttribute('width', `${whiteWidth * (keys.length + 1)}px`);
    const insetFilter = document.getElementById('inset-filter')
    if (insetFilter) {
        keyboard.append(insetFilter);
    }

    // Draw keys and build out keyToNote
    let previousKey: string;
    keys.forEach((key: string, idx: number): void => {
        const whiteKey = addWhiteRect(keyboard,  idx, key);
        const blackKey = addBlackRect(keyboard,  idx, previousKey);

        // Info on pitch notation: https://www.allaboutmusictheory.com/piano-keyboard/music-note-names/
        const currPitch = startScale + Math.floor(idx / 7);
        const currKey = String.fromCharCode(((idx + 2) % 7) + 65);
        keyToNote[key] = `${currKey}${currPitch}`;
        whiteKey.setAttribute('data-key', key);

        if (keyToNote[key] === 'C4') {
            const cTitle = appendSvgChild(whiteKey, 'title');
            cTitle.textContent = 'This is middle C (C4)';
        }

        if (blackKey && previousKey) {
            // Iowa files show piano pieces as flats rather than sharps
            // However, user expects sharps because they are pressing shift
            const blackKeyNote = `${currKey}b${currPitch}`;
            const blackKeyCode = getBlackKey(previousKey);
            keyToNote[blackKeyCode] = blackKeyNote;
            blackKey.setAttribute('data-key', blackKeyCode);
        }

        previousKey = key;
    });

    return keyToNote;
}


/* 02 - EVENT LISTENERS FOR PLAYING KEYBOARD */
const playedSounds: PlayedSoundMap = {};
function playSound(playKey: string | null, keyToNote: KeyNoteMap): void {
    if (playKey) {
        getKeyElement(playKey)?.classList.add('pressed');

        let audio = document.querySelector(`[data-pitch-key="${keyToNote[playKey]}"]`) as HTMLAudioElement;
        if (playedSounds[playKey]) {
            audio = audio.cloneNode(false) as HTMLAudioElement;
            playedSounds[playKey].audios.push(audio);
            playedSounds[playKey].status = PlayStatus.Playing;
        } else {
            playedSounds[playKey] = {
                key: playKey,
                audios: [audio],
                status: PlayStatus.Playing,
                lastHandledIdx: -1,
            };
        }

        audio.currentTime = 0.1;
        audio.play();
    }
}

const shiftKey = 'Shift';
function recordPress(event: KeyboardEvent, keyToNote: KeyNoteMap): void {
    const currKey = event.key;

    if (currKey === shiftKey || !keyToNote[currKey] || (playedSounds[currKey] && playedSounds[currKey].status === PlayStatus.Playing)) return;

    playSound(currKey, keyToNote);
}

function unpressKey(playedKey: string) {
    getKeyElement(playedKey)?.classList.remove('pressed');
}

function keyReleased(currKey: string, existingKey: string) {
    return existingKey === currKey || existingKey.startsWith(`${currKey}_`) || existingKey.endsWith(`_${currKey}`);
}

function recordStop(event: KeyboardEvent) {
    const currKey = event.key;
    let stoppedSound: PlayedSound | undefined;
    Object.values(playedSounds).forEach((playedSound: PlayedSound): void => {
        if (keyReleased(currKey, playedSound.key)) {
            stoppedSound = playedSound;
        }
    });

    if (stoppedSound) {
        const stopped = stoppedSound;
        stopped.status = PlayStatus.Fading;
        setTimeout(() => {
            stopped.lastHandledIdx += 1;
            const handleIdx = stopped.lastHandledIdx;
            const currAudio = stopped.audios[handleIdx];
            if (currAudio) {
                currAudio.currentTime = 4;
                unpressKey(stopped.key);
                stopped.status = PlayStatus.Fading;
                setTimeout(() => {
                    console.log('handleIdx', handleIdx);

                    stopped.audios[handleIdx] = null;

                    if (stopped.audios.every(audio => !audio)) {
                        delete playedSounds[stopped.key];
                    }
                }, 1000);
            }
        }, 200);
    }
}

export function addEventListeners(keyboard: HTMLElement, keyToNote: KeyNoteMap): void {
    document.addEventListener('keydown', (e) => {
        recordPress(e, keyToNote);
    });

    // Stop playing sound
    document.addEventListener('keyup', recordStop);
}
import { appendSvgChild } from "../util/html_helpers";
import { KeyList } from "./types";

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

function addWhiteRect(keyboard: SVGElement, idx: number, keyShortcut: string): void {
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
}

// Add sharps for every note except 3rd (E) and  7th (B)
function addBlackRect(keyboard: SVGElement, idx: number, keyShortcut: string): boolean {
    const scaleValue = idx % 7;
    if (scaleValue === 2 || scaleValue === 6) return false;

    const nextWhiteWidth = getNextWhite(idx);
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

    // This is specific to US keyboard... oh well
    let shiftKey = Number.isNaN(parseInt(keyShortcut)) ? keyShortcut.toUpperCase() : keyShortcut;
    switch (keyShortcut) {
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

    label.textContent = shiftKey;
    return true;
}

// Based off https://commons.wikimedia.org/wiki/File:PianoKeyboard.svg
export function drawKeyboard(
    containerElement: HTMLElement,
    keys: string[],
): KeyList {
    // Keypress event.key: https://www.freecodecamp.org/news/javascript-keycode-list-keypress-event-key-codes/
    const keyToNote: KeyList = {};

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
    keys.forEach((key: string, idx: number): void => {
        addWhiteRect(keyboard,  idx, key);
        const hasBlack = addBlackRect(keyboard,  idx, key);

        // Info on pitch notation: https://www.allaboutmusictheory.com/piano-keyboard/music-note-names/
        const currPitch = startScale + Math.floor(idx / 7);
        const currKey = String.fromCharCode((idx + 2 % 7) + 65);
        keyToNote[key] = `${currKey}${currPitch}`;

        if (hasBlack) {
            keyToNote[`Shift_${key}`] = `${currKey}#${currPitch}`;
        }
    });

    return keyToNote;
}
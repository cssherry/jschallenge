import './style.scss';
import '../util/style.scss';
import { addEventListeners, drawKeyboard } from './code';

window.onload = () => {
    const keyboardContainer = document.getElementById('keyboard') as HTMLElement;
    const keyToNote = drawKeyboard(keyboardContainer, [
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '0',
        'q',
        'w',
        'e',
        'r',
        't',
        'y',
        'u',
        'i',
        'o',
        'p',
        'a',
        's',
        'd',
        'f',
        'g',
        'h',
        'j',
        'k',
        'l',
        'z',
        'x',
        'c',
        'v',
        'b',
        'n',
        'm',
    ]);

    addEventListeners(keyboardContainer, keyToNote);
};
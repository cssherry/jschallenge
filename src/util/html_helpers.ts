export function appendSvgChild(parentElement: HTMLElement | SVGElement, childElement: string, prepend = false): SVGElement {
    const child = document.createElementNS('http://www.w3.org/2000/svg', childElement);

    if (prepend) {
        parentElement.prepend(child);
    } else {
        parentElement.append(child);
    }

    return child;
}
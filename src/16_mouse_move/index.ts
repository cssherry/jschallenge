import './style.scss';
import '../util/style.scss';

window.onload = () => {
  const containerEl = document.getElementById('text-container');
  const textEl = document.getElementById('shadow-text');
  const walkPx = 300;

  // Shadow x/y variations
  const shadows = [
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
  ]

  function addShadow(e: MouseEvent) {
    if (!containerEl || !textEl) return;

    const { clientHeight: height, clientWidth: width } = containerEl;
    const { offsetLeft: left, offsetTop: top } = textEl;
    let { offsetX: x, offsetY: y } = e;
    console.log(left, top, width, height);

    // Check that triggering element (currentTarget) is the same as the event listener element (target/containerEl)
    if (e.currentTarget !== e.target) {
      x += left;
      y += top;
    }

    console.log(x, y);

    const xPositionPercentage = (x - width / 2) / width;
    const yPositionPercentage = (y - height / 2) / height;
    const xWalk = Math.round(xPositionPercentage * walkPx * 2);
    const yWalk = Math.round(yPositionPercentage * walkPx);

    if (textEl) {
      textEl.style.textShadow = shadows
        .map((
          [xMultiplier, yMultiplier]
        ) => `${xWalk * xMultiplier}px ${yWalk * yMultiplier}px 0 rgba(${255 * xMultiplier}, ${255 * 0.5 * yMultiplier}, ${255 * Math.abs(xMultiplier * yMultiplier)}, 0.7)`)
        .join(', ');
    }
  }

  containerEl?.addEventListener('mousemove', addShadow);

};

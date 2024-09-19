export const darkenColor = (color, brightness) => {
    // Convert HEX to RGB
    let r = parseInt(color.slice(1, 3), 16);
    let g = parseInt(color.slice(3, 5), 16);
    let b = parseInt(color.slice(5, 7), 16);
  
    // Reduce brightness by 20%
    r = Math.max(0, Math.floor(r * brightness));
    g = Math.max(0, Math.floor(g * brightness));
    b = Math.max(0, Math.floor(b * brightness));
  
    // Convert back to HEX
    const newColor = `#${r.toString(16).padStart(2, '0')}${g
      .toString(16)
      .padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    return newColor;
};
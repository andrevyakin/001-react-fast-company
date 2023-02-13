const rowsColor = [
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'info',
    'light'
];
export function rowColor(index) {
    return rowsColor.length > index
        ? rowsColor[index]
        : rowsColor[index - rowsColor.length];
}

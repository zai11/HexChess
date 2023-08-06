export function linearToCoordinate(id, context=undefined, boundary_data=undefined) {

    if (context === undefined && boundary_data === undefined) {
        console.warn('Neither context nor boundary data was provided to LinearToCoordinate function');
        return undefined;
    }
    
    if (boundary_data === undefined)
        boundary_data = context.cache.json.get('json_boundary_tiles');

    if (boundary_data.includes(id) || id < 1 || id > 107) {
        console.warn('Invalid value for linear coordinate: ' + id);
        return undefined;
    }

    let result;

    if (id <= 12)
        result = "A" + (id - 6);
    else if (id <= 20)
        result = "B" + (id - 13);
    else if (id <= 29)
        result = "C" + (id - 21);
    else if (id <= 39)
        result = "D" + (id - 30);
    else if (id <= 50)
        result = "E" + (id - 40);
    else if (id <= 62)
        result = "F" + (id - 51);
    else if (id <= 73)
        result = "G" + (id - 62);
    else if (id <= 83)
        result = "H" + (id - 72);
    else if (id <= 92)
        result = "I" + (id - 81);
    else if (id <= 100)
        result = "J" + (id - 89);
    else
        result = "K" + (id - 96);

    if (!isValidCoord(result)) {
        console.warn('Resulting coordinate is invalid: ' + result);
        return undefined;
    }
    
    return result;
}

export function coordinateToLinear(coordinate) {
    if (!isValidCoord(coordinate)) {
        console.warn('Invalid coordinate provided: ' + coordinate);
        return undefined;
    }
    switch(coordinate[0]) {
        case 'A':
            return 7 + Number(coordinate.slice(1)) - 1;
        case 'B':
            return 14 + Number(coordinate.slice(1)) - 1;
        case 'C':
            return 22 + Number(coordinate.slice(1)) - 1;
        case 'D':
            return 31 + Number(coordinate.slice(1)) - 1;
        case 'E':
            return 41 + Number(coordinate.slice(1)) - 1;
        case 'F':
            return 52 + Number(coordinate.slice(1)) - 1;
        case 'G':
            return 64 + Number(coordinate.slice(1)) - 2;
        case 'H':
            return 75 + Number(coordinate.slice(1)) - 3;
        case 'I':
            return 85 + Number(coordinate.slice(1)) - 4;
        case 'J':
            return 94 + Number(coordinate.slice(1)) - 5;
        case 'K':
            return 102 + Number(coordinate.slice(1)) - 6;
        default:
            console.warn('Invalid coordinate provided: ' + coordinate);
            return undefined;
    }
}

export function fileLength(file) {
    let result = file.charCodeAt(0)-59
    if (result > 11)
        return 11 - (result % 11);
    return result;
}

export function isValidCoord(coord) {

    if (coord === undefined)
        return false;

    let file = coord[0];
    let rank = Number(coord.slice(1));

    let file_g_or_greater = file.charCodeAt(0)-65 >= 6;
    let file_f_or_less = file.charCodeAt(0)-65 <= 5;

    let rank_in_range = (file_g_or_greater && (rank >= 11-(fileLength(file) %11) + 1 && rank <= 11)) || (file_f_or_less && (rank >= 1 && rank <= fileLength(file)));
    let file_in_range = file.charCodeAt(0)-65 >= 0 && file.charCodeAt(0)-65 <= 11

    return file_in_range && rank_in_range
}
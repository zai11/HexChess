export class Raycaster {
    constructor(board) {
        this.board = board;
    }

    cast = function (origin, destination) {
        let direction = this.findDirection(origin, destination);
        if (this.board.colour === 'black')
            direction = this.invertDirection(direction);
        return this['raycastHit' + direction](origin, destination);
    }

    raycastHitNorth = function (origin, destination) {
        const originTile = this.board.getTileFromCoord(origin);

        if (originTile === undefined)
            throw new Error("Couldn't find tile at " + origin);

        let nextTile = originTile.getNeighbourTileNorth();

        while (nextTile !== undefined) {
            if (nextTile.coordinate === destination)
                return undefined;
            if (nextTile.hasPiece())
                return nextTile.getPiece();
            nextTile = nextTile.getNeighbourTileNorth();
        }
    }

    raycastHitDiagonalNorthEast = function (origin, destination) {
        const originTile = this.board.getTileFromCoord(origin);

        if (originTile === undefined)
            throw new Error("Couldn't find tile at " + origin);

        let nextTile = originTile.getNeighbourTileDiagonalNorthEast();

        while (nextTile !== undefined) {
            if (nextTile.coordinate === destination)
                return undefined;
            if (nextTile.hasPiece())
                return nextTile.getPiece();
            nextTile = nextTile.getNeighbourTileDiagonalNorthEast();
        }
    }

    raycastHitNorthEast = function (origin, destination) {
        const originTile = this.board.getTileFromCoord(origin);

        if (originTile === undefined)
            throw new Error("Couldn't find tile at " + origin);

        let nextTile = originTile.getNeighbourTileNorthEast();

        while (nextTile !== undefined) {
            if (nextTile.coordinate === destination)
                return undefined;
            if (nextTile.hasPiece())
                return nextTile.getPiece();
            nextTile = nextTile.getNeighbourTileNorthEast();
        }
    }

    raycastHitDiagonalEast = function (origin, destination) {
        const originTile = this.board.getTileFromCoord(origin);

        if (originTile === undefined)
            throw new Error("Couldn't find tile at " + origin);

        let nextTile = originTile.getNeighbourTileDiagonalEast();

        while (nextTile !== undefined) {
            if (nextTile.coordinate === destination)
                return undefined;
            if (nextTile.hasPiece())
                return nextTile.getPiece();
            nextTile = nextTile.getNeighbourTileDiagonalEast();
        }
    }

    raycastHitSouthEast = function (origin, destination) {
        const originTile = this.board.getTileFromCoord(origin);

        if (originTile === undefined)
            throw new Error("Couldn't find tile at " + origin);

        let nextTile = originTile.getNeighbourTileSouthEast();

        while (nextTile !== undefined) {
            if (nextTile.coordinate === destination)
                return undefined;
            if (nextTile.hasPiece())
                return nextTile.getPiece();
            nextTile = nextTile.getNeighbourTileSouthEast();
        }
    }

    raycastHitDiagonalSouthEast = function (origin, destination) {
        const originTile = this.board.getTileFromCoord(origin);

        if (originTile === undefined)
            throw new Error("Couldn't find tile at " + origin);

        let nextTile = originTile.getNeighbourTileDiagonalSouthEast();

        while (nextTile !== undefined) {
            if (nextTile.coordinate === destination)
                return undefined;
            if (nextTile.hasPiece())
                return nextTile.getPiece();
            nextTile = nextTile.getNeighbourTileDiagonalSouthEast();
        }
    }

    raycastHitSouth = function (origin, destination) {
        const originTile = this.board.getTileFromCoord(origin);

        if (originTile === undefined)
            throw new Error("Couldn't find tile at " + origin);

        let nextTile = originTile.getNeighbourTileSouth();

        while (nextTile !== undefined) {
            if (nextTile.coordinate === destination)
                    return undefined;
            if (nextTile.hasPiece())
                return nextTile.getPiece();
            nextTile = nextTile.getNeighbourTileSouth();
        }
    }

    raycastHitDiagonalSouthWest = function (origin, destination) {
        const originTile = this.board.getTileFromCoord(origin);

        if (originTile === undefined)
            throw new Error("Couldn't find tile at " + origin);

        let nextTile = originTile.getNeighbourTileDiagonalSouthWest();

        while (nextTile !== undefined) {
            if (nextTile.coordinate === destination)
                return undefined;
            if (nextTile.hasPiece())
                return nextTile.getPiece();
            nextTile = nextTile.getNeighbourTileDiagonalSouthWest();
        }
    }

    raycastHitSouthWest = function (origin, destination) {
        const originTile = this.board.getTileFromCoord(origin);

        if (originTile === undefined)
            throw new Error("Couldn't find tile at " + origin);

        let nextTile = originTile.getNeighbourTileSouthWest();

        while (nextTile !== undefined) {
            if (nextTile.coordinate === destination)
                return undefined;
            if (nextTile.hasPiece())
                return nextTile.getPiece();
            nextTile = nextTile.getNeighbourTileSouthWest();
        }
    }

    raycastHitDiagonalWest = function (origin, destination) {
        const originTile = this.board.getTileFromCoord(origin);

        if (originTile === undefined)
            throw new Error("Couldn't find tile at " + origin);

        let nextTile = originTile.getNeighbourTileDiagonalWest();

        while (nextTile !== undefined) {
            if (nextTile.coordinate === destination)
                return undefined;
            if (nextTile.hasPiece())
                return nextTile.getPiece();
            nextTile = nextTile.getNeighbourTileDiagonalWest();
        }
    }

    raycastHitNorthWest = function (origin, destination) {
        const originTile = this.board.getTileFromCoord(origin);

        if (originTile === undefined)
            throw new Error("Couldn't find tile at " + origin);

        let nextTile = originTile.getNeighbourTileNorthWest();

        while (nextTile !== undefined) {
            if (nextTile.coordinate === destination)
                return undefined;
            if (nextTile.hasPiece())
                return nextTile.getPiece();
            nextTile = nextTile.getNeighbourTileNorthWest();
        }
    }

    raycastHitDiagonalNorthWest = function (origin, destination) {
        const originTile = this.board.getTileFromCoord(origin);

        if (originTile === undefined)
            throw new Error("Couldn't find tile at " + origin);

        let nextTile = originTile.getNeighbourTileDiagonalNorthWest();

        while (nextTile !== undefined) {
            if (nextTile.coordinate === destination)
                return undefined;
            if (nextTile.hasPiece())
                return nextTile.getPiece();
            nextTile = nextTile.getNeighbourTileDiagonalNorthWest();
        }
    }

    findTrapezoidOfCoordinate = function (coordinate) {
        return Math.sign(coordinate.charCodeAt(0) - 'F'.charCodeAt(0));
    }

    findDirection = function (origin, destination) {
        if (origin === destination)
            throw new Error("Unable to find direction if origin and destination are the same. Origin=" + origin + ", Destination=" + destination);

        const originTrapezoid = this.findTrapezoidOfCoordinate(origin);
        const destinationTrapezoid = this.findTrapezoidOfCoordinate(destination);

        if (originTrapezoid === destinationTrapezoid && originTrapezoid > 0 || (originTrapezoid === 0 && destinationTrapezoid === 1) || (destinationTrapezoid === 0 && originTrapezoid === 1))
            return this.findDirectionBothRightTrapezoid(origin, destination);
        else if (originTrapezoid == destinationTrapezoid && originTrapezoid < 0 || (originTrapezoid == 0 && destinationTrapezoid == -1) || (destinationTrapezoid == 0 && originTrapezoid == -1))
            return this.findDirectionBothLeftTrapezoid(origin, destination);
        else if (originTrapezoid == destinationTrapezoid && originTrapezoid == 0)
            return this.findDirectionBothCentre(origin, destination);
        else if (originTrapezoid != destinationTrapezoid)
            return this.findDirectionDifferentTrapezoids(origin, destination) ;
        else throw new Error("Invalid value from FindTrapezoidOfCoordinate function.");
    }

    findDirectionBothLeftTrapezoid = function (origin, destination) {
        const letterOrigin = origin.charCodeAt(0);
        const numberOrigin = Number(origin.slice(1, origin.length));
        const letterDestination = destination.charCodeAt(0);
        const numberDestination = Number(destination.slice(1, destination.length));

        if (letterOrigin == letterDestination && numberDestination - numberOrigin > 0)
            return 'North';
        else if ((letterDestination - letterOrigin) * 2 == numberDestination - numberOrigin && numberDestination > numberOrigin)
            return 'DiagonalNorthEast';
        else if (letterDestination - letterOrigin == numberDestination - numberOrigin && numberDestination > numberOrigin)
            return 'NorthEast';
        else if (letterDestination - letterOrigin == 2 * (numberDestination - numberOrigin) && numberDestination > numberOrigin)
            return 'DiagonalEast';
        else if (letterDestination - letterOrigin > 0 && numberDestination - numberOrigin == 0 && letterDestination > letterOrigin)
            return 'SouthEast';
        else if (letterDestination - letterOrigin == -(numberDestination - numberOrigin) && numberDestination < numberOrigin && letterDestination > letterOrigin)
            return 'DiagonalSouthEast';
        else if (letterOrigin == letterDestination && numberDestination - numberOrigin < 0)
            return 'South';
        else if (numberDestination - numberOrigin == 2 * (letterDestination - letterOrigin) && numberDestination < numberOrigin && letterDestination < letterOrigin)
            return 'DiagonalSouthWest';
        else if (letterDestination - letterOrigin == numberDestination - numberOrigin && numberDestination < numberOrigin && letterDestination < letterOrigin)
            return 'SouthWest';
        else if (letterDestination - letterOrigin == 2 * (numberDestination - numberOrigin) && numberDestination < numberOrigin && letterDestination < letterOrigin)
            return 'DiagonalWest';
        else if (letterDestination - letterOrigin < 0 && numberDestination == numberOrigin)
            return 'NorthWest';
        else if (-(letterDestination - letterOrigin) == numberDestination - numberOrigin && letterDestination < letterOrigin && numberDestination > numberOrigin)
            return 'DiagonalNorthWest';
        else
            throw new Error("Unable to find a direction for the provided coordinates from " + origin + " to " + destination + ".");
    }

    findDirectionBothRightTrapezoid = function (origin, destination) {
        const letterOrigin = origin.charCodeAt(0);
        const numberOrigin = Number(origin.slice(1, origin.length));
        const letterDestination = destination.charCodeAt(0);
        const numberDestination = Number(destination.slice(1, destination.length));

        if (letterOrigin == letterDestination && numberDestination - numberOrigin > 0)
            return 'North';
        else if (letterDestination - letterOrigin == numberDestination - numberOrigin && letterDestination > letterOrigin && numberDestination > numberOrigin)
            return 'DiagonalNorthEast';
        else if (letterDestination - letterOrigin > 0 && numberDestination == numberOrigin)
            return 'NorthEast';
        else if (letterDestination - letterOrigin == 2 * -(numberDestination - numberOrigin) && numberDestination < numberOrigin && letterDestination > letterOrigin)
            return 'DiagonalEast';
        else if (letterDestination - letterOrigin == -(numberDestination - numberOrigin) && numberDestination < numberOrigin && letterDestination > letterOrigin)
            return 'SouthEast';
        else if (numberDestination - numberOrigin == 2 * -(letterDestination - letterOrigin) && numberDestination < numberOrigin && letterDestination > letterOrigin)
            return 'DiagonalSouthEast';
        else if (letterOrigin == letterDestination && numberDestination - numberOrigin < 0)
            return 'South';
        else if (letterDestination - letterOrigin == numberDestination - numberOrigin && numberDestination < numberOrigin && letterDestination < letterOrigin)
            return 'DiagonalSouthWest';
        else if (letterDestination - letterOrigin < 0 && numberDestination - numberOrigin == 0 && letterDestination < letterOrigin)
            return 'SouthWest';
        else if (letterDestination - letterOrigin == 2 * -(numberDestination - numberOrigin) && numberDestination > numberOrigin)
            return 'DiagonalWest';
        else if (-(letterDestination - letterOrigin) == numberDestination - numberOrigin && numberDestination > numberOrigin && letterDestination < letterOrigin)
            return 'NorthWest';
        else if (-(letterDestination - letterOrigin) * 2 == numberDestination - numberOrigin && numberDestination > numberOrigin)
            return 'DiagonalNorthWest';
        else
            throw new Error("Unable to find a direction for the provided coordinates from " + origin + " to " + destination + ".");
    }

    findDirectionBothCentre = function (origin, destination) {
        const numberOrigin = Number(origin.slice(1, origin.length));
        const numberDestination = Number(destination.slice(1, destination.length));

        if (numberDestination > numberOrigin)
            return 'North';
        else if (numberDestination < numberOrigin)
            return 'South';
        else
            throw new Error("Unable to find a direction for the provided coordinates from " + origin + " to " + destination + ".");
    }

    findDirectionDifferentTrapezoids = function (origin, destination) {
        const letterOrigin = origin.charCodeAt(0);
        const numberOrigin = Number(origin.slice(1, origin.length));
        const letterDestination = destination.charCodeAt(0);
        const numberDestination = Number(destination.slice(1, destination.length));

        const fIntercept = this.findFIntercept(origin);
        const fInterceptNumber = Number(fIntercept.slice(1, fIntercept.length));

        if (numberDestination - numberOrigin == Math.abs(this.findCharacterOffsetFromF(origin[0])) * 2 + Math.abs(this.findCharacterOffsetFromF(destination[0])) && numberDestination > numberOrigin && letterDestination > letterOrigin)
            return 'DiagonalNorthEast';
        else if (numberDestination == fInterceptNumber && numberDestination > numberOrigin && letterDestination > letterOrigin)
            return 'NorthEast';
        else if (numberDestination - numberOrigin == Math.abs(this.findCharacterOffsetFromF(origin[0])) - Math.abs(this.findCharacterOffsetFromF(destination[0])) - (numberDestination - numberOrigin) && letterDestination > letterOrigin)
            return 'DiagonalEast';
        else if (numberDestination == numberOrigin - this.findCharacterOffsetFromF(destination[0]) && numberDestination < numberOrigin && letterDestination > letterOrigin)
            return 'SouthEast';
        else if (numberOrigin - numberDestination == Math.abs(this.findCharacterOffsetFromF(origin[0])) + Math.abs(this.findCharacterOffsetFromF(destination[0])) * 2 && letterOrigin < letterDestination)
            return 'DiagonalSouthEast';
        else if (numberOrigin - numberDestination == Math.abs(this.findCharacterOffsetFromF(destination[0])) * 2 + Math.abs(this.findCharacterOffsetFromF(origin[0])) && letterOrigin > letterDestination)
            return 'DiagonalSouthWest';
        else if (numberDestination == numberOrigin - Math.abs(this.findCharacterOffsetFromF(destination[0])) && numberDestination < numberOrigin && letterDestination < letterOrigin)
            return 'SouthWest';
        else if (numberDestination - numberOrigin == Math.abs(this.findCharacterOffsetFromF(origin[0])) - Math.abs(this.findCharacterOffsetFromF(destination[0])) - (numberDestination - numberOrigin) && letterDestination < letterOrigin)
            return 'DiagonalWest';
        else if (numberDestination == fInterceptNumber && letterDestination < letterOrigin)
            return 'NorthWest';
        else if (numberDestination - numberOrigin == Math.abs(this.findCharacterOffsetFromF(origin[0])) * 2 + Math.abs(this.findCharacterOffsetFromF(destination[0])))
            return 'DiagonalNorthWest';
        else
            throw new Error("Unable to find a direction for the provided coordinates from " + origin + " to " + destination + ".");
    }

    findFIntercept = function (coordinate) {
        const letterPart = coordinate[0];
        const numberPart = Number(coordinate.slice(1, coordinate.length));
        return 'F' + (numberPart + Math.abs(this.findCharacterOffsetFromF(letterPart)));
    }

    findCharacterOffsetFromF = function (char) {
        return char.charCodeAt(0) - 'F'.charCodeAt(0);
    }

    invertDirection = function (direction) {
        switch (direction)
        {
            case 'North':
                return 'South';
            case 'DiagonalNorthEast':
                return 'DiagonalSouthWest';
            case 'NorthEast':
                return 'SouthWest';
            case 'DiagonalEast':
                return 'DiagonalWest';
            case 'SouthEast':
                return 'NorthWest';
            case 'DiagonalSouthEast':
                return 'DiagonalNorthWest';
            case 'South':
                return 'North';
            case 'DiagonalSouthWest':
                return 'DiagonalNorthEast';
            case 'SouthWest':
                return 'NorthEast';
            case 'DiagonalWest':
                return 'DiagonalEast';
            case 'NorthWest':
                return 'SouthEast';
            case 'DiagonalNorthWest':
                return 'DiagonalSouthEast';
            default:
                throw new Error("Invalid direction was provided to InverDirection function: " + direction);
        }
    }
}
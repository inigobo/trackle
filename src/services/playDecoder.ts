
export class PlayDecoder {
    decodeAttempts = (url: string) => {
        const regex = /b=([^&]+)&/
        const match = url.match(regex)
        if (match) {
            return atob(match[1]).replace(/"/g, "'")
        }
    }

    decodeSolution = (url: string) => {
        const regex = /s=([^&]+)&/
        const match = url.match(regex)

        if (match) {
            return atob(match[1])
        }
    }
}
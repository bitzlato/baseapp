export function extractSemver(text: string) {
    const arr = [
        text.match(/:major:\s*(\d+)/)[1],
        text.match(/:minor:\s*(\d+)/)[1],
        text.match(/:patch:\s*(\d+)/)[1]
    ];
    return `v${arr.join('.')}`;
}

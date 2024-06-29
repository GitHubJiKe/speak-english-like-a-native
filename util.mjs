export function getRoutePath() {
    return location.origin.includes("localhost")
        ? "/"
        : "/speak-english-like-a-native/";
}

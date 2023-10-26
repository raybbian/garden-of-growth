module.exports = {
    path: "/tiles/path", //%PUBLIC_URL%{thisPath}/name.{tileFormat}
    tileFormat: "png",
    tiles: [
        { name: "corner-0" },
        { name: "corner-1" },
        { name: "corner-2" },
        { name: "corner-3" },
    ],
    neighbors: [
        { left: "corner-2", right: "corner-0"}
    ]
};

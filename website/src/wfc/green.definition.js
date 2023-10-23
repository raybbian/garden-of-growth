module.exports = {
    tiles: [
        { name:"0", symmetry:"X" },
        { name:"2", symmetry:"L" },
        { name:"line", symmetry:"I" },
    ],
    neighbors: [
        { left:"0 0", right:"0 0" },
        { left:"0 0", right:"line 0" },
        { left:"0 0", right:"2 0" },

        { left:"line 1", right:"line 1" },
        { left:"line 1", right:"2 1" },
        { left:"2 0", right:"2 2" },
    ]
};

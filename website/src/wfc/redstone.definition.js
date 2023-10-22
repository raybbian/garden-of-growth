module.exports = {
    tiles: [
        { name:"0-0", symmetry:""},
        { name:"1-0", symmetry:""},
        { name:"1-1", symmetry:""},
        { name:"1-2", symmetry:""},
        { name:"1-3", symmetry:""},
    ],
    neighbors: [
        { left:"1-0 0", right:"1-2 2" },
        { left:"1-0 1", right:"0-0" },
        { left:"1-0 2", right:"0-0" },
        { left:"1-0 3", right:"0-0" },

        { left:"1-1 0", right:"0-0" },
        { left:"1-1 1", right:"1-3 3" },
        { left:"1-1 2", right:"0-0" },
        { left:"1-1 3", right:"0-0" },

        { left:"1-2 0", right:"0-0" },
        { left:"1-2 1", right:"0-0" },
        { left:"1-2 2", right:"1-0 0" },
        { left:"1-2 3", right:"0-0" },

        { left:"1-3 0", right:"0-0" },
        { left:"1-3 1", right:"0-0" },
        { left:"1-3 2", right:"0-0" },
        { left:"1-3 3", right:"1-1 1" },
    ]
};

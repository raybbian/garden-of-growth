#include <iostream>
#include <memory>
#include <vector>
#include <unordered_set>
#include <set>
#include <unordered_map>

struct WaveFunctionTile {
    std::unique_ptr<std::unordered_set<int>> superPositions;
    bool is_observed;
    int entropy;
    int x;
    int y;
    int z;
    std::string type;

    WaveFunctionTile() {
        is_observed = false;
        superPositions = std::make_unique<std::unordered_set<int>>();
        entropy = -1;
        x = 0;
        y = 0;
        z = 0;
        type = "empty";
    }
};

struct WaveFunction {
    int gridWidth;
    std::unique_ptr<std::vector<WaveFunctionTile>> grid;
    std::unique_ptr<std::set<WaveFunctionTile>> queue;
    std::unique_ptr<std::unordered_map<std::string, std::unordered_set<std::string>>> adj;
    std::unique_ptr<std::unordered_map<std::string, std::vector<int>>> socket;

    WaveFunction(int gridWidth) {
        this->gridWidth = gridWidth;
        grid = std::make_unique<std::vector<WaveFunctionTile>>(gridWidth * gridWidth);
        queue = std::make_unique<std::set<WaveFunctionTile>>();
        adj = std::make_unique<std::unordered_map<std::string, std::unordered_set<std::string>>>();
        socket = std::make_unique<std::unordered_map<std::string, std::vector<int>>>();
    }
};

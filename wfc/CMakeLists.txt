cmake_minimum_required(VERSION 3.26)
project(wfc)

set(CMAKE_CXX_STANDARD 20)

add_executable(
        emscripten/bind.h
        wfc WaveFunction.cpp
        main.cpp)

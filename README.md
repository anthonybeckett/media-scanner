# Media Scanner

This is a simple media scanner for windows which is written in node js and typescript.  

The idea is to check if windows media player or VLC player is running and extract any current playing media information and send to a macro pad built with a raspberry pi pico over a COM port.  

The media player depends on a WinRT binary which is written in C++ and calls through a sub-process. The data is then read and should be parsed into JSON and passed to the pico, which in CircuitPython reads the data as binary and displays in on a small LED screen built onto my macropad.
# About
This is a desktop application that turns a slider into serialport messages. The slider ranges from -1000 to 1000. Node-webkit and node-serialport are used to make this happen.

# Requirements
## nwjs
I downloaded a mac zip version and unzipped it. I can now run the executable like `~/Downloads/nwjs-v0.12.3-osx-x64/nwjs.app/Contents/MacOS/nwjs .`

## serialport
serialport is pretty tricky to install, because it's partly written in C/C++ and needs to be built for the system. Installing this for node and node-webkit are two different worlds. In our case, we want to install it for node-webkit. To keep my instructions "modular", we'll first install serialport for node and then for node-webkit.

### serialport for node
Hopefully, `npm install serialport` will work. If it doesn't, here are some things to think about:
- sudo (maybe)
- Mac: Make sure Xcode is installed (I think just the command line utilities are needed, but I was having problems). Open up Xcode and agree to the terms of service.
- If you get a node-gyp error, use nvm to install v0.10. There's lots of good information about serialport troubles [here](https://community.particle.io/t/tutorial-particle-cli-on-mac-osx-26-sep-2015/5225/121).

### serialport for node-webkit
- Skim through [using node modules in nwjs](https://github.com/nwjs/nw.js/wiki/Using-Node-modules)
- serialport is a "3rd party modules with C/C++ addons". It mentions the solution is `nw-gyp`. Note it intends you to run the commands in `node_modules/serialport`. In my case, I got a `Undefined variable module_name in binding.gyp while trying to load binding.gyp` error.
- The above error is fixed by this: https://github.com/nwjs/nw.js/wiki/build-native-modules-with-nw-gyp
  - But there's a new error about "Make" not working
- Finally, here's the answer: I found to work https://github.com/nwjs/nw-gyp/issues/69
```
Here's the important part from the issue 69 above:

Make a clean: node-pre-gyp clean
Configure the build process: node-pre-gyp configure --runtime=node-webkit --target=0.12.2
Build the module for node-webkit: node-pre-gyp build --runtime=node-webkit --target=0.12.2
```

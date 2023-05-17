# Build Stage

The **build stage** includes all necessary steps to compile the software into a working program.

Not all compile steps are always necessary for the build in development process and partial compilation can be used instead. In this case, the **build stage** can come in **3** different flavors.


## 1. Development build

This type of build lets developers fix bugs in code, test new features quickly, and make changes to existing ones, making sure the code for the application works as intended.

*Development builds should be as quick as possible because compiling and optimizing resources during the debugging or prototyping process can be waste of time.*

*Some languages and tools provide partial compilation, which allows us to monitor file changes and recompile only the altered code rather than the entire project.*

*We don’t need to optimize resources like media files at that stage of development because they are primarily loaded locally.*


## 2. Testing build

A testing build primarily focuses on **making sure that all parts of the application are functioning correctly**.

This includes running test scripts and manual tests to ensure that all features of the application work as expected.

*Testing builds are heavier because they include debug information, which allows you to see more specific information about any errors, including the file and line number.*

*Because we don’t conduct as many speed optimizations, the compilation may be faster than the release. Any issues identified during this build need to be fixed before a Release Build can be created.*


## 3. Release build

Release Builds involve collecting all parts of the code, such as compiled binaries, configuration files, and any other resources needed by the application together into a deployable package to be delivered to production system.

The package is then optimized for size, usability, and performance on its target platform before eventually being pushed out to production environments. This also may include media files optimization to reduce size or support better client-side caching.

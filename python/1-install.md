# Getting Started

## Install a Python interpreter

To install Python using Homebrew on macOS use `brew install python3` at the Terminal prompt.


## Verify the Python installation

open a Terminal Window and type the following command:

```sh
python3 --version
```

## Fix bug SSL: CERTIFICATE_VERIFY_FAILED with Python3

This solution work on MacOS.

Go to the folder where Python is installed, e.g., in my case it is installed in the Applications folder with the folder name 'Python 3.6'. Now double click on 'Install Certificates.command'. After that error was gone.

Reference: [https://stackoverflow.com/questions/35569042/ssl-certificate-verify-failed-with-python3](https://stackoverflow.com/questions/35569042/ssl-certificate-verify-failed-with-python3)
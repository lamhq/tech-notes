# Jupytext

## Overview

Jupytext allows you to save Jupyter Notebooks in plain text format.

Benefits:
- Enable editing notebooks in IDE
- Get clear and meaningful diffs when doing version control
- Easy to arrange/copy/edit cell blocks


## Syntax

Text notebooks are encoded in the `py:percent` format.

They can be either in Markdown format (with a `.md` extension) or as Python scripts (with a `.py` extension).

The `.py` format is particularly useful for version control, as it includes only the notebook inputs (and optionally, metadata):

```py
# %% [markdown]
# This is a markdown cell

# %%
def f(x):
  return 3*x+1
```

Markdown-based formats are great for documentation-oriented notebooks.


## Installation

```sh
pip install jupytext
```

You can open text notebooks with a right click in Jupyter Lab.

![](https://github.com/mwouts/jupytext/blob/64b4be818508760116f91bf156342cb4cf724d93/docs/images/jupyterlab_right_click.png?raw=true)


## Paired Notebooks

Text notebooks lose their outputs when closed.

A convenient alternative to text notebooks are paired notebooks. These are a set of two files, say `.ipynb` and `.py`, that contain the same notebook, but in different formats.

The `.ipynb` version will be updated or recreated the next time you save the notebook in Jupyter.

To pair a notebook in Jupyter Lab, use the command **Pair Notebook with percent Script** from the Command Palette:

![](https://github.com/mwouts/jupytext/blob/64b4be818508760116f91bf156342cb4cf724d93/docs/images/pair_commands.png?raw=true)


To pair all the notebooks in the current folder and subfolders, create a configuration file with this content:

```py filename="jupytext.toml"
# jupytext.toml at the root of your notebook directory
formats = "ipynb,py:percent"
```


## Usage

### Create text notebook from existing notebook

1. Open your `.ipynb` notebook in Jupyter and pair it to a `.py` notebook (using command line or configuration file).
2. Save the notebook (the `.py` notebook is automatically created).
3. Add this `.py` notebook to version control
4. You might exclude `.ipynb` files from version control. Jupytext will recreate the `.ipynb` files locally when the users open and save the `.py` notebooks.

### Edit text notebook

1. You have your `.py` notebooks under version control
2. You open it as a notebook in Jupyter (right-click in Jupyter Lab)
3. You run the notebook and save it. Outputs are regenerated, and a local `.ipynb` file is created
4. You edit the notebook, and push the update to git. The diff is nothing else than a standard diff on a Python script.


## References

- [Jupytext documentation](https://jupytext.readthedocs.io/en/latest/index.html)
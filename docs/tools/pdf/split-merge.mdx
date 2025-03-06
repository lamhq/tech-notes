# Splitting & Merging

## Installation

```sh
pip install PyPDF2
```

## Split pdf

```py
from PyPDF2 import PdfWriter, PdfReader

def write_file(src_file, dst_file, pages):
    input_pdf = PdfReader(open(src_file, 'rb'))
    output = PdfWriter()
    for page_no in pages:
        output.add_page(input_pdf.pages[page_no - 1])
    with open(dst_file, "wb") as outputStream:
        output.write(outputStream)

input_file = '/Users/admin/Documents/input.pdf'
toc = {
    '/Users/admin/Documents/file-1.pdf': [1],
    '/Users/admin/Documents/file-2.pdf': [2],
    '/Users/admin/Documents/file-3.pdf': [3, 4],
}

for file_name, pages in toc.items():
    write_file(input_file, file_name, pages)
```


## Merge pdf

```py
from PyPDF2 import PdfWriter, PdfReader

files = [
    '/Users/admin/Documents/file-1.pdf',
    '/Users/admin/Documents/file-2.pdf',
]
out_file = '/Users/admin/Documents/output.pdf'
output = PdfWriter()

for input_file in files:
    input_pdf = PdfReader(open(input_file, 'rb'))
    for page in input_pdf.pages:
        output.add_page(page)

with open(out_file, "wb") as outputStream:
    output.write(outputStream)
```


## Combine images to pdf

```py
from PIL import Image

# List of image file paths
image_paths = [
  "/Users/admin/Documents/file-1.jpg", 
  "/Users/admin/Documents/file-2.jpg"
]

# Open each image
images = [Image.open(image_path) for image_path in image_paths]

# Output PDF file path
pdf_path = "/Users/admin/Documents/putput.pdf"

# Save all images as a multi-page PDF
images[0].save(pdf_path, "PDF", resolution=100.0, save_all=True, append_images=images[1:])
```

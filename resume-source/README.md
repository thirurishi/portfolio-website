# Résumé source

LaTeX source for the résumé PDFs in `public/`. Build with XeLaTeX:

```
xelatex resume_en.tex
xelatex resume_fr.tex
```

Then copy the PDFs to `public/Thirumurugan_Kumar_Resume_EN.pdf` and `public/Thirumurugan_Kumar_CV_FR.pdf`.

Note: `preamble.tex` loads Latin Modern from a Linux TeX Live path. On another machine, delete the `Path=...` line if Latin Modern is installed, or point it to your local font folder.

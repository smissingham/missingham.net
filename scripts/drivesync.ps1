Remove-Item -Force -Recurse .\content\*
Copy-Item -Force -Recurse 'G:\My Drive\#blog-content\@Public\*' .\content\
#npx quartz sync
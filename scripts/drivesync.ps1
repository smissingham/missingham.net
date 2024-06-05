Remove-Item -Force -Recurse .\content\*
Copy-Item -Force -Recurse 'G:\My Drive\#notes\@Public\*' .\content\
#npx quartz sync